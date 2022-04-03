const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Ballot", function () {
  it("Should vote if contract deployed within five minutes", async function () {
    const [owner, account1] = await ethers.getSigners();

    const Ballot = await ethers.getContractFactory("Ballot");

    const ballot = await Ballot.deploy([
      "0x6d7970726f700000000000000000000000000000000000000000000000000000",
    ]);
    await ballot.deployed();
    expect(await ballot.chairperson()).to.equal(owner.address);
    await ballot.vote(0);
  });
});

describe("Ballot", function () {
  it("Should fail  if voted by no vote right user", async function () {
    const [owner, account1] = await ethers.getSigners();

    const Ballot = await ethers.getContractFactory("Ballot");
    const ballot = await Ballot.deploy([
      "0x6d7970726f700000000000000000000000000000000000000000000000000000",
    ]);
    await ballot.deployed();

    await expect(ballot.connect(account1).vote(0)).to.be.revertedWith(
      "Has no right to vote"
    );
  });
});
describe("Ballot", function () {
  it("Should fail if voted after five minutes ", async function () {
    const [owner, account1] = await ethers.getSigners();
    const blockNumBefore = await ethers.provider.getBlockNumber();
    const blockBefore = await ethers.provider.getBlock(blockNumBefore);
    const timestampBefore = blockBefore.timestamp;
    const Ballot = await ethers.getContractFactory("Ballot");
    const ballot = await Ballot.deploy([
      "0x6d7970726f700000000000000000000000000000000000000000000000000000",
    ]);

    console.log("Deploying timestamp", timestampBefore);
    await ballot.deployed();

    expect(await ballot.chairperson()).to.equal(owner.address);
    await network.provider.send("evm_increaseTime", [305]);

    await expect(ballot.vote(0)).to.be.revertedWith("Vote period ended!!");

    const blockNumAfter = await ethers.provider.getBlockNumber();
    const blockAfter = await ethers.provider.getBlock(blockNumAfter);
    const timestampAfter = blockAfter.timestamp;
    console.log("Current timestamp :", timestampAfter);
    await ballot.deployed();
  });
});
