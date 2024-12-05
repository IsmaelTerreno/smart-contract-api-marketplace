import { Injectable } from '@nestjs/common';
import { BlockchainService } from '../blockchain/blockchain.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MarketplaceService {
  private blockchainService: BlockchainService;
  private configService: ConfigService;

  constructor(
    blockchainService: BlockchainService,
    configService: ConfigService,
  ) {
    this.blockchainService = blockchainService;
    this.configService = configService;
  }

  listItem(listItemDto: any) {}

  getAllItems() {}

  purchaseItem(purchaseItemDto: any) {}

  withdrawItem(withdrawItemDto: any) {}

  async approveSellerItem(amount: number) {
    const userAddress = this.configService.get<string>('USER_ADDRESS');
    try {
      const contract = await this.blockchainService.getTokenItemContract();
      return await contract.approve(userAddress, amount);
    } catch (error) {
      throw new Error(error);
    }
  }
}
