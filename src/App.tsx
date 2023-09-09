import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Main from './layouts/Main';
import Game from './layouts/Game';
import TicTacToe from './games/TicTacToe';
import Connect4 from './games/Connect4';
import bg from './assets/papertex.png';

function App() {
  return (
    <div style={{ backgroundImage: `url(${bg})`, width: `100vw`, height: `100vh` }}>
      <HashRouter>
        <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/game' element={<Game />}>
              <Route path='tictactoe' element={<TicTacToe />} />
              <Route path='connect4' element={<Connect4 />}/>
            </Route>
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
