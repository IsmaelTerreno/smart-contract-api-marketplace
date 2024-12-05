import { Module } from '@nestjs/common';
import { BlockchainModule } from '../blockchain/blockchain.module';
import { ConfigModule } from '@nestjs/config';
import { MarketplaceModule } from '../marketplace/marketplace.module';

@Module({
  imports: [MarketplaceModule, BlockchainModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
