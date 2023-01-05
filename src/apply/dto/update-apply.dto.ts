import { Status } from '@prisma/client';
import { IsString, IsEnum } from 'class-validator';

export class UpdateApplyDto {
  @IsString()
  @IsEnum(Status)
  status: Status;
}
