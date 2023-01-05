import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Response } from 'express';
import { RequestWithUser } from 'src/utils/interfaces/user.interface';
export declare class JobsController {
    private readonly jobsService;
    constructor(jobsService: JobsService);
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
