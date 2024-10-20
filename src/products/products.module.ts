import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { CreateProductHandler } from './commands/handlers/create-product-handler';
import { GetProductHandler } from './queries/handlers/get-product.handler';
import { GetProductsHandler } from './queries/handlers/get-products.handler';
import { UpdateProductHandler } from './commands/handlers/update-product-handler';
import { DeleteProductHandler } from './commands/handlers/delete-product-handler';
import { CqrsModule } from '@nestjs/cqrs';

const CommandHandlers = [
  CreateProductHandler,
  UpdateProductHandler,
  DeleteProductHandler,
]
const QueryHandlers = [GetProductsHandler,GetProductHandler]

@Module({
  imports:[
    CqrsModule,
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema}
    ])
  ],
  providers: [ProductsResolver, ProductsService,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class ProductsModule {}
