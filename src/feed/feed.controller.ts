import { Body, Controller, Post } from '@nestjs/common';
import { FeedService } from './feed.service';
import { CreateFeedDTO } from './dto/create-feed.dto';

@Controller('feeds')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Post()
  create(@Body() feedData: CreateFeedDTO) {
    try {
      this.feedService.createFeed(feedData);
      return { statusCode: 201, message: 'Feed created successfully' };
    } catch (error) {
      console.log(error.message);
      return { statuscode: error.code || 500, message: error.message };
    }
  }
}
