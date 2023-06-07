const DecentralBank = artifacts.require("DecentralBank");
const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");

require("chai").use(require("chai-as-promised")).should();

/**
 *
 * @param {String} number
 * @returns thether to wei
 */
function tokens(number) {
  return web3.utils.toWei(number, "ether");
}

contract("DecentralBank", ([owner, customer]) => {
  let tether, rwd, decentralBank;

  before(async () => {
    tether = await Tether.new();
    rwd = await RWD.new();
    decentralBank = await DecentralBank.new(rwd.address, tether.address);

    // Transfer all rwd tokens to Bank (1 million)
    await rwd.transfer(decentralBank.address, tokens("100000"));

    // transfers 100 tether to customer
    await tether.transfer(customer, tokens("100"), { from: owner });
  });

  describe("bank contract has tokens", () => {
    it("must have balance", async () => {
      const balance = await rwd.balanceOf(decentralBank.address);

      assert.equal(balance, tokens("100000"));
    });
  });
});
