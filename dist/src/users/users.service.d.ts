/// <reference types="multer" />
import { Response } from 'express';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): string;
    findAll(): Promise<import(".prisma/client").User[]>;
    findOne(id: string): Promise<import(".prisma/client").User & {
        apply: import(".prisma/client").Apply[];
    }>;
    updateImage(id: string, res: Response, file: Express.Multer.File): Promise<Response<any, Record<string, any>>>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import(".prisma/client").User>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
