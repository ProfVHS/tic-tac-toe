import React from 'react'

interface ScoreboardProps{
    xWins: number,
    oWins: number
}

function Scoreboard({xWins, oWins}: ScoreboardProps) {
    return (
        <div className='scoreboard'>
            <div>Player X</div>
            <div>{xWins}</div>
            <div>Player O</div>
            <div>{oWins}</div>
        </div>
    )
}

export default Scoreboard