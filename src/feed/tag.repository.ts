import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from './../entities/tags.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagRepository {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  async createTag(tag: string): Promise<TagEntity> {
    const savedTag = await this.tagRepository.save({
      content: tag,
    });
    return savedTag;
  }

  async findTagByContent(tag: string): Promise<TagEntity> {
    const foundTag = await this.tagRepository.findOne({
      where: { content: tag },
    });
    return foundTag;
  }
}
