import { Request, Response, NextFunction } from 'express';
import Question from '../interfaces/questionInterface';
import { questionSchema } from '../schemas/questionSchema';
import * as questionsServices from '../services/questionsServices';

async function createQuestion(req: Request, res: Response, next: NextFunction): Promise<Response>{
    const question : Question = req.body;
    const validation = questionSchema.validate(question);

    if(validation.error) return res.sendStatus(400);

    try{
        const id:number = await questionsServices.createQuestion(question);
        return res.status(200).send({id});
    }catch(error){
        next(error);
    }
}   

export {
    createQuestion,
}