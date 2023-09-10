import { useState, useEffect, useContext } from "react";
import { range } from "lodash";
import { TitleContext } from "../layouts/Game";
import styles from './TicTacToe.module.css';

function Cell({ value, onCellClick }: {value: string, onCellClick: () => void}) {
  return (
    <button onClick={onCellClick}>
      {value}
    </button>
  )
}

function findWinner(pieceMask: number, playerMask: number) {
  const winningStates = [
    0b001001001,
    0b010010010,
    0b100100100,
    0b000000111,
    0b000111000,
    0b111000111,
    0b100010001,
    0b001010100,
  ];

  for (const winningState of winningStates) {
    const hasWon = [playerMask, ~playerMask].map(x => x & winningState & pieceMask).includes(winningState);
    if (!hasWon)
      continue
    const winningPlayer = ((winningState & playerMask) > 0) ? 1 : 0;
    console.log(winningState.toString(2).padStart(9, '0'));
    return winningPlayer;
  }

  if (pieceMask == 0b111111111)
    return -2;
  return -1;
  
}

function TicTacToe() {
  const [pieceMask, setPieceMask] = useState(0b000000000);
  const [playerMask, setPlayerMask] = useState(0b000000000);
  const [turn, setTurn] = useState(0);
  const [winner, setWinner] = useState(-1);

  let text = '';

  if (winner == -2)
    text = 'Draw!';
  else if (winner == -1)
    text = `It is ${(['O', 'X'])[turn]}'s turn`;
  else
    text = `${(['X', 'O'])[turn]} wins!`;
  
  useEffect(() => {
    setTitle("TicTacToe")
  }, [])

  useEffect(() => {
    setWinner(findWinner(pieceMask, playerMask));
  }, [pieceMask, playerMask]);

  function handleCell(idx: number) {
    if (winner >= 0 || (pieceMask >> idx) & 0b1)
      return;
    setPieceMask(pieceMask | (0b1 << idx));
    setPlayerMask(playerMask | (turn << idx));
    setTurn(turn ^ 0b1);
  }

  return <div className={`${styles.root}`}>
    <center><h1 style={{marginBottom: '32px'}}>{ text }</h1></center>
    <div>
    {range(0, 3).map((y) =>
      <div key={y}>
        {range(0, 3).map((x) => {
          const idx = y * 3 + x;
          const isPlaced = ((pieceMask >> idx) & 0b1) > 0;
          const player = ((playerMask >> idx) & 0b1) > 0;
          return <Cell key={idx} value={isPlaced ? player ? 'X' : 'O' : '-'} onCellClick={() => handleCell(idx)} />
        })}
      </div>
    )}
    </div>
  </div>
}

export default TicTacToe;