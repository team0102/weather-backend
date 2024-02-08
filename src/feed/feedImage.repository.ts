import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FeedImageEntity } from "src/entities/feedImages.entity";
import { Repository } from "typeorm";

@Injectable()
export class FeedImageRepository {
    constructor(
        @InjectRepository(FeedImageEntity)
        private readonly feedImageRepository: Repository<FeedImageEntity>
    ){}

    async updateFeedImage(image: FeedImageEntity):Promise<void> {
        try{
            await this.feedImageRepository.save(image);
        }catch(error){
            console.log(error)
            throw new Error(error.message);
        }
      } 

}