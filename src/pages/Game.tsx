import { Outlet } from "react-router-dom"


function Game() {
  return <>
    <h1>I am a game Layout</h1>
    <Outlet/>
  </>
}

export default Game;