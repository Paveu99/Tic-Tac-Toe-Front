import { useState } from 'react'
import './App.scss'
import {Header} from "./components/header/Header.tsx";
import el from '../src/components/styles/images/Menu.png';
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
          <div className={`content ${!isNavbarHidden ? 'hidden' : ''}`}>
              <p>ansdlkajnsdlksasdlfka;sdfja[osdijfpaosidjfaosidjfaosidjf;aosdf;alsjkdnf;alsjkdnfa;sldjkfn;ljan</p>
          </div>
      </div>
  )
}

export default App
