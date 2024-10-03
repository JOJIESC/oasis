import React, { useState, useEffect } from 'react';
import { questions } from '../Quiz/questions.ts';
import BackButton from '../BackButton.jsx';

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
        }, 1000); // Mostrar el mensaje por 2 segundos
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
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-4">
            <BackButton />
            <h1 className="text-4xl font-extrabold mb-8 text-blue-600">
                Juego de Preguntas: Unidades de almacenamiento
            </h1>

            {!gameStarted ? (
                <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold text-blue-900 mb-4">
                    ¡Bienvenido al Juego de Preguntas!
                </h2>
            
                {/* Instrucciones sobre el video */}
               
                    <span className="block font-bold text-green-500">¡Presta atención y luego intenta obtener la máxima puntuación!</span>

                <div className="flex justify-center mb-6">
                <video className="w-full max-w-lg rounded-lg shadow-lg" controls>
                        <source src="/VideoQuiz.mp4" type="video/mp4" />
                        Tu navegador no soporta la etiqueta de video.
        </video>
    </div>

  {/* Botón para iniciar el juego */}
  <button
        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-lg rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition duration-300 ease-in-out"
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
        // Reiniciar el estado del juego
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setSelectedOption("");  // Limpiar opción seleccionada
        setResponseMessage(""); // Limpiar retroalimentación
        setTimer(10);           // Reiniciar temporizador
        setGameStarted(false);   // Volver a la pantalla de inicio
    }}
>
    Jugar de nuevo
</button>
                </div>
            ) : (
                <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow-lg flex flex-col justify-center items-center">
    <p className="text-xl font-semibold text-gray-700 mb-6 text-center">
        Pregunta {currentQuestion + 1}/{questions.length}:
    </p>
    <p className="text-lg text-gray-600 mb-6 text-center">
        {questions[currentQuestion].question}
    </p>
    <div className="flex flex-col gap-4 w-full">
        {questions[currentQuestion].options.map((option, index) => (
            <button
                key={index}
                className={`py-3 px-4 rounded-lg shadow border border-gray-200 hover:bg-blue-100 hover:border-blue-300 transition ${
                    selectedOption === option ? (option === questions[currentQuestion].answer ? "bg-green-300 border-green-500" : "bg-red-300 border-red-500") : ""
                }`}
                onClick={() => handleAnswerOptionClick(option)}
                disabled={selectedOption !== ""}
            >
                {option}
            </button>
        ))}
    </div>

    {/* Mensaje retroalimentación */}
    {responseMessage && (
        <p
            className={`text-lg font-semibold mt-4 text-center ${
                selectedOption === questions[currentQuestion].answer ? "text-green-500" : "text-red-500"
            }`}
        >
            {responseMessage}
        </p>
    )}

    {/* Temporizador con barra de progreso que cambia de color */}
    <div className="mt-6 w-full">
        <p className="text-lg font-semibold text-center text-gray-700 mb-2">Tiempo restante: {timer} segundos</p>
        <div className="w-full bg-gray-200 rounded-full h-4">
            <div
                className={`h-4 rounded-full transition-all ${
                    timer <= 4 ? "bg-red-500" : "bg-green-500"
                }`}
                style={{ width: `${(timer / 10) * 100}%` }}
            ></div>
        </div>
    </div>
</div>
            )}
        </div>
    );
};

export default Quiz;
