import { ArgumentsHost, ExceptionFilter, HttpException } from "@nestjs/common";
export default class CatchException implements ExceptionFilter {
    catch(exception: Error | HttpException, host: ArgumentsHost): any;
}
