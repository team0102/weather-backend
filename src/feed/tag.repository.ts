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

  async createTag(tag: string):Promise<TagEntity> {
    try {
      const savedTag = await this.tagRepository.save({
        content: tag,
      });
      console.log('savedTag result : ', savedTag);
      return savedTag;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  async findTagByContent(tag: string):Promise<TagEntity> {
    try {
      const foundTag = await this.tagRepository.findOne({
        where: { content: tag },
      });
      return foundTag;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}
