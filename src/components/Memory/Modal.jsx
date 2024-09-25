export const Modal = ({
	gameOver,
	gameLost,
	setGameOver,
	moves,
	handleNewGame,
}) => {
	return (
		<div
			className={`${
				gameOver || gameLost ? 'flex' : 'hidden'
			} flex-col justify-center items-center gap-7 bg-black absolute w-[250px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 rounded-lg`}
		>
			<button
				className='text-white font-bold absolute right-0 top-0 mr-3 hover:text-yellow-500 text-2xl'
				onClick={() => setGameOver(false)}
			>
				×
			</button>

			<h1 className='text-white uppercase text-3xl font-bold tracking-wider'>
				{gameLost ? '¡Perdiste!' : '¡Ganaste!'}
			</h1>

			<div className='flex justify-between gap-10'>
				<p className='text-white'>Movimientos:</p>
				<p className='text-white'>{moves}</p>
			</div>

			<button
				className='bg-yellow-500 font-semibold text-black rounded-md px-5 py-1 hover:opacity-90'
				onClick={handleNewGame}
			>
				Nuevo Juego
			</button>
		</div>
	);
};
