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
      <thead className={Style.thead}>
        <tr>
          <th>CONTESTANTS</th>
          <th>VOTE</th>
        </tr>
      </thead>
      <tbody>
        {shortlistedNames.map((name, index) => (
          <tr key={index}>
            <td className={Style.tableData}>{name}</td>
            <td className={Style.tableData}><Button btnName='Vote' handleClick={() => {
               castVote(index)
               alert("if no glitches, continue to the result page.")
               }}/></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CandidateTable;