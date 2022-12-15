import React, { useEffect, useState } from 'react'

const Timer = () => {
    const [timerDays, setTimerDays] = useState();
    const [timerHours, setTimerHours] = useState();
    const [timerMinutes, setTimerMinutes] = useState();
    const [timerSeconds, setTimerSeconds] = useState();

    let interval;

    const startTimer = () => {
        const countDownDate = new Date('December 25, 2022 9:00:00 UTC');

        interval = setInterval( () => {
            const now = new Date().getTime();
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
            <p className='font-segoe font-bold text-[25px] sm:text-[42px]'>
                Do it for me or I...
            </p>
        </>
    );
  };

export default Timer;