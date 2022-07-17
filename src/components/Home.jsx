import React, { useEffect, useState } from 'react'

import { useWeb3React } from "@web3-react/core"
import { injected } from "../components/wallet/connectors"

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

import Install from './body/Install';
import Connect from './body/Connect';
import Mint from './body/Mint';
import Sold from './body/Sold';
import Timer from './body/Timer'

import WalletBalance from './WalletBalance';

import girl from './images/girl.png';
import dis from './images/dis.png';
import tw from './images/twitter.png';

function Home() {
    const { active, account, library, connector, activate, deactivate } = useWeb3React()
    const [isCountdown, setStartCountdown] = useState(true);
    let time = 0;

    //const mint

    async function connect() {
        try {
            await activate(injected)
            localStorage.setItem('isWalletConnected', true)
        } catch (ex) {
        console.log(ex)
        }
    }

    async function disconnect() {
        try {
            deactivate()
            localStorage.setItem('isWalletConnected', false)
        } catch (ex) {
            console.log(ex)
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

        const connectWalletOnPageLoad = async () => {
            if (localStorage?.getItem('isWalletConnected') === 'true') {
              try {
                await activate(injected)
                localStorage.setItem('isWalletConnected', true)
              } catch (ex) {
                console.log(ex)
              }
            }
          }
          connectWalletOnPageLoad()
    }, []);
    
    return (
        <>
        <div className=''>
            <img src={girl} width={320} className='pic__girl xl:block hidden' alt="" />
            <div className='m-auto text-center max-w-[700px]'>
                {isCountdown
                    ?  <Timer unixTime={unixTime} />
                    : (
                    active
                        ? <Mint />
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
                    {active && <span className='text-xs sm:text-md'>Your wallet: {account} <br />
                    <a onClick={disconnect} className='underline hover:no-underline cursor-pointer'>Disconnect</a></span>}
                </p>
            </div>
        </div>
        </>
    )
}

export default Home;