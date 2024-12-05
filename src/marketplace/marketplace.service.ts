import { Injectable } from '@nestjs/common';
import { BlockchainService } from '../blockchain/blockchain.service';
import { ContractInfoDto } from '../blockchain/contract-info.dto';

@Injectable()
export class MarketplaceService {
  blockchainService: BlockchainService;

  constructor(blockchainService: BlockchainService) {
    this.blockchainService = blockchainService;
  }

  listItem(listItemDto: any) {}

  getAllItems() {}

  purchaseItem(purchaseItemDto: any) {}

  withdrawItem(withdrawItemDto: any) {}

  approveItem(approveItemDto: any, contractInfoDto: ContractInfoDto) {
    this.blockchainService.interactWithContract(
      contractInfoDto.address,
      [],
      'approve',
      [approveItemDto.itemId, approveItemDto.approval],
    );
  }
}
