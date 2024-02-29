import { HttpException } from "@nestjs/common";
export default class HttpError extends HttpException {
    statusCode: number;
    message: string;
    constructor(status: number, message: string);
}
