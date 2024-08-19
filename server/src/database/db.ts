import 'dotenv/config';
import mongoose from 'mongoose';

const uri = process.env.MONGO_DB_URI || '';

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Connected to database");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1); // Exit process with failure
    }
};

const db = mongoose.connection;

db.on("error", (error) => {
    console.error("MongoDB connection error:", error);
});

export { connectDB, db, mongoose };
export default db;
