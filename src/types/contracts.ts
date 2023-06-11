import { Contract } from "web3-eth-contract";

export interface MetaTether {
  tether?: Contract;
  balance?: string;
}
