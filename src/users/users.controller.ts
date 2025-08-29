import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TokenGard } from '../auth/guards/tokenGard';
import { User } from '../models/User';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(TokenGard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  createUser(@Body() body: Partial<User>) {
    return this.userService.createUser(body);
  }
}
