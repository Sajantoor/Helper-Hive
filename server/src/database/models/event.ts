import { BSON } from 'mongodb';
import { Schema, model } from 'mongoose';

const eventSchema = new Schema({
    organizationId: { type: Schema.Types.ObjectId, ref: 'organization', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    spots: { type: Number, required: true },
    registeredVolunteers: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    coverPhoto: { type: Buffer, required: true }, // TODO: Change this to use a string instead and use Amazon S3
    files: [{ type: Buffer, required: false }] // TODO: Change this to use a string instead and use Amazon S3
});

const Event = model("event", eventSchema);
export default Event;

