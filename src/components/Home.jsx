import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers';
import FiredGuys from '../artifacts/contracts/MyNFT.sol/FiredGuys.json';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

import Install from './body/Install';
import Connect from './body/Connect';
import Mint from './body/Mint';
import Sold from './body/Sold';
import Timer from './body/Timer'

import WalletBalance from './WalletBalance';

import girl from './images/girl.png';
import os from './images/os.png';
import tw from './images/twitter.png';

function Home() {
    const [adress, setAdress] = useState();
    let time = 0;
    
    const connectToWallet = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const accounts = await provider.send("eth_requestAccounts", [])
        setAdress(accounts[0])
    }

    //const mint

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
                {window.ethereum
                    ? (
                    adress
                        ? <Mint />
                        // : <Connect connectToWallet={connectToWallet} />
                        // : <Sold />
                        : <Timer unixTime={unixTime} />
                    )
                    : <Install />
                }
                <div className="flex justify-center my-10">
                    <a href="#" className='mr-10 hover:brightness-75 w-[100px]'><img src={os} alt="OpenSea" /></a>
                    <a href="#" className='hover:brightness-75 w-[100px]'><img src={tw} alt="Twitter" /></a>
                </div>
                <p className='font-mont my-10 text-md md:text-sm sm:text-xs'>
                    We use the ERC-721A standard for our smart contract<br />
                    to make your gas fee as funny as our project too<br /><br />
                    <span className='text-xs sm:text-md'>{adress && <>Your wallet: {adress}</>}</span>
                </p>
            </div>
        </div>
        </>
    )
}

export default Home;