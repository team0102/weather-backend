import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Headers,
  Query,
  Put,
} from '@nestjs/common';
import { FeedService } from './feed.service';
import { CreateFeedDTO } from './dto/create-feed.dto';
import { TokenService } from 'src/utils/verifyToken';
import { UpdateFeedDTO } from './dto/update-feed.dto';
import { ApiResponse, Feed, FeedList } from './feed.types';

@Controller('feeds')
export class FeedController {
  constructor(
    private readonly feedService: FeedService,
    private readonly tokenService: TokenService,
  ) {}

  @Get()
  async getFeedList(
    @Headers('Authorization') token: string,
  ): Promise<FeedList> {
    try {
      const loginUserId = this.tokenService.audienceFromToken(token);
      const feedDatas = await this.feedService.getFeedList(loginUserId);
      return {
        statusCode: 200,
        message: 'Successed to get feedList',
        data: feedDatas,
      };
    } catch (error) {
      console.log(error.message);
      return { statusCode: error.code || 500, message: error.message };
    }
  }

  @Get('/:feedId')
  async getFeedDetails(
    @Headers('Authorization') token: string,
    @Param('feedId', ParseIntPipe) feedId: number,
  ):Promise<Feed> {
    try {
      const loginUserId = this.tokenService.audienceFromToken(token);
      const feedData = await this.feedService.getFeedDetails(
        loginUserId,
        feedId,
      );
      return {
        statusCode: 200,
        message: 'Successed to get feedDetails',
        data: feedData,
      };
    } catch (error) {
      console.log(error.message);
      return { statusCode: error.code || 500, message: error.message };
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
      return { statusCode: 201, message: 'Feed created successfully' };
    } catch (error) {
      console.log(error.message);
      return { statusCode: error.code || 500, message: error.message };
    }
  }

  // @Put(/:feedId)
  // async updateFeed(
  //   @Headers('Authorization') token: string,
  //   @Body() feedData: UpdateFeedDTO,
  // ) {
  //   try{
  //     const loginUserId = this.tokenService.audienceFromToken(token);
  //     await this.feedService.updateFeed(loginUserId, feedData);
  //     return { statusCode: 201, message: 'Feed created successfully' };
  //   } catch(error) {
  //     console.log(error)
  //     return { statusCode: error.code || 500, message: error.message };
  //   }
  // }

  @Post('/:feedId/comment')
  async createComment(
    @Headers('Authorization') token: string,
    @Param('feedId', ParseIntPipe) feedId: number,
    @Body() content: string,
  ): Promise<ApiResponse> {
    try {
      const loginUserId = this.tokenService.audienceFromToken(token);
      await this.feedService.createComment(loginUserId, feedId, content);
      return { statusCode: 201, message: 'Comment created successfully' };
    } catch (error) {
      console.log(error.message);
      return { statusCode: error.code || 500, message: error.message };
    }
  }
}
