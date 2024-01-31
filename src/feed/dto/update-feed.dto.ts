import { PartialType } from "@nestjs/mapped-types"; //mapped-types -> 타입을 변환시키고 사용할 수 있게 하는 패키지
import { CreateFeedDTO } from "./create-feed.dto";

export class UpdateFeedDTO extends PartialType(CreateFeedDTO) {

}