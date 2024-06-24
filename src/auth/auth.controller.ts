import { Body, Controller, Post, HttpCode, HttpStatus, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignInDto } from './dto/user-signin.dto';
import { HttpExceptionFilter } from 'common/exception-filter/http-exception.filter';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CantLoginException } from './exceptions/cant-login';

@Controller('auth')
@UseFilters(HttpExceptionFilter)
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @ApiOperation({ summary: 'Authenticate to the application' })
    @ApiResponse({ status: 400, description: 'Não foi posível realizar o login.' })
    @ApiResponse({ status: 401, description: 'Não autorizado.' })
    signIn(@Body() signInDto: UserSignInDto) {
        return this.authService.signIn(signInDto);
    }
}