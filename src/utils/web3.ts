import Web3 from "web3";
import { WALLET_CONNECTION_APPROVED } from "../constants";

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
      resolve(false);
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
    return [];
  }
};
