import React, { useEffect, useRef, useState } from 'react'
import XoBox from '../components/XoBox'

import { GameState, PlayerTurn } from '../type';


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
  const [whoWon, setWhoWon] = useState<PlayerTurn | null>(null)

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
    }

    playerTurn.current = playerTurn.current === 'X' ? 'O' : 'X';
  }

  const restartGame = () => {
    setGameState(defaultGameState)
    setWhoWon(null);
  }

  return (
    <>
      <XoBox whoWon={whoWon} onChange={() => handleBoxChange(0)} value={gameState[0]} />
      <XoBox whoWon={whoWon} onChange={() => handleBoxChange(1)} value={gameState[1]} />
      <XoBox whoWon={whoWon} onChange={() => handleBoxChange(2)} value={gameState[2]} />
      <br />
      <XoBox whoWon={whoWon} onChange={() => handleBoxChange(3)} value={gameState[3]} />
      <XoBox whoWon={whoWon} onChange={() => handleBoxChange(4)} value={gameState[4]} />
      <XoBox whoWon={whoWon} onChange={() => handleBoxChange(5)} value={gameState[5]} />
      <br />
      <XoBox whoWon={whoWon} onChange={() => handleBoxChange(6)} value={gameState[6]} />
      <XoBox whoWon={whoWon} onChange={() => handleBoxChange(7)} value={gameState[7]} />
      <XoBox whoWon={whoWon} onChange={() => handleBoxChange(8)} value={gameState[8]} />

      <div>{whoWon && <>
        <h1>{`User ${whoWon} won!`}</h1>
        <button onClick={() => restartGame()} >NEW GAME</button>
      </>}
      </div>
    </>
  )
}

export default Singleplayer