import { useState } from 'react'
import { useRouter } from 'next/router'
import React from 'react'
import { Button } from '../components/componentsIndex'
import Style from '../styles/index.module.css'
// import { Card, Footer, NavBar } from '../components/componentsIndex'

const Home = () => {
const router = useRouter()
  const handler = () => {

  }

  return (
    <div className={Style.main}>
      <div className={Style.HeroSection}>
      <p>
        Vote Decentralized application click on the get started button to register voting candidates 
      </p>
      </div>
     

      <Button btnName='Get Started' handleClick={() => {router.push("/candidates")}}/>

    </div>
  )
}


export default Home;


