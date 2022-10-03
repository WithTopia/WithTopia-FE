import './Header.scss';
import logo_empty from "../../assets/logo_empty.webp";
import searchIcon from "../../assets/searchIcon.png"
import { useEffect, useState } from 'react';
import Swal from "sweetalert2"
import "sweetalert2/src/sweetalert2.scss"
import { useDispatch } from "react-redux";
import { searchSlice ,addSearching } from '../../redux/modules/searchSlice';

const Header = () => {
  const dispatch = useDispatch()
  const [search,setSearch] = useState("")

  const searchPage = (e) => {
    
    if(search.length < 2){
      Swal.fire({title:"방제목 길이는 최소 2글자 입니다.",confirmButtonColor:"#FFD68B"})
    }else{
      dispatch(addSearching(search))
      // navigate("/main",{state:{search:search}})
    }
  }
  const searchReset = () => {
    dispatch(addSearching(""))
    // navigate("/main",{state:{search:""}})
  }
  const onChangeSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleEnter = (e) => {
    if(e.keyCode === 13){
      if(search.length < 2){
        Swal.fire({title:"방제목 길이는 최소 2글자 입니다.",confirmButtonColor:"#FFD68B"})
      }else{
        dispatch(addSearching(search))
        // navigate("/main",{state:{search:search}})
      }
    }
  };

  return (
    <div className='top-header'>
      <div className='header-wrap'>
        <a href='/main'><img src={logo_empty} className="wtLogo" alt="wtLogo"></img></a>
        <div className='header-form'>
          <input type="search" className="search-input" value={search} onChange={onChangeSearch} onKeyDown={handleEnter} placeholder="search by chat room"/>
          <img src={searchIcon} onClick={searchPage} className="search" alt="search"></img>
        </div>
      </div>
    </div>
  );
}

export default Header;
