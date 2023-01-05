import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Response } from 'express';
import { RequestWithUser } from 'src/utils/interfaces/user.interface';

@Injectable()
export class RecruiterMiddleware implements NestMiddleware {
  constructor(private readonly jwt: JwtService) {}

  use(req: RequestWithUser, res: Response, next: NextFunction) {
    if (req.user.role === 'Recruiter') {
      next();
    } else {
      throw new ForbiddenException('Only Recruiter Are Allowed!');
    }
  }
}
