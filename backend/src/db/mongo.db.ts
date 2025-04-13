import mongoose from 'mongoose';

export const startMongoDB = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DB connection string is needed');
  }

  await mongoose.connect(process.env.DATABASE_URL);

  console.info('db connected');
};
