import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { CreateProductDto, UpdateProductDto } from 'src/products/dtos/products.dto';
import { Product } from 'src/products/entities/product.entity';
import { Category } from '../entities/category.entity';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
  ) {}

  findAll() {
    return this.productRepo.find({
      relations: ['brand']
    });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({
      where: {id},
      relations: ['brand', 'categories']
    });
    if (!product) throw new NotFoundException(`Product #${id} not found`);
    return product
  }

  async create(payload: CreateProductDto) {
    // const newProduct = new Product();
    // newProduct.image = payload.image;
    // newProduct.name = payload.name;
    // newProduct.description = payload.description;
    // newProduct.price = payload.price;
    // newProduct.stock = payload.stock;
    const newProduct = this.productRepo.create(payload);
    if (payload.brandId) {
      const brand = await this.brandRepo.findOneBy({id: payload.brandId});
      newProduct.brand = brand
    }
    if (payload.categoriesId) {
      // const categories = await this.categoryRepo.findByIds
      const categories = await this.categoryRepo.findBy({id: In([...payload.categoriesId])});
      newProduct.categories = categories
    }
    try {
      const product = await this.productRepo.save(newProduct);
      return product;
    } catch (error) {
      throw new BadRequestException(`${error.message || 'Unexpected Error'}'`)
    }
  }

  delete(id: number) {
    return this.productRepo.delete(id);
  }

  async update(id: number, payload: UpdateProductDto) {
    const product = await this.productRepo.findOne({ where: { id } });
    if (payload.brandId) {
      const brand = await this.brandRepo.findOneBy({id: payload.brandId});
      product.brand = brand
    }
    if (payload.categoriesId) {
      
    }
    this.productRepo.merge(product, payload);
    return this.productRepo.save(product);
  }

  async removeCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      where: {id: productId},
      relations: ['categories']
    });
    product.categories = product.categories.filter((category) => categoryId !== category.id);
    return this.productRepo.save(product)
  }

  async addCategoryToProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      where: {id: productId},
      relations: ['categories']
    });
    const category = await this.categoryRepo.findOne({
      where: {id: categoryId}
    })
    product.categories.push(category);
    return this.productRepo.save(product);
  }
}
