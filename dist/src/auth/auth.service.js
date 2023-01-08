"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../../prisma/prisma.service");
let AuthService = class AuthService {
    constructor(prisma, jwt) {
        this.prisma = prisma;
        this.jwt = jwt;
    }
    async register(userData, res) {
        const { firstName, lastName, email, password } = userData;
        const existUser = await this.prisma.user.findUnique({
            where: { email },
        });
        if (existUser) {
            throw new common_1.BadRequestException('email already exist');
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
        if (!token)
            throw new common_1.ForbiddenException();
        res.cookie('token', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        if (user) {
            return res.json({ token: token });
        }
        else {
            throw new common_1.ForbiddenException();
        }
    }
    async login(userData, res) {
        const { email, password } = userData;
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user)
            throw new common_1.BadRequestException('email does not exist');
        const isMatch = await this.checkPassword({
            password,
            hash: user.password,
        });
        if (!isMatch)
            throw new common_1.BadRequestException('wrong password');
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
        if (!token)
            throw new common_1.ForbiddenException();
        res.cookie('token', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.json({ token: token });
    }
    async refreshToken(req, res) {
        const { token } = req.cookies;
        if (!token)
            throw new common_1.UnauthorizedException();
        const decode = await this.jwt.verify(token, { secret: '3033r' });
        const user = await this.prisma.user.findUnique({
            where: { id: decode.id },
        });
        if (!user)
            throw new common_1.UnauthorizedException();
        const accessToken = await this.generateToken({
            user,
            secret: '3033a',
            expiresIn: '1d',
        });
        return res.json({ token: accessToken });
    }
    logout(req, res) {
        const { token } = req.cookies;
        if (!token)
            throw new common_1.UnauthorizedException();
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        });
        return res.json({ message: 'Cookie cleared' });
    }
    async hashPassword(password) {
        return await bcrypt.hash(password, 10);
    }
    async checkPassword(args) {
        return await bcrypt.compare(args.password, args.hash);
    }
    async generateToken(args) {
        const { user, secret, expiresIn } = args;
        return this.jwt.sign(user, { secret, expiresIn });
    }
    getUserData(user) {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            image: user.image,
            role: user.role,
            address: user === null || user === void 0 ? void 0 : user.address,
            phone: user === null || user === void 0 ? void 0 : user.phone,
            createdAt: user.createdAt,
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map