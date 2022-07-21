import React, { useEffect, useState } from 'react'

import Install from './body/Install';
import Connect from './body/Connect';
import Mint from './body/Mint';
import Sold from './body/Sold';
import Timer from './body/Timer'

import girl from './images/girl0.png';
import dis from './images/dis.png';
import tw from './images/twitter.png';
import price_bg from './images/price_bg.png'

function Home() {
    const [accounts, setAccounts] = useState();
    const [isCountdown, setStartCountdown] = useState(true);

    async function connect() {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        })
        setAccounts(accounts)
    }
    
    return (
        <>
        <div className=''>
            <img src={girl} width={320} className='pic__girl xl:block hidden' alt="" />
            <div className='m-auto text-center max-w-[700px]'>
                {isCountdown
                    ?  <Timer />
                    : (
                    accounts
                        ? <Mint />
                        : <Connect connectToWallet={connect} />
                        // : <Sold />
                    )
                }
                <div className="flex justify-center my-10">
                    <a href="https://discord.gg/qEywRj8Aa2" className='mr-10 hover:brightness-75 w-[100px]'><img src={dis} alt="Discord" /></a>
                    <a href="https://twitter.com/dontletmedoit_" className='hover:brightness-75 w-[100px]'><img src={tw} alt="Twitter" /></a>
                </div>
                <div className="box__price">
                    <img src={price_bg} />
                    <p className='box__text font-mont'>1 FREE NFT if you mint 2 or more only for <a href="https://opensea.io/collection/cloudy-nowhere-friends" className='underline hover:no-underline'>Cloudy Nowhere Friends</a> holders</p>
                    <p className='box__text font-mont'>
                    1 NFT  0.0045 ETH<br />
                    1 NFT  0.0045 ETH<br />
                    1 NFT  0.0045 ETH<br />
                    1 NFT  0.0045 ETH<br />
                    1 NFT  0.0045 ETH<br />
                    1 NFT  0.0045 ETH<br />
                    1 NFT  0.0045 ETH<br />
                    1 NFT  0.0045 ETH<br />
                    1 NFT  0.0045 ETH<br />
                    1 NFT  0.0045 ETH<br />
                    </p>
                </div>
                <p className='font-mont my-10 text-md md:text-sm sm:text-xs'>
                    We use the ERC-721A standard for our <a href='https://etherscan.io/token/0xe82c0828ff43e58ec10009b379aeb6296ae9d104' className='underline hover:no-underline'>smart contract</a><br />
                    to make your gas fee as funny as our project too<br /><br />
                    {accounts && <span className='text-xs sm:text-md'>Your wallet: {accounts}</span>}
                </p>
            </div>
        </div>
        </>
    )
}

export default Home;