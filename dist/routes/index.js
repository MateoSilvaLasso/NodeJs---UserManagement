"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const event_controller_1 = __importDefault(require("../controllers/event.controller"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const isOrganizer_1 = __importDefault(require("../middlewares/isOrganizer"));
const routes = (app) => {
    //Authenticated URLS
    app.post('/events', auth_1.default, isOrganizer_1.default, event_controller_1.default.create);
    app.put('/events/:idEvent', auth_1.default, isOrganizer_1.default, event_controller_1.default.update);
    app.delete('/events/:idEvent', auth_1.default, isOrganizer_1.default, event_controller_1.default.delete);
    app.get('/events', auth_1.default, event_controller_1.default.getEvents);
    app.post('/register/events/:eventId', auth_1.default, user_controller_1.default.registerEvent);
    app.get('/register/events', auth_1.default, user_controller_1.default.getRegisteredEvents);
    app.get('/create/events', auth_1.default, user_controller_1.default.getCreatedEvents);
    app.get('/events/available', auth_1.default, event_controller_1.default.getDisEvents);
    app.get('/events/available/date', auth_1.default, event_controller_1.default.getFilterByDate);
    app.get('/events/available/place', auth_1.default, event_controller_1.default.getFilterByPlace);
    app.get('/events/available/type', auth_1.default, event_controller_1.default.getFilterByType);
    app.get('/:eventId/attendees', auth_1.default, isOrganizer_1.default, event_controller_1.default.getAttendees);
    // app.get('/events/:id', eventController.create);
    // app.get('/testiculo', auth, eventController.testiculo);
    //Not authenticaded urls
    app.post('/users', user_controller_1.default.create);
    app.post('/login/', user_controller_1.default.login);
};
exports.default = routes;
