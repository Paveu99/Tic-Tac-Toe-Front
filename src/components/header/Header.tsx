import "../styles/Header.scss";
import {NavLink} from "react-router-dom";
import el1 from '../styles/images/Home.png';
import el2 from '../styles/images/Game.png';
import el3 from '../styles/images/Charts.png';
import el4 from '../styles/images/XO.png';

export const Header = () => {
    const styleOfLink = ({isActive}: {
                             isActive: boolean
                         }
    ) => (
        {
            color: isActive ? "#ffffff" : '',
            backgroundColor: isActive ? "rgba(138, 22, 22, 0.8)" : '',
        }
    )

  return <nav className='nav'>
      <p className="title">TIC TAC TOE <img src={el4} alt="" className="big-icon"/></p>
      <NavLink className="nav__link" style={styleOfLink} to="/">
          <img className="small-icon" src={el1} alt=""/>
          <p className="text">MAIN</p>
      </NavLink>
      <NavLink className="nav__link" style={styleOfLink} to="/game">
          <img className="small-icon" src={el2} alt=""/>
          <p className="text">GAME</p>
      </NavLink>
      <NavLink className="nav__link" style={styleOfLink} to="/details">
          <img className="small-icon" src={el3} alt=""/>
          <p className="text">LEADERBOARD</p>
      </NavLink>
      </nav>
}