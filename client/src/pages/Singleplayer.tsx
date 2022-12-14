import React, { useEffect, useRef, useState } from 'react'
import Scoreboard from '../components/Scoreboard';
import XoBox from '../components/XoBox'

import { GameState, PlayerTurn, WhoWon } from '../type';


const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkWin = (gameState: GameState, playerTurn: PlayerTurn) => {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return gameState[index] === playerTurn
    })
  })
}
const Singleplayer = () => {
  const defaultGameState: GameState = ['', '', '', '', '', '', '', '', '']
  const [gameState, setGameState] = useState<GameState>(defaultGameState)
  const playerTurn = useRef<PlayerTurn>('X')
  const [whoWon, setWhoWon] = useState<WhoWon>(null)

  const [xWins, setXWins] = useState<number>(0)
  const [oWins, setOWins] = useState<number>(0)

  useEffect(() => {
    setWhoWon(null)
  }, [])

  const handleBoxChange = (boxIndex: number) => {
    const newGameState = gameState.map((element, index) => {
      return index === boxIndex ? playerTurn.current : element;
    })

    setGameState(newGameState);

    if (checkWin(newGameState, playerTurn.current)) {
      setWhoWon(playerTurn.current)
      playerTurn.current === 'X' ? setXWins(xWins + 1) : setOWins(oWins + 1);
    }

    if (!newGameState.includes("")) {
      setWhoWon("DRAW")
    }

    playerTurn.current = playerTurn.current === 'X' ? 'O' : 'X';
  }

  const restartGame = () => {
    setGameState(defaultGameState)
    setWhoWon(null);
  }

  return (
    <div className='wrapper'>
      <Scoreboard xWins={xWins} oWins={oWins} />
      <div className='grid'>
        <XoBox whoWon={whoWon} onChange={() => handleBoxChange(0)} value={gameState[0]} />
        <XoBox whoWon={whoWon} onChange={() => handleBoxChange(1)} value={gameState[1]} />
        <XoBox whoWon={whoWon} onChange={() => handleBoxChange(2)} value={gameState[2]} />
        
        <XoBox whoWon={whoWon} onChange={() => handleBoxChange(3)} value={gameState[3]} />
        <XoBox whoWon={whoWon} onChange={() => handleBoxChange(4)} value={gameState[4]} />
        <XoBox whoWon={whoWon} onChange={() => handleBoxChange(5)} value={gameState[5]} />
        
        <XoBox whoWon={whoWon} onChange={() => handleBoxChange(6)} value={gameState[6]} />
        <XoBox whoWon={whoWon} onChange={() => handleBoxChange(7)} value={gameState[7]} />
        <XoBox whoWon={whoWon} onChange={() => handleBoxChange(8)} value={gameState[8]} />
      </div>
      {whoWon && <div className='result'>
          <span>{whoWon !== "DRAW" && whoWon ? `User ${whoWon} won!` : 'DRAW'}</span>
          <button className='result__btn' onClick={() => restartGame()} >NEW GAME</button>
        </div>}
    </div>
  )
}

export default Singleplayer