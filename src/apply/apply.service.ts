import { Injectable } from '@nestjs/common';
import {
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { Response } from 'express';
import { unlink } from 'fs';
import { PrismaService } from 'prisma/prisma.service';
import { RequestWithUser } from 'src/utils/interfaces/user.interface';
import { CreateApplyDto } from './dto/create-apply.dto';
import { UpdateApplyDto } from './dto/update-apply.dto';

@Injectable()
export class ApplyService {
  constructor(private prisma: PrismaService) {}

  async create(
    req: RequestWithUser,
    res: Response,
    file: Express.Multer.File,
    createApplyDto: CreateApplyDto,
  ) {
    const job = await this.prisma.job.findUnique({
      where: { id: createApplyDto.jobId },
      include: { apply: true },
    });

    const alreadyApplied = job.apply.find(
      (a) => a.userId.toString() === req.user.id.toString(),
    );

    if (alreadyApplied) {
      unlink(`${process.cwd()}/uploads/resumes/${file.filename}`, (err) => {
        if (err) console.log(err);
      });
      throw new ForbiddenException('You Already apply on this job');
    }

    const newApply = {
      ...createApplyDto,
      userId: req.user.id,
      resume: `resumes/${file.filename}`,
    };

    const apply = await this.prisma.apply.create({ data: newApply });

    if (apply) {
      return res.json(apply);
    } else {
      throw new ForbiddenException();
    }
  }

  async findAll(page: number, req: RequestWithUser, res: Response) {
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
    } else {
      throw new NotFoundException();
    }
  }

  async findUserApplies(req: RequestWithUser, res: Response, page: number) {
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
    } else {
      throw new NotFoundException();
    }
  }

  async findOne(id: string) {
    const apply = await this.prisma.apply.findUnique({
      where: { id },
      include: { user: true, job: true },
    });
    if (apply) {
      return apply;
    } else {
      throw new NotFoundException();
    }
  }

  async update(id: string, updateApplyDto: UpdateApplyDto) {
    const apply = await this.prisma.apply.update({
      where: { id },
      data: { status: updateApplyDto.status },
    });

    if (apply) {
      return apply;
    } else {
      throw new NotFoundException();
    }
  }

  async remove(id: string) {
    const deletedApply = await this.prisma.apply.delete({
      where: { id },
    });
    if (deletedApply) {
      return { message: 'Apply has been deleted' };
    } else {
      throw new ForbiddenException();
    }
  }
}
