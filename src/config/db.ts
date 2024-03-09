import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectiionString = process.env.MONGO_URL || "mongodb://localhost:27017/nodejs"

export const db = mongoose.connect(connectiionString)
                    .then(() => console.log("mongo wao"))
                        .catch((err) => console.error(err));



