import { IsNotEmpty, IsEmail, Length, IsString } from 'class-validator';

export class LoginAuthDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 20, { message: 'Password has to be at between 6,20' })
  password: string;
}
