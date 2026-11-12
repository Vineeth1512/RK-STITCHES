import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!mongoUri) {
      console.error('[MongoDB Error] MONGODB_URI environment variable is missing in process.env!');
      console.error('[MongoDB Error] If deploying on Render, please add MONGODB_URI in Render Dashboard -> Environment.');
      return;
    }
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error(`[MongoDB] Connection error: ${error.message}`);
    console.error('[MongoDB] If using MongoDB Atlas, make sure 0.0.0.0/0 is added in Network Access (IP Whitelist).');
  }
};
