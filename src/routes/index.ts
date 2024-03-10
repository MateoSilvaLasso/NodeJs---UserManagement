import { Express } from "express";
import userController from "../controllers/user.controller";
import eventController from "../controllers/event.controller";

const routes = (app: Express) => {

    app.post('/users', eventController.create);
    app.post('/login/', userController.login);


    // app.get('/users', userController.getUsers);
    // app.post('/users', validateSchema(userSchema),  userController.create);
    // app.put('/users/:id', userController.update );
    // app.delete('/users/:id', userController.delete );
    // app.get('/users/profile', auth,  userController.findById);
    // app.get('/users/:id', userController.findById);

};

export default routes;