import { range, times, uniq } from "lodash";
import { useRef, useState, useContext, useEffect } from "react";
import styles from './Connect4.module.css';
import { TitleContext } from "../layouts/Game";

const CELL_SIZE = 7;
const WINNING_LEN = 4;
enum CELL_STATE {
  EMPTY,
  PLAYER1,
  PLAYER2,
}

function Slot({ onSlotClick }: { onSlotClick: () => void }) {
  return (
    <button className={ styles.slot } onClick={onSlotClick}>
      +
    </button>
  )
}

function Cell({ state, isHighlighted }: { state: CELL_STATE, isHighlighted: boolean }) {
  const CELL2STYLE = {
    [CELL_STATE.EMPTY]: '',
    [CELL_STATE.PLAYER1]: styles.player1,
    [CELL_STATE.PLAYER2]: styles.player2,
  }

  return (
    <div className={`${styles.cell} ${CELL2STYLE[state]} ${isHighlighted ? styles.highlighted : ''}` } />
  )
}

function findWinner(board: CELL_STATE[]): [CELL_STATE, number[]] {
  const check = (idxs: number[]): CELL_STATE => {
    const values = idxs.map(i => board[i]);
    return uniq(values).length === 1 ? values[0] : CELL_STATE.EMPTY;
  };

  const dirs: [number, number][] = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [-1, -1],
    [1, -1],
  ]

  for (let x = 0; x < CELL_SIZE; x++) {
    for (let y = CELL_SIZE - 1; y >= WINNING_LEN - 1; y--) {
      const idx = y * CELL_SIZE + x;
      if (board[idx] == CELL_STATE.EMPTY)
        break;

      for (const [dx, dy] of dirs) {
        const lastx = x + (WINNING_LEN - 1) * dx;
        if (lastx < 0 || lastx >= CELL_SIZE)
          continue;
        const idxs = times(WINNING_LEN, (i) => idx + dy * i * CELL_SIZE + dx * i);
        const state = check(idxs);
        if (state != CELL_STATE.EMPTY)
          return [state, idxs];
      }
    }
  }
  return [CELL_STATE.EMPTY, []];
}

function Connect4() {
  const [board, setBoard] = useState<CELL_STATE[]>(times(CELL_SIZE * CELL_SIZE, () => CELL_STATE.EMPTY));
  const playerTurn = useRef<(CELL_STATE.PLAYER1 | CELL_STATE.PLAYER2)>(CELL_STATE.PLAYER1);
  const totalTurns = useRef<number>(0);
  const [winner, highlights] = findWinner(board);
  const { setTitle, setDesc } = useContext(TitleContext);
  
  useEffect(() => {
    setTitle("Connect 4")
    setDesc("Ready for some four-in-a-row fun? Drop your colored discs one at a time, aiming to connect four in a row vertically, horizontally, or diagonally. Outsmart your opponent to win!");
  }, [])

  const handleSlot = (x: number) => {
    if (winner != CELL_STATE.EMPTY)
      return
    for (let y = CELL_SIZE-1; y >= 0; y--) {
      const idx = y * CELL_SIZE + x;
      if (board[idx] == CELL_STATE.EMPTY) {
        const newBoard = [...board];
        newBoard[idx] = playerTurn.current;
        setBoard(newBoard);
        totalTurns.current++;
        break;
      }
    }
    playerTurn.current = playerTurn.current == CELL_STATE.PLAYER1 ? CELL_STATE.PLAYER2 : CELL_STATE.PLAYER1;
  }

  return <div className={`${styles.root}`}>
    <div>
      {range(0, CELL_SIZE).map(x => 
        <Slot key={x} onSlotClick={() => handleSlot(x)}/>
      )}
    </div>
    {range(0, CELL_SIZE).map(y =>
      <div key={y}>
        {range(0, CELL_SIZE).map(x => {
          const idx = y * CELL_SIZE + x;
          return <Cell key={idx} state={board[idx]} isHighlighted={highlights.includes(idx)} />
        })}
      </div>
    )}
  </div>
}

export default Connect4;