import { Body, Controller, Post, HttpCode, HttpStatus, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignInDto } from './dto/user-signin.dto';
import { HttpExceptionFilter } from 'common/exception-filter/http-exception.filter';

@Controller('auth')
@UseFilters(HttpExceptionFilter)
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: UserSignInDto) {
        return this.authService.signIn(signInDto);
    }
}