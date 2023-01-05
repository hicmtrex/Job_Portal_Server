import { IsString } from 'class-validator';

export class CreateApplyDto {
  @IsString()
  letter: string;

  @IsString()
  jobId: string;
}
