import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../models/Tag';
import { Repository } from 'typeorm';
import { User } from '../models/User';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async findAll(user: User) {
    return this.tagRepository.find({
      where: {
        user: { id: user.id },
      },
    });
  }

  async findByName(names: string) {
    return this.tagRepository.findBy({
      name: names,
    });
  }

  async create(tag: Partial<Tag>) {
    const newTag = this.tagRepository.create(tag);
    await this.tagRepository.save(newTag);
    return newTag;
  }
}
