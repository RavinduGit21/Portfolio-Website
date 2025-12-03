require('dotenv').config();
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');

const app = express();

// Configure CORS to allow credentials
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));

// Configure session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_session_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;
const jwtSecret = process.env.JWT_SECRET || 'your_default_jwt_secret';
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!mongoUri) {
  console.error('ERROR: The MONGO_URI environment variable is not set.');
  process.exit(1);
}

let db;

async function connectDB() {
  try {
    const client = new MongoClient(mongoUri);
    await client.connect();
    db = client.db();
    console.log('✅ Connected successfully to MongoDB!');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
}

// Configure Google OAuth Strategy
if (googleClientId && googleClientSecret) {
  passport.use(new GoogleStrategy({
    clientID: googleClientId,
    clientSecret: googleClientSecret,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user already exists
      let user = await db.collection('users').findOne({ googleId: profile.id });
      
      if (user) {
        return done(null, user);
      }
      
      // Check if user exists with same email
      user = await db.collection('users').findOne({ email: profile.emails[0].value });
      
      if (user) {
        // Update existing user with Google ID
        await db.collection('users').updateOne(
          { _id: user._id },
          { $set: { googleId: profile.id } }
        );
        user.googleId = profile.id;
        return done(null, user);
      }
      
      // Create new user
      const newUser = {
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        isAdmin: false,
        createdAt: new Date()
      };
      
      const result = await db.collection('users').insertOne(newUser);
      newUser._id = result.insertedId;
      
      return done(null, newUser);
    } catch (error) {
      return done(error, null);
    }
  }));

  // Serialize user for session
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  // Deserialize user from session
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
} else {
  console.warn('⚠️ Google OAuth credentials not found. Google sign-in will be disabled.');
}

// Middleware to protect routes
const protect = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, jwtSecret);
      // We could attach user to req here if needed: req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Admin middleware
const admin = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, jwtSecret);
            const user = await db.collection('users').findOne({ _id: new ObjectId(decoded.id) });

            if (user && user.isAdmin) {
                req.user = user;
                next();
            } else {
                res.status(403).json({ message: 'Not authorized as an admin' });
            }
        } catch (error) {
             res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
         res.status(401).json({ message: 'Not authorized, no token' });
    }
};


