import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ListItemToMarketplaceDto {
  @IsString()
  @ApiProperty({
    description:
      'The address of the token contract to be listed in the marketplace. The seller must have the token in their wallet',
  })
  tokenAddress: string;

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
