import React, { useState ,useEffect ,useCallback} from 'react'
import Chat from "../components/chat/Chat"
import Report from "../components/blackScreen/Report"
import { OpenVidu } from 'openvidu-browser'
import { useLocation, useNavigate } from 'react-router-dom'
import VideoRecord from '../components/videoRecord/VideoRecord'
import { createBrowserHistory } from 'history';
import axios from 'axios'
import "../components/videoRecord/VideoRecord.scss"
import message from "../assets/messageIcon.png"
import exit from "../assets/out.png"
import siren from "../assets/siren.png"
// import camon from "../assets/cam-on.png"
// import camoff from "../assets/cam-off.png"
// import micon from "../assets/mic-on.png"
// import micoff from "../assets/mic-off.png"

const history = createBrowserHistory()

const Room = () => {
  const location = useLocation();
  const navigate = useNavigate()
  let nickname = localStorage.getItem("nickname")
  let tokenStuff = location.state.token
  let refreshtoken = localStorage.getItem("refreshtoken")
  let accessToken = localStorage.getItem("accessToken")

  const [session,setSession] = useState(undefined)
  const [OV, setOV] = useState();  
  const [publisher, setPublisher] = useState(null);
  const [subscribers, setSubscribers] = useState([]);
  const [checkMyScreen,setCheckMyScreen] = useState("")
  const [isConnect,setIsConnect] = useState(false) // 커넥팅 체크
  const [role,setRole] = useState(location.state.role) // 역할군
  const [chat,setChat] = useState(true) // 채팅창
  const [report,setReport] = useState(false)
  // const [mute,setMute] = useState(false)
  // const [hidden,setHidden] = useState(false)
  // const [userMute,setUserMute] = useState(false)
  // const [userHidden,setUserHidden] = useState(false)
  console.log(location.state.memberId)
  const deleteSubscriber = (streamManagerId) => {
    try{
      console.log("지우기")
      setSubscribers(current=>current.filter((sub)=> sub.stream.connection.connectionId !== streamManagerId )); //e.stream.session.options.sessionId
      setCheckMyScreen(false)
    }catch(error){
      console.log(error)
    }
  };

  // 브라우저 새로고침, 종료, 라우트 변경
  const leaveload = async () => {
    try{
      if(role === "master"){
        const getOutRoomMaster = await axios.delete(`/room/${location.state.sessionId}`,{headers:{"authorization":accessToken,"refreshtoken":refreshtoken}})
        console.log(getOutRoomMaster)
        leaveSession();
      }else if(role === "user"){
        const getOutRoomUser = await axios.post(`/room/${location.state.sessionId}/member`,{},{headers:{"authorization":accessToken,"refreshtoken":refreshtoken}})
        console.log("유저 나가",getOutRoomUser)
      }
    }catch(error){
      console.log(error)
    }
  };
  const leaveSession = () => {
    console.log("세션 치우기")
    setCheckMyScreen(false)
    setSubscribers([])
    setOV(undefined)
    setPublisher(null)
  }
  const joinSession = () => { // openvidu 세션 생성하기
    // 1. openvidu 객체 생성
    const newOV = new OpenVidu();
    // 2. initSesison 생성
    const newsession = newOV.initSession();
    setSession(newsession)
    // JSON.parse(JSON.stringify(newSession))
    // 3. 미팅을 종료하거나 뒤로가기 등의 이벤트를 통해 세션을 disconnect 해주기 위해 state에 저장
    setOV(newOV);
    // 4. session에 connect하는 과정
    newsession.on('streamCreated', (e) => {
      const newSubscriber = newsession.subscribe(
        e.stream,
        undefined
      );
      console.log("입장~")
      setSubscribers(current=>[...current,newSubscriber]);
      setIsConnect(true)
    });
    
    // 1-2 session에서 disconnect한 사용자 삭제
    newsession.on('streamDestroyed', (e) => {
      if (e.stream.typeOfVideo === 'CUSTOM') {
        deleteSubscriber(e.stream.connection.connectionId);
      } else {
        console.log("지우기 실패 ?")
        setCheckMyScreen(true);
      }
    });
    // 1-3 예외처리
    newsession.on('exception', (exception) => {
      console.warn(exception);
    });
    newsession.connect( tokenStuff, { clientData: nickname })    
      .then(async () => {
        await newOV.getUserMedia({
          audioSource: false,
          videoSource: undefined,
          resolution: '410x290',
          frameRate: 10,
        })
      .then((mediaStream) => {
        let videoTrack = mediaStream.getVideoTracks()[0];
        let newPublisher = newOV.initPublisher(
          undefined,
          {
            audioSource: undefined,  // The source of audio. If undefined default audio input
            videoSource: videoTrack, // The source of video. If undefined default video input
            publishAudio: true,  // Whether you want to start the publishing with audio unmuted or muted
            publishVideo: true, // Whether you want to start the publishing with video enabled or disabled
            // resolution: '1280x720',  // The resolution of your video
            // frameRate: 10,   // The frame rate of your video
            insertMode: 'APPEND',  // How the video will be inserted according to targetElement
            mirror: true   // Whether to mirror your local video or not
          })
          // 4-b user media 객체 생성
          newPublisher.once("accessAllowed", () => {
            newsession.publish(newPublisher);
            setPublisher(newPublisher)
          });
        })
      })
      .catch((error) => {
        console.warn(
          'There was an error connecting to the session:',
          error.code,
          error.message
      );
    });
  }

  // 보류
  // const handleCam = () => {
  //   setHidden((prev)=>!prev)
  //   publisher.publishVideo(hidden)
  // }
  // const handleMic = () => {
  //   setMute((prev)=>!prev)
  //   publisher.publishAudio(mute)
  // }
  // const handleUserCam = () => {
  //   console.log(subscriber)
  //   setUserHidden((prev)=>!prev)
  //   subscriber.subscribeToVideo(userHidden);
  // }
  // const handleUserMic = () => {
  //   console.log(subscriber)
  //   setUserMute((prev)=>!prev)
  //   subscriber.subscribeToAudio(userMute);
  // }

  window.onbeforeunload=function(){ // 브라우저 삭제 및 새로고침 시 leave
    leaveload()
  }

  const handleChat = () => { // 채팅창 여닫이
    setChat((prev)=>!prev)
  }

  const handleReport = () => {
    setReport((prev)=>!prev)
  }

  useEffect(()=>{
    console.log(subscribers)
  },[subscribers])

  useEffect(()=>{ // 시작과 종료를 알리는
    window.addEventListener("beforeunload", leaveload); 
    joinSession()
    return () => {
      window.removeEventListener("beforeunload", leaveload);
    };
  },[])

  const reIssue = async () => {
    try{
      const repo = await axios.get(`/member/reissue`,{headers:{"authorization":accessToken,"refreshtoken":refreshtoken}})
      localStorage.setItem("accessToken",repo.headers.authorization)
    }catch(error){
      console.log(error)
    }
  }
  setInterval(()=>{
    reIssue()
  },60000*10)

  // useEffect(() => {
  //   window.onpopstate = () => {
  //     history.push("/main");
  //   };
  // },[]);
  return (
    <div className='room'>
      <div className='video-container'>
        <div className='video-header'>
          <h2>{location.state.roomTitle}</h2>
          <div className='video-sets'>
            <img src={siren} className="siren" onClick={handleReport}></img>
            
            <img src={message} className="message-control" onClick={handleChat}></img>
            <a href='/main'><img src={exit} className="out"></img></a>
          </div>
        </div>   
        <hr></hr>
        <div className='video-chat'>
          {role === "master" || subscribers.length > 0 ? (
            <div className='room-video'>
              {role === "master" && publisher !== null ? (
                <div className="pub">
                  <VideoRecord streamManager={publisher} role={location.state.role}></VideoRecord>
                  {subscribers.length > 0 ? subscribers.map((sub,index)=>{
                    return(
                      <VideoRecord streamManager={sub} key={index} role={location.state.role}></VideoRecord>
                    )
                  }) : null}
                </div>
              ) : null}
              {role === "user" && publisher !== null ? (
                <div className='sub'>
                  <VideoRecord streamManager={publisher} role={location.state.role}></VideoRecord>
                  {subscribers.length > 0 ? subscribers.map((sub,index)=>{
                    return(
                      <VideoRecord streamManager={sub} key={index} role={location.state.role}></VideoRecord>
                    )
                  }) : null}
                </div>
              ) : null}
            </div>
          ) : null}
          {report ? <Report setReport={setReport}></Report> : null}
          <div className={"room-chat" + (chat ? "" : " none")}>
            {publisher !== null ? <Chat nickname={localStorage.getItem("nickname")} roomName={location.state.roomTitle} success={chat} sessionId={location.state.sessionId} setChat={setChat} checkMyScreen={checkMyScreen}></Chat> : null}
          </div>
          
        </div>
        {/* <div className='video-setting'>
        </div> */}
      </div>
    </div>
  )
}

export default Room