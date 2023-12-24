import chalk from "chalk";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    console.log(chalk.blue(`Connected to database: ${db.connection.host}`));
  } catch (error) {
    console.error(chalk.red(`Error when connecting to database: ${error}`));
  }
};
export default connectDB;
