import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(userData: RegisterAuthDto, res: Response): Promise<Response<any, Record<string, any>>>;
    login(userData: LoginAuthDto, res: Response): Promise<Response<any, Record<string, any>>>;
    refreshToken(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    logout(req: Request, res: Response): Response<any, Record<string, any>>;
}
