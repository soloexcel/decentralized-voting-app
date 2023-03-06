import React from 'react'
import Style from './Card.module.css'
import Button from '../Button/Button'
import Image from 'next/image'
import images from '../../assets'

const Card = () => {

  const menu = [
    {
      Candidates: "Candidates"
    }
    
  ]
  return (
        <div className={Style.main}>

          <div className={Style.sideBar}>
             
          </div>

          <div className={Style.board}>

          </div>
            
        </div>
  )
}

export default Card



{/* <div className={Style.card1}>
                <Image src={images.ballotbox} className={Style.ballotbox} />
            </div>

            <div className={Style.card2}>
            <h2>You Matter, Let Your Vote Count.</h2>
            <p>Vote with ease and security using our trusted DApp. Participate in democracy anywhere, anytime. Make your voice heard today.</p>
            
            <span className={Style.arrow}>&#8595;</span>
            
            <Button  btnName='Get Started' handleClick={()=> {}}/>
            </div>

            <div className={Style.card3}>
              <Image src={images.fingerprint1} className={Style.fingerprint} />
            </div> */}
