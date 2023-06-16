import "./App.css";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import { MetaDecentralBank, MetaRWD, MetaTether } from "./types";
import {
  loadAllContracts,
  loadWeb3,
  requestWalletAndGetDefaultWallet,
} from "./utils";
import { useState, useEffect, CSSProperties } from "react";

function App() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [accountAddress, setAccountAddress] = useState<string>("");
  // contracts
  const [tether, setTether] = useState<MetaTether>({});
  const [rwd, setRwd] = useState<MetaRWD>({});
  const [decentralBank, setDecentralBank] = useState<MetaDecentralBank>({});

  if (!mounted) {
    (async () => {
      await loadWeb3();
    })();
  }

  const init = async () => {
    const userAccount = await requestWalletAndGetDefaultWallet();
    const isAccountAvailable = userAccount[0] ? true : false;

    if (isAccountAvailable) {
      setAccountAddress(userAccount[0]);

      const [tetherContract, rwdContract, decentralBankContract] =
        await loadAllContracts(userAccount[0]);

      setTether(tetherContract);
      setRwd(rwdContract);
      setDecentralBank(decentralBankContract);
    }
  };

  useEffect(() => {
    setMounted(true);
    init();
  }, []);

  return (
    <div className="app">
      <Navbar accountAddress={accountAddress} init={init} />
      <div className="container-fluid mt-5">
        <div className="row">
          <main
            role="main"
            className="col col-lg-12 mx-auto"
            style={styles.container}
          >
            <Main />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;

interface Styles {
  container: CSSProperties;
}

const styles: Styles = {
  container: {
    maxWidth: "650px",
    minHeight: "100vm",
  },
};
