import { Schema, Types, model } from 'mongoose';
import { LocationData } from '../../../../common/types/eventResponse';

export interface IEvents {
    name: string;
    date: {
        startDay: Date;
        endDay?: Date;
        startTime: Date;
        endTime: Date;
    };
    details: {
        description: string;
        preShiftInfo: string;
        location: LocationData;
        photo: string;
        files?: string[];
        tags?: string[];
        createdAt: Date;
    };
    registration: {
        totalSpots: number;
        registeredVolunteers: string[];
        totalRegistered: number;
    };
    organization: Types.ObjectId;
}

const eventsSchema = new Schema<IEvents>({
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
            location: new Schema({
                formattedAddress: { type: String, required: true },
                geoLocation: new Schema({
                    lat: { type: Number, required: true },
                    lng: { type: Number, required: true }
                }),
                addressComponents: [{
                    long_name: { type: String, required: true },
                    short_name: { type: String, required: true },
                    types: [{ type: String, required: true }]
                }],
                name: { type: String, required: true }
            }),
            photo: { type: String, required: true },
            files: [{
                url: { type: String, required: false },
                name: { type: String, required: false }
            }],
            tags: [{ type: String, required: false }],
            createdAt: { type: Date, required: true, default: Date.now },
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

const Events = model("event", eventsSchema);
export default Events;

