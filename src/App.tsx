import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Main from './pages/Main';
import Game from './pages/Game';
import TicTacToe from './games/TicTacToe';
import Connect4 from './games/Connect4';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/game' element={<Game />}>
          <Route path='tictactoe' element={<TicTacToe />} />
          <Route path='connect4' element={<Connect4 />}/>
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
