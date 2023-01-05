import { NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Response } from 'express';
import { RequestWithUser } from 'src/utils/interfaces/user.interface';
export declare class AuthMiddleware implements NestMiddleware {
    private readonly jwt;
    constructor(jwt: JwtService);
    use(req: RequestWithUser, res: Response, next: NextFunction): void;
}
