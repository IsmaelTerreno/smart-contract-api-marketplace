import { Body, Controller, Get, Post } from '@nestjs/common';
import { MarketplaceService } from './marketplace.service';

@Controller('/api/v1/marketplace')
export class MarketplaceController {
  constructor(private readonly marketplaceService: MarketplaceService) {}

  @Post('list')
  listItems(@Body() listItemDto: any) {
    // Logic for listing items via signed messages
    return this.marketplaceService.listItem(listItemDto);
  }

  @Get('items')
  getAllItems() {
    // Logic for querying all items
    return this.marketplaceService.getAllItems();
  }

  @Post('purchase')
  purchaseItem(@Body() purchaseItemDto: any) {
    // Logic for purchasing an item
    return this.marketplaceService.purchaseItem(purchaseItemDto);
  }

  @Post('withdraw')
  withdrawItem(@Body() withdrawItemDto: any) {
    // Logic for withdrawing an item
    return this.marketplaceService.withdrawItem(withdrawItemDto);
  }

  @Get('/')
  home(): string {
    return 'Welcome to the marketplace!';
  }
}
