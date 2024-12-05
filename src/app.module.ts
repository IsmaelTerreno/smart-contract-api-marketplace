import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlockchainModule } from './blockchain/blockchain.module';
import { ConfigModule } from '@nestjs/config';
import { MarketplaceModule } from './marketplace/marketplace.module';

@Module({
  imports: [MarketplaceModule, BlockchainModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
