export class UpdateProductCommand {
    constructor(
      public readonly productId: string,
      public readonly zName?: string,
      public readonly zDescription?: string,
      public readonly zPrice?: number,
      public readonly zState?: string,
    ) {}
  }