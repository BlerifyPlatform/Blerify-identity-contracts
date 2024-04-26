import { ethers } from "hardhat";
import { keccak256 } from "ethers/lib/utils";
import { ContractTransaction } from "ethers";

export const getAddressFromDid = (did: string): string => {
  const codedDid = ethers.utils.defaultAbiCoder.encode(["string"], [did]);
  const hash = keccak256(codedDid);
  return hash.substring(26);
};

export const sleep = (seconds: number) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(true), seconds * 1000);
  });

/**
 * Util to evaluate fail desired cases in gas model networks
 * @param txPromise
 */
export async function wrapCall(txPromise: Promise<ContractTransaction>) {
  let s = false;
  try {
    await (await txPromise).wait();
  } catch (err: any) {
    s = true;
  } finally {
    if (!s) {
      throw new Error("Unexpected behavior");
    }
  }
}
