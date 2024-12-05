import { Injectable, Logger } from '@nestjs/common';
import { BlockchainService } from '../blockchain/blockchain.service';
import { ConfigService } from '@nestjs/config';
import { ListItemToMarketplaceDto } from './list-item-to-marketplace.dto';
import { Contract } from 'ethers';

@Injectable()
export class MarketplaceService {
  private readonly logger = new Logger(MarketplaceService.name);
  private blockchainService: BlockchainService;
  private configService: ConfigService;

  constructor(
    blockchainService: BlockchainService,
    configService: ConfigService,
  ) {
    this.blockchainService = blockchainService;
    this.configService = configService;
  }

  async listItem(listItemDto: ListItemToMarketplaceDto) {
    this.logger.log('🔄 Listing item:' + listItemDto);
    await this.approveSellerItemInMarketPlace(listItemDto.amount);
    await this.blockchainService.signMessage('Approve seller item');
    const dataJSON = JSON.stringify(listItemDto);
    try {
      const marketplaceContract: Contract =
        await this.blockchainService.getMarketplaceContract();
      this.logger.log(
        '🛰 Sending tokens to the marketplace with the following data:' +
          dataJSON,
      );
      const tx = await marketplaceContract.listItem(
        listItemDto.tokenAddress,
        listItemDto.amount,
        listItemDto.price,
      );
      const txJSON = JSON.stringify(tx);
      this.logger.log('✅ Item listed successfully with tx:' + tx?.hash);
      this.logger.log('📡 Transaction details:' + txJSON);
    } catch (error) {
      const message = '❌ Error listing item: ' + error;
      this.logger.error(message);
      throw new Error(message);
    }
    return listItemDto;
  }

  async getAllItems() {
    this.logger.log('🔄 Getting all items');
    this.logger.log('🛰 Querying all items from the marketplace');
    try {
      const marketplaceContract: Contract =
        await this.blockchainService.getMarketplaceContract();
      const items = await marketplaceContract.getListings();
      this.logger.log('✅ Items queried successfully');
      this.logger.log('📡 Items:' + items);
      return items;
    } catch (error) {
      const message = '❌ Error getting all items: ' + error;
      this.logger.error(message);
      throw new Error(message);
    }
  }

  purchaseItem(purchaseItemDto: any) {}

  withdrawItem(withdrawItemDto: any) {}

  async approveSellerItemInMarketPlace(amount: number) {
    try {
      const contractItem = await this.blockchainService.getTokenItemContract();
      const contractMarketplaceAddress = this.configService.get<string>(
        'CONTRACT_ADDRESS_MARKETPLACE',
      );
      this.logger.log('🔄 Approving seller item');
      const result = await contractItem.approve(
        contractMarketplaceAddress,
        amount,
      );
      this.logger.log('✅ Seller item approved for listing');
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async generalInfoConfigMarketplace() {
    const marketplaceAddress = this.configService.get<string>(
      'CONTRACT_ADDRESS_MARKETPLACE',
    );
    const tokenAddressForSeller = this.configService.get<string>(
      'CONTRACT_ADDRESS_TOKEN_ITEM_SELLER',
    );
    const sellerAddress = this.configService.get<string>('USER_ADDRESS_SELLER');
    const sellerPrivateKey = this.configService.get<string>(
      'USER_PRIVATE_KEY_SELLER',
    );
    const buyerAddress = this.configService.get<string>('USER_ADDRESS_BUYER');
    const buyerPrivateKey = this.configService.get<string>(
      'USER_PRIVATE_KEY_BUYER',
    );
    return {
      // Token address for the marketplace
      marketplaceAddress:
        marketplaceAddress || 'Please set the marketplace address',
      // Token address for the seller to list in the marketplace
      tokenAddressForSeller:
        tokenAddressForSeller || 'Please set the token address for the seller',
      // Seller wallet information
      sellerAddress: sellerAddress || 'Please set the seller address',
      sellerPrivateKey: sellerPrivateKey || 'Please set the seller private key',
      // Buyer wallet information
      buyerAddress: buyerAddress || 'Please set the buyer address',
      buyerPrivateKey: buyerPrivateKey || 'Please set the buyer private key',
    };
  }
}
