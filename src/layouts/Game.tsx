import { Outlet } from "react-router-dom"
import { createContext, useState } from "react";

// @ts-ignore:next-line
export const TitleContext = createContext({ title: '', setTitle: (title: string) => { } });

function Game() {
  const [title, setTitle] = useState('');

  return <>
    <h1>{ title }</h1>
    <TitleContext.Provider value={{ title, setTitle }}>
      <Outlet/>
    </TitleContext.Provider>
  </>
}

export default Game;