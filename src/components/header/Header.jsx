import './Header.scss';
import wtLogo from "../../assets/logo.png";
import searchIcon from "../../assets/searchIcon.png"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [search,setSearch] = useState("")

  const searchPage = async () => {
    if(search.length < 2){
      alert("방제목 길이는 최소 2글자 입니다.")
      return
    }else{
      navigate("/main",{state:{search:search}})
    }
    
  }

  const searchReset = () => {
    navigate("/main",{state:{search:""}})
  }
  const onChangeSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      searchPage()
    }
  };

  return (
    <div className='top-header'>
      <div className='header-wrap'>
        <a href='/main' onClick={searchReset}><img src={wtLogo} className="wtLogo" alt="wtLogo"></img></a>
        <form>
          <input type="search" className="search-input" value={search} onChange={onChangeSearch} onKeyDown={handleEnter} placeholder="search by chat room"/>
          <a href='/main' onClick={searchPage}><img src={searchIcon} className="search" alt="search"></img></a>
        </form>
      </div>
    </div>
  );
}

export default Header;
