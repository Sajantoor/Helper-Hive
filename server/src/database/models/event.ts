import { Schema, model } from 'mongoose';

const eventSchema = new Schema({
    name: { type: String, required: true },
    date: {
        type: new Schema({
            startDay: { type: Date, required: true },
            endDay: { type: Date, required: false },
            startTime: { type: Date, required: true },
            endTime: { type: Date, required: true }
        }),
        required: true,
    },
    details: {
        type: new Schema({
            description: { type: String, required: true },
            preShiftInfo: { type: String, required: true },
            location: { type: String, required: true },
            photo: { type: String, required: true },
            files: [{ type: String, required: false }],
            tags: [{ type: String, required: false }],
        }),
    },
    registration: {
        type: new Schema({
            totalSpots: { type: Number, required: true },
            registeredVolunteers: {
                type: [{ type: Schema.Types.ObjectId, ref: 'user' }],
                required: true,
                default: []
            },
            totalRegistered: { type: Number, required: true, default: 0 }
        }),
        required: true
    },
    // Reference to the organization that is hosting the event
    organization: { type: Schema.Types.ObjectId, ref: 'organization', required: true },
});

const Event = model("event", eventSchema);
export default Event;

