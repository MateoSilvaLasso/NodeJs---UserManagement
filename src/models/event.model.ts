import { Timestamp } from "mongodb";
import mongoose from "mongoose";

export interface eventInput {
    title: string,
    description: string,
    date: Date,
    hour: Date,
    place: string
}

export interface eventDocument extends eventInput, mongoose.Document {
    CreatedAt : Date;
    updatedAt: Date;
    deletedAt: Date;
}

const eventSchema = new mongoose.Schema({
    title : {type: String, required: true},
    description : {type: String, required: true},
    date: {type: Date, required:true},
    hour: {type: Date, required: true},
    place: {type: String, required:true}

});

const event = mongoose.model<eventDocument>('Event', eventSchema);

export default event; 