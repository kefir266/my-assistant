import { Body, Controller, Get, Post, UseGuards, Param } from '@nestjs/common';
import { NotesService } from './notes.service';
import { UserRequest } from '../common/decorators/user.decorator';
import { TokenGard } from '../auth/guards/tokenGard';
import { Tag } from '../models/Tag';
import { User } from '../models/User';
import { TagsService } from '../tags/tags.service';
import { CreateNoteRequest } from './dto/createNoteRequest';

@Controller('notes')
@UseGuards(TokenGard)
export class NotesController {
  constructor(
    private readonly noteService: NotesService,
    private readonly tagService: TagsService,
  ) {}
  @Get()
  findAll(@UserRequest() user: User) {
    return this.noteService.findAll(user);
  }

  @Get(':id')
  getNote(@Param('id') id: string) {
    return this.noteService.getNote(id);
  }

  @Post()
  async create(@Body() body: CreateNoteRequest, @UserRequest() user: User) {
    let tags: Tag[] = [];
    if (body.tags) {
      tags = await this.tagService.findCreate(user, body.tags);
    }
    return this.noteService.create({ ...body, tags, user });
  }
}
