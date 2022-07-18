import React, { useEffect, useState } from 'react'

import { ethers } from 'ethers';
import abi from "../components/wallet/dontletmedoit.json"

import Install from './body/Install';
import Connect from './body/Connect';
import Mint from './body/Mint';
import Sold from './body/Sold';
import Timer from './body/Timer'

import girl from './images/girl.png';
import dis from './images/dis.png';
import tw from './images/twitter.png';

function Home() {
    const [adress, setAdress] = useState();
    const contractAddress = '0x3ba2cab27c660999cd6f06e9f2cf5a1518ad3cc4';
    const [isCountdown, setStartCountdown] = useState(true);

    async function connect() {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const accounts = await provider.send("eth_requestAccounts", [])
        setAdress(accounts[0])
    }

    async function mint(quantity) {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, abi, signer);

            const connection = contract.connect(signer);
            const addr = connection.address;

            const result = await contract.mint(quantity)

            await result.wait();
        } catch (error) {
            console.log(error)
        }
    }

    const [unixTime, setUnixTime] = React.useState();

    const getTime = async () => {
        const res = await fetch("https://worldtimeapi.org/api/timezone/Etc/UTC");
        const data = await res.json();
        setUnixTime(data.unixtime);
    };

    React.useEffect(() => {
        getTime();
    }, []);
    
    return (
        <>
        <div className=''>
            <img src={girl} width={320} className='pic__girl xl:block hidden' alt="" />
            <div className='m-auto text-center max-w-[700px]'>
                {isCountdown
                    ?  <Timer unixTime={unixTime} />
                    : (
                    adress
                        ? <Mint mint={mint} />
                        : <Connect connectToWallet={connect} />
                        // : <Sold />
                    )
                }
                <div className="flex justify-center my-10">
                    <a href="https://discord.gg/qEywRj8Aa2" className='mr-10 hover:brightness-75 w-[100px]'><img src={dis} alt="Discord" /></a>
                    <a href="https://twitter.com/dontletmedoit_" className='hover:brightness-75 w-[100px]'><img src={tw} alt="Twitter" /></a>
                </div>
                <p className='font-mont my-10 text-md md:text-sm sm:text-xs'>
                    We use the ERC-721A standard for our <a href='#' className='underline hover:no-underline'>smart contract</a><br />
                    to make your gas fee as funny as our project too<br /><br />
                    {adress && <span className='text-xs sm:text-md'>Your wallet: {adress}</span>}
                </p>
            </div>
        </div>
        </>
    )
}

export default Home;