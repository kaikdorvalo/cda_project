import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseGuards, Req } from '@nestjs/common';
import { BadgeService } from './badge.service';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { HttpExceptionFilter } from 'common/exception-filter/http-exception.filter';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { request } from 'http';
import { Request } from 'express';

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
  async getRandomBadge(@Req() request: any) {
    return this.bagdeService.getRandomBadge(request.user.sub);
  }
}
