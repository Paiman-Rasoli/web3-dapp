import { Contract } from "web3-eth-contract";

export interface MetaTether {
  tether?: Contract;
  balance?: string;
}

export interface MetaRWD {
  RWD?: Contract;
  balance?: string;
}

export interface MetaDecentralBank {
  decentralBank?: Contract;
  balance?: string;
}
