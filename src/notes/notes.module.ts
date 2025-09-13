import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { Note } from '../models/Note';

@Module({
  controllers: [NotesController],
  providers: [NotesService],
  imports: [TypeOrmModule.forFeature([Note]), JwtModule],
})
export class NotesModule {}
