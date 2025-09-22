import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from '../models/Note';
import { User } from '../models/User';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}

  findAll(user: User) {
    return this.noteRepository.find({
      where: {
        user: { id: user.id },
      },
      relations: ['tags'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  getNote(id: string) {
    return this.noteRepository.findOne({
      where: { id },
      relations: ['tags'],
    });
  }

  async create(note: Partial<Note>): Promise<Note> {
    const newNote = this.noteRepository.create(note);
    return this.noteRepository.save(newNote);
  }
}
