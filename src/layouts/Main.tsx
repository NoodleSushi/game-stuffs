import GameOption from '../components/GameOption';
import styles from './Main.module.css';

function Main() {
  return <>
    <div className={`${styles.header}`}>
      <h1>Game Stuffs!</h1>
    </div>
    <GameOption to='/game/tictactoe' label='TicTacToe' />
    <GameOption to='/game/connect4' label='Connect 4' />
  </>
}

export default Main;