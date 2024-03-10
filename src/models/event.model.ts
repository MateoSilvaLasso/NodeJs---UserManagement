import { Timestamp } from "mongodb";
import mongoose from "mongoose";

export interface EventInput {
    title: string,
    description: string,
    date: Date,
    hour: Date,
    place: string
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
    place: {type: String, required:true}

});

const event = mongoose.model<EventDocument>('Event', eventSchema);

export default event; 