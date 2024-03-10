import { Express } from "express";
import userController from "../controllers/user.controller";
import eventController from "../controllers/event.controller";
import auth from '../middlewares/auth';

const routes = (app: Express) => {
    
    app.post('/events', auth, eventController.create);
    app.get('/events', auth,  eventController.getEvents);
    app.post('/register/events/:eventId', auth, userController.registerEvent);
    app.get('/register/events', auth, userController.getRegisteredEvents)
    app.get('/create/events', auth, userController.getCreatedEvents);
    app.get('/events/allows', auth, eventController.getDisEvents);
    
    
    // app.get('/events/:id', eventController.create);
    app.get('/testiculo', auth, eventController.testiculo);
    app.post('/users', userController.create);
    app.post('/login/', userController.login);
    

    // app.get('/users', userController.getUsers);
    // app.post('/users', validateSchema(userSchema),  userController.create);
    // app.put('/users/:id', userController.update );
    // app.delete('/users/:id', userController.delete );
    // app.get('/users/profile', auth,  userController.findById);
    // app.get('/users/:id', userController.findById);

};

export default routes;