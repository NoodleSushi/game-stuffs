import { Outlet, Link } from "react-router-dom"
import { createContext, useState } from "react";
import styles from './Game.module.css';
import descbg from '../assets/desctex.png';

export const TitleContext = createContext(
  {
    setTitle: (title: string) => { },
    setDesc: (desc: string) => { }
  }
);

function Game() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('Description');

  return <div className={`${styles.root}`}>
    <div className={`${styles.desc_container}`} style={{ backgroundImage: `url(${descbg})` }}>
      <div>
        <h1>{ title }</h1>
      </div>      
      <p className={`${styles.desc_text}`}>
        {desc}
      </p>
      <div className={`${styles.desc_bottom}`}>
        <Link to='/'><button className={`${styles.desc_button}`}>{"<- Back"}</button></Link>
        <button onClick={() => window.location.reload()} className={`${styles.desc_button}`}>Restart</button>
      </div>
    </div>
    <div className={`${styles.content}`}>
      <TitleContext.Provider value={{ setTitle, setDesc }}>
        <div className={`${styles.container}`}>
          <Outlet/>
        </div>
      </TitleContext.Provider>
    </div>
  </div>
}

export default Game;