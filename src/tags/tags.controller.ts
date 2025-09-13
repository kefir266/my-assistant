import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TokenGard } from '../auth/guards/tokenGard';
import { UserRequest } from '../common/decorators/user.decorator';
import { User } from '../models/User';
import { TagsService } from './tags.service';
import { TagCreateRequest } from './dto/tagCreateRequest';

@Controller('tags')
@UseGuards(TokenGard)
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  findAll(@UserRequest() user: User) {
    return this.tagsService.findAll(user);
  }

  @Post()
  create(@Body() body: TagCreateRequest, @UserRequest() user: User) {
    return this.tagsService.create({ ...body, user });
  }
}
