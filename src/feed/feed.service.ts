import { Injectable } from '@nestjs/common';
import { FeedRepository } from './feed.reposiitory';
import { CreateFeedDTO } from './dto/create-feed.dto';

@Injectable()
export class FeedService {
    constructor(
        private readonly feedRepository: FeedRepository,
    ){}

    async createFeed(feedData: CreateFeedDTO) {
        try {
         const newDate = new Date();
         return this.feedRepository.createFeed(feedData, newDate)
        }catch(error) {
            console.log(error);
        }
    }
}
