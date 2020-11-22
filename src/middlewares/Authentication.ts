import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '../share/AppError';

import { auth } from '../config/auth';

interface JwtResponse {
  iat: number;
  exp: number;
  sub: string;
}

export default function Authentication(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const bearerToken = request.headers.authorization;

  if (!bearerToken) {
    throw new AppError('This token does not exist', 401);
  }

  const [, token] = bearerToken?.split(' ');

  try {
    const { sub } = verify(token, auth.secret) as JwtResponse;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('invalid token', 401);
  }
}
