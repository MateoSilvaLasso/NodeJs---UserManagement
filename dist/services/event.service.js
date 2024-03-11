"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_model_1 = __importDefault(require("../models/event.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
class EventService {
    create(id, eventInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //console.log(id);
                eventInput.createdBy = id;
                const event = yield event_model_1.default.create(eventInput);
                const user = yield user_model_1.default.findById(id);
                if (user) {
                    user.createdEvents.push(event._id);
                    yield user.save();
                }
                else {
                    throw new Error('User not found');
                }
                return event;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findDisEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentDate = new Date();
                const events = yield event_model_1.default.find({ date: { $gte: currentDate } });
                return events;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findDisDateEvents(date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentDate = new Date();
                const events = yield event_model_1.default.find({
                    $and: [
                        { date: { $gte: currentDate } },
                        { date: date }
                    ]
                });
                return events;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findDisPlaceEvents(place) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentDate = new Date();
                const events = yield event_model_1.default.find({
                    $and: [
                        { date: { $gte: currentDate } },
                        { place: place }
                    ]
                });
                return events;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findDisTypeEvents(type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentDate = new Date();
                const events = yield event_model_1.default.find({
                    $and: [
                        { date: { $gte: currentDate } },
                        { title: type }
                    ]
                });
                return events;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findByTitle(title) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield event_model_1.default.findOne({ title: title });
                return event;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findAll(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const events = yield event_model_1.default.find();
                const filteredEvents = events.map((event) => {
                    if (event.createdBy.toString() === userId) {
                        return event;
                    }
                    else {
                        const filteredEvent = Object.assign(Object.assign({}, event.toObject()), { attendees: [] });
                        return filteredEvent;
                    }
                });
                return filteredEvents;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield event_model_1.default.findById(id);
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    update(id, userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield event_model_1.default.findOneAndUpdate({ _id: id }, userInput, {
                    returnOriginal: false
                });
                return event;
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield event_model_1.default.findByIdAndDelete({ _id: id });
                return event;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getAttendees(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield event_model_1.default.findById(eventId).populate('attendees').exec();
                if (!event) {
                    throw new Error('Event not found');
                }
                const attendees = event.attendees;
                return attendees;
            }
            catch (error) {
                throw error;
            }
        });
    }
    ;
}
exports.default = new EventService();
