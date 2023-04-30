import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
  Body,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';

import { CreateProductDTD } from './dto/product.dto';
import { Response } from 'express';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('/create')
  async createPost(@Res() res: Response, @Body() body: CreateProductDTD) {
    const product = await this.productService.createProduct(body);
    return res.status(HttpStatus.OK).json({
      product,
    });
  }

  @Get('/')
  async getAllProducts(@Res() res: Response) {
    const Products = await this.productService.getProducts();

    return res.status(HttpStatus.OK).json({
      Products,
    });
  }

  @Get('/:id')
  async getOneProduct(@Res() res: Response, @Param('id') id: string) {
    const Product = await this.productService.getProduct(id);

    if (!Product) throw new NotFoundException('Product not found,Check the id');

    return res.status(HttpStatus.OK).json({
      Product,
    });
  }

  @Delete('delete/:id')
  async deleteProducts(@Res() res: Response, @Query(':id') id: string) {
    const ProductDelete = this.productService.deleteProduct(id);

    if (!ProductDelete)
      throw new NotFoundException('Product not found,Check the id');

    return res.status(HttpStatus.OK).json({ ProductDelete });
  }

  @Put('/update')
  async editProduct(
    @Res() res: Response,
    @Body() ProductU: CreateProductDTD,
    @Query('ID') id: string,
  ) {
    const UpdatedProduct = await this.productService.updateProduct(
      id,
      ProductU,
    );
    if (!UpdatedProduct) throw new NotFoundException(UpdatedProduct);
    return res.status(HttpStatus.OK).json({ UpdatedProduct });
  }
}
