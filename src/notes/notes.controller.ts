import { Controller, Get, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { TokenGard } from '../auth/guards/tokenGard';

@Controller('notes')
@UseGuards(TokenGard)
export class NotesController {
  constructor(private readonly noteService: NotesService) {}
  @Get()
  findAll() {
    return this.noteService.findAll();
  }
}
