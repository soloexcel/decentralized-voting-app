import React, { useState,useEffect,useContext} from 'react';
import { Button } from '../components/componentsIndex';
import Style from '../styles/result.module.css'
import { ElectionContext } from '../context/Context';
const Result = ({ shortlistedNames }) => {

  const { getTotalAndWinner,getCandidate,getCandidateLength,isVotingEnd,getVTEnd} = useContext(ElectionContext)
  const [candidates,setCandidates] = useState([]);
  const [voteCount,setVoteCount] = useState([]);
  const [winner, setWinner] = useState("");
  const [totalVotes,setTotalVotes] = useState(0);
 // const [started,setStarted] = useState(false);
 const rehandleWinners = async   ()=>{
  const votingEnded = await isVotingEnd();
  alert("voting still open : "+ votingEnded)

  if (votingEnded){
   const nada =  await getTotalAndWinner()
   setWinner(nada.winner)
   setTotalVotes(nada.totalVotes)
   console.log(nada);
  }
}
 useEffect(()=>{
 async function handleWinners (){
  const votingEnded = await isVotingEnd();
  console.log("voting "+ votingEnded)

  if (votingEnded){
   const nada =  await getTotalAndWinner()
   setWinner(nada.winner)
   setTotalVotes(nada.totalVotes)
   console.log(nada);
  }
}handleWinners()},[])

  useEffect(() => {
    
    setCandidates([]);
    setVoteCount([]);
    async function populateresult() {
      const tempCands = [];
      const tempVoteCt = [];
      const len = await getCandidateLength();
        for (let i = 0 ; i <len; i ++){
           const cand = await getCandidate(i)
           console.log("candy "+ cand)
           tempCands.push(cand[0]);
           tempVoteCt.push(cand[1]);
        }
        setCandidates(tempCands)
        setVoteCount(tempVoteCt)
      //setCandidates(cands);
    }
    //alert(started)
    populateresult();
  }, [winner,totalVotes]);
  return (
    <div className={Style.result}>
      <table className={Style.table}>
      <thead>
        <tr>
          <th>contestants</th>
          <th>Number Of Votes</th>
        </tr>
      </thead>
      <tbody>
        {candidates && candidates.length > 0 && ( candidates.map((name, index) => (
          <tr key={index}>
            <td className={Style.tableData}>{name}</td>
            {voteCount && voteCount.length>0 && (<td className={Style.tableData}>{voteCount[index]}</td>)}
          </tr>
        )))}
      </tbody>
    </table>
    <div className={Style.winnerSection}>
      <Button btnName={"Display Winners"} handleClick = {()=>{rehandleWinners()}}/>
      <div> {winner && totalVotes && (
       <p> winner of election is : {winner} and totalNumber of Votes is {totalVotes}</p>
      )}</div>
    </div>
    </div>
  );
};

export default Result