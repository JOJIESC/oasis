import { useEffect, useState } from "react";
import { imgs } from "../../script/Memory/Dispositivos";
import { Card } from "./Card";
import { Modal } from "./Modal";
import BackButton from "../BackButton";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const MOVE_LIMIT = 35;

export const Board = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [gameLost, setGameLost] = useState(false);

  const createBoard = () => {
    const duplicatecards = imgs.flatMap((img, i) => {
      const duplicate = {
        ...img,
        id: img.id + imgs.length,
      };
      return [img, duplicate];
    });

    const newCards = shuffleArray(duplicatecards).map((card) => ({
      ...card,
      flipped: false,
      matched: false,
    }));
    setCards(newCards);
  };

  useEffect(() => {
    createBoard();
  }, []);

  const handleCardClick = (id) => {
    if (isDisabled) return;

    const newCards = cards.map((card) => {
      if (card.id === id && !card.flipped && !card.matched) {
        card.flipped = true;
        const newFlippedCards = [...flippedCards, card];
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) {
          setIsDisabled(true);
          const [firstCard, secondCard] = newFlippedCards;

          if (firstCard.img === secondCard.img) {
            firstCard.matched = true;
            secondCard.matched = true;
            setIsDisabled(false);
          } else {
            setTimeout(() => {
              firstCard.flipped = false;
              secondCard.flipped = false;
              setCards([...newCards]);
              setIsDisabled(false);
            }, 1000);
          }

          setFlippedCards([]);
          setMoves((prevMoves) => {
            const newMoves = prevMoves + 1;
            if (newMoves >= MOVE_LIMIT) {
              setGameLost(true);
              setIsDisabled(true);
            }
            return newMoves;
          });
        }
      }
      return card;
    });

    setCards(newCards);

    if (newCards.every((card) => card.matched)) {
      setGameOver(true);
      setIsDisabled(true);
    }
  };

  const handleNewGame = () => {
    createBoard();
    setMoves(0);
    setGameOver(false);
    setGameLost(false);
    setIsDisabled(false);
  };

  return (
    <>
      <BackButton />
      {(gameOver || gameLost) && (
        <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
      )}

      <div className="relative h-screen flex items-center">
        <div className="mx-auto flex flex-col justify-center items-center">
          <h1 className="font-bold text-xl my-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-blue-500 hover:to-green-500 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 md:text-5xl">
            Dispositivos de entrada y salida
          </h1>
          <div className="grid grid-cols-6 gap-3 justify-center items-center px-3 py-5 my-3">
            {cards.map((card) => (
              <Card
                card={card}
                key={card.id}
                handleCardClick={handleCardClick}
              />
            ))}
          </div>
          <button
            className="bg-black font-semibold text-white rounded-md px-5 py-1 hover:bg-yellow-500 hover:text-black transition-all mb-3"
            onClick={handleNewGame}
          >
            Nuevo Juego
          </button>
        </div>

        <Modal
          gameOver={gameOver}
          gameLost={gameLost}
          setGameOver={setGameOver}
          moves={moves}
          handleNewGame={handleNewGame}
        />
      </div>
    </>
  );
};
