import React from 'react';
import './Header.scss';
import wtLogo from "../../assets/wtLogo.png";
import searchIcon from "../../assets/searchIcon.png"

const Header = () => {

  return (
    <div className='top-header'>
      <div className='header-wrap'>
        <img src={wtLogo} className="wtLogo" alt="wtLogo"></img>
        <form>
          <input type="text" className="search-input" placeholder="search by chat room"/>
          <img src={searchIcon} className="search" alt="search"></img>
        </form>
      </div>
    </div>
  );
}

export default Header;
