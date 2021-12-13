import { Request, Response, Errback, NextFunction } from 'express';

function serverError(
  error: Errback,
  req: Request,
  res: Response,
  next: NextFunction
) {
  return res.status(500).send('Servidor offline');
}

export default serverError;
