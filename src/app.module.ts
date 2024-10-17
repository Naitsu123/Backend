import { GraphQLParseOptions } from './../node_modules/@graphql-tools/utils/typings/Interfaces.d';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsResolver } from './products/products.resolver';
import { ProductsModule } from './products/products.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { Mongoose } from 'mongoose';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsService } from './products/products.service';

@Module({
  imports: [ProductsModule,
   GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
   }),
   MongooseModule.forRoot('mongodb://localhost/bdProductos'),
   ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService, ProductsResolver, ProductsService],
})
export class AppModule {}
