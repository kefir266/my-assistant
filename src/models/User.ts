import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Optional } from '@nestjs/common';

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

  @Column()
  @Optional()
  tokens?: string;
}
