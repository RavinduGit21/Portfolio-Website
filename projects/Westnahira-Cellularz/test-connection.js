// Simple MongoDB connection test
import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI || 'your-mongodb-connection-string-here';

async function testConnection() {
  try {
    console.log('Testing MongoDB connection...');
    const client = new MongoClient(uri);
    await client.connect();
    console.log('✅ Successfully connected to MongoDB!');
    
    const db = client.db('westnahira-db');
    const collections = await db.listCollections().toArray();
    console.log('📁 Available collections:', collections.map(c => c.name));
    
    // Test products collection
    const products = await db.collection('products').find({}).limit(1).toArray();
    console.log('📦 Products count:', products.length);
    
    await client.close();
    console.log('✅ Connection test completed successfully!');
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  }
}

testConnection();
