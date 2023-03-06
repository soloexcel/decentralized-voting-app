import React, { useContext } from 'react'
import { FaUserAlt } from "react-icons/fa"
import Style from './Status.module.css'
import { ElectionContext } from '../../context/Context'

const Status = () => {

  const { walletAddr } = useContext(ElectionContext)
   return (
    <div className={Style.status}>
      <FaUserAlt className={Style.userIcon}/>
      <p>
        <span>Wallet Address: {`${walletAddr.substring(0, 7)}...${walletAddr.substring(35, 42)}`}</span>
        <span>Status: Voted / Yet to Vote</span>
      </p>
    </div>
  )
}

export default Status