import {
  Controller,
  Get,
  Req,
  Res,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response, Request } from 'express';
import { diskStorage } from 'multer';
import { RequestWithUser } from 'src/utils/interfaces/user.interface';
import { ApplyService } from './apply.service';
import { CreateApplyDto } from './dto/create-apply.dto';
import { UpdateApplyDto } from './dto/update-apply.dto';
import { HelperFile } from 'src/shard/helper';

const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = '.' + file.originalname.split('.')[1];
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

const resumeFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(doc|pdf)$/)) {
    return callback(new Error('Only pfe or doc files are allowed!'), false);
  }
  callback(null, true);
};

@Controller('apply')
export class ApplyController {
  constructor(private readonly applyService: ApplyService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/resumes',
        filename: HelperFile.customFilename,
      }),
      fileFilter: resumeFileFilter,
      limits: {
        fileSize: 1024 * 1024 * 5,
      },
    }),
  )
  create(
    @Body() createApplyDto: CreateApplyDto,
    @Req() req: RequestWithUser,
    @Res() res: Response,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.applyService.create(req, res, file, createApplyDto);
  }

  @Get()
  findAll(
    @Query('page') page: number,
    @Req() req: RequestWithUser,
    @Res() res: Response,
  ) {
    return this.applyService.findAll(page, req, res);
  }

  @Get('user')
  findUserApplies(
    @Req() req: RequestWithUser,
    @Res() res: Response,
    @Query('page') page: number,
  ) {
    return this.applyService.findUserApplies(req, res, page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.applyService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApplyDto: UpdateApplyDto) {
    return this.applyService.update(id, updateApplyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applyService.remove(id);
  }
}
