/// <reference types="multer" />
import { Response } from 'express';
import { RequestWithUser } from 'src/utils/interfaces/user.interface';
import { ApplyService } from './apply.service';
import { CreateApplyDto } from './dto/create-apply.dto';
import { UpdateApplyDto } from './dto/update-apply.dto';
export declare class ApplyController {
    private readonly applyService;
    constructor(applyService: ApplyService);
    create(createApplyDto: CreateApplyDto, req: RequestWithUser, res: Response, file: Express.Multer.File): Promise<Response<any, Record<string, any>>>;
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
