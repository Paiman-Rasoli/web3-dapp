const Tether = artifacts.require("Tether");

contract("Tether", (accounts) => {
  let tether;

  before(async () => {
    tether = await Tether.new();
  });

  describe("Mock tether deployment", () => {
    it("matches name successfully", async () => {
      const name = await tether.name();

      assert.equal(name, "Tether");
    });
  });
});
