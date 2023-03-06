import React, { useState, useEffect, useContext } from 'react'
import { Button } from '../componentsIndex'
import Style from './NavBar.module.css'
import { ElectionContext } from '../../context/Context'
import Link from 'next/link'

const NavBar = () => {
const { connectWallet, walletAddr } = useContext(ElectionContext)
const [buttonConnected, setButtonConnected] = useState(false)
  

const itemsArray = [
  {
    item: "Candidates",
    link: "candidates"
  },

  {
    item: "Register Voters",
    link: "register-voters"
  },

  {
    item: "Cast Vote",
    link: "cast-vote"
  },

  {
    item: "Result",
    link: "result"
  }
]


  return (
    <div className={Style.navbar}>
        <p className={Style.logo}>
            PROWESS
        </p>

        <div className={Style.items}>
          {itemsArray.map((el, i) => (
            <div key={i + 1} className={Style.item}>
              <Link href={{ pathname: `${el.link}` }}>{el.item}</Link> 
            </div>
          ))}
        </div>

        <div className= {Style.button}>
            <Button btnName={walletAddr && walletAddr.length > 0 ? "Connected" : "Connect"} handleClick={connectWallet} />
        </div>
        
    </div>
  )
}

export default NavBar