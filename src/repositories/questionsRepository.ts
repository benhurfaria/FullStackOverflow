import { connection } from "../database";
import Question from "../interfaces/questionInterface";

async function createQuestion(question: Question){
    const result = await connection.query(`INSERT INTO questions (student, class, tags, answered, "submitAt",votes, question) VALUES ($1, $2, $3, false, NOW(),0, $4) RETURNING *;`, [question.student, question.class, question.tags, question.question]);
    
    return result.rows[0].id;
}

async function getQuestion(id: number){
    const result = await connection.query(`SELECT * FROM questions WHERE id = $1`,[id]);
    if(!result) return false;
    return result.rows[0];
}


export {
    createQuestion,
    getQuestion,
}
