import { Request, Response } from "express";
import EventService from '../services/event.service';
import { EventDocument, EventInput } from "../models/event.model";
import bcrypt from "bcrypt";

class EventController {
    
    public async create(req: Request, res: Response){
        try {

            const user: EventDocument = await EventService.create(req.body as EventInput)

            return res.status(201).json(user);

        } catch(error) {
            return res.status(500).json(error)
        }
    }
    public async getEvents(req:Request, res:Response){
        try {
            const users = await EventService.findAll();
            res.json(users);
        } catch (error) {
            return res.status(500).json(error)
        }
        
    }
    public async update(req:Request, res:Response){
        try {
            const eventExists: EventDocument | null = await EventService.findByTitle(req.params.title);

            if(!eventExists){
                return res.status(404).json({message: "Event not found"});
            }

            if(req.body.password)
                req.body.password = await bcrypt.hash(req.body.password, 10);
            
            const updateUser = await EventService.update(req.params.title, req.body)
            return res.status(200).json(updateUser);
        } catch (error) {
            return res.status(500).json(error)
        }
    }


}

export default new EventController();
