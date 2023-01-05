import { Injectable } from '@nestjs/common';
import {
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { Response } from 'express';
import { PrismaService } from 'prisma/prisma.service';
import { RequestWithUser } from 'src/utils/interfaces/user.interface';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}
  async create(
    createJobDto: CreateJobDto,
    req: RequestWithUser,
    res: Response,
  ) {
    const jobData = { ...createJobDto, userId: req.user.id };

    const job = await this.prisma.job.create({
      data: jobData,
    });

    if (job) {
      return res.json(job);
    } else {
      throw new ForbiddenException();
    }
  }

  async findAll() {
    const jobs = await this.prisma.job.findMany({});

    if (jobs) {
      return jobs;
    } else {
      throw new NotFoundException();
    }
  }

  async filterJobs(
    category: string,
    location: string,
    jobNature: string,
    page: number,
    search: string,
  ) {
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
    } else {
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

    const categories: string[] = [];
    const locations: string[] = [];
    const jobNatures: string[] = [];

    allJobs.forEach((job) => {
      if (!categories.includes(job.category)) categories.push(job.category);
      if (!locations.includes(job.location)) locations.push(job.location);
      if (!jobNatures.includes(job.jobNature)) jobNatures.push(job.jobNature);
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
  async findAllRecruiterJobs(req: RequestWithUser) {
    const recruiterJobs = await this.prisma.job.findMany({
      where: { userId: req.user.id },
      include: { apply: true },
    });

    if (recruiterJobs) {
      return recruiterJobs;
    } else {
      throw new NotFoundException();
    }
  }

  async findOne(id: string) {
    const job = await this.prisma.job.findUnique({ where: { id } });

    if (job) {
      return job;
    } else {
      throw new NotFoundException();
    }
  }

  async update(id: string, updateJobDto: UpdateJobDto) {
    const updatedJob = await this.prisma.job.update({
      where: { id },
      data: updateJobDto,
    });

    if (updatedJob) {
      return updatedJob;
    } else {
      throw new ForbiddenException();
    }
  }

  async remove(id: string) {
    await this.prisma.apply.deleteMany({
      where: { jobId: id },
    });

    const deletedJob = await this.prisma.job.delete({ where: { id } });

    if (deletedJob) {
      return { message: 'Job Has been deleted' };
    } else {
      throw new ForbiddenException();
    }
  }
}
