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

  async findCreate(user: User, tags: Tag[]): Promise<Tag[]> {
    const tagsArr: Tag[] = [];
    for (const tag of tags) {
      const findTag = await this.tagRepository.findOne({
        where: {
          name: tag.name,
          user: { id: user.id },
        },
      });

      if (!findTag) {
        const newTag = this.tagRepository.create({
          ...tag,
          user,
        });
        await this.tagRepository.save(newTag);
        tagsArr.push(newTag);
      } else {
        tagsArr.push(findTag);
      }
    }

    return tagsArr;
  }
}
