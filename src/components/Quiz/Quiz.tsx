// src/components/Quiz.tsx
import React, { useState , useEffect} from 'react';
import { questions } from '../Quiz/questions.ts';

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [timer, setTimer] = useState(10); // Temporizador de 10 segundos
    const [gameStarted, setGameStarted] = useState(false); // Estado para manejar la pantalla de inicio

    useEffect(() => {
        if (gameStarted && timer > 0) {
            const timerId = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(timerId);
        } else if (timer === 0) {
            handleNextQuestion();
        }
    }, [timer, gameStarted]);

    const handleAnswerOptionClick = (option: string) => {
        setSelectedOption(option);
        if (option === questions[currentQuestion].answer) {
            setScore(score + 1);
            setResponseMessage("¡Correcto!");
        } else {
            setResponseMessage("Incorrecto. La respuesta correcta es: " + questions[currentQuestion].answer);
        }

        setTimeout(() => {
            handleNextQuestion();
        }, 2000); // Mostrar el mensaje por 2 segundos
    };

    const handleNextQuestion = () => {
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
            setSelectedOption("");
            setResponseMessage("");
            setTimer(10); // Reiniciar el temporizador
        } else {
            setShowScore(true);
        }
    };

    const startGame = () => {
        setGameStarted(true);
        setTimer(10); // Iniciar el temporizador
        console.log('llego');
        
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-4">
            <h1 className="text-4xl font-extrabold mb-8 text-blue-600">
                Juego de Preguntas: Unidades de almacenamiento
            </h1>

            {!gameStarted ? (
                <div className="text-center bg-white p-6 rounded-lg shadow-lg">
                    <p className="text-2xl font-semibold text-gray-700 mb-4">
                        ¡Bienvenido al Juego de Preguntas!
                    </p>
                    <button
                        className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition"
                        onClick={startGame}
                    >
                        Iniciar Juego
                    </button>
                </div>
            ) : showScore ? (
                <div className="text-center bg-white p-6 rounded-lg shadow-lg">
                    <p className="text-2xl font-semibold text-gray-700 mb-4">
                        ¡Has terminado!
                    </p>
                    <p className="text-xl mb-4">
                        Tu puntuación es <span className="font-bold">{score}</span> de{" "}
                        <span className="font-bold">{questions.length}</span>
                    </p>
                    <button
                        className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition"
                        onClick={() => {
                            setCurrentQuestion(0);
                            setScore(0);
                            setShowScore(false);
                            setGameStarted(false); // Volver a la pantalla de inicio
                        }}
                    >
                        Jugar de nuevo
                    </button>
                </div>
            ) : (
                <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow-lg">
                    <p className="text-xl font-semibold text-gray-700 mb-6">
                        Pregunta {currentQuestion + 1}/{questions.length}:
                    </p>
                    <p className="text-lg text-gray-600 mb-6">
                        {questions[currentQuestion].question}
                    </p>
                    <div className="flex flex-col gap-4">
                        {questions[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                className={`py-3 px-4 rounded-lg shadow border border-gray-200 hover:bg-blue-100 hover:border-blue-300 transition ${
                                    selectedOption === option ? "bg-blue-300 border-blue-500" : ""
                                }`}
                                onClick={() => handleAnswerOptionClick(option)}
                                disabled={selectedOption !== ""}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    {responseMessage && (
                        <p className="text-lg font-semibold text-red-500 mt-4">
                            {responseMessage}
                        </p>
                    )}
                    <p className="text-lg font-semibold text-gray-700 mt-4">
                        Tiempo restante: {timer} segundos
                    </p>
                </div>
            )}
        </div>
    );
};

export default Quiz;