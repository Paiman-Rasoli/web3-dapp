import { useState, useCallback } from "react";
import { Errors } from "../types";

enum TAB_OPTIONS {
  DEPOSIT = "DEPOSIT",
  WITHDRAW = "WITHDRAW",
}

interface MainProps {
  error: Errors;
}

function Main({ error }: MainProps) {
  const [tab, setTab] = useState<TAB_OPTIONS>(TAB_OPTIONS.DEPOSIT);
  const changeTab = useCallback((tab: TAB_OPTIONS) => {
    setTab(tab);
  }, []);

  return (
    <div id="content" className="mt-3">
      {error === Errors.NULL ? (
        <>
          <div>
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <button
                  className={`nav-link ${
                    tab === TAB_OPTIONS.DEPOSIT && "active"
                  }`}
                  aria-current="page"
                  onClick={() => changeTab(TAB_OPTIONS.DEPOSIT)}
                >
                  Deposit
                </button>
              </li>
              <li className="nav-item mx-2">
                <button
                  className={`nav-link ${
                    tab === TAB_OPTIONS.WITHDRAW && "active"
                  }`}
                  onClick={() => changeTab(TAB_OPTIONS.WITHDRAW)}
                >
                  Withdraw
                </button>
              </li>
              <li className="nav-item ms-auto">
                <p className="nav-link disabled">Balance : 0</p>
              </li>
            </ul>
          </div>

          <form className="mt-5">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Balance"
                aria-label="Balance"
                aria-describedby="basic-addon2"
              />
              <span className="input-group-text" id="basic-addon2">
                <img src="/tether.jpg" height={32} alt="tether.jpg" />
                &nbsp;&nbsp; USDT
              </span>
            </div>

            <div className="mt-3 w-100">
              <button type="button" className="btn btn-success w-100">
                {tab === TAB_OPTIONS.DEPOSIT ? "Deposit" : "Withdraw"}
              </button>
            </div>
          </form>
        </>
      ) : (
        <p>
          {error === Errors.WALLET_CONNECTION
            ? "Make sure you have opened MetaMask on Ganache Network"
            : "Server error happened, please reload the browser."}
        </p>
      )}
    </div>
  );
}

export default Main;
