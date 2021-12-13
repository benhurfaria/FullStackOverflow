import { Request, Response, NextFunction } from 'express';
import { NotFound, AlreadyAnswered } from '../errors/errors';
import Question from '../interfaces/questionInterface';
import { questionSchema, answerSchema } from '../schemas/questionSchema';
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
   
async function getQuestion(req: Request, res: Response, next: NextFunction): Promise<Response>{
    const id = Number(req.params.id);
    if(!id || id <= 0) return res.status(400).send('Não foi possivel fazer a busca');

    try{
        const question = await questionsServices.getQuestionById(id);

        return res.status(200).send(question);
    }catch(error){
        if(error instanceof NotFound) return res.status(404).send(error.message);
        next(error);
    }
}

async function answerQuestion(req: Request, res: Response, next: NextFunction): Promise<Response>{
    const id = Number(req.params.id);
    const token: string = req.headers.authorization?.replace('Bearer ', '');
    const answer: string = req.body.answer;
    const validation = answerSchema.validate(req.body);

    if(validation.error) return res.sendStatus(400);
    if(!id || id <= 0|| !token) return res.status(400).send('Não foi possivel fazer a busca');
    try{
        await questionsServices.answerQuestion(id, token, answer);

        return res.sendStatus(200);
    }catch(error){
        if(error instanceof NotFound) return res.status(404).send(error.message);
        if(error instanceof AlreadyAnswered) return res.status(400).send(error.message);
        next(error);
    }
}

async function getUnansweredQuestion(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try{
        const result = await questionsServices.getUnansweredQuestion();

        return res.send(result);
    }catch(error){
        if(error instanceof NotFound) return res.status(404).send(error.message);
        next(error);
    }
}

export {
    createQuestion,
    getQuestion,
    answerQuestion,
    getUnansweredQuestion,
}
