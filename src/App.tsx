import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Main from './pages/Main';
import Game from './pages/Game';
import TicTacToe from './games/TicTacToe';
import Connect4 from './games/Connect4';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/game' element={<Game />}>
          <Route path='tictactoe' element={<TicTacToe />} />
          <Route path='connect4' element={<Connect4 />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
