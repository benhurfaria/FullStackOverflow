import { v4 as uuid } from 'uuid';
import User from '../interfaces/userInterface';
import * as userRepository from '../repositories/userRepository';

async function createUser(user: User): Promise<string> {
  const id: number = await userRepository.createUser(user);

  const token: string = uuid();

  await userRepository.createUserSession(id, token);

  return token;
}

export { createUser };
