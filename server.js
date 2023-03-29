import mongoose from 'mongoose';

const mainServer = () => {
  const DB = process.env.DATABASE.replace(
    '<USERNAME>',
    process.env.DATABASE_USERNAME
  ).replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

  mongoose.connect(DB).then(() => console.log('Mongodb Database is connected'));
};

export default mainServer;
