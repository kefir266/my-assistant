import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Optional } from '@nestjs/common';
import { Note } from './Note';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Optional()
  password?: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Note, (note) => note.user)
  notes: Note[];

  @Column()
  @Optional()
  tokens?: string;
}
