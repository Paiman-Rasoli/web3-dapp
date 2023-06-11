import Web3 from "web3";
import { WALLET_CONNECTION_APPROVED } from "../constants";
import { MetaTether } from "../types";

declare global {
  interface Window {
    ethereuem: any;
    web3: Web3;
  }
}

export const loadWeb3 = async () => {
  return new Promise((resolve, reject) => {
    if (window.ethereuem) {
      window.web3 = new Web3(window.ethereuem);
      resolve(true);
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      resolve(true);
    } else {
      reject(false);
    }
  });
};

export const requestWalletAndGetDefaultWallet = async (): Promise<string[]> => {
  const web3 = window.web3;
  try {
    if (localStorage.getItem(WALLET_CONNECTION_APPROVED) === "APPROVED") {
      return web3.eth.getAccounts();
    }
    const accounts = await web3.eth.requestAccounts();
    localStorage.setItem(WALLET_CONNECTION_APPROVED, "APPROVED");
    return accounts;
  } catch (err) {
    console.error(err);
    localStorage.removeItem(WALLET_CONNECTION_APPROVED);
    return [];
  }
};

export const loadTetherContractMeta = async (
  account: string
): Promise<MetaTether | null> => {
  const web3 = window.web3;
  const networkId = await web3.eth.net.getId();

  const Tether = await import("../abis/Tether.json");
  const tetherData = Tether.networks[networkId as 5777];
  if (tetherData) {
    const tether = new web3.eth.Contract(Tether.abi as any, tetherData.address);
    const balance = await tether.methods.balanceOf(account).call();

    return {
      tether,
      balance: web3.utils.fromWei(balance, "tether").toString(),
    };
  }

  alert("There is no network!");
  return null;
};
