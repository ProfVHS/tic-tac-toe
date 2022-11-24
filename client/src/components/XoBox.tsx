import React from 'react'

import {GameState, PlayerTurn } from '../type';

interface XoBoxProps{
    value: ('' | 'X' | 'O');
    onChange: () => void;
    whoWon: PlayerTurn | null;
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