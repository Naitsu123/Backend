import { CreateProductInput } from "src/products/dto/create-product.input";

export class CreateProductCommand{
    constructor(public readonly createProductInput: CreateProductInput) {}
}