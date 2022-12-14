import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';

import { ParseIntPipe } from "../../common/parse-int.pipe";
import { ProductService } from 'src/products/services/product.service';
import { CreateProductDto, UpdateProductDto } from 'src/products/dtos/products.dto';
// import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

import { Public } from "../../auth/decorators/public.decorator";
import { Roles } from "../../auth/decorators/roles.decorator";
import { Role } from 'src/auth/models/roles.models';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('products')
@Controller('products')
export class ProductsController {

  constructor(
    private readonly productService: ProductService
  ) {}

  @Public()
  @ApiOperation({ summary: 'List of products' })
  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    console.log();
    return this.productService.findAll();
  }
  
  @Get('filter')
  getFilter() {
    return {
      message: `yo soy un filtro`
    }
  }

  @Public()
  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne( 
    @Param('productId', ParseIntPipe) productId: number,
    // @Res() response: Response
  ) {
    return this.productService.findOne(productId)
    // response.status(200).send({  // Asi funciona con express, se recomienda usar con nestjs
    //   message: `product ${productId}` 
    // })
  }

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productService.create(payload)
  }

  @Roles(Role.ADMIN, Role.CUSTOMER)
  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateProductDto) {
    return this.productService.update(+id, payload)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productService.delete(+id);
  }

  @Delete(':id/category/:categoryId')
  deleteCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe)categoryId: number
  ) {
    return this.productService.removeCategoryByProduct(id, categoryId);
  }

  @Put(':id/category/:categoryId')
  addCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe)categoryId: number
  ) {
    return this.productService.addCategoryToProduct(id, categoryId);
  }
}
