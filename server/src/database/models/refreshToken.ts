import { Schema, model } from 'mongoose';

const expiryTime = 1000 * 60 * 60 * 24 * 7; // 7 days
const refreshTokenSchema = new Schema({
    token: { type: String, required: true },
    expireAt: { type: Date, expires: expiryTime }
});

const RefreshToken = model("refreshToken", refreshTokenSchema);
export default RefreshToken;