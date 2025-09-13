import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Tag } from '../models/Tag';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';

@Module({
  controllers: [TagsController],
  providers: [TagsService],
  imports: [TypeOrmModule.forFeature([Tag]), JwtModule],
})
export class TagsModule {}
