import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import eventRoutes from './routes/eventRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

console.log('--- Server Startup ---');
console.log('PORT:', PORT);

const rawUri = process.env.MONGO_URI || '';
if (rawUri) {
    const masked = rawUri.replace(/:([^@]+)@/, ':****@');
    console.log('Using MONGO_URI:', masked);
    if (rawUri.includes(' ')) console.log('⚠️ WARNING: MONGO_URI contains spaces!');
} else {
    console.log('❌ ERROR: MONGO_URI is missing from environment variables!');
}

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

app.get('/', (req, res) => {
  res.send('Event Management Platform API is running');
});

const MONGO_URI = rawUri || 'mongodb://127.0.0.1:27017/event-platform';

console.log('Connecting to MongoDB...');

mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 10000, // Wait 10s before failing
})
  .then(() => {
    console.log('✅ Connected to MongoDB Successfully!');
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
    // Log more details if it's a timeout
    if (error.message.includes('Server selection timed out')) {
        console.log('👉 Tip: This usually means your IP is not whitelisted in MongoDB Atlas.');
    }
    process.exit(1);
  });
