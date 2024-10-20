import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsResolver } from './products/products.resolver';
import { ProductsModule } from './products/products.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import mongoose from 'mongoose'; 
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsService } from './products/products.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb+srv://rafaelargotez:Tresdin123@cluster0.jav7i.mongodb.net/bdProductos?retryWrites=true&w=majority&appName=Cluster0',
        connectionFactory: (connection) => {
          connection.on('connected', () => {
            console.log(
              'MongoDB conectado a:',
              connection.host,
              connection.name,
            );
          });
          connection.on('error', (error) => {
            console.error('Error de MongoDB:', error);
          });
          return connection;
        },
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    ProductsModule,
  ],
})
export class AppModule {}
