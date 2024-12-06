import { Contract, ethers } from 'ethers';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import tokenItemABI from '../../contracts/ERC20MarketplaceItem.sol/ERC20MarketplaceItem.json';
import marketplaceABI from '../../contracts/Marketplace.sol/Marketplace.json';

@Injectable()
export class BlockchainService {
  readonly provider: ethers.providers.JsonRpcProvider;
  readonly signerSeller: ethers.Wallet;
  readonly signerBuyer: ethers.Wallet;
  private contractMarketplace: Contract;
  private contractTokenItem: Contract;

  constructor(private configService: ConfigService) {
    const rpcUrl = this.configService.get<string>('RPC_URL');
    const privateKeySeller = this.configService.get<string>(
      'USER_PRIVATE_KEY_SELLER',
    );

    if (!rpcUrl) {
      throw new Error('RPC_URL is not defined');
    }

    if (!privateKeySeller) {
      throw new Error('USER_PRIVATE_KEY_SELLER is not defined');
    }
    const privateKeyBuyer = this.configService.get<string>(
      'USER_PRIVATE_KEY_BUYER',
    );
    if (!privateKeyBuyer) {
      throw new Error('USER_PRIVATE_KEY_BUYER is not defined');
    }
    this.provider = new ethers.providers.JsonRpcProvider(rpcUrl);

    try {
      this.signerSeller = new ethers.Wallet(privateKeySeller, this.provider);
      this.signerBuyer = new ethers.Wallet(privateKeyBuyer, this.provider);
    } catch (error) {
      // Log the error details
      throw new Error(`Failed to create wallet: ${error.message}`);
    }
  }

  async getMarketplaceContract(signer: ethers.Wallet) {
    const contractAddressMarketplace = this.configService.get<string>(
      'CONTRACT_ADDRESS_MARKETPLACE',
    );
    if (!contractAddressMarketplace) {
      throw new Error('CONTRACT_ADDRESS_MARKETPLACE is not defined');
    }
    this.contractMarketplace = new ethers.Contract(
      contractAddressMarketplace,
      marketplaceABI.abi,
      signer,
    );
    return this.contractMarketplace;
  }

  async getTokenItemContract(signer: ethers.Wallet) {
    const contractAddressTokenItem = this.configService.get<string>(
      'CONTRACT_ADDRESS_TOKEN_ITEM_SELLER',
    );
    if (!contractAddressTokenItem) {
      throw new Error('CONTRACT_ADDRESS_TOKEN_ITEM_SELLER is not defined');
    }
    this.contractTokenItem = new ethers.Contract(
      contractAddressTokenItem,
      tokenItemABI.abi,
      signer,
    );
    return this.contractTokenItem;
  }

  async createSignature(signer: ethers.Wallet) {
    const contractMarketplaceAddress = this.configService.get<string>(
      'CONTRACT_ADDRESS_MARKETPLACE',
    );
    const participantAddress = await signer.getAddress();
    const { chainId } = await this.provider.getNetwork();
    // Sign the message that includes the seller's address
    const message = {
      types: {
        Order: [{ name: 'participant', type: 'address' }],
      },
      domain: {
        name: 'Marketplace',
        version: '1',
        verifyingContract: contractMarketplaceAddress,
        chainId: chainId, // replace with your actual chain ID
      },
      primaryType: 'Order',
      message: {
        participant: participantAddress,
      },
    };

    return await signer._signTypedData(
      message.domain,
      message.types,
      message.message,
    );
  }
}
