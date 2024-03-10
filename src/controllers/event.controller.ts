import { Request, Response } from "express";
import EventService from '../services/event.service';
import { EventDocument, EventInput } from "../models/event.model";
import bcrypt from "bcrypt";
import userService from "../services/user.service";
import { UserDocument } from "../models/user.model";
import { Console } from "console";

class EventController {
    
    public async create(req: Request, res: Response){
        try {
            
            const event: EventDocument = await EventService.create(req.params.id, req.body as EventInput);
            return res.status(201).json(event);
    
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


    public async getDisEvents(req: Request, res:Response){
        try{
            const events = await EventService.findDisEvents();
            res.json(events)
        }catch (error){
            return res.status(500).json(error)
        }
    }

    public async getFilterByDate(req:Request, res:Response){
        try{
            const events = await EventService.findDisDateEvents(req.body.date)
            res.json(events)
        }catch(error){
            return res.status(500).json(error)
        }
    }

    public async getFilterByPlace(req:Request, res: Response){
        try{
            const events = await EventService.findDisPlaceEvents(req.body.place);
            res.json(events)
        }catch(error){
            return res.status(500).json(error)
        }
    }

    public async getFilterByType(req:Request, res:Response){
        try{
            const events = await EventService.findDisTypeEvents(req.body.title);
            res.json(events)
        }catch(error){
            return res.status(500).json(error)
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const eventId = req.params.idEvent;
            const updatedEventData = req.body;
            const eventExists: EventDocument | null = await EventService.findById(eventId);
            if (!eventExists) {
                return res.status(404).json({ message: "Event doesn't exist" });
            }
            const user: UserDocument | null = await userService.findById(req.params.id);
            if (user && eventExists.createdBy.toString() !== user._id.toString()) {
                return res.status(403).json({ message: "Event is not owned by the user" });
            }
            const updatedEvent = await EventService.update(eventId, updatedEventData);
    
            return res.json(updatedEvent);
            
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }   
    }

    public async delete(req: Request, res: Response) {
        try {
            const eventExists: EventDocument | null = await EventService.findById(req.params.idEvent);
            const user: UserDocument | null = await userService.findById(req.params.id);
            const idEvent = req.params.idEvent;
            
            if (!eventExists) {
                return res.status(404).json({ message: "Event doesn't exist" });
            }
    
            if (user && eventExists.createdBy.toString() === user._id.toString()) {
                await EventService.delete(idEvent);
                return res.json({ message: "Event deleted successfully" });
            }
    
            return res.status(403).json({ message: "Event is not owned by the user" });
            
        } catch (error) {
            return res.status(500).json({ message: "Internal server error"});
        }   
    }

    public async testiculo(req: Request, res: Response ){
        res.status(201).json({"id": req.params.id});
    }

    public async getAttendees(req: Request, res: Response) {
        const eventId = req.params.eventId;
    
        try {
            const attendees = await EventService.getAttendees(eventId);
            res.json(attendees);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving the list of event attendees'});
        }
    }
}

export default new EventController();
