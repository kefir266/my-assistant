import { IsEmail } from 'class-validator';

export class CreateUserRequest {
  username: string;

  @IsEmail()
  email: string;

  password: string;
}
