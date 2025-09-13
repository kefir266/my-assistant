import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TokenGard } from '../auth/guards/tokenGard';
import { UsersService } from './users.service';
import { CreateUserRequest } from './dto/createUserRequest';

@Controller('users')
@UseGuards(TokenGard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  createUser(@Body() body: CreateUserRequest) {
    return this.userService.createUser(body);
  }
}
