import React from "react";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <div className="wrapper">
      <div className="card">
        <span className="card__title">Tic Tac Toe</span>
        <Link to="/singleplayer"><button className="card__button">Singleplayer</button></Link>
        <Link to="/multiplayer"><button className="card__button">Multiplayer</button></Link>
      </div>
    </div>
  );
};

export default App;
