import React from 'react'

import {GameState, PlayerTurn, WhoWon } from '../type';

interface XoBoxProps{
    value: ('' | 'X' | 'O');
    onChange: () => void;
    whoWon: WhoWon;
    isPlayerTurn?: boolean;
}

function XoBox({whoWon, value, onChange, isPlayerTurn = true}: XoBoxProps) {
  return (
    <button className={`box ${value}`} onClick={onChange} disabled={value !== '' || whoWon !== null || !isPlayerTurn}>
        {value}
    </button>
  )
}

export default XoBox