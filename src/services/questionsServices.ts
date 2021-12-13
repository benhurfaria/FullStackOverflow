import Question from '../interfaces/questionInterface';
import {
  DetailsQuestion,
  AnsweredQuestion,
} from '../interfaces/detailsQuestionInterface';
import * as questionsRepository from '../repositories/questionsRepository';
import { NotFound, AlreadyAnswered } from '../errors/errors';

async function createQuestion(question: Question) {
  const id = await questionsRepository.createQuestion(question);
  return id;
}

async function getQuestionById(id: number) {
  const question = await questionsRepository.getQuestion(id);

  if (!question) throw new NotFound();

  const questionReturn: DetailsQuestion = {
    question: question.question,
    student: question.student,
    class: question.class,
    tags: question.tags,
    answered: question.answered,
    submitAt: question.submitAt,
  };

  if (question.answered) {
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
    };
    return questionAnswered;
  }
  return questionReturn;
}

async function answerQuestion(id: number, token: string, answer: string) {
  const question = await questionsRepository.getQuestion(id);

  if (!question) throw new NotFound();
  if (question.answered) throw new AlreadyAnswered();

  const idUser = await questionsRepository.getIdUser(token);

  await questionsRepository.answerQuestion(id, answer, idUser);
}

async function getUnansweredQuestion() {
  const result = await questionsRepository.getUnansweredQuestion();
  if (!result) throw new NotFound();

  return result;
}

export {
  createQuestion,
  getQuestionById,
  answerQuestion,
  getUnansweredQuestion,
};
