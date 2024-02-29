"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFeedDTO = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_feed_dto_1 = require("./create-feed.dto");
class UpdateFeedDTO extends (0, mapped_types_1.PartialType)(create_feed_dto_1.CreateFeedDTO) {
}
exports.UpdateFeedDTO = UpdateFeedDTO;
//# sourceMappingURL=update-feed.dto.js.map