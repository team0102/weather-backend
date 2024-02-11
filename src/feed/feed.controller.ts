import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Headers,
  Put,
  Delete,
} from '@nestjs/common';
import { FeedService } from './feed.service';
import { CreateFeedDTO } from './dto/create-feed.dto';
import { TokenService } from 'src/utils/verifyToken';
import { UpdateFeedDTO } from './dto/update-feed.dto';
import {
  ApiResponse,
  BookmarkListResponse,
  FeedDetailResponse,
  FeedListResponse,
} from './feed.types';
import HttpError from 'src/utils/httpError';

@Controller('feeds')
export class FeedController {
  constructor(
    private readonly feedService: FeedService,
    private readonly tokenService: TokenService,
  ) {}

  @Get()
  async getFeedList(
    @Headers('Authorization') token: string | undefined,
  ): Promise<FeedListResponse> {
    try {
      let loginUserId: number | null = null;
      if (token) {
        loginUserId = this.tokenService.audienceFromToken(token);
      }
      const feedDatas = await this.feedService.getFeedList(loginUserId);
      return {
        status: 200,
        message: 'Successed to get feedList',
        data: feedDatas,
      };
    } catch (error) {
      console.log(error);
      return { status: error.code || 500, message: error.message };
    }
  }

  @Get('/bookmark')
  async getBookmarkList(
    @Headers('Authorization') token: string,
  ): Promise<BookmarkListResponse> {
    try {
      const loginUserId = this.tokenService.audienceFromToken(token);
      const bookmarkList = await this.feedService.getBookmarkList(loginUserId);
      return {
        status: 201,
        message: 'Successed to get BookmarkList',
        data: bookmarkList,
      };
    } catch (error) {
      console.log(error);
      return { status: error.code || 500, message: error.message };
    }
  }

  @Get('/:feedId')
  async getFeedDetails(
    @Headers('Authorization') token: string,
    @Param('feedId', ParseIntPipe) feedId: number,
  ): Promise<FeedDetailResponse> {
    try {
      const loginUserId = this.tokenService.audienceFromToken(token);
      const feedData = await this.feedService.getFeedDetails(
        loginUserId,
        feedId,
      );
      return {
        status: 200,
        message: 'Successed to get feedDetails',
        data: feedData,
      };
    } catch (error) {
      console.log(error);
      return { status: error.code || 500, message: error.message };
    }
  }

  @Post()
  async createFeed(
    @Headers('Authorization') token: string,
    @Body() feedData: CreateFeedDTO,
  ): Promise<ApiResponse> {
    try {
      const loginUserId = this.tokenService.audienceFromToken(token);
      await this.feedService.createFeed(loginUserId, feedData);
      return { status: 201, message: 'Feed created successfully' };
    } catch (error) {
      console.log(error);
      return { status: error.code || 500, message: error.message };
    }
  }

  @Delete('/:feedId')
  async deleteFeed(
    @Headers('Authorization') token: string,
    @Param('feedId', ParseIntPipe) feedId: number,
  ): Promise<ApiResponse> {
    try {
      const loginUserId = this.tokenService.audienceFromToken(token);
      await this.feedService.deleteFeed(loginUserId, feedId);
      return { status: 200, message: 'Feed deledted successfully' };
    } catch (error) {
      console.log(error);
      return { status: error.code || 500, message: error.message };
    }
  }

  @Put('/:feedId')
  async updateFeed(
    @Headers('Authorization') token: string,
    @Param('feedId') feedId: number,
    @Body() feedData: UpdateFeedDTO,
  ): Promise<ApiResponse> {
    try {
      const loginUserId = this.tokenService.audienceFromToken(token);
      const updatedFeed = await this.feedService.updateFeed(
        loginUserId,
        feedId,
        feedData,
      );
      return {
        status: 201,
        message: 'Feed updated successfully',
      };
    } catch (error) {
      console.log(error);
      return { status: error.code || 500, message: error.message };
    }
  }

  @Post('/:feedId/comment')
  async createComment(
    @Headers('Authorization') token: string,
    @Param('feedId', ParseIntPipe) feedId: number,
    @Body('content') content: string,
  ): Promise<ApiResponse> {
    try {
      const loginUserId = this.tokenService.audienceFromToken(token);
      await this.feedService.createComment(loginUserId, feedId, content);
      return { status: 201, message: 'Comment created successfully' };
    } catch (error) {
      console.log(error);
      return { status: error.code || 500, message: error.message };
    }
  }

  @Post('/:feedId/bookmark')
  async createBookmark(
    @Headers('Authorization') token: string,
    @Param('feedId', ParseIntPipe) feedId: number,
  ): Promise<ApiResponse> {
    try {
      const loginUserId = this.tokenService.audienceFromToken(token);
      await this.feedService.createBookmark(loginUserId, feedId);
      return { status: 201, message: 'Bookmark created successfully' };
    } catch (error) {
      console.log(error);
      return { status: error.code || 500, message: error.message };
    }
  }

  @Post('/:feedId/like')
  async handleFeedLike(
    @Headers('Authorization') token: string,
    @Param('feedId', ParseIntPipe) feedId: number,
    @Body('isLiked') isLiked: unknown,
  ): Promise<ApiResponse> {
    if (typeof isLiked !== 'boolean') {
      //isLiked가 boolean이 아니거나 빈 값이라면 에러 발생
      throw new HttpError(400, 'Invalid value for isLiked');
    }
    const loginUserId = this.tokenService.audienceFromToken(token);
    await this.feedService.handleFeedLike(isLiked, loginUserId, feedId);
    return { status: 201, message: 'FeedLike changed successfully' };
  }
}
