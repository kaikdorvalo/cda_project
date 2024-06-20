import { Inject, Injectable, NotFoundException, UnauthorizedException, UseFilters } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserSignInDto } from './dto/user-signin.dto';
import * as bcrypt from 'bcrypt';
import { HttpExceptionFilter } from 'common/exception-filter/http-exception.filter';
import { CantLoginException } from './exceptions/cant-login';

@Injectable()
@UseFilters(HttpExceptionFilter)
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) { }

    async signIn(userSignIn: UserSignInDto): Promise<{ access_token: string }> {
        const user = await this.usersService.findOneByEmail(userSignIn.email);
        if (user === null) {
            throw new CantLoginException();
        }
        const compare = await bcrypt.compare(userSignIn.password, user?.password);
        console.log(compare)
        if (!compare) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, username: user.name };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}