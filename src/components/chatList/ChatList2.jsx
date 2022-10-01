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
    const [keyWord,setKeyWord] = useState("")
    const [rooms,setRooms] = useState("") // 메인 무한 스크롤용 
    const [searchRooms,setSearchRooms] = useState("") // 검색 무한 스크롤용
    const [searchRoomCheck,setSearchRoomCheck] = useState(false) // 방들 존재 여부 체크
    const [success,setSuccess] = useState(true)
    const [page, setPage] = useState(1);
    const [page2, setPage2] = useState(1);
    const [loading, setLoading] = useState(false);
    const [prevY, setPrevY] = useState(0);
    const [prevY2,setPrevY2] = useState(0)
    const [pageOpen,setPageOpen] = useState(false)
    const [not,setNot] = useState(false) // 검색 후 아예 없는 여부 체크

    let dataRef = useRef({});
    let data2Ref = useRef({});
    let loadingRef = useRef(null);
    let prevYRef = useRef({});
    let prevYRef2 = useRef({});
    let pageRef = useRef({});
    let page2Ref = useRef({})

    data2Ref.current = searchRooms;
    dataRef.current = rooms;
    pageRef.current = page;
    page2Ref.current = page2;
    prevYRef.current = prevY;
    prevYRef2.current = prevY2;

    const handlePage = () => {
        setPageOpen((prev)=>!prev)
    }

    const searchPage = async () => {
        try{
            const repo = await axios.get(`/rooms/search/${page2Ref.current}?keyword=${keyWord}`)
            
            if(repo.data.statusMsg === "정상"){
                setSearchRooms([...data2Ref.current,...repo.data.data.content])
                setLoading(false);
                setSearchRoomCheck(true)
                setSuccess(true)
            }
        }catch(error){
            if(page2Ref.current-1 === 1 && error.response.data.errormessage==="검색 결과가 없습니다."){
                setNot(true)
                Swal.fire({title:"검색 결과가 없습니다.",confirmButtonColor:"#FFD68B"})
            }
            if(error.response.data.errormessage==="검색 결과가 없습니다."){
                // setSearchRooms("")
                console.log("검색 결과가 더 없습니다.")
            }
            console.log(error)
            setSuccess(false)
            return
        } 
    }
    const findRoom = async () => {
        if(success === true){
            try{
                const repo = await axios.get(`/rooms/${pageRef.current}`)
                setRooms([...dataRef.current,...repo.data.data.content])
                setLoading(false);
            }catch(error){
                setSearchRoomCheck(true)
            }
        }
    }
    
   
    const handleObserver = (entities, observer) => {
        const y = entities[0].boundingClientRect.y;
        if (prevYRef.current > y) {
            if(keyWord === null || keyWord === ""){
                findRoom()
                setPage(pageRef.current + 1);
            }
        }
        setPrevY(y);
    };

    const handleObserver2 = (entities, observer) => {
        const y = entities[0].boundingClientRect.y;
        if (prevYRef2.current > y) {
          searchPage()  
          setPage2(page2Ref.current + 1);
        }
        setPrevY2(y);
    };
    
    useEffect(()=>{ // 검색용
        if(keyWord.length !== 0 && success === true){
            searchPage()
            setPage2(page2Ref.current + 1);
            let options = {
                root: null,
                rootMargin: "0px",
                threshold: 1.0,
            };
            const observer = new IntersectionObserver(handleObserver2, options);
            observer.observe(loadingRef.current);  
        }
    },[keyWord])

    useEffect(()=>{ // 메인용
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

    useEffect(()=>{
        setKeyWord(searchData.searchSlice)
        setPrevY(0)
        setPrevY2(0)
        setSearchRooms("")
        setRooms("")
        setPage(1)
        setPage2(1)
        setSuccess(true)
    },[searchData.searchSlice])

    return (
    <div className='chat-list'>
        <div className='default-page-size'>
            <div className='main-page-title'>
                Let's Talk in WITHTOPIA!
            </div>
            {searchRooms.length !== 0 ? 
                searchRooms.map((datas,index)=>{
                return(
                    <Mainbar datas={datas} key={index}></Mainbar>
                )
            }) : rooms.length !== 0 ?
                rooms.map((datas,index)=>{
                    return(
                        <Mainbar datas={datas} key={index}></Mainbar>
                    )
            }) : not ? <img src={blackSearch} alt="검색 결과 없음"></img> : 
            <img src={searchRoomCheck ? blackRoom : blackRoom } className='empty-rooms' alt=''></img>}
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

// const vidData = dayBarData.filter( (arr, index, callback) => index === callback.findIndex((el) => el.vid === arr.vid) );