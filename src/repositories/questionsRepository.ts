import { connection } from '../database';
import Question from '../interfaces/questionInterface';

async function createQuestion(question: Question) {
  const result = await connection.query(
    `INSERT INTO questions (student, class, tags, answered, "submitAt",votes, question) VALUES ($1, $2, $3, false, NOW(),0, $4) RETURNING *;`,
    [question.student, question.class, question.tags, question.question]
  );

  return result.rows[0].id;
}

async function getQuestion(id: number) {
  const result = await connection.query(
    `SELECT * FROM questions WHERE id = $1`,
    [id]
  );
  if (!result) return false;
  return result.rows[0];
}

async function getIdUser(token: string) {
  const result = await connection.query(
    `SELECT * FROM sessions WHERE token = $1;`,
    [token]
  );

  if (!result) return false;

  return result.rows[0].idUser;
}

async function getUser(id: number) {
  const result = await connection.query(`SELECT * FROM users WHERE id = $1;`, [
    id,
  ]);

  return result.rows[0].name;
}

async function answerQuestion(id: number, answer: string, answeredBy: number) {
  await connection.query(
    `UPDATE questions SET answered = true, answer = $1, "answeredAt" = NOW(), "answeredBy" = $2 WHERE id = $3;`,
    [answer, answeredBy, id]
  );
}

async function getUnansweredQuestion() {
  const result = await connection.query(
    `SELECT id, question, student, class, "submitAt" FROM questions WHERE answered = false;`
  );

  if (!result) return false;

  return result.rows;
}

export {
  createQuestion,
  getQuestion,
  getIdUser,
  answerQuestion,
  getUser,
  getUnansweredQuestion,
};
