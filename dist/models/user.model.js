"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    registeredEvents: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Event" }],
    createdEvents: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Event" }]
}, { timestamps: true, collection: 'users' });
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
