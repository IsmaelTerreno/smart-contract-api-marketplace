import { Body, Controller, Get, Post } from '@nestjs/common';
import { MarketplaceService } from './marketplace.service';
import { ListItemToMarketplaceDto } from './list-item-to-marketplace.dto';
import { PurchaseItemMarketplaceDto } from './purchase-item-marketplace.dto';

@Controller('/api/v1/marketplace')
export class MarketplaceController {
  constructor(private readonly marketplaceService: MarketplaceService) {}

  @Post('list')
  async listItems(@Body() listItemDto: ListItemToMarketplaceDto) {
    // Logic for listing items via signed messages
    return this.marketplaceService.listItem(listItemDto);
  }

  @Get('items')
  getAllItems() {
    // Logic for querying all items
    return this.marketplaceService.getAllItems();
  }

  @Post('purchase')
  async purchaseItem(@Body() purchaseItemDto: PurchaseItemMarketplaceDto) {
    try {
      // Logic for purchasing an item
      return {
        message: 'Item purchased successfully',
        data: await this.marketplaceService.purchaseItem(purchaseItemDto),
      };
    } catch (error) {
      return {
        message: 'Error purchasing item',
        error: error.message,
      };
    }
  }

  @Post('withdraw')
  async withdrawItem(@Body() withdrawItemDto: any) {
    // Logic for withdrawing an item
    return await this.marketplaceService.withdrawItem(withdrawItemDto);
  }

  @Get('general-info-config-marketplace')
  async generalInfoConfigMarketplace() {
    try {
      // Logic for general info configuration of the marketplace for demo and testing purposes, NOT FOR PRODUCTION
      return {
        message: 'General info configuration of the marketplace',
        data: await this.marketplaceService.generalInfoConfigMarketplace(),
      };
    } catch (error) {
      return {
        message: 'Error getting general info configuration of the marketplace',
        error: error.message,
      };
    }
  }

  @Get()
  async home() {
    return 'Welcome to the marketplace!';
  }
}
