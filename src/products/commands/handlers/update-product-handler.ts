import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProductCommand } from '../impl/update-product-command';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../../entities/product.entity';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler implements ICommandHandler<UpdateProductCommand> {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async execute(command: UpdateProductCommand): Promise<Product> {
    const { productId, ...updateData } = command;
    const cleanUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== undefined)
    );

    return await this.productModel.findByIdAndUpdate(
      productId,
      { $set: cleanUpdateData },
      { new: true }
    );
  }
}