import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';

import { ParseIntPipe } from "../../common/parse-int.pipe";
import { ProductService } from 'src/products/services/product.service';
import { CreateProductDto, UpdateProductDto } from 'src/products/dtos/products.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {

  constructor(
    private readonly productService: ProductService
  ) {}

  @ApiOperation({ summary: 'List of products' })
  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return this.productService.findAll();
  }
  
  @Get('filter')
  getFilter() {
    return {
      message: `yo soy un filtro`
    }
  }

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

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productService.create(payload)
  }

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
