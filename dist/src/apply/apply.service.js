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
exports.ApplyService = void 0;
const common_1 = require("@nestjs/common");
const exceptions_1 = require("@nestjs/common/exceptions");
const fs_1 = require("fs");
const prisma_service_1 = require("../../prisma/prisma.service");
let ApplyService = class ApplyService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(req, res, file, createApplyDto) {
        const job = await this.prisma.job.findUnique({
            where: { id: createApplyDto.jobId },
            include: { apply: true },
        });
        const alreadyApplied = job.apply.find((a) => a.userId.toString() === req.user.id.toString());
        if (alreadyApplied) {
            (0, fs_1.unlink)(`${process.cwd()}/uploads/resumes/${file.filename}`, (err) => {
                if (err)
                    console.log(err);
            });
            throw new exceptions_1.ForbiddenException('You Already apply on this job');
        }
        const newApply = Object.assign(Object.assign({}, createApplyDto), { userId: req.user.id, resume: `resumes/${file.filename}` });
        const apply = await this.prisma.apply.create({ data: newApply });
        if (apply) {
            return res.json(apply);
        }
        else {
            throw new exceptions_1.ForbiddenException();
        }
    }
    async findAll(page, req, res) {
        const pageSize = 10;
        const checkPage = page ? page : 1;
        const myJobs = await this.prisma.job.findMany({
            where: { userId: req.user.id },
        });
        const jobsId = myJobs.map((j) => j.id);
        const appliesCount = await this.prisma.apply.count({});
        const applies = await this.prisma.apply.findMany({
            where: {
                jobId: { in: jobsId },
            },
            skip: pageSize * (checkPage - 1),
            take: pageSize,
            include: { user: true, job: true },
        });
        if (applies) {
            return res.json({
                applies,
                page: checkPage,
                appliesCount,
                pages: Math.ceil(appliesCount / pageSize),
            });
        }
        else {
            throw new exceptions_1.NotFoundException();
        }
    }
    async findUserApplies(req, res, page) {
        const pageSize = 10;
        const appliesCount = await this.prisma.apply.count({
            where: { userId: req.user.id },
        });
        const applies = await this.prisma.apply.findMany({
            skip: pageSize * (page - 1),
            take: pageSize,
            where: { userId: req.user.id },
            include: { user: true, job: true },
        });
        if (applies) {
            return res.json({
                applies,
                page,
                appliesCount,
                pages: Math.ceil(appliesCount / pageSize),
            });
        }
        else {
            throw new exceptions_1.NotFoundException();
        }
    }
    async findOne(id) {
        const apply = await this.prisma.apply.findUnique({
            where: { id },
            include: { user: true, job: true },
        });
        if (apply) {
            return apply;
        }
        else {
            throw new exceptions_1.NotFoundException();
        }
    }
    async update(id, updateApplyDto) {
        const apply = await this.prisma.apply.update({
            where: { id },
            data: { status: updateApplyDto.status },
        });
        if (apply) {
            return apply;
        }
        else {
            throw new exceptions_1.NotFoundException();
        }
    }
    async remove(id) {
        const deletedApply = await this.prisma.apply.delete({
            where: { id },
        });
        if (deletedApply) {
            return { message: 'Apply has been deleted' };
        }
        else {
            throw new exceptions_1.ForbiddenException();
        }
    }
};
ApplyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ApplyService);
exports.ApplyService = ApplyService;
//# sourceMappingURL=apply.service.js.map