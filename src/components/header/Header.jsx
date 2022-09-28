import './Header.scss';
import WTlogo1 from "../../assets/WTlogo1.webp";
import searchIcon from "../../assets/searchIcon.png"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [search,setSearch] = useState("")

  const searchPage = async () => {
    navigate("/main",{state:{search:search}})
    setSearch("")
  }

  
  const onChangeSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      searchPage()
    }
  };

  window.onbeforeunload=function(){ //
    setSearch("")
  }

  return (
    <div className='top-header'>
      <div className='header-wrap'>
        <a href='/main'><img src={WTlogo1} className="wtLogo" alt="wtLogo"></img></a>
        <form>
          <input type="search" className="search-input" value={search} onChange={onChangeSearch} onKeyDown={handleEnter} placeholder="search by chat room"/>
          <img src={searchIcon} className="search" alt="search" onClick={searchPage}></img>
        </form>
      </div>
    </div>
  );
}

export default Header;
