import { range, times } from "lodash";
import { useRef, useState } from "react";
import styles from './Connect4.module.css';

const CELL_SIZE = 7;
enum CELL_STATE {
  EMPTY,
  PLAYER1,
  PLAYER2,
}

const CELL2STYLE = {
  [CELL_STATE.EMPTY]: '',
  [CELL_STATE.PLAYER1]: styles.player1,
  [CELL_STATE.PLAYER2]: styles.player2,
}

function Slot({ onSlotClick }: { onSlotClick: () => void }) {
  return (
    <button className={ styles.slot } onClick={onSlotClick}>
      +
    </button>
  )
}

function Cell({ state, isHighlighted }: { state: CELL_STATE, isHighlighted: boolean }) {
  return (
    <div className={`${styles.cell} ${CELL2STYLE[state]} ${isHighlighted ? styles.highlighted : ''}` } />
  )
}

function findWinner(board: CELL_STATE[]): [CELL_STATE, number[]] {
  const check = (idxs: number[]) => idxs
    .map(i => board[i])
    .reduce((prev, cur) => prev == cur ? prev : CELL_STATE.EMPTY);

  for (let x = 0; x < CELL_SIZE; x++) {
    for (let y = CELL_SIZE - 1; y >= 3; y--) {
      if (board[y * CELL_SIZE + x] == CELL_STATE.EMPTY)
        break;
      const Vidxs = range(0, 4).map(i => (y - i) * CELL_SIZE + x);
      const V = check(Vidxs);
      if (V != CELL_STATE.EMPTY)
        return [V, Vidxs];

      if (x >= 3) {
        const HLidxs = range(0, 4).map(i => y * CELL_SIZE + x - i);
        const HL = check(HLidxs);
        if (HL != CELL_STATE.EMPTY)
          return [HL, HLidxs];

        const DLidxs = range(0, 4).map(i => (y - i) * CELL_SIZE + x - i);
        const DL = check(DLidxs);
        if (DL != CELL_STATE.EMPTY)
          return [DL, DLidxs]
      }

      if (x <= CELL_SIZE - 4) {
        const HRidxs = range(0, 4).map(i => y * CELL_SIZE + x + i);
        const HR = check(HRidxs);
        if (HR != CELL_STATE.EMPTY)
          return [HR, HRidxs];

        const DRidxs = range(0, 4).map(i => (y - i) * CELL_SIZE + x + i)
        const DR = check(DRidxs);
        if (DR != CELL_STATE.EMPTY)
          return [DR, DRidxs];
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

  return <>
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
  </>
}

export default Connect4;