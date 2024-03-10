import { Timestamp } from "mongodb";
import mongoose, { Types, Schema  } from 'mongoose';
import { UserDocument } from './user.model';
import user from './user.model';

export interface EventInput {
    title: string,
    description: string,
    date: Date,
    hour: Date,
    place: string,
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
    attendees: Array<Schema.Types.ObjectId | UserDocument>;
}

export interface EventDocument extends EventInput, mongoose.Document {
    CreatedAt : Date;
    updatedAt: Date;
    deletedAt: Date;
}

const eventSchema = new mongoose.Schema({
    title : {type: String, required: true, unique : true},
    description : {type: String, required: true},
    date: {type: Date, required:true},
    hour: {type: Date, required: true},
    place: {type: String, required:true},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User", require: false},
    attendees: Array<Schema.Types.ObjectId | UserDocument>
});

const event = mongoose.model<EventDocument>('Event', eventSchema);

export default event; 