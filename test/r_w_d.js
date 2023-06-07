const RWD = artifacts.require("RWD");

contract("RWD", (accounts) => {
  let rwd;

  before(async () => {
    rwd = await RWD.new();
  });

  describe("Mock RWD deployment", () => {
    it("matches name successfully", async () => {
      const name = await rwd.name();

      assert.equal(name, "Reward Token");
    });
  });
});
