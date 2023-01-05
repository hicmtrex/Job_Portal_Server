import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Response } from 'express';
import { RequestWithUser } from 'src/utils/interfaces/user.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwt: JwtService) {}

  use(req: RequestWithUser, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (authorization && authorization.startsWith('Bearer')) {
      const token = authorization.split(' ')[1];

      if (!token) throw new UnauthorizedException();
      const decode = this.jwt.verify(token, { secret: '3033a' });

      if (!decode) throw new UnauthorizedException();

      req.user = decode;
      next();
    } else {
      throw new UnauthorizedException();
    }
  }
}
