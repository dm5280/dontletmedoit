import React, { useState } from "react";

import minus from '../images/-.png';
import plus from '../images/+.png';

const Mint = () => {
    let [count, setCount] = useState(1);

    function incrementCount() {
        count = count + 1;
        if (count >= 10 ) count = 10
        setCount(count);
    }
    function decrementCount() {
        count = count - 1;
        if (count <= 1 ) count = 1
        setCount(count);
    }

    return (
        <>
            <p className='font-segoe font-bold mb-5 text-xl'>
                1-3 NFT - 0.01 ETH each<br />
                4-10 NFT - 0.00 ETH each
            </p>
            <div className="flex items-center justify-center font-segoe max-w-100 text-4xl font-bold mb-10">
                <button></button>
                <img src={minus} onClick={decrementCount} className="pic__calc mr-5 w-[35px] hover:brightness-75" alt="minus" />
                {count}
                <img src={plus} onClick={incrementCount} className="pic__calc ml-5 w-[35px] hover:brightness-75" alt="plus" />
            </div>
            <button className='btn__mint font-segoe font-bold text-[25px] sm:text-[42px] hover:brightness-75 mb-3'>Mint</button>
            <p className='font-segoe font-bold mb-5 text-[25px] sm:text-[42px]'>
                Do it for me or I...
            </p>
            <div className="flex justify-center font-segoe text-white font-semibold sm:text-base text-[10px] md:px-0 px-2">
                <p className="px-2 sm:px-6 py-2 bg-[#21A0F0]">1 NFT - 10% get rare</p>
                <p className="px-2 sm:px-6 py-2 bg-[#0682CF]">3 NFT - 30% get rare</p>
                <p className="px-2 sm:px-6 py-2 bg-[#0D60A8]">5 NFT - 50% get rare</p>
            </div>
        </>
    );
  };
  
export default Mint;