import { ethers } from 'ethers';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BlockchainService {
  private readonly provider: ethers.providers.JsonRpcProvider;
  private readonly signer: ethers.Wallet;

  constructor(private configService: ConfigService) {
    const rpcUrl = this.configService.get<string>('RPC_URL');
    const privateKey = this.configService.get<string>('PRIVATE_KEY');

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
  }

  // Function to interact with smart contracts
  async interactWithContract(
    contractAddress: string,
    abi: any,
    methodName: string,
    params: any[],
  ) {
    const contract = new ethers.Contract(contractAddress, abi, this.signer);
    return contract[methodName](...params);
  }

  // Function to sign a message
  async signMessage(message: string): Promise<string> {
    return this.signer.signMessage(message);
  }

  async loadContractAbi(contractAddress: string): Promise<any> {
    const contract = new ethers.Contract(contractAddress, [], this.provider);
    return contract.interface.fragments;
  }
}
