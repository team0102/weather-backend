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
  Query,
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
import { PaginateFeedDto } from './dto/paginate-feed.dto';

@Controller('feeds')
export class FeedController {
  constructor(
    private readonly feedService: FeedService,
    private readonly tokenService: TokenService,
  ) {}

  // @Get()
  // async getFeedList(
  //   @Headers('Authorization') token: string | undefined,
  // ): Promise<FeedListResponse> {
  //   let loginUserId: number | null = null;
  //   if (token) {
  //     loginUserId = this.tokenService.audienceFromToken(token);
  //   }
  //   const feedDatas = await this.feedService.getFeedList(loginUserId);
  //   return {
  //     status: 200,
  //     message: 'Successed to get feedList',
  //     data: feedDatas,
  //   };
  // }

  @Get()
  async getFeedList(
    @Headers('Authorization') token: string | undefined,
    @Query() query: PaginateFeedDto,
  ) {
    let loginUserId: number | null = null;
    if (token) {
      loginUserId = this.tokenService.audienceFromToken(token);
    }
    const feedDatas = await this.feedService.paginateFeeds(query);
    return {
      status: 200,
      message: 'Successed to get feedList',
      data: feedDatas,
    };
  }

  @Get('/bookmark')
  async getBookmarkList(
    @Headers('Authorization') token: string,
  ): Promise<BookmarkListResponse> {
    const loginUserId = this.tokenService.audienceFromToken(token);
    const bookmarkList = await this.feedService.getBookmarkList(loginUserId);
    return {
      status: 201,
      message: 'Successed to get BookmarkList',
      data: bookmarkList,
    };
  }

  @Get('/:feedId')
  async getFeedDetails(
    @Headers('Authorization') token: string,
    @Param('feedId', ParseIntPipe) feedId: number,
  ): Promise<FeedDetailResponse> {
    const loginUserId = this.tokenService.audienceFromToken(token);
    const feedData = await this.feedService.getFeedDetails(loginUserId, feedId);
    return {
      status: 200,
      message: 'Successed to get feedDetails',
      data: feedData,
    };
  }

  @Post()
  async createFeed(
    @Headers('Authorization') token: string,
    @Body() feedData: CreateFeedDTO,
  ): Promise<ApiResponse> {
    const loginUserId = this.tokenService.audienceFromToken(token);
    await this.feedService.createFeed(loginUserId, feedData);
    return { status: 201, message: 'Feed created successfully' };
  }

  @Delete('/:feedId')
  async deleteFeed(
    @Headers('Authorization') token: string,
    @Param('feedId', ParseIntPipe) feedId: number,
  ): Promise<ApiResponse> {
    const loginUserId = this.tokenService.audienceFromToken(token);
    await this.feedService.deleteFeed(loginUserId, feedId);
    return { status: 204, message: 'Feed deledted successfully' };
  }

  @Put('/:feedId')
  async updateFeed(
    @Headers('Authorization') token: string,
    @Param('feedId') feedId: number,
    @Body() feedData: UpdateFeedDTO,
  ): Promise<ApiResponse> {
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
  }

  @Post('/:feedId/comment')
  async createFeedComment(
    @Headers('Authorization') token: string,
    @Param('feedId', ParseIntPipe) feedId: number,
    @Body('content') content: string,
  ): Promise<ApiResponse> {
    const loginUserId = this.tokenService.audienceFromToken(token);
    await this.feedService.createFeedComment(loginUserId, feedId, content);
    return { status: 201, message: 'Comment created successfully' };
  }

  @Put('/:feedId/comment/:commentId')
  async updateFeedComment(
    @Headers('Authorization') token: string,
    @Param('commentId', ParseIntPipe) commentId: number,
    @Param('feedId', ParseIntPipe) feedId: number,
    @Body('content') content: string,
  ): Promise<ApiResponse> {
    const loginUserId = this.tokenService.audienceFromToken(token);
    await this.feedService.updateFeedComment(
      loginUserId,
      feedId,
      commentId,
      content,
    );
    return { status: 201, message: 'Comment updated successfully' };
  }

  @Delete('/:feedId/comment/:commentId')
  async deleteFeedComment(
    @Headers('Authorization') token: string,
    @Param('commentId', ParseIntPipe) commentId: number,
    @Param('feedId', ParseIntPipe) feedId: number,
  ): Promise<ApiResponse> {
    const loginUserId = this.tokenService.audienceFromToken(token);
    await this.feedService.deleteFeedComment(loginUserId, feedId, commentId);
    return { status: 204, message: 'Comment deleted successfully' };
  }

  // === 좋아요 상태 변경 api ===
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

  @Post('/:feedId/bookmark')
  async createBookmark(
    @Headers('Authorization') token: string,
    @Param('feedId', ParseIntPipe) feedId: number,
  ): Promise<ApiResponse> {
    const loginUserId = this.tokenService.audienceFromToken(token);
    await this.feedService.createBookmark(loginUserId, feedId);
    return { status: 201, message: 'Bookmark created successfully' };
  }

  @Delete('/:feedId/bookmark')
  async deleteBookmark(
    @Headers('Authorization') token: string,
    @Param('feedId', ParseIntPipe) feedId: number,
  ): Promise<ApiResponse> {
    const loginUserId = this.tokenService.audienceFromToken(token);
    await this.feedService.deleteBookmark(loginUserId, feedId);
    return { status: 204, message: 'Bookmark deleted successfully' };
  }

  // === 북마크 상태 변경 api : 미사용중 ===
  @Post('/bookmark/:feedId')
  async handleBookmark(
    @Headers('Authorization') token: string,
    @Param('feedId', ParseIntPipe) feedId: number,
    @Body('isBookmarked') isBookmarked: unknown,
  ): Promise<ApiResponse> {
    if (typeof isBookmarked !== 'boolean') {
      //isBookmarked boolean이 아니거나 빈 값이라면 에러 발생
      throw new HttpError(400, 'Invalid value for isBookmarked');
    }
    const loginUserId = this.tokenService.audienceFromToken(token);
    await this.feedService.handleBookmark(loginUserId, feedId, isBookmarked);
    return { status: 201, message: 'Bookmark changed successfully' };
  }
}
