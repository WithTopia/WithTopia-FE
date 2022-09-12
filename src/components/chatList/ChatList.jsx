import React,{ useState , useEffect } from 'react'
import "./ChatList.scss"
import Mainbar from '../mainBox/mainBoxBar/MainBar'
import AlertCreateRoom from '../blackScreen/AlertCreateRoom'
import axios from 'axios'

const ChatList = () => {
    const handlePage = () => {
        setPageOpen((prev)=>!prev)
    }
    const [data,setData] = useState()
    const [pageOpen,setPageOpen] = useState(false)

    const SetRooms = () => {
    // <ul>
    //   {roomLists && roomLists.map((lists,index)=>{
    //       return(
    //           <div key={index} className="room-list" onClick={()=>enterRoom(lists.roomId)}>
    //               <li>{lists.roomName}</li>
    //           </div>
    //       )
    //   })}
    // </ul>
    }
  
    const handleScreen = () => {
        setPageOpen((prev)=>!prev)
    }
    const findRoom = async () => {
        const repo = await axios.get('/chat/rooms')
        console.log(repo.data)
        setData(repo.data)
    }
    useEffect(()=>{
        // findRoom()
    },[])

    return (
    <div className='chat-list'>
        <div className='default-page-size'>
            <div className='main-page-title'>
                함께하는 위토피아!
            </div>
                <div>
                    <Mainbar/>
                    <Mainbar/>
                    <Mainbar/>
                    <Mainbar/>
                    <Mainbar/>
                    <Mainbar/>
                </div>
            <div>
                <button className='add-chatroom' onClick={handlePage}>+</button>
            </div>
        </div>
        {pageOpen === true ? <AlertCreateRoom pageOpen={pageOpen} setPageOpen={setPageOpen}></AlertCreateRoom> : null}
    </div>
  )
}

export default ChatList