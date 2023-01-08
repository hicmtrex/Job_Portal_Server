/// <reference types="multer" />
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): string;
    findAll(): Promise<import(".prisma/client").User[]>;
    findOne(id: string): Promise<import(".prisma/client").User & {
        apply: import(".prisma/client").Apply[];
    }>;
    updateImage(req: Request, res: Response, id: string, file: Express.Multer.File): Promise<Response<any, Record<string, any>>>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import(".prisma/client").User>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
