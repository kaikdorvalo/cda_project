import { HttpException, HttpStatus } from "@nestjs/common";

export class BadgeCategoryExistsException extends HttpException {
    constructor() {
        super('A categoria de emblema já existe.', HttpStatus.BAD_REQUEST);
    }
}