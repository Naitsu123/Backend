import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Mongoose, Types } from 'mongoose';

@Schema({collection: 'products' })
@ObjectType()
export class Product {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Prop({ required:true })
  @Field(() => String)
  zName: string

  @Prop({ required:true })
  @Field(() => String)
  zDescription : string
  
  @Prop({ type: Date, default: Date.now })
  @Field(() => Date)
  zDate: Date;

  @Prop({ required:true })
  @Field(() => Number)
  zPrice : number

  @Prop({ default:'activo' })
  @Field(() => String)
  zState: string;

  @Prop({ default:'activo' })
  @Field(() => String)
  zNose: string;
}
export const ProductSchema = SchemaFactory.createForClass(Product);