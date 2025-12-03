
// Vercel Serverless Function for production
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { MongoClient } from 'mongodb';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const app = express();

// --- Database Connection ---
let db;
const connectToDatabase = async () => {
  if (db) return db;
  try {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    db = client.db('westnahiraDB');
    console.log('✅ Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
};

// --- Middleware ---
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://westnahira-cellularz-three.vercel.app',
  credentials: true
}));
app.use(express.json({ limit: '5mb' })); // Allow larger image uploads in base64

// Initialize Passport
app.use(passport.initialize());

// Configure Google OAuth Strategy
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (googleClientId && googleClientSecret) {
  passport.use(new GoogleStrategy({
    clientID: googleClientId,
    clientSecret: googleClientSecret,
    callbackURL: `${process.env.FRONTEND_URL || 'https://westnahira-cellularz-three.vercel.app'}/api/auth/google/callback`
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const database = await connectToDatabase();
      
      // Check if user already exists
      let user = await database.collection('users').findOne({ googleId: profile.id });
      
      if (user) {
        return done(null, user);
      }
      
      // Check if user exists with same email
      user = await database.collection('users').findOne({ email: profile.emails[0].value });
      
      if (user) {
        // Update existing user with Google ID
        await database.collection('users').updateOne(
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
      
      const result = await database.collection('users').insertOne(newUser);
      newUser._id = result.insertedId;
      
      return done(null, newUser);
    } catch (error) {
      console.error('Google OAuth strategy error:', error);
      return done(error, null);
    }
  }));
}

// --- Helper for Auth Middleware ---
const protect = (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // We don't need to fetch the user from DB for this app's logic
            // req.user = await database.collection('users').findOne({ _id: new ObjectId(decoded.id) });
            next();
        } catch (error) {
            console.error('Not authorized, token failed', error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// --- Google OAuth Routes ---
if (googleClientId && googleClientSecret) {
  app.get('/api/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );

  app.get('/api/auth/google/callback',
    (req, res, next) => {
      passport.authenticate('google', { session: false }, (err, user, info) => {
        if (err) {
          console.error('Google OAuth error:', err);
          return res.redirect(`${process.env.FRONTEND_URL || 'https://westnahira-cellularz-three.vercel.app'}/login?error=oauth_failed`);
        }
        
        if (!user) {
          console.error('No user returned from Google OAuth');
          return res.redirect(`${process.env.FRONTEND_URL || 'https://westnahira-cellularz-three.vercel.app'}/login?error=oauth_failed`);
        }

        try {
          // Generate JWT token for the authenticated user
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
          
          // Redirect to frontend with token
          const frontendUrl = process.env.FRONTEND_URL || 'https://westnahira-cellularz-three.vercel.app';
          res.redirect(`${frontendUrl}/auth/success?token=${token}&user=${encodeURIComponent(JSON.stringify({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
          }))}`);
        } catch (error) {
          console.error('Error generating token:', error);
          res.redirect(`${process.env.FRONTEND_URL || 'https://westnahira-cellularz-three.vercel.app'}/login?error=oauth_failed`);
        }
      })(req, res, next);
    }
  );
}

// --- API Routes ---

// GET all products
app.get('/api/products', async (req, res) => {
    try {
        const database = await connectToDatabase();
        const products = await database.collection('products').find({}).toArray();
        res.status(200).json(products);
    } catch (error) {
        console.error('[API_ERROR] /api/products:', error);
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
});

// GET a single product by ID
app.get('/api/products/:id', async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid product ID format' });
        }
        const database = await connectToDatabase();
        const product = await database.collection('products').findOne({ _id: new ObjectId(req.params.id) });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(`[API_ERROR] /api/products/${req.params.id}:`, error);
        res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
});

// GET Mega Menu Categories
app.get('/api/megamenu-categories', async (req, res) => {
    try {
        const database = await connectToDatabase();
        const megaMenuCategories = await database.collection('megaMenuCategories').find({}).toArray();
        res.status(200).json(megaMenuCategories);
    } catch (error) {
        console.error('[API_ERROR] /api/megamenu-categories:', error);
        res.status(500).json({ message: 'Error fetching mega menu categories', error: error.message });
    }
});

// GET Popular Categories
app.get('/api/categories', async (req, res) => {
    try {
        const database = await connectToDatabase();
        const categories = await database.collection('categories').find({}).toArray();
        res.status(200).json(categories);
    } catch (error) {
        console.error('[API_ERROR] /api/categories:', error);
        res.status(500).json({ message: 'Error fetching categories', error: error.message });
    }
});

// GET Brands
app.get('/api/brands', async (req, res) => {
    try {
        const database = await connectToDatabase();
        const brands = await database.collection('brands').find({}).toArray();
        res.status(200).json(brands);
    } catch (error) {
        console.error('[API_ERROR] /api/brands:', error);
        res.status(500).json({ message: 'Error fetching brands', error: error.message });
    }
});

// GET Reviews
app.get('/api/reviews', async (req, res) => {
    try {
        const database = await connectToDatabase();
        const reviews = await database.collection('reviews').find({}).toArray();
        res.status(200).json(reviews);
    } catch (error) {
        console.error('[API_ERROR] /api/reviews:', error);
        res.status(500).json({ message: 'Error fetching reviews', error: error.message });
    }
});

// POST Login user
app.post('/api/users/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const database = await connectToDatabase();
        const user = await database.collection('users').findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                },
                token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' }),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('[API_ERROR] /api/users/login:', error);
        res.status(500).json({ message: 'Server error during login', error: error.message });
    }
});

