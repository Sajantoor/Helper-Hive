import { BSON } from 'mongodb';
import mongoose from 'mongoose';

var Schema = mongoose.Schema;
var eventSchema = new Schema({
    organizationId: {type: mongoose.Schema.Types.ObjectId, ref: 'organization', required: true},
    startdate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    spots: {type: Number, required: true},
    registeredVolunteers: {type: Number, default: 0},
    coverPhoto: { type: Buffer, required: true },
    files: {type: BSON, required: false}
})

module.exports = mongoose.model("event", eventSchema)