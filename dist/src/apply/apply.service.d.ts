/// <reference types="multer" />
import { Response } from 'express';
import { PrismaService } from 'prisma/prisma.service';
import { RequestWithUser } from 'src/utils/interfaces/user.interface';
import { CreateApplyDto } from './dto/create-apply.dto';
import { UpdateApplyDto } from './dto/update-apply.dto';
export declare class ApplyService {
    private prisma;
    constructor(prisma: PrismaService);
    create(req: RequestWithUser, res: Response, file: Express.Multer.File, createApplyDto: CreateApplyDto): Promise<Response<any, Record<string, any>>>;
    findAll(page: number, req: RequestWithUser, res: Response): Promise<Response<any, Record<string, any>>>;
    findUserApplies(req: RequestWithUser, res: Response, page: number): Promise<Response<any, Record<string, any>>>;
    findOne(id: string): Promise<import(".prisma/client").Apply & {
        user: import(".prisma/client").User;
        job: import(".prisma/client").Job;
    }>;
    update(id: string, updateApplyDto: UpdateApplyDto): Promise<import(".prisma/client").Apply>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
