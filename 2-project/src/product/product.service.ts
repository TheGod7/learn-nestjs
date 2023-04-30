import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Product } from './interfaces/products.interface';
import { CreateProductDTD } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async getProducts(): Promise<Product[]> {
    const Products = await this.productModel.find();
    return Products;
  }

  async getProduct(ProductId: string): Promise<Product> {
    const Product = await this.productModel.findById(ProductId);
    return Product;
  }

  async createProduct(Body: CreateProductDTD): Promise<Product> {
    const NewProduct = await new this.productModel(Body);
    NewProduct.save();
    return NewProduct;
  }

  async deleteProduct(ProductID: string): Promise<Product> {
    return await this.productModel.findByIdAndDelete(ProductID);
  }

  async updateProduct(
    ProductId: string,
    Field: CreateProductDTD,
  ): Promise<Product> {
    const ProductEdit = await this.productModel.findByIdAndUpdate(
      ProductId,
      Field,
      { new: true },
    );
    return ProductEdit;
  }
}
