import React,{ useState , useEffect ,useRef} from 'react'
import "./ChatList.scss"
import AlertCreateRoom from '../blackScreen/AlertCreateRoom'
import axios from 'axios'
import Mainbar from '../mainBox/mainBoxBar/MainBar'

const url = process.env.REACT_APP_SERVER_URL

const ChatList = () => {
    const [rooms,setRooms] = useState("")
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false); // use this if you want the box to say "loading...". Forgot this lol.
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

    const findRoom = async () => {
        try{
            const repo = await axios.get(url+`/rooms/${pageRef.current}`)
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
    console.log(rooms)
    return (
    <div className='chat-list'>
        <div className='default-page-size'>
            <div className='main-page-title'>
                함께하는 위토피아!
            </div>
            {rooms.length === 0 ?
                <div className='empty-rooms'>방이 존재하지 않아요 !</div> : rooms.map((datas,index)=>{
                return(
                    <Mainbar datas={datas} key={index}></Mainbar>
                )
            })}
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