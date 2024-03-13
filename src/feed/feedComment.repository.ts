import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeedCommentEntity } from './../entities/feedComments.entity';

@Injectable()
export class FeedCommentRepository {
  constructor(
    @InjectRepository(FeedCommentEntity)
    private readonly feedCommentRepository: Repository<FeedCommentEntity>,
  ) {}

  async getFeedCommentById(id: number): Promise<FeedCommentEntity> {
    const result = await this.feedCommentRepository.findOne({
      relations: {
        feed: true,
        user: true,
      },
      where: { id: id },
    });
    return result;
  }

  async createFeedComment(
    userId: number,
    feedId: number,
    content: string,
  ): Promise<FeedCommentEntity> {
    const savedComment = await this.feedCommentRepository.save({
      user: { id: userId },
      content: content,
      feed: { id: feedId },
    });
    return savedComment;
  }

  async deleteFeedComment(commentId: number): Promise<void> {
    await this.feedCommentRepository.softDelete(commentId);
  }

  async updateFeedComment(commentId: number, content: string): Promise<void> {
    await this.feedCommentRepository.update(
      { id: commentId },
      { content: content },
    );
  }
}
