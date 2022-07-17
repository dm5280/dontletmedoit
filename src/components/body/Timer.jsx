import React, { useEffect, useState } from 'react'

const Timer = ( { unixTime } ) => {

    const [timerDays, setTimerDays] = useState();
    const [timerHours, setTimerHours] = useState();
    const [timerMinutes, setTimerMinutes] = useState();
    const [timerSeconds, setTimerSeconds] = useState();

    let interval;
    let timeNow = unixTime * 1000;

    const ddate = new Date(1657997339825);
    console.log(ddate)

    const startTimer = () => {
        const countDownDate = new Date('July 21, 2022 12:00:00');

        interval = setInterval( () => {
            //const now = new Date(timeNow);
            const now = new Date().getTime();
            //timeNow += 1000
            const distance = countDownDate - now;

            const days = Math.floor(distance / (24 * 60 * 60 * 1000));
            const hours = Math.floor(distance % (24 * 60 * 60 * 1000) / (1000 * 60 * 60));
            const minutes = Math.floor(distance % (60 * 60 * 1000) / (1000 * 60));
            const seconds = Math.floor(distance % (60 * 1000) / 1000);

            if (distance < 0) {
                //Stop timer
                clearInterval(interval.current);
            } else {
                //Update timer
                setTimerDays(days);
                setTimerHours(hours);
                setTimerMinutes(minutes);
                setTimerSeconds(seconds);
            }
        } )
    }

    useEffect( () => {
        startTimer();
    } )

    return (
        <>
            <p className='font-mont px-3'>
                A project about crazy girls who get mad when something unfair happens.<br />
                They want to get their way, and will to cut off their treasure for it.<br />
                They will definitely do it.
            </p>
            <p className="font-mont font-black md:text-[90px] sm:text-[50px] text-[40px] sm:py-4 py-8">{timerDays}d {timerHours}h {timerMinutes}m {timerSeconds}s</p>
            {/* <iframe src="https://free.timeanddate.com/countdown/i8f1lbso/cf100/cm0/cu4/ct0/cs0/ca0/cr0/ss0/cac000/cpc000/pct/tcfff/fs100/szw320/szh135/tatTime%20left%20to%20Event%20in/tac000/tptTime%20since%20Event%20started%20in/tpc000/mac000/mpc000/iso2022-07-21T15:00:00" allowtransparency="true" frameborder="0" width="320" height="135"></iframe> */}
            <p className='font-segoe font-bold text-[25px] sm:text-[42px]'>
                Do it for me or I...
            </p>
        </>
    );
  };

export default Timer;