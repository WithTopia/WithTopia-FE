import './Header.scss';
import logo_empty from "../../assets/logo_empty.webp";
import searchIcon from "../../assets/searchIcon.png"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2"
import "sweetalert2/src/sweetalert2.scss"

const Header = () => {
  const navigate = useNavigate();
  const [search,setSearch] = useState("")

  const searchPage = () => {
    if(search.length < 2){
      Swal.fire("방제목 길이는 최소 2글자 입니다.")
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
    if(e.keyCode === 13){
      alert("왔니")
      navigate("/main",{state:{search:search}})
    }
  };

  return (
    <div className='top-header'>
      <div className='header-wrap'>
        <a href='/main' onClick={searchReset}><img src={logo_empty} className="wtLogo" alt="wtLogo"></img></a>
        <form>
          <input type="search" className="search-input" value={search} onChange={onChangeSearch} onKeyDown={handleEnter} placeholder="search by chat room"/>
          <a href='/main' onClick={searchPage}><img src={searchIcon} className="search" alt="search"></img></a>
        </form>
      </div>
    </div>
  );
}

export default Header;
