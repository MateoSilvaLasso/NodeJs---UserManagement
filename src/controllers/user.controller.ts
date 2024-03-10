import { Request, Response } from "express";
import userService from '../services/user.service';
import { UserDocument, UserInput } from "../models/user.model";
import { TokenExpiredError } from "jsonwebtoken";
import bcrypt from "bcrypt";
import {EventDocument} from '../models/event.model'
    
class UserController{

    public async create(req:Request, res: Response){
        try {
            const userExists: UserDocument | null = await userService.findByEmail(req.body.email);

            req.body.password = await bcrypt.hash(req.body.password, 10);

            if(userExists){
                return res.status(400).json({message: "User already exists"});
            }
            const user: UserDocument = await userService.create(req.body as UserInput)

            return res.status(201).json(user);
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    public async getUsers(req:Request, res:Response){
        try {
            const users = await userService.findAll();
            res.json(users);
        } catch (error) {
            return res.status(500).json(error)
        }
        
    }

    public async getRegisteredEvents(req: Request, res:Response){
        try{
            const registered = await userService.findRegisteredEvents(req.params.id);
            res.json(registered as EventDocument[]);
        }catch(error) {
            return res.status(500).json(error)
        }
    }

    public async getCreatedEvents(req: Request, res:Response){
        try{
            const registered = await userService.findCreatedEvents(req.params.id);
            //console.log(req.params.id)
            res.json(registered as EventDocument[]);
        }catch(error) {
            return res.status(500).json(error)
        }
    }

    public async update(req:Request, res:Response){
        try {
            const userExists: UserDocument | null = await userService.findById(req.params.id);

            if(!userExists){
                return res.status(404).json({message: "User not found"});
            }

            if(req.body.password)
                req.body.password = await bcrypt.hash(req.body.password, 10);
            
            const updateUser = await userService.update(req.params.id, req.body)
            return res.status(200).json(updateUser);
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    public async delete(req:Request, res:Response){
        try {
            const userExists: UserDocument | null = await userService.findById(req.params.id);
            if(!userExists){
                return res.status(404).json({message: "User not found"});
            }
            const user: UserDocument | null = await userService.delete(req.params.id);
            return res.status(200).json({message: "User has been deleted", user});
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    public async findById(req: Request, res: Response){
        try {
            const user: UserDocument | null = await userService.findById(req.params.id);
            if(!user){
                return res.status(404).json({message: "User not found"});
            }
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    public async login(req: Request, res: Response){
        try {
            const userExists: UserDocument | null = await userService.findByEmail(req.body.email);
            if(!userExists){
                return res.status(401).json({message: "Not authorized"});
            }
            const isMatch: boolean = await bcrypt.compare(req.body.password, userExists.password);
            if(!isMatch){
                return res.status(401).json({message: "Not authorized"});
            }

            return res.status(200).json(await userService.generateToken(userExists));
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    
}

export default new UserController;