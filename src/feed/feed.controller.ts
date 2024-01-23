import { Body, Controller, Post } from '@nestjs/common';
import { FeedService } from './feed.service';
import { CreateFeedDTO } from './dto/create-feed.dto';

@Controller('feeds')
export class FeedController {
    constructor(private readonly feedService: FeedService) {}

    @Post()
    create(@Body() feedData: CreateFeedDTO) {
        return this.feedService.createFeed(feedData);
    }

}

