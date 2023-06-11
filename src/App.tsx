import "./App.css";
import Navbar from "./components/Navbar";
import { MetaTether } from "./types";
import {
  loadTetherContractMeta,
  loadWeb3,
  requestWalletAndGetDefaultWallet,
} from "./utils";
import { useState, useEffect } from "react";

function App() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [accountAddress, setAccountAddress] = useState<string>("");
  // contracts
  const [tether, setTether] = useState<MetaTether>({});

  if (!mounted) {
    (async () => {
      await loadWeb3();
    })();
  }

  useEffect(() => {
    setMounted(true);
    requestWalletAndGetDefaultWallet().then((res) => {
      const isAccountAvailable = res[0] ? true : false;

      if (isAccountAvailable) {
        setAccountAddress(res[0]);
        loadTetherContractMeta(res[0]).then((tetherResult) => {
          if (tetherResult) {
            console.log(tetherResult);
            setTether(tetherResult);
          }
        });
      }
    });
  }, []);

  return (
    <div className="App">
      <Navbar accountAddress={accountAddress} />
    </div>
  );
}

export default App;
