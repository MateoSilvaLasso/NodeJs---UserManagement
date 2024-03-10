import { Request, Response } from "express";
import EventService from '../services/event.service';
import { EventDocument, EventInput } from "../models/event.model";
import bcrypt from "bcrypt";
import userService from "../services/user.service";
import { UserDocument } from "../models/user.model";

class EventController {
    
    public async create(req: Request, res: Response){
        try {
            
            const user: UserDocument | null = await userService.findById(req.params.id);

            if(user?.role === "organizador") {    
                const event: EventDocument = await EventService.create(req.params.id, req.body as EventInput);
                return res.status(201).json(event);
            } else {
                return res.status(401).json({message: "Not authorized to create events"});
            }
    
        } catch(error) {
            return res.status(500).json(error)
        }
    }
    public async getEvents(req:Request, res:Response){
        try {
            const events = await EventService.findAll();
            res.json(events);
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

    public async testiculo(req: Request, res: Response ){
        res.status(201).json({"id": req.params.id});
    }


}

export default new EventController();
