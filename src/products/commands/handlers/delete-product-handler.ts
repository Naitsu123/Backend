import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProductCommand } from '../impl/delete-product-command';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../../entities/product.entity';
import { ProductsService } from 'src/products/products.service';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler implements ICommandHandler<DeleteProductCommand> {
  constructor(private readonly productsService: ProductsService) {}

  async execute(command: DeleteProductCommand) {
    return await this.productsService.remove(command.productId);
  }
}