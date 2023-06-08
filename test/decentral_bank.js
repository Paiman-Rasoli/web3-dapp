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
    await rwd.transfer(decentralBank.address, tokens("1000000"));

    // transfers 100 tether to investor (customer)
    await tether.transfer(customer, tokens("100"), { from: owner });
  });

  describe("bank contract has tokens", () => {
    it("must have balance", async () => {
      const balance = await rwd.balanceOf(decentralBank.address);

      assert.equal(balance, tokens("1000000"));
    });
  });

  describe("Yield Farming", () => {
    it("rewards token for stacking", async () => {
      let result;

      // check investor balance;
      result = await tether.balanceOf(customer);
      assert.equal(
        result.toString(),
        tokens("100"),
        "customer mock wallet before stacking"
      );

      // check stacking for customer
      await tether.approve(decentralBank.address, tokens("100"), {
        from: customer,
      });
      await decentralBank.depositTokens(tokens("100"), { from: customer });

      result = await tether.balanceOf(customer);
      assert.equal(
        result.toString(),
        tokens("0"),
        "customer mock wallet after stacking"
      );

      result = await tether.balanceOf(decentralBank.address);
      assert.equal(
        result.toString(),
        tokens("100"),
        "decentral bank mock wallet after stacking"
      );

      // 1stacking balance
      result = await decentralBank.hasStacked(customer);
      assert.equal(result.toString(), "true", "customer stacking status after");

      // issue token. only owner
      await decentralBank.issueTokens({ from: owner });

      await decentralBank.issueTokens({ from: customer }).should.be.rejected;
    });
  });
});
