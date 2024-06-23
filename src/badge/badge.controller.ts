import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseGuards, Req, Res, HttpStatus } from '@nestjs/common';
import { BadgeService } from './badge.service';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { HttpExceptionFilter } from 'common/exception-filter/http-exception.filter';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { request } from 'http';
import { Request, Response, response } from 'express';

@Controller('badges')
@UseFilters(HttpExceptionFilter)
export class BadgeController {
  constructor(private readonly bagdeService: BadgeService) { }

  @Post('create')
  create(@Body() createBagdeDto: CreateBadgeDto) {
    return this.bagdeService.create(createBagdeDto);
  }

  @Get('populate')
  async populateBadges() {
    return this.bagdeService.populateBadges();
  }

  @Get('random')
  @UseGuards(AuthGuard)
  async getRandomBadgeNotOwnedByUser(@Req() request: any, @Res() response: Response) {
    const result = await this.bagdeService.getRandomBadgeNotOwnedByUser(request.user.sub);
    if (result === null) {
      return response.status(HttpStatus.NOT_FOUND).send('Todos os emblemas já foram resgatados.');
    } else {
      return response.status(HttpStatus.OK).send(result);
    }
  }
}
