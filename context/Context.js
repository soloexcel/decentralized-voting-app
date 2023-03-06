import React, { useState, useEffect } from 'react'
import {ethers} from 'ethers'
import Web3Modal from 'web3modal'
import { contractAddress, electionABI } from './config'


// const contractDetails = (signer) => new ethers.Contract(contractAddress, electionABI, signer);

const fetchContract = (signerOrProvider) =>
  new ethers.Contract(
    contractAddress,
    electionABI,
    signerOrProvider
  );

const contractConnection = async ()=>{
  const web3Modal = new Web3Modal()
  const connectivity = await web3Modal.connect();
  const node = new ethers.providers.Web3Provider(connectivity)
  const signer = node.getSigner();
  const  contract = fetchContract(signer);
  return contract;
}

export const ElectionContext = React.createContext();
export const ContextProvider = ({ children }) => {
  const [actualVoters, setActualVoters] = useState([]);
  const [walletAddr, setWalletAddr] = useState("")
  const [names,setNames] = useState("");

  useEffect(() => {
    connectedWallet();
    WalletTracker();
  }, [])
  
  // connect wallet
  const connectWallet = async () => {
      if(typeof window != "undefined" && typeof window.ethereum != "undefined") {
        try {
          const accounts = await window.ethereum.request({method: "eth_requestAccounts", });
          console.log(accounts[0])
          setWalletAddr(accounts[0])
        } catch (error) {
          console.log(error.message)
        }
      } else {
        // metamask is not installed.
        console.log("Please install metamask.")
      }
  };

  const connectedWallet = async () => {
    if(typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({method: "eth_accounts",});
        if (accounts.length > 0) {
          console.log(accounts[0])
          setWalletAddr(accounts[0])
        } else( console.log("Use Connect button to connect your Metamask."))
      } catch (error) {
        console.log(error.message)
      }
    } else {
      // metamask is not installed.
      console.log("Please install metamask.")
    }
};

const WalletTracker = async () => {
  if(typeof window != "undefined" && typeof window.ethereum != "undefined") {
    
    window.ethereum.on("accountsChanged", (accounts) => {
      setWalletAddr(accounts[0])
      console.log(accounts[0])
    })
  } else {
    // metamask is not installed.
    setWalletAddr("")
    console.log("Please install metamask.")
  }
};

// contestants, and voting start date and end date timestamps
const candidates = async (candidateNames, votingStartTime, votingEndTime, minVotes) => {
  
// Create a new date instance with the desired date and time
// Convert the timestamp to a Date object
// NOTE: vst means votingStartTime
// NOTE: vet means votingEndTime
setNames(candidateNames);
console.log("candidates   :   " + candidateNames)
const vst = new Date(votingStartTime);
const vet = new Date(votingEndTime);
const currentTimestampInSeconds = Math.round(Date.now() / 1000);
// Get the Unix timestamp in seconds
const startTimeStamp = Math.floor(vst.getTime() / 1000);
const endTimeStamp = Math.floor(vet.getTime() / 1000);

console.log(startTimeStamp); // sample in Unix : 1687988580
console.log(endTimeStamp);
  
  if( currentTimestampInSeconds < startTimeStamp){
    try{
  const contract = await contractConnection();
  await contract.contestants(candidateNames, startTimeStamp,endTimeStamp, minVotes);
  console.log("transaction succesful")
  }catch(error){
    console.log(error);
    // const errorString = error.data.message;
    // const reason = errorString.replace(
    //   /[^a-zA-Z0-9 ]/g,
    //   ""
    // );
    alert(`${error.message}`);
  }
}else{
  alert("Sorry Starttime cant be in the past pick a time higher than current time")
}
  

}

const getVTEnd = async()=>{
  try{
    if(walletAddr){
      const contract = await contractConnection();
      const vtEndTime = await contract.getVotingEnd();
      console.log("end time is near context " + vtEndTime)
      return vtEndTime;
    }
  }catch(error){
    alert(error)
  }
}
 

//Register a voter
const registerVoter = async() => {

  try{
    if (walletAddr)
  {
    const contract = await contractConnection();
    await contract.registerVoter();
    alert(`${walletAddr} has been registered to vote you're ready to cast your vote once voting begins`)
    console.log(`${walletAddr} has been registered to vote you're ready to cast your vote once voting begins`)
  }
    else{
      alert("please connect wallet");
    }} catch(error){
      console.log(error.message);
      // const errorString = error.data.message;
      // const reason = errorString.replace(
      //   /[^a-zA-Z0-9 ]/g,
      //   ""
      // );
      alert(`registration unsucessful : ${reason} please come back to this page to try again`);
    }
}


