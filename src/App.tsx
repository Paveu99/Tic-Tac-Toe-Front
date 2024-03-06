import { useState } from 'react'
import './App.scss'
import {Header} from "./components/header/Header.tsx";
import el from '../src/components/styles/images/Menu.png';
import {Route, Routes} from "react-router-dom";
import { HomePage } from './views/HomePage.tsx';
import {GamePage} from "./views/GamePage.tsx";
import {LeaderboardPage} from "./views/LeaderboardPage.tsx";
function App() {

    const [isNavbarHidden, setIsNavbarHidden] = useState<boolean>(true);

    const toggleNavbar = () => {
        setIsNavbarHidden(!isNavbarHidden);
    }

  return (
      <div className="App">
          <button className="test-button" onClick={toggleNavbar}>
              <img src={el} alt="" className="icon-inside"/>
          </button>
          <div className={`navbar ${isNavbarHidden ? 'hidden' : ''}`}>
              <Header/>
          </div>
          <div className={`content ${!isNavbarHidden ? 'hidden' : ''}`} onClick={() => setIsNavbarHidden(true)}>
              <Routes>
                  <Route path="/" element={<HomePage/>}/>
                  <Route path="/game" element={<GamePage/>}/>
                  <Route path="/details" element={<LeaderboardPage/>}/>
              </Routes>
          </div>
      </div>
  )
}

export default App
