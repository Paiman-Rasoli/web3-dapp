import { CSSProperties } from "react";

interface NavbarProps {
  accountAddress: string;
}

function Navbar({ accountAddress }: NavbarProps) {
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
          <a className="text-white">
            {accountAddress
              ? accountAddress?.slice(0, 6) +
                "... " +
                accountAddress?.slice(
                  accountAddress.length - 3,
                  accountAddress.length - 1
                )
              : "Account"}
          </a>
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
