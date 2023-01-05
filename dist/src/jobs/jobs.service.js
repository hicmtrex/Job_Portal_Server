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
exports.JobsService = void 0;
const common_1 = require("@nestjs/common");
const exceptions_1 = require("@nestjs/common/exceptions");
const prisma_service_1 = require("../../prisma/prisma.service");
let JobsService = class JobsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createJobDto, req, res) {
        const jobData = Object.assign(Object.assign({}, createJobDto), { userId: req.user.id });
        const job = await this.prisma.job.create({
            data: jobData,
        });
        if (job) {
            return res.json(job);
        }
        else {
            throw new exceptions_1.ForbiddenException();
        }
    }
    async findAll() {
        const jobs = await this.prisma.job.findMany({});
        if (jobs) {
            return jobs;
        }
        else {
            throw new exceptions_1.NotFoundException();
        }
    }
    async filterJobs(category, location, jobNature, page, search) {
        const pageSize = 9;
        const allJobs = await this.prisma.job.findMany({});
        let jobs;
        let jobCount;
        if (category || location || jobNature) {
            jobCount = await this.prisma.job.count({
                where: {
                    title: { contains: search },
                    OR: [
                        { jobNature: { equals: jobNature } },
                        { category: { equals: category } },
                        { location: { equals: location } },
                    ],
                },
            });
            jobs = await this.prisma.job.findMany({
                skip: pageSize * (page - 1),
                take: pageSize,
                where: {
                    title: { contains: search },
                    OR: [
                        { jobNature: { equals: jobNature } },
                        { category: { equals: category } },
                        { location: { equals: location } },
                    ],
                },
            });
        }
        else {
            jobCount = await this.prisma.job.count({
                where: {
                    title: { contains: search },
                },
            });
            jobs = await this.prisma.job.findMany({
                skip: pageSize * (page - 1),
                take: pageSize,
                where: {
                    title: { contains: search },
                },
            });
        }
        const categories = [];
        const locations = [];
        const jobNatures = [];
        allJobs.forEach((job) => {
            if (!categories.includes(job.category))
                categories.push(job.category);
            if (!locations.includes(job.location))
                locations.push(job.location);
            if (!jobNatures.includes(job.jobNature))
                jobNatures.push(job.jobNature);
        });
        return {
            jobs,
            categories,
            locations,
            jobCount,
            jobNatures,
            page,
            pages: Math.ceil(jobCount / pageSize),
        };
    }
    async findAllRecruiterJobs(req) {
        const recruiterJobs = await this.prisma.job.findMany({
            where: { userId: req.user.id },
            include: { apply: true },
        });
        if (recruiterJobs) {
            return recruiterJobs;
        }
        else {
            throw new exceptions_1.NotFoundException();
        }
    }
    async findOne(id) {
        const job = await this.prisma.job.findUnique({ where: { id } });
        if (job) {
            return job;
        }
        else {
            throw new exceptions_1.NotFoundException();
        }
    }
    async update(id, updateJobDto) {
        const updatedJob = await this.prisma.job.update({
            where: { id },
            data: updateJobDto,
        });
        if (updatedJob) {
            return updatedJob;
        }
        else {
            throw new exceptions_1.ForbiddenException();
        }
    }
    async remove(id) {
        await this.prisma.apply.deleteMany({
            where: { jobId: id },
        });
        const deletedJob = await this.prisma.job.delete({ where: { id } });
        if (deletedJob) {
            return { message: 'Job Has been deleted' };
        }
        else {
            throw new exceptions_1.ForbiddenException();
        }
    }
};
JobsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], JobsService);
exports.JobsService = JobsService;
//# sourceMappingURL=jobs.service.js.map