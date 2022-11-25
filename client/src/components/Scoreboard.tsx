import React from 'react'

interface ScoreboardProps{
    xWins: number,
    oWins: number
}

function Scoreboard({xWins, oWins}: ScoreboardProps) {
    return (
        <div className='scoreboard'>
            <div className='scoreboard__player X'>Player X</div>
            <div className='scoreboard__player O'>Player O</div>
            <div className='scoreboard__score X'>{xWins}</div>
            <div className='scoreboard__score O'>{oWins}</div>
        </div>
    )
}

export default Scoreboard