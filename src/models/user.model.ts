import mongoose, { Types } from 'mongoose';
import event from "./event.model";
import { EventDocument } from './event.model';

export interface UserInput {
    name : string;
    email: string;
    password: string; 
    role: string;
    registeredEvents: Types.Array<EventDocument['_id']>; 
    createdEvents: Types.Array<EventDocument['_id']>; 
}

export interface UserDocument extends UserInput, mongoose.Document {
    CreatedAt : Date;
    updatedAt: Date;
    deletedAt: Date;
    
}

const userSchema = new mongoose.Schema({
    name : {type: String, required: true},
    email: {type: String, required: true, index: true, unique : true},
    password: {type: String, required: true},
    role: {type: String, required:true},
    registeredEvents : [{type:mongoose.Schema.Types.ObjectId, ref:"Event"}],
    createdEvents : [{type:mongoose.Schema.Types.ObjectId, ref:"Event"}]
}, {timestamps:true, collection: 'users'});

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;    