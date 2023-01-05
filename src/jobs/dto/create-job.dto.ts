import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateJobDto {
  @IsString()
  title: string;

  @IsString()
  companyName: string;

  @IsEmail()
  email: string;

  @IsString()
  website: string;

  @IsString()
  image: string;

  @IsString()
  salary: string;

  @IsString()
  category: string;

  @IsString()
  location: string;

  @IsString()
  jobNature: string;

  @IsString()
  applicationDate: string;

  @IsString()
  description: string;

  @IsOptional()
  userId: string;

  @IsNotEmpty()
  requiredKnowledge: string[];

  @IsNotEmpty()
  experience: string[];
}
