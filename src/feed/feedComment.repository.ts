import { Injectable } from '@nestjs/common';
import { CreateCommentDTO } from './dto/create-comment.dto';
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
    feedId: number,
    commentData: CreateCommentDTO,
    newDate: Date,
  ) {
    try {
      const { userId, content } = commentData;
      const savedComment = await this.feedCommentRepository.save({
        user: { id: userId },
        content: content,
        createdAt: newDate,
        updatedAt: newDate,
        feed: { id: feedId },
      });
      console.log('createComment result : ', savedComment);
      return savedComment;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }
}
