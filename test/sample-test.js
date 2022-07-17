const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT", function () {
  it("Should mint and transfer NFT to someone", async function () {
    const FirdeGuys = await ethers.getContractFactory("FiredGuys");
    const firedguys = await FirdeGuys.deploy();
    await firedguys.deployed();

    const recipient = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
    const metadataURI = 'cid/test.png';

    let balance = await firedguys.balanceOf(recipient)
    expect(balance).to.equal(0);

    const newToken = await firedguys.payToMint(recipient, metadataURI, { value: ethers.utils.parseEther('0.05') });
  });
});
