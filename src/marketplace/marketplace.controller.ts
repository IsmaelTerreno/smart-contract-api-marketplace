import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { MarketplaceService } from './marketplace.service';
import { ListItemToMarketplaceDto } from './list-item-to-marketplace.dto';
import { PurchaseItemMarketplaceDto } from './purchase-item-marketplace.dto';

@Controller('/api/v1/marketplace')
export class MarketplaceController {
  constructor(private readonly marketplaceService: MarketplaceService) {}

  @Post('list')
  async listItems(@Body() listItemDto: ListItemToMarketplaceDto) {
    try {
      // Logic for listing an item
      return {
        message: 'Item listed successfully',
        data: await this.marketplaceService.listItem(listItemDto),
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Error listing item',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('items')
  async getAllItems() {
    try {
      // Logic for getting all items
      return {
        message: 'All items',
        data: (await this.marketplaceService.getAllItems()) || [],
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Error getting all items',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
      throw new HttpException(
        {
          message: 'Error purchasing item',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('withdraw')
  async withdrawSellerEarnings() {
    try {
      // Logic for withdrawing seller earnings funds
      return {
        message: 'Withdrawn funds successfully',
        data: await this.marketplaceService.withdrawSellerEarnings(),
      };
    } catch (error) {
      throw new HttpException(
        {
          message:
            'Error withdrawing item, make sure you have funds to withdraw.',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
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
      throw new HttpException(
        {
          message:
            'Error getting general info configuration of the marketplace',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async home() {
    return 'Welcome to the marketplace!';
  }
}
