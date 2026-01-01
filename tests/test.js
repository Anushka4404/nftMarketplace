import { expect } from "chai";
import { ethers } from "hardhat";

describe("MyContract", function () {
  it("Should deploy and set owner correctly", async function () {
    const Contract = await ethers.getContractFactory("MyContract");
    const contract = await Contract.deploy();
    await contract.waitForDeployment(); // replaces deployed()

    const [owner] = await ethers.getSigners();
    const ownerAddress = await owner.getAddress();

    expect(await contract.owner()).to.equal(ownerAddress);
  });
});
