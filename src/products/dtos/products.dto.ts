import { IsNumber, IsString, IsUrl, IsNotEmpty, IsPositive, IsArray, ArrayMinSize } from "class-validator";
import { ApiProperty, PartialType } from "@nestjs/swagger";

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly name: string;
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  readonly description: string;
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  readonly price: number;
  @IsNotEmpty()
  @IsUrl()
  @ApiProperty()
  readonly image: string;
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  readonly stock: number;
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly brandId: number;

  @IsArray()
  @ArrayMinSize(1)
  @ApiProperty()
  readonly categoriesId: number[];
  
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}