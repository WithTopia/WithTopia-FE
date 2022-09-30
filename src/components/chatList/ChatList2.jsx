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
    // Swal.fire({title:"응애응애김응애",confirmButtonColor:"#FFD68B"})
    const navigate = useNavigate()
    const searchData = useSelector(state=>state.searchSlice)
    const [keyWord,setKeyWord] = useState("")
    const [rooms,setRooms] = useState("") // 메인 무한 스크롤용 
    const [searchRooms,setSearchRooms] = useState("") // 검색 무한 스크롤용
    const [searchRoomCheck,setSearchRoomCheck] = useState(false) // 체크
    const [success,setSuccess] = useState(true)
    const [page, setPage] = useState(1);
    const [page2, setPage2] = useState(1);
    const [loading, setLoading] = useState(false);
    const [prevY, setPrevY] = useState(0);
    const [prevY2,setPrevY2] = useState(0)
    const [pageOpen,setPageOpen] = useState(false)
    const [not,setNot] = useState(false)
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
            console.log("try")
            const repo = await axios.get(`/rooms/${page2Ref.current}?keyword=${keyWord}`)
            console.log(repo)
            if(repo.data.statusMsg === "정상"){
                setSearchRooms([...data2Ref.current,...repo.data.data.content])
                setLoading(false);
                setSearchRoomCheck(true)
                setSuccess(true)
            }
        }catch(error){
            setSuccess(false)
            if(page2Ref.current-1 === 1){
                setNot(true)
                Swal.fire("검색 결과가 없습니다.")
            }
            console.log(error)
            // if(error.response.data.errormessage==="검색 결과가 없습니다."){
            //     Swal.fire("검색 결과가 없습니다.")
            //     return
            // }
        } 
    }
    const findRoom = async () => {
        try{
            console.log("nice try")
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
    },[])

    useEffect(()=>{ // 메인용
        if(keyWord.length === 0){
            findRoom()
            setPage(pageRef.current + 1);
            let options = {
                root: null,
                rootMargin: "0px",
                threshold: 1.0,
            };
            const observer = new IntersectionObserver(handleObserver, options);
            observer.observe(loadingRef.current);  
        }else{
            if(success === false){
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
            
        }
    },[keyWord])

    useEffect(()=>{
        setKeyWord(searchData.searchSlice)
        if(keyWord.length > 0){
            setPrevY(0)
            setPrevY2(0)
            setSearchRooms("")
            setRooms("")
            setPage(1)
            setPage2(1)
            setSuccess(true)
        }
    },[searchData.searchSlice])
  
    return (
    <div className='chat-list'>
        <div className='default-page-size'>
            <div className='main-page-title'>
                함께하는 위토피아!
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
            }) : not ? <img src={blackSearch} alt="검색 결과 없음"></img> : <img src={searchRoomCheck ? blackRoom : blackRoom } className='empty-rooms' alt=''></img>}
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