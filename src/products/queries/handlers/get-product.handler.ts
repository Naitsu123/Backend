import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetProductQuery } from "../impl/get-product.query";
import { NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Product } from "src/products/entities/product.entity";

@QueryHandler(GetProductQuery)
export class GetProductHandler implements IQueryHandler<GetProductQuery>{
    constructor(
        @InjectModel(Product.name) private readonly productModel: Model<Product>
    ){}

    async execute(query: GetProductQuery): Promise<Product>{
        const product = await this.productModel.findById(query.id).exec();
        if (!product) {
            throw new NotFoundException(`Product #${query.id} not found`);
          }
          return product;
        }
    }