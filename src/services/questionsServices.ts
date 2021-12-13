import Question from "../interfaces/questionInterface";
import {DetailsQuestion, AnsweredQuestion} from "../interfaces/detailsQuestionInterface";
import * as questionsRepository from '../repositories/questionsRepository';
import { NotFound } from '../errors/errors';

async function createQuestion(question: Question){
    const id = await questionsRepository.createQuestion(question);
    return id;
} 

async function getQuestionById(id: number){
    const question = await questionsRepository.getQuestion(id);

    if(!question) throw new NotFound();

    const questionReturn: DetailsQuestion = {
        question: question.question,
        student: question.student,
        class: question.class,
        tags: question.tags,
        answered: question.answered,
        submitAt: question.submitAt,
    }

    if(question.answered) {
        const questionAnswered: AnsweredQuestion = {
            question: question.question,
            student: question.student,
            class: question.class,
            tags: question.tags,
            answered: question.answered,
            submitAt: question.submitAt,
            answeredAt: question.answeredAt,
            answer: question.answer,
            answeredBy: question.answeredBy,
        }
        return questionAnswered;
    }
    return questionReturn;
}

export {
    createQuestion,
    getQuestionById,
}
