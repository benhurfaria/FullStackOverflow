import Question from "../interfaces/questionInterface";
import * as questionsRepository from '../repositories/questionsRepository';

async function createQuestion(question: Question){
    const id = await questionsRepository.createQuestion(question);
    return id;
} 

export {
    createQuestion,
}