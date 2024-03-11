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
const event_service_1 = __importDefault(require("../services/event.service"));
const user_service_1 = __importDefault(require("../services/user.service"));
class EventController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield event_service_1.default.create(req.params.id, req.body);
                return res.status(201).json(event);
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
    getEvents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const events = yield event_service_1.default.findAll(userId);
                res.json(events);
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
    getDisEvents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const events = yield event_service_1.default.findDisEvents();
                res.json(events);
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
    getFilterByDate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const events = yield event_service_1.default.findDisDateEvents(req.body.date);
                res.json(events);
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
    getFilterByPlace(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const events = yield event_service_1.default.findDisPlaceEvents(req.body.place);
                res.json(events);
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
    getFilterByType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const events = yield event_service_1.default.findDisTypeEvents(req.body.title);
                res.json(events);
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const eventId = req.params.idEvent;
                const updatedEventData = req.body;
                const eventExists = yield event_service_1.default.findById(eventId);
                if (!eventExists) {
                    return res.status(404).json({ message: "Event doesn't exist" });
                }
                const user = yield user_service_1.default.findById(req.params.id);
                if (user && eventExists.createdBy.toString() !== user._id.toString()) {
                    return res.status(403).json({ message: "Event is not owned by the user" });
                }
                const updatedEvent = yield event_service_1.default.update(eventId, updatedEventData);
                return res.json(updatedEvent);
            }
            catch (error) {
                return res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const eventExists = yield event_service_1.default.findById(req.params.idEvent);
                const user = yield user_service_1.default.findById(req.params.id);
                const idEvent = req.params.idEvent;
                if (!eventExists) {
                    return res.status(404).json({ message: "Event doesn't exist" });
                }
                if (user && eventExists.createdBy.toString() === user._id.toString()) {
                    yield event_service_1.default.delete(idEvent);
                    return res.json({ message: "Event deleted successfully" });
                }
                return res.status(403).json({ message: "Event is not owned by the user" });
            }
            catch (error) {
                return res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    testiculo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(201).json({ "id": req.params.id });
        });
    }
    getAttendees(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const eventId = req.params.eventId;
            try {
                const attendees = yield event_service_1.default.getAttendees(eventId);
                res.json(attendees);
            }
            catch (error) {
                res.status(500).json({ message: 'Error retrieving the list of event attendees' });
            }
        });
    }
}
exports.default = new EventController();
