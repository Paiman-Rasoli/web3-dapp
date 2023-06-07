const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(Tether);
  const tether = await Tether.deployed();

  await deployer.deploy(RWD);
  const rwd = await RWD.deployed();

  await deployer.deploy(DecentralBank, rwd.address, tether.address);
  const decenteredBank = await DecentralBank.deployed();

  // Transfer all RWD tokens to decentered bank
  try {
    await rwd.transfer(decenteredBank.address, "10000000000000000000"); // 1million
  } catch (err) {
    console.log(err, "x😀😀");
  }

  try {
    // distribute 100 Tether tokens to investor
    // pretend investor the second address from Ganache
    // 100 tether
    await tether.transfer(accounts[1], "1000000000000000000");
  } catch (err) {
    console.log(err, "Y😀😀");
  }
};
//  1ETH = 1 * 10 ^ 18 WEI
