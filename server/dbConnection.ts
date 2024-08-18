import 'dotenv/config';
import mongoose from 'mongoose';

const uri = process.env.MONGO_DB_URI || '';
mongoose.connect(uri);

const db = mongoose.connection;

db.on("error", (error) => {
    console.error("Failed to connect to MongoDB" + error);
});

db.on("connected", () => {
    console.log("Connected to database");
});

export default db;