import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import * as jwt from 'jsonwebtoken';

@Catch()
export default class CatchException implements ExceptionFilter {

  catch(exception: Error | HttpException, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response = ctx.getResponse();

    let httpError = null;
    console.log(exception);

    if (exception instanceof HttpException) {
      httpError = {
        status: exception.getStatus(), // throw new HttpError()로 던진 첫번째 매개변수 status 값
        message: exception.message, // throw new HttpError()로 던진 두번째 매개변수 message 값
      };
    } else {
      // JWT 에러를 캐치하는 부분
      if (exception instanceof jwt.JsonWebTokenError ||
        exception instanceof jwt.NotBeforeError ||
        exception instanceof jwt.TokenExpiredError) {
      httpError = {
        status: HttpStatus.UNAUTHORIZED,
        message: 'JWT_ERROR',
      };

    } else {
      httpError = {
        status: 500,
        message: 'INTERNAL_SERVER_ERROR',
      };
    }
  }
    const { status, message } = httpError;
    // 클라이언트 응답 (위 조건분기에 따른 객체의 값들)
    return response.status(status).json({
      status,
      message,
    });
  }
}