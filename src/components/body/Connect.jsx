const Connect = ({ connectToWallet }) => {
    return (
        <>
            <p className='font-mont mb-10 p-3'>
                A project about crazy girls who get mad when something unfair happens.<br />
                They want to get their way, and will to cut off their treasure for it.<br />
                They will definitely do it.
            </p>
            <button onClick={connectToWallet} className='btn__connect font-segoe font-bold text-[25px] sm:text-[42px] hover:brightness-75 mb-3'>Connect Wallet</button>
            <p className='font-segoe font-bold text-[25px] sm:text-[42px]'>
                Do it for me or I...
            </p>
        </>
    );
  };
  
export default Connect;