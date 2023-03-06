import React, { useContext, useState,useEffect } from 'react'
import { Button } from '../components/componentsIndex'
import Style from '../styles/registerVoters.module.css'
import { ElectionContext } from '../context/Context'
import { useRouter } from 'next/router'
const registerVoters = () => {

    

    const [voterAddr, setVoterAddr] = useState('')
    const router = useRouter();
    const { registerVoter,getCandidate,actualVoters,voters} = useContext(ElectionContext)
    /*const [candidates,setCandidates] = useState([]);
    useEffect(() => {
      async function getCands() {
        const cands = await getCandidate(0);
        setCandidates(cands);
      }
    
      getCands();
    }, [getCandidate, setCandidates]);
    {candidates && candidates.length > 0 && (
    <h4>
      Candidate: {candidates[0]} | Votes:{" "}
      {candidates[1]}
    </h4>
  )}
    
    */


     useEffect( ()=>{
         voters()
     },[actualVoters])
     useEffect( ()=>{
      console.log(actualVoters)
     
  },[])
    // get the input 
    // const onChangeHandler = (e) => {
    //     setVoterAddr(e.target.value)
    // }

  return (
    <div className={Style.registerVoter}> 
    
        <div className={Style.registerfield}>
        PLEASE CLICK BUTTON BELOW TO REGISTER SO YOU'RE ELIGIBLE FOR VOTING
            <Button btnName='Register' handleClick={()=>{
              registerVoter()

              router.push("/cast-vote")
              }}/>
        </div>

<div className={Style.registeredVoter}>
  <h3>List of registered voters and their Status</h3>
{actualVoters && actualVoters.length > 0 && (
  <>
    {actualVoters.map((voter) => (
      <div key={voter.voteraddress} >
        <p className={Style.address}>
          {`${voter.voteraddress.substring(0, 7)}...${voter.voteraddress.substring(35, 42)}`}
          <span className={Style.status}>{voter.hasVoted ? "Voted" : "Yet to Vote"}</span>
        </p>
          
        {/* <p>Voted For: Candidate Number -  {voter.votedFor}</p> */}
      </div>
    ))}
  </>
)}

</div>

    </div>
  )
}


export default registerVoters