import React, { useContext, useState,useEffect } from 'react'
import Style from '../styles/castVote.module.css'
import { Button, CalculateVoteTime, CandidateTable } from '../components/componentsIndex'
import { ElectionContext } from '../context/Context'

const CastVote = () => {

  const { castVote,getCandidate,getCandidateLength } = useContext(ElectionContext)
  const [candidates,setCandidates] = useState([]);
    useEffect(() => {
      const tempCands = [];
      async function retrieve(){
        const len = await getCandidateLength();
        for (let i = 0 ; i <len; i ++){
           const cand = await getCandidate(i)
          // console.log("candy "+ cand)
           tempCands.push(cand[0]);
        }
        setCandidates(tempCands)
      }
      retrieve()
    },[]);
    useEffect(()=>{
      console.log(candidates)
    },[setCandidates])
    
  return (
    <div className={Style.castVote}>
        {/* <CalculateVoteTime startTime={startISOString} endTime={endISOString}/> */}
       {candidates && ( <CandidateTable shortlistedNames={candidates} />)}
    </div>
  )
}

export default CastVote

// calculateVoteTime('2023-03-02T10:00:00', '2023-03-02T12:30:00');
// const start = new Date('2023-03-02T10:00:00');
// const end = new Date('2023-03-02T12:30:00');

// const startISOString = start.toISOString();
// const endISOString = end.toISOString();