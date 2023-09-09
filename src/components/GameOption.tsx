import { Link, To } from "react-router-dom";
import sticky from '../assets/stickynote.svg';
import styles from './GameOption.module.css';

function GameOption(props: {to: To, label: string}) {
  return (
    <div className={`${styles.container}`}>
      <Link to={props.to}>
        <img className={`${styles.img}`} src={`${sticky}`} alt="sticky" />
        <h1 className={`${styles.text}`}>{ props.label }</h1>
      </Link>
    </div>
  )
}

export default GameOption;