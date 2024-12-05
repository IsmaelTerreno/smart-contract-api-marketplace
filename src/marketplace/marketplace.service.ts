import { Injectable } from '@nestjs/common';

@Injectable()
export class MarketplaceService {
  listItem(listItemDto: any) {}

  getAllItems() {}

  purchaseItem(purchaseItemDto: any) {}

  withdrawItem(withdrawItemDto: any) {}
}
