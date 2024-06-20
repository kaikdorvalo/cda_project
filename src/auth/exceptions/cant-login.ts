import { HttpException, HttpStatus } from "@nestjs/common";

export class CantLoginException extends HttpException {
    constructor() {
        super('Não foi posível realizar o login.', HttpStatus.BAD_REQUEST);
    }
}