import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateBrandDto, UpdateBrandDto } from 'src/products/dtos/brands.dto';
import { BrandsService } from '../services/brands.service';

@ApiTags('brands')
@Controller('brands')
export class BrandsController {

  constructor(
    private readonly brandsService: BrandsService
  ) {}

  @Get()
  findAll() {
    return this.brandsService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.brandsService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateBrandDto) {
    return this.brandsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBrandDto,
  ) {
    return this.brandsService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.brandsService.remove(+id);
  }

}