// cast vote 

const getVotingStart = async()=>{
  try{
    if(walletAddr){
      const contract = await contractConnection();
      const vtStartTime = await contract.getVotingStart();
      console.log("start time context " + vtStartTime)
      return vtStartTime;
    }
  }catch(error){
    alert(error)
  }
}
const castVote = async (candidateIndex)=>{
  console.log("function triggered")
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  
  console.log(currentTimestampInSeconds)
  try{
    if (walletAddr){
        const contract = await contractConnection();
        const startTime = await getVotingStart()
        const endTime = await getVTEnd();
        console.log(startTime + " " + endTime )
        if (currentTimestampInSeconds>=startTime.toNumber() && currentTimestampInSeconds < endTime.toNumber()){
          await contract.castVote(candidateIndex);
        }else{
          alert("Sorry Voting either hasn't started yet or voting is Over")
        }
    }else{
      alert(`please connect wallet`);
      console.log("please connect wallet")
    }
  }catch(error){

    console.log(error);
    const errorString = error.data.message;
    const reason = errorString.replace(
      /[^a-zA-Z0-9 ]/g,
      ""
    );
    alert(`couldn't cast vote : ${reason} please come back to this page to try again`);
  }
}
// define voters function outside of component
const voters = async () => {
  const votersInfo = [];

  try {
    const contract = await contractConnection();
    const registeredVoters = await contract.getRegisteredVoters();

    // use Promise.all to wait for all the async calls to complete
    await Promise.all(
      registeredVoters.map(async (address, index) => {
        const voted = await contract.getVoterHasVoted(address);
        const votedFor = await contract.getVotedFor(address);
        const formatted = ethers.utils.formatUnits(votedFor.toString());

        const voterInfo = {
          voteraddress: address,
          hasVoted: voted,
          votedFor: votedFor.toNumber()
        };
        votersInfo.push(voterInfo);
      })
    );

    // update state variable with local variable in a single call
    setActualVoters(votersInfo);
    
  } catch (error) {
    console.log(error);
    alert(`${error} : transaction unsuccessful`);
  }
};
// to display candidates and vote count
const getCandidate = async (candidateIndex) => {
  try {
    if (walletAddr) {
      const contract = await contractConnection();
      const result = await contract.getCandidate(candidateIndex);
      const candidates = [result[0], result[1].toNumber()];
      console.log(candidates);
      return candidates;
    } else {
      alert("Please connect wallet!!");
    }
  } catch (error) {
    console.log("Error transaction unsuccessful: " + error);
    alert("Error transaction unsuccessful: " + error);
  }
};

const getCandidateLength = async()=>{
  try{
    if(walletAddr){
const contract = await contractConnection()

const length  = await contract.getCandidatesLength()
console.log("Length of candidates "+ length)
return length.toNumber();
    }else{
      //alert("please install metamask")
    }
  }catch(error){
    alert(error + "transaction unsuccessfu;")
  }
}
const isVotingEnd = async ()=>{
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  
  console.log("function triggered" + " " + currentTimestampInSeconds)
  try{
    if(walletAddr){
      const endTime = await getVTEnd();
      console.log("end time " + endTime)
       
      const isVotingEnded = currentTimestampInSeconds > endTime.toNumber()
    
      if (isVotingEnded) {
        console.log("Voting has ended");
      } else {
        console.log("Voting is still open");
      }
      return isVotingEnded;
    }
  }
  catch(error){
    alert(error + "Transaction successful")
  }
}
const getTotalAndWinner = async ()=>{
  console.log("function triggered")
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  try{
    if (walletAddr){
      console.log("yay we're here ")
      const contract = await contractConnection();
      console.log("contract connected")
      const endTime = await getVTEnd();
      console.log("end Time gotten " + endTime)
      if (currentTimestampInSeconds >= endTime){
      const winner = await contract.getWinner();
      const totalVotes = await contract.getTotalVotes();
      console.log(totalVotes.toNumber() + " testing " + winner)
      return { totalVotes: totalVotes.toNumber(), winner };
      }else{
        return ("Voting result to be displayed after voting has ended", "vote Count yet to be correlated")
      }
  }}catch(error){
    alert(error + "transaction unsuccessful")
  }
}

  return (
    <ElectionContext.Provider value = {{ connectWallet,getVTEnd,connectedWallet,voters,getCandidate,getCandidateLength,actualVoters,voters,walletAddr, fetchContract, registerVoter, castVote, candidates,getTotalAndWinner,isVotingEnd}}>
        { children }
    </ElectionContext.Provider>
  );
};

