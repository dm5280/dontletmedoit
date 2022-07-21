const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");

describe("NFT", function () {
  it("Should mint and transfer NFT to someone", async function () {
    const FirdeGuys = await ethers.getContractFactory("dontletmedoit");
    const firedguys = await FirdeGuys.deploy();
    await firedguys.deployed();

    const count = 1;

    const recipient = '0x35C4a714273B333beb7F3Ac8C1E6a3280A9Ab8f9';

    const activate = await firedguys.setActive(true);

    let tx = await firedguys.mint(count, {
      value: ethers.utils.parseEther("0.0046"),
      gasPrice: ethers.utils.parseUnits("100", "gwei"),
      gasLimit: "99000"
    })
    await tx.wait()

    done()
  });
});
