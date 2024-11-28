"use server";
import { searchClient } from "@algolia/client-search";
// import { DeployedTokenInfo } from "./token";
// import { Like } from "./likes";
import {
  getAllTokensByAddress,
  BlockberryTokenData,
} from "./blockberry-tokens";
import { getChain } from "./chain";
import { debug } from "./debug";
const chain = getChain();
const DEBUG = debug();

const { ALGOLIA_KEY, ALGOLIA_PROJECT } = process.env;

export interface TokenList {
  hits: any[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  exhaustiveNbHits: boolean;
  exhaustiveTypo: boolean;
  exhaustive: { nbHits: boolean; typo: boolean };
  processingTimeMS: number;
}

export async function algoliaGetTokenList(
  params: {
    query?: string;
    hitsPerPage?: number;
    page?: number;
    favoritesOfAddress?: string;
    issuedByAddress?: string;
    ownedByAddress?: string;
  } = {}
): Promise<TokenList | undefined> {
  const { favoritesOfAddress, issuedByAddress, ownedByAddress } = params;
  if (ALGOLIA_KEY === undefined) throw new Error("ALGOLIA_KEY is undefined");
  if (ALGOLIA_PROJECT === undefined)
    throw new Error("ALGOLIA_PROJECT is undefined");
  const query = params.query ?? "";
  const hitsPerPage = params.hitsPerPage ?? 100;
  const page = params.page ?? 0;
  //if (DEBUG) console.log("algoliaGetTokenList", params);
  const client = searchClient(ALGOLIA_PROJECT, ALGOLIA_KEY);
  const indexName = `standard-${chain}`;

  async function filterFromBlockberryTokens(
    blockberryTokensPromise: Promise<BlockberryTokenData[]> | undefined
  ): Promise<string | undefined> {
    if (blockberryTokensPromise === undefined) return undefined;
    const blockberryTokens = await blockberryTokensPromise;
    if (blockberryTokens.length === 0) return undefined;
    return blockberryTokens
      .map((token) => `tokenId:${token.tokenId}`)
      .join(" OR ");
  }

  async function listFromBlockberryTokens(
    blockberryTokensPromise: Promise<BlockberryTokenData[]> | undefined
  ): Promise<string[]> {
    if (blockberryTokensPromise === undefined) return [];
    const blockberryTokens = await blockberryTokensPromise;
    if (blockberryTokens.length === 0) return [];
    return blockberryTokens.map((token) => token.tokenId);
  }

  try {
    let tokenList: TokenList | undefined = undefined;
    const result = await client.searchSingleIndex({
      indexName,
      searchParams: {
        query,
        hitsPerPage,
        page,
      },
    });
    tokenList = result?.hits ? (result as unknown as TokenList) : undefined;

    return tokenList;
  } catch (error: any) {
    console.error("algoliaGetToken error:", {
      error: error?.message ?? String(error),
      params,
    });
    return undefined;
  }
}
