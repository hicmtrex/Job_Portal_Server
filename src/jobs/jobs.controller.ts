import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  Query,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Response } from 'express';
import { RequestWithUser } from 'src/utils/interfaces/user.interface';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  create(
    @Body() createJobDto: CreateJobDto,
    @Req() req: RequestWithUser,
    @Res() res: Response,
  ) {
    return this.jobsService.create(createJobDto, req, res);
  }

  @Get()
  findAll() {
    return this.jobsService.findAll();
  }

  @Get('filter')
  filterJobs(
    @Query('category') category: string,
    @Query('location') location: string,
    @Query('jobNature') jobNature: string,
    @Query('page') page: number,
    @Query('search') search: string,
  ) {
    return this.jobsService.filterJobs(
      category,
      location,
      jobNature,
      page,
      search,
    );
  }

  @Get('recruiter')
  findAllRecruiterJobs(@Req() req: RequestWithUser) {
    return this.jobsService.findAllRecruiterJobs(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(id, updateJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobsService.remove(id);
  }
}
