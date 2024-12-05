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
    await this.approveSellerItem(listItemDto.amount);
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

  async approveSellerItem(amount: number) {
    const userSellerAddress = this.configService.get<string>(
      'USER_ADDRESS_SELLER',
    );
    try {
      const contract = await this.blockchainService.getTokenItemContract();
      return await contract.approve(userSellerAddress, amount);
    } catch (error) {
      throw new Error(error);
    }
  }
}
