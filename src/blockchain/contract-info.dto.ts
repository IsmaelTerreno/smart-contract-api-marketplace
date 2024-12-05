import { IsArray, IsIn, IsInt, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Network } from './network';

export class ContractInfoDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsInt()
  @ApiProperty()
  version: number;

  @IsString()
  @ApiProperty()
  @Length(40, 44)
  address: string;

  @IsString()
  @ApiProperty()
  @IsIn([
    Network.ETH_TESTNET,
    Network.ETH_MAINNET,
    Network.POLYGON_TESTNET,
    Network.POLYGON_MAINNET,
  ])
  network: Network;

  @IsString()
  @ApiProperty({
    description: 'Type of smart contract',
  })
  template: string;

  @IsArray()
  @ApiProperty({
    description: 'Abi item used in the web3 interface for this smart contract',
  })
  abi?: object[];
}
