// note-tags.entity.ts (optional explicit join entity)
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Note } from './Note';
import { Tag } from './Tag';

@Entity('note_tags')
export class NoteTags {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Note, (note) => note.id)
  note: Note;

  @ManyToOne(() => Tag, (tag) => tag.id)
  tag: Tag;
}