import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import path from 'path';

@Catch(Error)
export class ErrorExceptionFilter implements ExceptionFilter {
    catch(error: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        response
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({
                message: 'Erro interno'
            });

        console.log(error);
    }
}