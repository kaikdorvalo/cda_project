import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { BadgeCategoryService } from './badge-category.service';
import { CreateBadgeCategoryDto } from './dto/create-badge-category.dto';
import { UpdateBadgeCategoryDto } from './dto/update-badge-category.dto';
import { request } from 'http';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('badge-categories')
export class BadgeCategoryController {
  constructor(private readonly badgeCategoryService: BadgeCategoryService) { }

  @Post('create')
  @UseGuards(AuthGuard)
  async create(@Body() createBadgeCategoryDto: CreateBadgeCategoryDto, @Req() request: any) {
    return await this.badgeCategoryService.create(createBadgeCategoryDto, request.user.sub);
  }


  //adicionar o guard para puxar user na hora de popular
  @Get('populate')
  @UseGuards(AuthGuard)
  async populateBadgeCategories() {
    return await this.badgeCategoryService.populateBadgeCategories();
  }
}
