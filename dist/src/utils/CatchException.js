"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
let CatchException = class CatchException {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let httpError = null;
        console.log(exception);
        if (exception instanceof common_1.HttpException) {
            httpError = {
                status: exception.getStatus(),
                message: exception.message,
            };
        }
        else {
            if (exception instanceof jwt.JsonWebTokenError ||
                exception instanceof jwt.NotBeforeError ||
                exception instanceof jwt.TokenExpiredError) {
                httpError = {
                    status: common_1.HttpStatus.UNAUTHORIZED,
                    message: 'JWT_ERROR',
                };
            }
            else {
                httpError = {
                    status: 500,
                    message: 'INTERNAL_SERVER_ERROR',
                };
            }
        }
        const { status, message } = httpError;
        return response.status(status).json({
            status,
            message,
        });
    }
};
CatchException = __decorate([
    (0, common_1.Catch)()
], CatchException);
exports.default = CatchException;
//# sourceMappingURL=CatchException.js.map