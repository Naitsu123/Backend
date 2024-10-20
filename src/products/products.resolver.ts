import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { CreateProductCommand } from './commands/impl/create-product-command';
import { UpdateProductCommand } from './commands/impl/update-product-command';
import { DeleteProductCommand } from './commands/impl/delete-product-command';
import { GetProductsQuery } from './queries/impl/get-products.query';
import { GetProductQuery } from './queries/impl/get-product.query';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.commandBus.execute(
      new CreateProductCommand(createProductInput),
    );
  }

  @Query(() => [Product], { name: 'products' })
  findAll() {
    return this.queryBus.execute(new GetProductsQuery());
  }

  @Query(() => Product, { name: 'product' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.queryBus.execute(new GetProductQuery(id));
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    const { _id, ...updateData } = updateProductInput;
    return this.commandBus.execute(
      new UpdateProductCommand(
        _id,
        updateData.zName,
        updateData.zDescription,
        updateData.zPrice,
        updateData.zState,
      ),
    );
  }

  @Mutation(() => Product, { nullable: true })
  async removeProduct(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Product | null> {
    const deletedProduct = await this.commandBus.execute(
      new DeleteProductCommand(id),
    );
    return deletedProduct; 
  }
}
