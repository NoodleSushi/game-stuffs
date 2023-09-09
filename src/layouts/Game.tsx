import { Outlet } from "react-router-dom"
import { createContext, useState } from "react";
import styles from './Game.module.css';

// @ts-ignore:next-line
export const TitleContext = createContext({ title: '', setTitle: (title: string) => { } });

function Game() {
  const [title, setTitle] = useState('');

  return <>
    <h1>{ title }</h1>
    <TitleContext.Provider value={{ title, setTitle }}>
      <div className={`${styles.container}`}>
        <Outlet/>
      </div>
    </TitleContext.Provider>
  </>
}

export default Game;