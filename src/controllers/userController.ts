import { Request, Response, NextFunction } from 'express';
import User from '../interfaces/userInterface';
import { userSchema } from '../schemas/userSchema';
import * as userService from '../services/userService';

async function createUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const user: User = req.body;
    const validation = userSchema.validate(user);

    if(validation.error){
        return res.sendStatus(400);
    }
 
    try{
        const token = await userService.createUser(user);
        return res.status(200).send({ token });
    } catch(error: any){
        next(error);
    }
    
}

export{
    createUser,
}