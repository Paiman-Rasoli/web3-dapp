import "./App.css";
import Navbar from "./components/Navbar";
import { loadWeb3, requestWalletAndGetDefaultWallet } from "./utils";
import { useState, useEffect } from "react";

function App() {
  const [mounted, setMounted] = useState(false);
  const [accountAddress, setAccountAddress] = useState("");

  if (!mounted) {
    (async () => {
      await loadWeb3();
    })();
  }

  useEffect(() => {
    setMounted(true);
    requestWalletAndGetDefaultWallet().then((res) =>
      setAccountAddress(res[0] ?? "")
    );
  }, []);

  return (
    <div className="App">
      <Navbar accountAddress={accountAddress} />
    </div>
  );
}

export default App;
