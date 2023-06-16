import { CSSProperties } from "react";

interface NavbarProps {
  accountAddress: string;
  init: () => void;
}

function Navbar({ accountAddress, init }: NavbarProps) {
  return (
    <nav
      className="navbar navbar-dark fixed-top shadow p-2"
      style={styles.navBar}
    >
      <div className="container-fluid">
        <div>
          <a className="navbar-brand">DAPP Yield Stacking</a>
        </div>
        <div>
          {!accountAddress ? (
            <button className="btn text-white border-white" onClick={init}>
              Connect to MetaMask
            </button>
          ) : (
            <a className="text-white">
              {accountAddress?.slice(0, 6) +
                "... " +
                accountAddress?.slice(
                  accountAddress.length - 3,
                  accountAddress.length - 1
                )}
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

interface StyleProps {
  navBar: CSSProperties;
}

const styles: StyleProps = {
  navBar: {
    backgroundColor: "black",
  },
};
