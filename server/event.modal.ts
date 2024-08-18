import { BSON } from 'mongodb';
import { Schema, model } from 'mongoose';

const eventSchema = new Schema({
    id: { type: String, required: true },
    organizationId: { type: Schema.Types.ObjectId, ref: 'organization', required: true },
    startdate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    spots: { type: Number, required: true },
    // registeredVolunteers: { type: Number, default: 0 },
    coverPhoto: { type: Buffer, required: true },
    files: { type: BSON, required: false }
});

export default model("event", eventSchema);

