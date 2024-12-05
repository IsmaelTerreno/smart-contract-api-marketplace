import { Module } from '@nestjs/common';
import { MarketplaceController } from './marketplace.controller';
import { MarketplaceService } from './marketplace.service';
import { BlockchainModule } from '../blockchain/blockchain.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [BlockchainModule, ConfigModule],
  controllers: [MarketplaceController],
  providers: [MarketplaceService, MarketplaceController],
})
export class MarketplaceModule {}
