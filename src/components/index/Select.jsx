import { useState, useEffect } from "react";

function Select() {
  const [selectedGame, setselectedGame] = useState("Hangman");
  useEffect(() => {
    const game = document.getElementById("game");
    game.addEventListener("change", (e) => {
      setselectedGame(e.target.value);
    });
  }, []);
  return (
    <div className="flex flex-col items-center gap-4">
      <p>Choose a game to play</p>
      <div className="flex gap-8">
        <img
          class="w-10 h-auto"
          src={`/icons/${selectedGame}.png`}
          alt="icon"
        />
        <select
          id="game"
          className="bg-gray-50 border w-60 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
        >
          <option value="Hangman">Hangman</option>
          <option value="Quiz">Quiz</option>
          <option value="Memory">Memory</option>
        </select>
      </div>
      <div>
        <button
          className="flex items-center min-w-56 justify-center bg-green-500 rounded-md p-2"
          onClick={() => {
            window.location.href = `/${selectedGame}`;
          }}
        >
          <img
            className="w-5 h-auto"
            src="/public/icons/play.png"
            alt="play icon"
          />
          Play
        </button>
      </div>
    </div>
  );
}

export default Select;
