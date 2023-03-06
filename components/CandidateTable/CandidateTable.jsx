import React, { useState, useContext } from 'react';
import { Button } from '../componentsIndex';
import Style from './CandidateTable.module.css'
import { ElectionContext } from '../../context/Context';
import Candidate from '../../pages/candidates';
import { useRouter } from 'next/router';
const CandidateTable = ({ shortlistedNames }) => {
  const router = useRouter();

  const { castVote } = useContext(ElectionContext)
  return (
    <table className={Style.table}>
      <thead>
        <tr>
          <th>Shortlisted Names</th>
          <th>Vote</th>
        </tr>
      </thead>
      <tbody>
        {shortlistedNames.map((name, index) => (
          <tr key={index}>
            <td className={Style.tableData}>{name}</td>
            <td className={Style.tableData}><Button btnName='Vote' handleClick={() => {
               castVote(index)
               alert("If you didnt get an error message to try again move along the result page to see result")
               }}/></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CandidateTable;