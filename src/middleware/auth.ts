import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default function auth (req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if(authorization) {
    jwt.verify(authorization, process.env.JWT_SECRET, (error, decoded) => {
      if(error) {
        return res.status(500).json('Não autenticado.');
      }
      res.locals.decoded = decoded;
      next();
      return null;
    });
  } else {
    return res.status(403).json('Não autenticado.');
  }
  return null;
}