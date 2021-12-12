import User from "../interfaces/userInterface";
import { connection } from "../database";

async function createUser(user: User){
    const result = await connection.query(`INSERT INTO users (name, class, answers) VALUES ($1, $2, 0) RETURNING *;`,[user.name, user.class]);
    return result.rows[0].id;
}

async function createUserSession(id: number, token: string){
    await connection.query(`INSERT INTO sessions ("idUser", token) VALUES ($1, $2);`,[id, token]);
}

export{
    createUser,
    createUserSession,
}
