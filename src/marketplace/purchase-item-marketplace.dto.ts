import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PurchaseItemMarketplaceDto {
  @IsString()
  @ApiProperty({
    description: 'The id of the listing to be purchased.',
  })
  listingId: string;

  @IsNumber()
  @ApiProperty({
    description: 'The amount of tokens to be listed in the marketplace',
  })
  amount: number;

  @IsNumber()
  @ApiProperty({
    description: 'The price of the token in the marketplace',
  })
  price: number;
}
