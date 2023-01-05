import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { GenerateToken } from './dto/interfaces';
import { Request, Response } from 'express';
import { PrismaService } from 'prisma/prisma.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { IUser } from './dto/interfaces';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async register(userData: RegisterAuthDto, res: Response) {
    const { firstName, lastName, email, password } = userData;

    const existUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existUser) {
      throw new BadRequestException('email already exist');
    }

    const hashPassword = await this.hashPassword(password);

    const user = await this.prisma.user.create({
      data: { firstName, lastName, email, password: hashPassword },
    });

    const token = await this.generateToken({
      user: this.getUserData(user),
      secret: '3033a',
      expiresIn: '2h',
    });

    const refreshToken = await this.generateToken({
      user: this.getUserData(user),
      secret: '3033r',
      expiresIn: '2d',
    });
    if (!token) throw new ForbiddenException();

    res.cookie('token', refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: true, //https,
      sameSite: 'none', //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });

    if (user) {
      return res.json({ token: token });
    } else {
      throw new ForbiddenException();
    }
  }

  async login(userData: LoginAuthDto, res: Response) {
    const { email, password } = userData;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new BadRequestException('email does not exist');

    const isMatch: boolean = await this.checkPassword({
      password,
      hash: user.password,
    });

    if (!isMatch) throw new BadRequestException('wrong password');

    const token = await this.generateToken({
      user: this.getUserData(user),
      secret: '3033a',
      expiresIn: '2h',
    });

    const refreshToken = await this.generateToken({
      user: this.getUserData(user),
      secret: '3033r',
      expiresIn: '2d',
    });

    if (!token) throw new ForbiddenException();

    res.cookie('token', refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: true, //https,
      sameSite: 'none', //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });

    return res.json({ token: token });
  }

  async refreshToken(req: Request, res: Response) {
    const { token } = req.cookies;

    if (!token) throw new UnauthorizedException();

    const decode = await this.jwt.verify(token, { secret: '3033r' });

    const user = await this.prisma.user.findUnique({
      where: { id: decode.id },
    });
    if (!user) throw new UnauthorizedException();

    const accessToken = await this.generateToken({
      user,
      secret: '3033a',
      expiresIn: '1d',
    });

    return res.json({ token: accessToken });
  }

  logout(req: Request, res: Response) {
    const { token } = req.cookies;

    if (!token) throw new UnauthorizedException();

    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    return res.json({ message: 'Cookie cleared' });
  }

  //helper

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async checkPassword(args: { password: string; hash: string }) {
    return await bcrypt.compare(args.password, args.hash);
  }

  //jwt
  async generateToken(args: GenerateToken) {
    const { user, secret, expiresIn } = args;

    return this.jwt.sign(user, { secret, expiresIn });
  }

  getUserData(user: IUser) {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      image: user.image,
      role: user.role,
      address: user?.address,
      phone: user?.phone,
      createdAt: user.createdAt,
    };
  }
}
