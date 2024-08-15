import mongoose from 'mongoose';
import "./secrets";

const databaseConfig = secrets.databaseConfig;
mongoose.connect(databaseConfig, {});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to database');
});