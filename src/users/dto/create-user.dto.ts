import { IsNotEmpty, Length, IsString, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 20, { message: 'Password has to be at between 4,20' })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, 20, { message: 'Password has to be at between 4,20' })
  lastName: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @Length(8, 20, { message: 'Password has to be at between 8,20' })
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  address: string;
}
