import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Response } from 'express';
import { RequestWithUser } from 'src/utils/interfaces/user.interface';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  constructor(private readonly jwt: JwtService) {}

  use(req: RequestWithUser, res: Response, next: NextFunction) {
    if (req.user.role === 'Admin') {
      next();
    } else {
      throw new ForbiddenException('Only Admin Are Allowed!');
    }
  }
}