// GET all users (Admin only)
app.get('/api/users', protect, async (req, res) => {
    try {
        const database = await connectToDatabase();
        
        // Check if the requesting user is admin
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const requestingUser = await database.collection('users').findOne({ _id: new ObjectId(decoded.id) });
        
        if (!requestingUser || !requestingUser.isAdmin) {
            return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
        }
        
        const users = await database.collection('users').find({}).toArray();
        
        // Remove password field from response
        const sanitizedUsers = users.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });
        
        res.status(200).json(sanitizedUsers);
    } catch (error) {
        console.error('[API_ERROR] GET /api/users:', error);
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
});

// POST Register user
app.post('/api/users/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const database = await connectToDatabase();
        const userExists = await database.collection('users').findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const result = await database.collection('users').insertOne({
            name,
            email,
            password: hashedPassword,
            isAdmin: false,
        });
        
        const newUser = await database.collection('users').findOne({ _id: result.insertedId });

        if (newUser) {
            res.status(201).json({
                user: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    isAdmin: newUser.isAdmin,
                },
                token: jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '30d' }),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error('[API_ERROR] /api/users/register:', error);
        res.status(500).json({ message: 'Server error during registration', error: error.message });
    }
});

// --- Admin Routes (Protected) ---

// POST Create a new product
app.post('/api/products', protect, async (req, res) => {
    try {
        const database = await connectToDatabase();
        const { name, brand, price, imageUrl, category, description } = req.body;

        // Basic validation
        if (!name || !brand || !price || !category || !description) {
            return res.status(400).json({ message: 'Please provide all required product fields.' });
        }

        const product = {
            name,
            brand,
            price: Number(price),
            imageUrl, // Frontend might send a base64 string or a URL
            category,
            description,
            rating: 0, // Default rating
            reviews: 0, // Default reviews
            createdAt: new Date(),
        };

        const result = await database.collection('products').insertOne(product);
        const newProduct = await database.collection('products').findOne({ _id: result.insertedId });
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('[API_ERROR] POST /api/products:', error);
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
});

// PUT Update a product
app.put('/api/products/:id', protect, async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid product ID format' });
        }
        const database = await connectToDatabase();
        const { name, brand, price, imageUrl, category, description } = req.body;
        
        const updatedFields = { name, brand, price: Number(price), imageUrl, category, description };

        const result = await database.collection('products').updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: updatedFields }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Product not found to update' });
        }
        
        const updatedProduct = await database.collection('products').findOne({ _id: new ObjectId(req.params.id) });
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(`[API_ERROR] PUT /api/products/${req.params.id}:`, error);
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
});

// DELETE a product
app.delete('/api/products/:id', protect, async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid product ID format' });
        }
        const database = await connectToDatabase();
        const result = await database.collection('products').deleteOne({ _id: new ObjectId(req.params.id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Product not found to delete' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(`[API_ERROR] DELETE /api/products/${req.params.id}:`, error);
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
});


// Export the app
export default app;
