import { error } from "console";
import { Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import userService from "../services/user.service";
import { UserDocument } from "../models/user.model";

const isOrganizer = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        
        const user: UserDocument | null = await userService.findById(req.params.id);
        
        if(user?.role === "organizador") {    
            next();
        } else {
            return res.status(401).json({message: "Not authorized, the user doesn't have an organizer role."});
        }
        
    } catch (error) {
        return res.status(401).json({message: "Not authorized"})
    
    }
}

export default isOrganizer;