import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";

@Catch()
export default class CatchException implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response = ctx.getResponse();

    let httpError = null;
    console.log(exception);

    if (exception instanceof HttpException) {
      httpError = {
        status: exception.getStatus(), // throw new HttpError()로 던진 첫번째 매개변수 status 값
        message: exception.message, // throw new HttpError()로 던진 두번째 매개변수 message 값
      };
    } 
    else {
      httpError = {
        status: 500,
        message: 'INTERNAL_SERVER_ERROR',
      };
    }
    const { status, message } = httpError;
    // 클라이언트 응답 (위 조건분기에 따른 객체의 값들)
    return response.status(status).json({
      status,
      message,
    });
  }
}