require('dotenv').config();
const ethers = require('ethers');

// Get Alchemy API Key
const API_KEY = process.env.API_KEY;

// Define an Alchemy Provider
const provider = new ethers.providers.AlchemyProvider('rinkeby', API_KEY)

const dontletmedoit = require("../src/artifacts/contracts/dontletmedoit.sol/dontletmedoit.json");

// Create a signer
const privateKey = process.env.ACCOUNT_KEY
const signer = new ethers.Wallet(privateKey, provider)

// Get contract ABI and address
const abi = dontletmedoit.abi
const contractAddress = '0x89C24Ca63c0382690cd54CDA0f8887f60CC713Af'

// Create a contract instance
const contract = new ethers.Contract(contractAddress, abi, signer)

async function getNonce(signer) {
    return (await signer).getTransactionCount()
}

async function getGasPrice() {
    let feeData = await provider.getFeeData()
    return feeData.gasPrice
}

// Call mintNFT function
const mintNFT = async () => {
    const nonce = await getNonce(signer)
    const gasFee = await getGasPrice()

    console.log("...Submitting transaction with gas price of:", ethers.utils.formatUnits(gasFee, "gwei"), " - & nonce:", nonce)

    let tx = await contract.mint(1, {
        value: ethers.utils.parseEther("0.0046"),
        gasPrice: ethers.utils.parseUnits("100", "gwei"),
        gasLimit: "99000",
        nonce: nonce
    })
    await tx.wait()
    console.log(`NFT Minted! Check it out at: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`)
}

mintNFT()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });