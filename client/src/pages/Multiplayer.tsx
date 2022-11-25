import React, { useEffect, useRef, useState } from 'react'
import Scoreboard from '../components/Scoreboard';
import XoBox from '../components/XoBox'

import { GameState, PlayerTurn, WhoWon } from '../type';

import { io } from "socket.io-client";

const socket = io("http://localhost:3001");


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
const Multiplayer = () => {
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
    socket.emit("pass_gameState", { newGameState, playerTurn, room }) // pass game state to second player

    if (checkWin(newGameState, playerTurn.current)) {
      const newWhoWon = playerTurn.current
      setWhoWon(newWhoWon)
      playerTurn.current === 'X' ? setXWins(xWins + 1) : setOWins(oWins + 1);

      const newXwins = playerTurn.current === 'X' ? xWins + 1 : xWins;
      const newOwins = playerTurn.current === 'O' ? oWins + 1 : oWins;

      playerTurn.current === 'X' ? setXWins(newXwins) : setOWins(newOwins);
      socket.emit('pass_gameScore', { newOwins, newXwins, newWhoWon, room }) //pass scores and who win to second player if round end
    }

    if (!newGameState.includes("")) {
      setWhoWon("DRAW")
    }

    playerTurn.current = playerTurn.current === 'X' ? 'O' : 'X';
  }

  const restartGame = () => {
    setGameState(defaultGameState)
    setWhoWon(null);
    socket.emit('restartGame', room)
  }


  //Multiplayer Code

  const [room, setRoom] = useState("");

  const randRoom = (Math.random() + 1).toString(36).substring(7)

  const [inRoom, setInRoom] = useState<PlayerTurn | null>(null);


  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room)
      setInRoom("O")
    }
  }

  const createRoom = () => {
    setRoom(randRoom)
    socket.emit("join_room", randRoom)
    setInRoom("X")
  }

  useEffect(() => {
    socket.on("receive_gameState", (data) => {
      setGameState(data.newGameState)
      playerTurn.current = data.playerTurn.current === 'X' ? 'O' : 'X'
    })
    socket.on("receive_gameScore", (data) => {
      setOWins(data.newOwins)
      setXWins(data.newXwins)
      setWhoWon(data.newWhoWon)
    })
    socket.on("receive_restartGame", () => {
      restartGame();
    })
  }, [socket])

  return (
    <div className='wrapper'>
      {!inRoom && <div className='card'>
        <span className='card__title'>Multiplayer Room</span>
        <button className='card__button' onClick={createRoom}>Create Room</button>
        <span className='card__text'>OR</span>
        <div className='card__group'>
          <input className='card__input' placeholder='Room Code' onChange={(event) => { setRoom(event.target.value) }} />
          <button className='card__button' onClick={joinRoom}>Join Game</button>
        </div>
      </div>}

      {inRoom && <>
        <div className='gameInfo'>
          <h2>You are Player {inRoom}</h2>
          <h1 className='gameInfo__room'>Room: {room}</h1>
          <h2>Turn: Player {playerTurn.current}</h2>
        </div>

        <Scoreboard xWins={xWins} oWins={oWins} />

        <div className='grid'>
          <XoBox whoWon={whoWon} isPlayerTurn={playerTurn.current === inRoom} onChange={() => handleBoxChange(0)} value={gameState[0]} />
          <XoBox whoWon={whoWon} isPlayerTurn={playerTurn.current === inRoom} onChange={() => handleBoxChange(1)} value={gameState[1]} />
          <XoBox whoWon={whoWon} isPlayerTurn={playerTurn.current === inRoom} onChange={() => handleBoxChange(2)} value={gameState[2]} />

          <XoBox whoWon={whoWon} isPlayerTurn={playerTurn.current === inRoom} onChange={() => handleBoxChange(3)} value={gameState[3]} />
          <XoBox whoWon={whoWon} isPlayerTurn={playerTurn.current === inRoom} onChange={() => handleBoxChange(4)} value={gameState[4]} />
          <XoBox whoWon={whoWon} isPlayerTurn={playerTurn.current === inRoom} onChange={() => handleBoxChange(5)} value={gameState[5]} />

          <XoBox whoWon={whoWon} isPlayerTurn={playerTurn.current === inRoom} onChange={() => handleBoxChange(6)} value={gameState[6]} />
          <XoBox whoWon={whoWon} isPlayerTurn={playerTurn.current === inRoom} onChange={() => handleBoxChange(7)} value={gameState[7]} />
          <XoBox whoWon={whoWon} isPlayerTurn={playerTurn.current === inRoom} onChange={() => handleBoxChange(8)} value={gameState[8]} />
        </div>

        {whoWon && <div className='result'>
          <h1>{whoWon !== "DRAW" && whoWon ? `User ${whoWon} won!` : 'DRAW'}</h1>
          {inRoom === "X" && <>
            <button className='result__btn' onClick={() => restartGame()} >NEW GAME</button>
          </>}
        </div>}
      </>}
    </div>
  )
}

export default Multiplayer