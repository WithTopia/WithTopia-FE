import './Header.scss';
import logo_empty from "../../assets/logo_empty.webp";
import searchIcon from "../../assets/searchIcon.png"
import axios from 'axios';
import { useEffect, useState ,useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [search,setSearch] = useState("")
  const [rooms,setRooms] = useState("")
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [prevY, setPrevY] = useState(0);
  const [pageOpen,setPageOpen] = useState(false)
  
  let dataRef = useRef({});
  let loadingRef = useRef(null);
  let prevYRef = useRef({});
  let pageRef = useRef({});
  dataRef.current = rooms;
  pageRef.current = page;
  prevYRef.current = prevY;

  const handlePage = () => {
    setPageOpen((prev)=>!prev)
  }

  const searchPage = async () => { //room/search/1?keyword="keyword"
    try{
      const repo = await axios.get(`/rooms/search/${pageRef.current}=${search}`)
      setRooms([...dataRef.current,...repo.data.data.content])
      setLoading(false);
    }catch(error){
      console.log(error)
    }
      
  }
  const handleObserver = (entities, observer) => {
      const y = entities[0].boundingClientRect.y;
      if (prevYRef.current > y) {
        // findRoom()  
        setPage(pageRef.current + 1);
      }
      setPrevY(y);
  };
  useEffect(()=>{
      // findRoom()
      // setPage(pageRef.current + 1);
      // let options = {
      //     root: null,
      //     rootMargin: "0px",
      //     threshold: 1.0,
      // };
      // const observer = new IntersectionObserver(handleObserver, options);
      // observer.observe(loadingRef.current);
  },[])

  const onChangeSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      searchPage()
    }
  };

  // const searchPage = async () => {
  //   try{
  //     const repo = await axios.get(`/rooms/search/${1}`,{keyword:search})
  //     console.log(repo)
  //   }
  //   catch(error){
  //     console.log(error)
  //   }
  // }
  // useEffect(()=>{
  //   console.log(search)
  // },[search])
  return (
    <div className='top-header'>
      <div className='header-wrap'>
        <a href='/main'><img src={logo_empty} className="wtLogo" alt="wtLogo"></img></a>
        <form>
          <input type="search" className="search-input" value={search} onChange={onChangeSearch} onKeyDown={handleEnter} placeholder="search by chat room"/>
          <img src={searchIcon} className="search" alt="search" onClick={searchPage}></img>
        </form>
      </div>
    </div>
  );
}

export default Header;
