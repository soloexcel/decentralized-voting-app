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
      <div className={Style.intro}>
        <h1>Welcome !!!, Be at liberty to make your choice.</h1>
        {/* <Button btnName='Get Started' handleClick={() => {router.push("/candidates")}}/> */}
        <image></image>
      </div>



      
      <div className={Style.guide}>
          <div className={Style.admin}>
            <h3>... an helping hand for getting started. </h3>
            <p>"Admin -owner of the contract has the ability to create an election, add candidates, set the start and end time of the voting period, and end the voting period. Follow these steps to create and manage an election:"</p>
            <p>Connect your wallet to the dapp</p>
            <p>Click the 'Shortlist Candidates' link</p>
            <p>Enter the details of the election such as candidate names, start and end time of the voting period.</p>
            <p>Click the 'Shortlist' button to add the candidates one at a time to the election"</p>
            <p>The vote in session starts immediately the timestamps are met.</p>
          </div>

          <div className={Style.voter}>
            <h3>Voters have the final say !!!. </h3>
            <p>As a voter , you have the ability to register to vote, view the list of candidates, and cast your vote. Follow these steps to cast your vote:</p>
            <p>Connect your wallet to the dapp</p>
            <p>Click the 'Register to Vote' button</p>
            <p>Once registered, view the list of candidates and select the candidate you want to vote for</p>
            <p>Click the 'Cast Vote' button to submit your vote.</p>
          </div>
      </div>

    </div>
  )
}


export default Home;


