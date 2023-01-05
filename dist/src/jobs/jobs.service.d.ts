import { Response } from 'express';
import { PrismaService } from 'prisma/prisma.service';
import { RequestWithUser } from 'src/utils/interfaces/user.interface';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
export declare class JobsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createJobDto: CreateJobDto, req: RequestWithUser, res: Response): Promise<Response<any, Record<string, any>>>;
    findAll(): Promise<import(".prisma/client").Job[]>;
    filterJobs(category: string, location: string, jobNature: string, page: number, search: string): Promise<{
        jobs: any;
        categories: string[];
        locations: string[];
        jobCount: any;
        jobNatures: string[];
        page: number;
        pages: number;
    }>;
    findAllRecruiterJobs(req: RequestWithUser): Promise<(import(".prisma/client").Job & {
        apply: import(".prisma/client").Apply[];
    })[]>;
    findOne(id: string): Promise<import(".prisma/client").Job>;
    update(id: string, updateJobDto: UpdateJobDto): Promise<import(".prisma/client").Job>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