// Google OAuth Routes
if (googleClientId && googleClientSecret) {
  app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );

  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    async (req, res) => {
      try {
        // Generate JWT token for the authenticated user
        const token = jwt.sign({ id: req.user._id }, jwtSecret, { expiresIn: '30d' });
        
        // Redirect to frontend with token
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
        res.redirect(`${frontendUrl}/auth/success?token=${token}&user=${encodeURIComponent(JSON.stringify({
          _id: req.user._id,
          name: req.user.name,
          email: req.user.email,
          isAdmin: req.user.isAdmin
        }))}`);
      } catch (error) {
        console.error('Error in Google OAuth callback:', error);
        res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/login?error=oauth_failed`);
      }
    }
  );
}

// API Routes
app.get('/api/products', async (req, res) => {
  try {
    const products = await db.collection('products').find({}).toArray();
    res.json(products);
  } catch (error) {
    console.error('Error in GET /api/products:', error);
    res.status(500).json({ message: 'Failed to retrieve products', error: error.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid product ID format' });
    }
    const product = await db.collection('products').findOne({ _id: new ObjectId(req.params.id) });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error in GET /api/products/:id:', error);
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
});

app.get('/api/megamenu-categories', async (req, res) => {
  try {
    const megaMenuCategories = await db.collection('megaMenuCategories').find({}).toArray();
    res.json(megaMenuCategories);
  } catch (error) {
    console.error('Error in GET /api/megamenu-categories:', error);
    res.status(500).json({ message: 'Failed to retrieve mega menu categories', error: error.message });
  }
});

app.get('/api/categories', async (req, res) => {
  try {
    const categories = await db.collection('categories').find({}).toArray();
    res.json(categories);
  } catch (error) {
    console.error('Error in GET /api/categories:', error);
    res.status(500).json({ message: 'Failed to retrieve categories', error: error.message });
  }
});

app.get('/api/brands', async (req, res) => {
  try {
    const brands = await db.collection('brands').find({}).toArray();
    res.json(brands);
  } catch (error) {
    console.error('Error in GET /api/brands:', error);
    res.status(500).json({ message: 'Failed to retrieve brands', error: error.message });
  }
});

app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await db.collection('reviews').find({}).toArray();
    res.json(reviews);
  } catch (error) {
    console.error('Error in GET /api/reviews:', error);
    res.status(500).json({ message: 'Failed to retrieve reviews', error: error.message });
  }
});


app.post('/api/users/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
          return res.status(400).json({ message: 'Name, email, and password are required' });
        }
        const userExists = await db.collection('users').findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const result = await db.collection('users').insertOne({
            name,
            email,
            password: hashedPassword,
            isAdmin: false, // Default role
        });
        
        const newUser = await db.collection('users').findOne({ _id: result.insertedId });

        if (newUser) {
            res.status(201).json({
                user: { _id: newUser._id, name: newUser.name, email: newUser.email, isAdmin: newUser.isAdmin },
                token: jwt.sign({ id: newUser._id }, jwtSecret, { expiresIn: '30d' }),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
      console.error('Error in POST /api/users/register:', error);
      res.status(500).json({ message: 'User registration failed', error: error.message });
    }
});

app.post('/api/users/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await db.collection('users').findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                user: { _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin },
                token: jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '30d' }),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
      console.error('Error in POST /api/users/login:', error);
      res.status(500).json({ message: 'User login failed', error: error.message });
    }
});

// --- Admin Protected Routes ---
app.post('/api/products', admin, async (req, res) => {
    try {
        const { 
            name, brand, price, originalPrice, imageUrl, images, category, description,
            shortDescription, features, specifications, whatIncluded, warranty, availability,
            sku, weight, dimensions, colors, stock, isNew, isFeatured, tags
        } = req.body;
        const newProduct = {
            name,
            brand,
            price,
            originalPrice: originalPrice || 0,
            imageUrl,
            images: images || [],
            category,
            description,
            shortDescription: shortDescription || '',
            features: features || [],
            specifications: specifications || {},
            whatIncluded: whatIncluded || [],
            warranty: warranty || '',
            availability: availability || '',
            sku: sku || '',
            weight: weight || '',
            dimensions: dimensions || '',
            colors: colors || [],
            stock: stock || 0,
            isNew: isNew || false,
            isFeatured: isFeatured || false,
            tags: tags || [],
            rating: 0, // Default value
            reviews: 0, // Default value
        };
        const result = await db.collection('products').insertOne(newProduct);
        const createdProduct = await db.collection('products').findOne({ _id: result.insertedId });
        res.status(201).json(createdProduct);
    } catch (error) {
      console.error('Error in POST /api/products:', error);
      res.status(500).json({ message: 'Failed to create product', error: error.message });
    }
});

app.put('/api/products/:id', admin, async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
          return res.status(400).json({ message: 'Invalid product ID format' });
        }
        const { 
            name, brand, price, originalPrice, imageUrl, images, category, description,
            shortDescription, features, specifications, whatIncluded, warranty, availability,
            sku, weight, dimensions, colors, stock, isNew, isFeatured, tags
        } = req.body;
        const updateData = {
            name,
            brand,
            price,
            originalPrice: originalPrice || 0,
            imageUrl,
            images: images || [],
            category,
            description,
            shortDescription: shortDescription || '',
            features: features || [],
            specifications: specifications || {},
            whatIncluded: whatIncluded || [],
            warranty: warranty || '',
            availability: availability || '',
            sku: sku || '',
            weight: weight || '',
            dimensions: dimensions || '',
            colors: colors || [],
            stock: stock || 0,
            isNew: isNew || false,
            isFeatured: isFeatured || false,
            tags: tags || []
        };
        const result = await db.collection('products').updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: updateData }
        );
         if (result.matchedCount > 0) {
            const updatedProduct = await db.collection('products').findOne({ _id: new ObjectId(req.params.id) });
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
      console.error('Error in PUT /api/products/:id:', error);
      res.status(500).json({ message: 'Failed to update product', error: error.message });
    }
});

app.delete('/api/products/:id', admin, async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
          return res.status(400).json({ message: 'Invalid product ID format' });
        }
        const result = await db.collection('products').deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount > 0) {
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
      console.error('Error in DELETE /api/products/:id:', error);
      res.status(500).json({ message: 'Failed to delete product', error: error.message });
    }
});


connectDB().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Backend server is running on http://localhost:${port}`);
  });
});