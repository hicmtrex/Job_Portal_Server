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

    // Construct the `where` clause for the Prisma query based on the provided parameters
    const where: {
      title: { contains: string };
      OR?: { [key: string]: { equals: string } }[];
    } = {
      title: { contains: search },
    };
    if (category || location || jobNature) {
      where.OR = [
        { jobNature: { equals: jobNature } },
        { category: { equals: category } },
        { location: { equals: location } },
      ].filter(Boolean);
    }

    // Use `Promise.all` to run multiple Prisma queries in parallel
    const [jobs, jobCount] = await Promise.all([
      this.prisma.job.findMany({
        skip: pageSize * (page - 1),
        take: pageSize,
        where,
      }),
      this.prisma.job.count({ where }),
    ]);

    // Fetch all jobs to determine the unique values for each field
    const allJobs = await this.prisma.job.findMany({});

    // Helper function to get the unique values for a specific field
    const getUniqueValues = (key: string) =>
      allJobs.reduce((acc, job) => {
        acc[job[key]] = true;
        return acc;
      }, {});

    // Get the unique values for each field
    const categories = Object.keys(getUniqueValues('category'));
    const locations = Object.keys(getUniqueValues('location'));
    const jobNatures = Object.keys(getUniqueValues('jobNature'));

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
