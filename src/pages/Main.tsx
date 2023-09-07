import { Link } from "react-router-dom";


function Main() {
  return <>
    <h1>I am a main layout</h1>
    <Link to='/game/tictactoe'>tictactoe</Link>
    <Link to='/game/connect4'>connect4</Link>
  </>
}

export default Main;