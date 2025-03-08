import React, { useState } from 'react';
import './TicTacToe.css';
import crossimage1 from "../asserts/crossimage1.webp";
import circleimage1 from "../asserts/circleimage1.webp";

export const TicTacToe = () => {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [data, setData] = useState(Array(9).fill(""));
  const [result, setResult] = useState(""); // State to display the result

  const toggle = (e, num) => {
    if (lock || data[num]) {
      return;
    }
    const newData = [...data];
    if (count % 2 === 0) {
      e.target.innerHTML = `<img src='${crossimage1}' alt='X'>`;
      newData[num] = "X";
    } else {
      e.target.innerHTML = `<img src='${circleimage1}' alt='O'>`;
      newData[num] = "O";
    }
    setData(newData);
    setCount((prevCount) => prevCount + 1);
    checkWin(newData);
  };

  const checkWin = (newData) => {
    const winningCombinations = [
      [0, 1, 2], // Top row
      [3, 4, 5], // Middle row
      [6, 7, 8], // Bottom row
      [0, 3, 6], // Left column
      [1, 4, 7], // Middle column
      [2, 5, 8], // Right column
      [0, 4, 8], // Diagonal
      [2, 4, 6], // Anti-diagonal
    ];

    for (const [a, b, c] of winningCombinations) {
      if (newData[a] && newData[a] === newData[b] && newData[a] === newData[c]) {
        won(newData[a]); // Pass the winning symbol
        return;
      }
    }

    // If no winner and all cells filled, it's a draw
    if (!newData.includes("")) {
      setLock(true); // Lock further moves
      setResult("It's a draw!");
    }
  };

  const won = (winner) => {
    setLock(true);
    setResult(`${winner} wins!`); // Display the winner
  };

  const resetGame = () => {
    setData(Array(9).fill(""));
    setCount(0);
    setLock(false);
    setResult(""); // Clear the result
    document.querySelectorAll('.boxes').forEach((box) => {
      box.innerHTML = "";
    });
  };

  return (
    <div className='container'>
      <h1 className="title">Tic Tac Toe Game In <span>React</span></h1>
      <div className="board">
        <div className='row1'>
          <div className='boxes' onClick={(e) => toggle(e, 0)}></div>
          <div className='boxes' onClick={(e) => toggle(e, 1)}></div>
          <div className='boxes' onClick={(e) => toggle(e, 2)}></div>
        </div>

        <div className='row2'>
          <div className='boxes' onClick={(e) => toggle(e, 3)}></div>
          <div className='boxes' onClick={(e) => toggle(e, 4)}></div>
          <div className='boxes' onClick={(e) => toggle(e, 5)}></div>
        </div>

        <div className='row3'>
          <div className='boxes' onClick={(e) => toggle(e, 6)}></div>
          <div className='boxes' onClick={(e) => toggle(e, 7)}></div>
          <div className='boxes' onClick={(e) => toggle(e, 8)}></div>
        </div>
      </div>
      <div className="result">
        <h2>{result}</h2> {/* Display the result */}
      </div>
      <button className="reset" onClick={resetGame}>Reset</button>
    </div>
  );
};
