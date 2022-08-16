import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateBrandDto, UpdateBrandDto } from 'src/products/dtos/brands.dto';
import { Brand } from 'src/products/entities/brand.entity';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand) private brandRepo: Repository<Brand>
  ) {}

  findAll() {
    return this.brandRepo.find();
  }

  findOne(id: number) {
    const product = this.brandRepo.findOne({
      where: {id},
      relations: ['product']
    });
    if (!product) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return product;
  }

  create(data: CreateBrandDto) {
    const newBrand = this.brandRepo.create(data)
    return this.brandRepo.save(newBrand);
  }

  async update(id: number, changes: UpdateBrandDto) {
    const brand = await this.findOne(id);
    this.brandRepo.merge(brand, changes)
    return this.brandRepo.save(brand)
  }

  remove(id: number) {
    return this.brandRepo.delete(id);
  }
}
