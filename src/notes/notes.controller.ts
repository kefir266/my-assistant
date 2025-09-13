import { Body, Controller, Get, Post, UseGuards, Param } from '@nestjs/common';
import { NotesService } from './notes.service';
import { TokenGard } from '../auth/guards/tokenGard';
import { CreateNoteRequest } from './dto/createNoteRequest';
import { Tag } from '../models/Tag';
import { UserRequest } from '../common/decorators/user.decorator';
import { User } from '../models/User';

@Controller('notes')
@UseGuards(TokenGard)
export class NotesController {
  constructor(private readonly noteService: NotesService) {}
  @Get()
  findAll(@UserRequest() user: User) {
    return this.noteService.findAll(user);
  }

  @Get(':id')
  getNote(@Param('id') id: string) {
    return this.noteService.getNote(id);
  }

  @Post()
  create(@Body() body: CreateNoteRequest, @UserRequest() user: User) {
    const tags: Tag[] = [];
    return this.noteService.create({ ...body, tags, user });
  }
}
