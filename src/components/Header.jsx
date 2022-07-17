import React from 'react'

import girl1 from '../components/images/girl01.png'
import girl2 from '../components/images/girl02.png'
import girl3 from '../components/images/girl03.png'
import girl4 from '../components/images/girl04.png'
import clouds from '../components/images/clouds0.png'
import header from '../components/images/header_mobile.png'

export default function Header() {
  return (
    <header className=' mb-10 px-[30px] sm:px-[100px] pt-5 bg-main-blue'>
      <div className='header__col mx-auto flex justify-between max-w-[1900px]'>
        <div className="header__row sm:flex hidden">
          <img src={girl1} />
        </div>
        <div className="header__row sm:flex hidden">
          <img src={girl2} />
        </div>
        <div className="header__row sm:flex hidden">
          <img src={clouds} className='pb-5' />
        </div>
        <div className="header__row sm:flex hidden">
          <img src={girl3} />
        </div>
        <div className="header__row sm:flex hidden">
          <img src={girl4} />
        </div>
        <div className="header__row sm:hidden">
          <img src={header} />
        </div>
      </div>
    </header>
  )
}
