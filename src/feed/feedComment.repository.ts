import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedEntity } from 'src/entities/feeds.entity';
import { Repository } from 'typeorm';
import { FeedCommentEntity } from 'src/entities/feedComments.entity';

@Injectable()
export class FeedCommentRepository {
  constructor(
    @InjectRepository(FeedEntity)
    private readonly feedRepository: Repository<FeedEntity>,
    @InjectRepository(FeedCommentEntity)
    private readonly feedCommentRepository: Repository<FeedCommentEntity>,
  ) {}

  async createComment(
    userId: number,
    feedId: number,
    content: string,
  ):Promise<FeedCommentEntity> {
    try {
      const savedComment = await this.feedCommentRepository.save({
        user: { id: userId },
        content: content,
        feed: { id: feedId },
      });
      console.log('createComment result : ', savedComment);
      return savedComment;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}
