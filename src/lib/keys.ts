"use client";

import type { PrivateKey, PublicKey, TokenId } from "o1js";
import { CollectionDeployParams } from "./token";
import type { Libraries } from "./libraries";
import { debug } from "./debug";
const DEBUG = debug();

export async function deployCollectionParams(
  lib: Libraries
): Promise<CollectionDeployParams> {
  const { PrivateKey, TokenId } = lib.o1js;
  const collection: {
    privateKey: PrivateKey;
    publicKey: PublicKey;
  } = PrivateKey.randomKeypair();
  const adminContract: {
    privateKey: PrivateKey;
    publicKey: PublicKey;
  } = PrivateKey.randomKeypair();
  if (DEBUG) console.log("collection:", collection.publicKey.toBase58());
  if (DEBUG) console.log("adminContract:", adminContract.publicKey.toBase58());
  const tokenId = TokenId.derive(collection.publicKey);
  return {
    collectionPrivateKey: collection.privateKey.toBase58(),
    adminContractPrivateKey: adminContract.privateKey.toBase58(),
    collectionPublicKey: collection.publicKey.toBase58(),
    adminContractPublicKey: adminContract.publicKey.toBase58(),
    tokenId: TokenId.toBase58(tokenId),
  };
}
