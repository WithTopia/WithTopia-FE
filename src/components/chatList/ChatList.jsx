import React,{ useState , useEffect , useRef } from 'react'
import "./ChatList.scss"
import AlertCreateRoom from '../blackScreen/AlertCreateRoom'
import axios from 'axios'
import Mainbar from '../mainBox/mainBoxBar/MainBar'
import { useNavigate } from 'react-router-dom'
import colorRoom from "../../assets/color-room.webp";
import blackRoom from "../../assets/black-room.webp";
import colorSearch from "../../assets/color-search.webp";
import blackSearch from "../../assets/black-search.webp";
import Swal from "sweetalert2"
import { searchSlice } from '../../redux/modules/searchSlice';
import { useSelector } from 'react-redux';

const ChatList = () => {
    const navigate = useNavigate()
    const searchData = useSelector(state=>state.searchSlice)
    console.log(searchData.searchSlice)
    const [rooms,setRooms] = useState("")
    const [searchRooms,setSearchRooms] = useState("")
    const [searchRoomCheck,setSearchRoomCheck] = useState(false)
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false); // use this if you want the box to say "loading...". Forgot this lol.
    const [prevY, setPrevY] = useState(0);
    const [pageOpen,setPageOpen] = useState(false)

    const searchPage = async () => {
        try{
            const repo = await axios.get(`/rooms/${pageRef.current}?keyword=${searchData.searchSlice}`)
            console.log(repo)
            if(repo.data.statusMsg === "정상"){
                setSearchRooms([...dataRef.current,...repo.data.data.content])
                setLoading(false);
                setSearchRoomCheck(true)
            }
        }catch(error){
            console.log(error)
            if(error.response.data.errormessage==="검색 결과가 없습니다."){
                Swal.fire("검색 결과가 없습니다.")
                return
            }
        } 
    }

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

    const findRoom = async () => {
        try{
            const repo = await axios.get(`/rooms/${pageRef.current}?keyword=`)
            console.log(repo)
            setRooms([...dataRef.current,...repo.data.data.content])
            setLoading(false);
            setSearchRoomCheck(false)
        }catch(error){
            console.log(error)
        }
    }
    const handleObserver = (entities, observer) => {
        const y = entities[0].boundingClientRect.y;
        if (prevYRef.current > y) {
          findRoom()  
          setPage(pageRef.current + 1);
        }
        setPrevY(y);
    };
    
    useEffect(()=>{
        findRoom()
        setPage(pageRef.current + 1);
        let options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0,
        };
        const observer = new IntersectionObserver(handleObserver, options);
        observer.observe(loadingRef.current);
    },[])
    
    return (
    <div className='chat-list'>
        <div className='default-page-size'>
            <div className='main-page-title'>
                Let's Talk in WITHTOPIA!
            </div>
            {searchRoomCheck === true && searchRooms.length !== 0 ? 
                searchRooms.map((datas,index)=>{
                return(
                    <Mainbar datas={datas} key={index}></Mainbar>
                )
            }) : searchRoomCheck === false && rooms.length !== 0 ?
                rooms.map((datas,index)=>{
                    return(
                        <Mainbar datas={datas} key={index}></Mainbar>
                    )
            }) : <img src={searchRoomCheck ? blackRoom : blackRoom } className='empty-rooms' alt=''></img>}
            {/* {searchRoom.length === 0 && search !== null ?
                null : searchRoom.map((datas,index)=>{
                return(
                    <Mainbar datas={datas} key={index}></Mainbar>
                )}
            )} */}
            <div
                className="scrolldown"
                ref={loadingRef}
                style={{ height: "50px" }}>
                {loading && "...Loading"}
            </div>
        </div>
        <div>
            <button className='add-chatroom' onClick={handlePage}>+</button>
        </div>
        {pageOpen === true ? <AlertCreateRoom pageOpen={pageOpen} setPageOpen={setPageOpen}></AlertCreateRoom> : null}
    </div>
  )
}

export default ChatList