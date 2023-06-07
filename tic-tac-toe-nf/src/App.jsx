import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(true);
  function Square({content, handleSquareClick}){
    return <button className='square border border-black h-20 w-20' onClick={handleSquareClick}>{content}</button>
  }
  function Board(){
    function handleClick(index){
      if(squares[index] != null || calculateWinner(squares)){
        return;
      }
        const nextSquares = squares.slice();
        if(turn){
          nextSquares[index] = 'X';
        }
        else{
          nextSquares[index] = 'O';
        }
        setSquares(nextSquares);
        setTurn(!turn);
    }

    return <div className='grid grid-cols-3 grid-rows-3'>
      
        <Square content={squares[0]} handleSquareClick={() => handleClick(0)} />
        <Square content={squares[1]} handleSquareClick={() => handleClick(1)} />
        <Square content={squares[2]} handleSquareClick={() => handleClick(2)} />
      
      
        <Square content={squares[3]} handleSquareClick={() => handleClick(3)} />
        <Square content={squares[4]} handleSquareClick={() => handleClick(4)} />
        <Square content={squares[5]} handleSquareClick={() => handleClick(5)} />
      
      
        <Square content={squares[6]} handleSquareClick={() => handleClick(6)} />
        <Square content={squares[7]} handleSquareClick={() => handleClick(7)} />
        <Square content={squares[8]} handleSquareClick={() => handleClick(8)} />
      
    </div>
  }

  function Removable({children}){
    const [visible, setVisible] = useState(true);
    const wrapperRef = useRef(null);

    const handleClickOutside = (event) =>{
      if(wrapperRef.current && !wrapperRef.current.contains(event.target)){
        setVisible(false);
      }
    }

    useEffect(() =>{
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    }, []);

    return (
      <div ref={wrapperRef}>
        {visible && <div>{children}</div>}
      </div>
    );
  };

  let winner = calculateWinner(squares);
  let message;
  if(winner === -1){
    message = "Draw!";
  }
  else if(winner){
    message = "The winner is: " + winner;
  }
  else{
    message = "";
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    function checkFull(arr){
      for (let index = 0; index < arr.length; index++) {
        if(arr[index] == null) return false;
      }
      return true;
    }
    return checkFull(squares) ? -1 : null;
  }


  return <>
    { winner && <Removable>
      <div className='screen h-screen fixed top-0 left-0 w-full blur-sm pointer-events-none bg-slate-500 opacity-90'></div>
      <div className='fixed inset-x-2/4 inset-y-2/4 -translate-x-2/4 -translate-y-2/4 p-5 rounded-lg bg-slate-100 w-40 h-fit'>{message}</div>
      </Removable>}
    <div className='h-screen flex justify-center items-center'>
      <Board />
    </div>
    </>
}

export default App
