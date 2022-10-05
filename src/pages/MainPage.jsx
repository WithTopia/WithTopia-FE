import "../assets/Global.scss"
import Header from '../components/header/Header'
import SideBar from "../components/sideBar/SideBar"
import ChatList2 from '../components/chatList/ChatList2'
import Mainslide from '../components/mainSlide/MainSlide'
import axios from 'axios'

const MainPage = () => {
  const reIssue = async () => {
    try{
      let refreshtoken = localStorage.getItem("refreshtoken")
      let accessToken = localStorage.getItem("accessToken")
      const repo = await axios.get(`/member/reissue`,{headers:{"authorization":accessToken,"refreshtoken":refreshtoken}})
      localStorage.removeItem("accessToken");
      localStorage.setItem("accessToken",repo.headers.authorization)
    }catch(error){
    }
  }

  setInterval(()=>{
    reIssue()
  },60000 * 10)
  
  return (
    <div className='mainpage'>
      <Header/>
      <div className='layout'>
        <SideBar/>
        <div className='group-right'>
          <div className='main-rank'>
            <Mainslide></Mainslide>
          </div>
          <ChatList2></ChatList2>
        </div>
      </div>
    </div>
  )
}

export default MainPage

