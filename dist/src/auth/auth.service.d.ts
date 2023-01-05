import { JwtService } from '@nestjs/jwt';
import { GenerateToken } from './dto/interfaces';
import { Request, Response } from 'express';
import { PrismaService } from 'prisma/prisma.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { IUser } from './dto/interfaces';
export declare class AuthService {
    private prisma;
    private jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    register(userData: RegisterAuthDto, res: Response): Promise<Response<any, Record<string, any>>>;
    login(userData: LoginAuthDto, res: Response): Promise<Response<any, Record<string, any>>>;
    refreshToken(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    logout(req: Request, res: Response): Response<any, Record<string, any>>;
    hashPassword(password: string): Promise<string>;
    checkPassword(args: {
        password: string;
        hash: string;
    }): Promise<boolean>;
    generateToken(args: GenerateToken): Promise<string>;
    getUserData(user: IUser): {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        image: string;
        role: string;
        address: string;
        phone: string;
        createdAt: Date;
    };
}
