import React,{ useState , useEffect } from 'react'
import "./ChatList.scss"
import AlertCreateRoom from '../blackScreen/AlertCreateRoom'
import axios from 'axios'
import Mainbar from '../mainBox/mainBoxBar/MainBar'

const url = process.env.REACT_APP_SERVER_URL

const ChatList = () => {
    const [rooms,setRooms] = useState([])
    const [pageOpen,setPageOpen] = useState(false)

    const handlePage = () => {
        setPageOpen((prev)=>!prev)
    }
    
    const handleScreen = () => {
        setPageOpen((prev)=>!prev)
    }

    const findRoom = async () => {
        const repo = await axios.get(url+`/rooms/${1}`)
        setRooms(repo.data.data.content)
    }
    useEffect(()=>{
        findRoom()
        
    },[])
    return (
    <div className='chat-list'>
        <div className='default-page-size'>
            <div className='main-page-title'>
                함께하는 위토피아!
            </div>
            {rooms.map((datas,index)=>{
                return(
                    <Mainbar datas={datas} key={index}></Mainbar>
                )
            })}
            
            <div>
                <button className='add-chatroom' onClick={handlePage}>+</button>
            </div>
        </div>
        {pageOpen === true ? <AlertCreateRoom pageOpen={pageOpen} setPageOpen={setPageOpen}></AlertCreateRoom> : null}
    </div>
  )
}

export default ChatList