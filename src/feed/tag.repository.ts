import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from 'src/entities/tags.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagRepository {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  async createTag(tag: string, newDate: Date) {
    const savedTag = await this.tagRepository.save({
      content: tag,
      createdAt: newDate,
      updatedAt: newDate,
    });
    console.log('savedTag result : ', savedTag);
    return savedTag;
  }

  async findTagByContent(tag: string) {
    const foundTag = await this.tagRepository.findOne({
      where: { content: tag },
    });
    return foundTag;
  }
}
