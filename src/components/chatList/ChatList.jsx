import React,{ useState , useEffect , useRef } from 'react'
import "./ChatList.scss"
import AlertCreateRoom from '../blackScreen/AlertCreateRoom'
import axios from 'axios'
import Mainbar from '../mainBox/mainBoxBar/MainBar'
import NoRoom from "../../assets/no-room.png"
import colorRoom from "../../assets/color-room.webp";
import blackRoom from "../../assets/black-room.webp";
import colorSearch from "../../assets/color-search.webp";
import blackSearch from "../../assets/black-search.webp";

const ChatList = ({search}) => {
    console.log(search)
    
    const [rooms,setRooms] = useState("")
    const [searchRoom,setSearchRoom] = useState("")
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false); // use this if you want the box to say "loading...". Forgot this lol.
    const [prevY, setPrevY] = useState(0);
    const [pageOpen,setPageOpen] = useState(false)

    const searchPage = async () => {
        try{
            const repo = await axios.get(`/rooms/${pageRef.current}?keyword=${search}`)
            console.log(repo)
            if(repo.data.statusMsg === "정상"){
                setRooms([...dataRef.current,...repo.data.data.content])
                setLoading(false);
            
        }
        }catch(error){
            console.log(error)
            if(error.response.data.errormessage==="검색 결과가 없습니다."){
                alert("검색 결과가 없습니다.")
                return
            }
        } 
    }

    let searchRef = useRef({})
    let dataRef = useRef({});
    let loadingRef = useRef(null);
    let prevYRef = useRef({});
    let pageRef = useRef({});

    searchRef.current = searchRoom
    dataRef.current = rooms;
    pageRef.current = page;
    prevYRef.current = prevY;

    const handlePage = () => {
        setPageOpen((prev)=>!prev)
    }

    const findRoom = async () => {
        try{
            console.log("이쪽")
            const repo = await axios.get(`/rooms/${pageRef.current}`)
            console.log(repo)
            setRooms([...dataRef.current,...repo.data.data.content])
            setLoading(false);
            
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
        if(search === null || search === ""){
            findRoom()
            setPage(pageRef.current + 1);
            let options = {
                root: null,
                rootMargin: "0px",
                threshold: 1.0,
            };
            const observer = new IntersectionObserver(handleObserver, options);
            observer.observe(loadingRef.current);
        }
        
    },[])
    // console.log("빈.. 널",search)
    useEffect(()=>{
        if(search === null || search === ""){
            console.log("d")
        }
        else{
            searchPage()
            setPage(pageRef.current + 1);
            let options = {
                root: null,
                rootMargin: "0px",
                threshold: 1.0,
            };
            const observer = new IntersectionObserver(handleObserver, options);
            observer.observe(loadingRef.current);
        }
    },[])
    
    return (
    <div className='chat-list'>
        <div className='default-page-size'>
            <div className='main-page-title'>
                함께하는 위토피아!
            </div>
            {rooms.length === 0 ?
                <img src={NoRoom} className='empty-rooms' alt=''></img> : rooms.map((datas,index)=>{
                return(
                    <Mainbar datas={datas} key={index}></Mainbar>
                )
            })}
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