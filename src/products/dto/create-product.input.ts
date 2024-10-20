import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  zName: string

  @Field(() => String)
  @IsString()
  zDescription: string;

  @Field(() => Number)
  @IsNotEmpty()
  @IsNumber()
  zPrice: number;

  @Field(() => String, { nullable:true })
  @IsOptional()
  @IsString()
  zState: string;
}
