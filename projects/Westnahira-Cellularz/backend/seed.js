require('dotenv').config();
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const sampleData = require('./sample-data.json');

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error('ERROR: The MONGO_URI environment variable is not set.');
  console.log('Please create a .env file in the backend folder with your MongoDB connection string.');
  process.exit(1);
}

async function seedDatabase() {
  const client = new MongoClient(mongoUri);
  try {
    await client.connect();
    const db = client.db('westnahiraDB');
    console.log('✅ Connected to MongoDB...');

    const collections = {
      products: sampleData.products,
      categories: sampleData.categories,
      reviews: sampleData.reviews,
      brands: sampleData.brands,
      megaMenuCategories: sampleData.megaMenuCategories,
      users: sampleData.users
    };
    
    for (const [colName, data] of Object.entries(collections)) {
        const collection = db.collection(colName);
        console.log(`- Dropping collection: ${colName}...`);
        try {
          await collection.drop();
          console.log(`  - Collection ${colName} dropped.`);
        } catch (err) {
            if (err.codeName === 'NamespaceNotFound') {
                 console.log(`  - Collection ${colName} did not exist, skipping drop.`);
            } else {
                throw err;
            }
        }
        
        let dataToInsert = data;
        // Hash passwords for users
        if (colName === 'users' && Array.isArray(data)) {
            console.log(`- Hashing passwords for ${data.length} users...`);
            dataToInsert = await Promise.all(data.map(async (user) => {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(user.password, salt);
                return { ...user, password: hashedPassword };
            }));
             console.log('  - Passwords hashed.');
        }

        if (dataToInsert && dataToInsert.length > 0) {
            console.log(`+ Seeding ${dataToInsert.length} documents into ${colName}...`);
            await collection.insertMany(dataToInsert);
            console.log(`  + Seeded ${dataToInsert.length} documents.`);
        } else {
             console.log(`- No data to seed for ${colName}.`);
        }
    }

    console.log('\n✅ Database seeded successfully!');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await client.close();
    console.log('...Connection closed.');
  }
}

seedDatabase();
