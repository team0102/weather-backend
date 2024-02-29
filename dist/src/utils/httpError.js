"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
class HttpError extends common_1.HttpException {
    constructor(status, message) {
        super(message, status);
        this.statusCode = 0;
        this.message = '';
        this.statusCode = status;
        this.message = message;
    }
}
exports.default = HttpError;
//# sourceMappingURL=httpError.js.map