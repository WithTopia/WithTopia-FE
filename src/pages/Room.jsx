import React, { useState ,useEffect ,useCallback} from 'react'
import Chat from "../components/chat/Chat"
import { OpenVidu } from 'openvidu-browser'
import { useLocation } from 'react-router-dom'
import VideoRecord from '../components/videoRecord/VideoRecord'
import { createBrowserHistory } from 'history';
import axios from 'axios'
import "../components/videoRecord/VideoRecord.scss"
import camon from "../assets/cam-on.png"
import camoff from "../assets/cam-off.png"
import micon from "../assets/mic-on.png"
import micoff from "../assets/mic-off.png"
import message from "../assets/messageIcon.png"
import exit from "../assets/out.png"

const url = process.env.REACT_APP_SERVER_URL
const history = createBrowserHistory()

const Room = () => {
  const location = useLocation();
  let tokenStuff = location.state.token
  const [session,setSession] = useState(undefined)
  const [OV, setOV] = useState();
  const [sessionId, setSessionId] = useState("");
  const [token,setToken] = useState("")
  const [publisher, setPublisher] = useState(null);
  const [subscribers, setSubscribers] = useState([]);
  const [subscriber, setSubscriber] = useState(null);
  const [checkMyScreen,setCheckMyScreen] = useState("")
  const [isConnect,setIsConnect] = useState(false)
  const [role,setRole] = useState(location.state.role)

  const [mute,setMute] = useState(false)
  const [hidden,setHidden] = useState(false)
  const [userMute,setUserMute] = useState(false)
  const [userHidden,setUserHidden] = useState(false)

  const [chat,setChat] = useState(false) // 채팅창
  const deleteSubscriber = (streamManager,id) => {
    console.log("지우기 시도")
    try{
      console.log("지우기")
      setSubscribers(current=>current.filter(sub=>{
        return sub.stream.session.options.sessionId !== id
      }));
    }catch(error){
      console.log(error)
    }
  };
  // 브라우저 새로고침, 종료, 라우트 변경
  const onbeforeunload = async (e) => {
    e.preventDefault();
    e.returnValue = "";
    try{
      let token = localStorage.getItem("accessToken")
      let refreshtoken = localStorage.getItem("refreshtoken")
      if(localStorage.getItem("masterId") === localStorage.getItem("nickname")){
        const getOutRoomMaster = await axios.delete(url+`/room/${location.state.sessionId}`,{headers:{"authorization":token,"refreshtoken":refreshtoken}})
        console.log(getOutRoomMaster)
      }else{
        const getOutRoomUser = await axios.post(url+`/room/${location.state.sessionId}/member`,{},{headers:{"authorization":token,"refreshtoken":refreshtoken}})
        console.log(getOutRoomUser)
      }
      leaveSession();
    }catch(error){
      localStorage.setItem("error",error)
      console.log(error)
    }
  };
  const leaveSession = () => {
    setSubscribers([])
    setSessionId("")
    setOV(undefined)
    setPublisher(null)
  }
  const joinSession = useCallback(() => {
    setToken(location.state.token)
    setSessionId(location.state.sessionId)  
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
      setSubscriber(newSubscriber)
      setSubscribers(current=>[...current,newSubscriber]);
      setIsConnect(true)
    });
    // 1-3 예외처리
    newsession.on('exception', (exception) => {
      console.warn(exception);
    });
    // 1-2 session에서 disconnect한 사용자 삭제
    newsession.on('streamDestroyed', (e) => {
      if (e.stream.typeOfVideo === 'CUSTOM') {
        deleteSubscriber(e.stream.streamManager,e.stream.session.options.sessionId);
      } else {
        console.log("지우기 실패 ?")
        setCheckMyScreen(true);
      }
    });
    // 커넥팅 닉네임 받기~
    let nickname = localStorage.getItem("nickname")
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
  },[session])

  const handleCam = () => {
    setHidden((prev)=>!prev)
    publisher.publishVideo(hidden)
  }
  const handleMic = () => {
    setMute((prev)=>!prev)
    publisher.publishAudio(mute)
  }
  const handleUserCam = () => {
    setUserMute((prev)=>!prev)
    subscriber.subscribeToAudio(userMute);
  }
  const handleUserMic = () => {
    setUserHidden((prev)=>!prev)
    subscriber.subscribeToVideo(userHidden);
  }

  useEffect(()=>{ // 시작과 종료를 알리는
    window.addEventListener("beforeunload", onbeforeunload); 
    joinSession()
    return () => {
      window.removeEventListener("beforeunload", onbeforeunload);
    };
  },[])
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
            <img src={message} className="message-control"></img>
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
          <div className='room-chat'>
            {/* {publisher!== null ? <Chat nickname={localStorage.getItem("nickname")} roomName={location.state.roomTitle} success={true} sessionId={location.state.sessionId}></Chat> : null} */}
          </div>  
        </div>
        <div className='video-setting'>
          {role === "master" && publisher !== null ?  // 방장 전용 마이크 및 캠 바꾸기
            <>
              {hidden ? <img src={camoff} onClick={handleCam}></img> : 
                <img src={camon} onClick={handleCam}></img>}
              {mute ? <img src={micoff} onClick={handleMic}></img> :
                <img src={micon} onClick={handleMic}></img>}
            </>
           : null}
          {role === "user" && publisher !== null ?  // 유저 전용 마이크 및 캠 바꾸기
            <>
              {userHidden ? <img src={camoff} onClick={handleUserCam}></img> : 
                <img src={camon} onClick={handleUserCam}></img>}
              {userMute ? <img src={micoff} onClick={handleUserMic}></img> :
                <img src={micon} onClick={handleUserMic}></img>}
            </>
           : null}
        </div>
      </div>
    </div>
  )
}

export default Room