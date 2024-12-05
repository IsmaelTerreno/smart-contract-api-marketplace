import { Contract, ethers } from 'ethers';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import tokenItemABI from '../../contracts/ERC20MarketplaceItem.sol/ERC20MarketplaceItem.json';
import marketplaceABI from '../../contracts/Marketplace.sol/Marketplace.json';

@Injectable()
export class BlockchainService {
  private readonly provider: ethers.providers.JsonRpcProvider;
  private readonly signer: ethers.Wallet;
  private contractMarketplace: Contract;
  private contractTokenItem: Contract;

  constructor(private configService: ConfigService) {
    const rpcUrl = this.configService.get<string>('RPC_URL');
    const privateKey = this.configService.get<string>('USER_PRIVATE_KEY');

    if (!rpcUrl) {
      throw new Error('RPC_URL is not defined');
    }

    if (!privateKey) {
      throw new Error('PRIVATE_KEY is not defined');
    }

    this.provider = new ethers.providers.JsonRpcProvider(rpcUrl);

    try {
      this.signer = new ethers.Wallet(privateKey, this.provider);
    } catch (error) {
      // Log the error details
      throw new Error(`Failed to create wallet: ${error.message}`);
    }
    (async () => {
      // Load the Marketplace contract ABI and address
      await this.loadMarketplaceContract();
      // Load the Marketplace Item contract ABI and address
      await this.loadMarketplaceTokenItemContract();
    })();
  }

  // Function to sign a message
  async signMessage(message: string): Promise<string> {
    return this.signer.signMessage(message);
  }

  async loadMarketplaceTokenItemContract() {
    const contractAddressTokenItem = this.configService.get<string>(
      'CONTRACT_ADDRESS_TOKEN_ITEM',
    );
    if (!contractAddressTokenItem) {
      throw new Error('CONTRACT_ADDRESS_TOKEN_ITEM is not defined');
    }
    this.contractTokenItem = new ethers.Contract(
      contractAddressTokenItem,
      tokenItemABI.abi,
      this.signer,
    );
  }

  async loadMarketplaceContract() {
    const contractAddressMarketplace = this.configService.get<string>(
      'CONTRACT_ADDRESS_MARKETPLACE',
    );
    if (!contractAddressMarketplace) {
      throw new Error('CONTRACT_ADDRESS_MARKETPLACE is not defined');
    }
    this.contractMarketplace = new ethers.Contract(
      contractAddressMarketplace,
      marketplaceABI.abi,
      this.signer,
    );
  }

  async getMarketplaceContract() {
    return this.contractMarketplace;
  }

  async getTokenItemContract() {
    return this.contractTokenItem;
  }
}
