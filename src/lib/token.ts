export interface CollectionDeployParams {
  collectionPrivateKey: string;
  adminContractPrivateKey: string;
  collectionPublicKey: string;
  tokenId: string;
  adminContractPublicKey: string;
}

export interface MintAddress {
  amount: number | "";
  address: string;
}

export interface MintAddressVerified {
  amount: number;
  address: string;
}

export interface CollectionLinks {
  twitter: string;
  discord: string;
  telegram: string;
  instagram: string;
  facebook: string;
  website: string;
}

export interface LaunchCollectionData {
  name: string;
  description: string;
  links: CollectionLinks;
  image: File | undefined;
  imageURL: string | undefined;
  adminAddress: string;
  mintAddresses: MintAddress[];
}

export interface CollectionState {
  symbol: string;
  collectionAddress: string;
  tokenId: string;
  adminContractAddress: string;
  adminAddress: string;
  totalSupply: number;
  isPaused: boolean;
  decimals: number;
  verificationKeyHash: string;
  uri: string;
  version: number;
  adminTokenSymbol: string;
  adminUri: string;
  adminVerificationKeyHash: string;
  adminVersion: number;
}

export interface DeployedCollectionState extends CollectionState {
  created: number;
  updated: number;
}
