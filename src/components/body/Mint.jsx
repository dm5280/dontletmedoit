import React, { useState } from "react";
import { ethers } from 'ethers';

import dontletmedoit from "../wallet/dontletmedoit.json"

import minus from '../images/-.png';
import plus from '../images/+.png';
import loading from '../images/loading.gif';

const Mint = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    let [count, setCount] = useState(1);
    let [value, setValue] = useState(0.0045);
    let [isLoading, setIsLoading] = useState(false);
    let [isMinted, setIsMinted] = useState(false);
    let [txHash, setTxHash] = useState();

    // Create a signer
    // const privateKey = ""
    // const signer = new ethers.Wallet(privateKey, provider)

    const signer = provider.getSigner();

    // Get contract ABI and address
    const abi = dontletmedoit.abi
    const contractAddress = '0xe82c0828Ff43e58ec10009b379aEb6296aE9d104'
    // Create a contract instance
    const contract = new ethers.Contract(contractAddress, abi, signer)

    async function getGasPrice() {
        let feeData = await provider.getFeeData()
        return feeData.gasPrice
    }

    async function getNonce(signer) {
        return (await signer).getTransactionCount()
    }

    async function mint(count) {
        const nonce = await getNonce(signer)
        const gasFee = await getGasPrice()
        
        setIsLoading(true)
        console.log("...Submitting transaction with gas price of:", ethers.utils.formatUnits(gasFee, "gwei"), " - nonce:", nonce)

        try {
            let tx = await contract.mint(count, {
                value: ethers.utils.parseEther(String(value)),
            })
            await tx.wait()

            setIsLoading(false)
            setIsMinted(true)
            setTxHash(tx.hash)
            console.log(`NFT Minted! Check it out at: https://etherscan.io/tx/${tx.hash}`)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    function incrementCount() {
        count = count + 1;
        if (count >= 10 ) count = 10;
        checkValue(count);
        setCount(count);
    }
    function decrementCount() {
        count = count - 1;
        if (count <= 1 ) count = 1;
        checkValue(count);
        setCount(count);
    }
    function checkValue(count) {
        switch (count) {
            case 1:
                setValue(0.0045);
                break;
            case 2:
                setValue(0.008);
                break;
            case 3:
                setValue(0.012);
                break;
            case 4:
                setValue(0.016);
                break;
            case 5:
                setValue(0.02);
                break;
            case 6:
                setValue(0.0228);
                break;
            case 7:
                setValue(0.0266);
                break;
            case 8:
                setValue(0.0304);
                break;
            case 9:
                setValue(0.0315);
                break;
            case 10:
                setValue(0.035);
                break;
        }
    }

    return (
        <>
            {isLoading && <img src={loading} className='max-w-[15%] m-auto mb-5' />}
            {isMinted && <p className="font-mont mb-5 text-center text-[10px] sm:text-[20px] p-2">NFT Minted! Check it out <a href={`https://etherscan.io/tx/${txHash}`} className='underline hover:no-underline'>on Etherscan</a></p>}
            <button onClick={() => mint(count)} className='btn__mint font-segoe font-bold text-[25px] sm:text-[42px] hover:brightness-75 mb-3'>Mint</button>
            <div className="flex items-center justify-center font-segoe max-w-100 text-4xl font-bold my-5">
                <img src={minus} onClick={decrementCount} className="pic__calc mr-5 w-[35px] hover:brightness-75" alt="minus" />
                {count}
                <img src={plus} onClick={incrementCount} className="pic__calc ml-5 w-[35px] hover:brightness-75" alt="plus" />
            </div>
            <p className='font-segoe font-bold mb-5 text-[25px] sm:text-[42px]'>
                Do it for me or I...
            </p>
            {/* <p className='font-segoe font-bold mb-5 text-xl'>
                1 NFT - 0.0045 ETH<br />
                2 NFT - 0.008 ETH<br />
                3 NFT - 0.012 ETH<br />
                4 NFT - 0.016 ETH<br />
                5 NFT - 0.02 ETH<br />
                6 NFT - 0.0228 ETH<br />
                7 NFT - 0.0266 ETH<br />
                8 NFT - 0.0304 ETH<br />
                9 NFT - 0.0315 ETH<br />
                10 NFT - 0.035 ETH
            </p> */}
        </>
    );
  };
  
export default Mint;