import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { FeedService } from './feed.service';
import { CreateFeedDTO } from './dto/create-feed.dto';

@Controller('feeds')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  async getFeedList(@Query('userId') userId: number) {
  try{
    const feedDatas = await this.feedService.getFeedList(userId);
    return { statusCode: 200, message: 'Successed to get feedList', data: feedDatas}
  }catch(error) {
    console.log(error.message)
    return { statusCode: error.code || 500, message: error.message};
  }
}

  @Post()
  async createFeed(@Body() feedData: CreateFeedDTO) {
    try {
      await this.feedService.createFeed(feedData);
      return { statusCode: 201, message: 'Feed created successfully' };
    } catch (error) {
      console.log(error.message);
      return { statuscode: error.code || 500, message: error.message };
    }
  }
}
