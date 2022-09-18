import React, { useState ,useEffect} from 'react'
// import Chat from "../components/chat/Chat"
import { OpenVidu } from 'openvidu-browser'
import { useLocation ,Link } from 'react-router-dom'
import VideoRecord from '../components/videoRecord/VideoRecord'
import Tempo from "../components/tempo/Tempo"
import { createBrowserHistory } from 'history';

const url = process.env.REACT_APP_SERVER_URL
const history = createBrowserHistory()

const Room = () => {
  const location = useLocation();
  let tokenStuff = location.state.token  
  const [session,setSession] = useState([])
  const [OV, setOV] = useState();
  const [sessionId, setSessionId] = useState("");
  const [username, setUsername] = useState("현웅");
  const [token,setToken] = useState("")
  const [publisher, setPublisher] = useState(null);
  const [subscribers, setSubscribers] = useState([]);
  const [destroyedStream,setDestroyedStream] = useState("")
  const [checkMyScreen,setCheckMyScreen] = useState("")
  const [isConnect,setIsConnect] = useState(false)
  
  const deleteSubscriber = (streamManager) => {
    const prevSubscribers = subscribers;
    let index = prevSubscribers.indexOf(streamManager, 0);
    if (index > -1) {
      prevSubscribers.splice(index, 1);
      setSubscribers([...prevSubscribers]);
    }
  };
  
  

  useEffect(()=>{
    // window.addEventListener("beforeunload", onbeforeunload);
    const joinSession = () => {
      setToken(location.state.token)  
      console.log("토큰",location.state.token)
      console.log("아이디",location.state.sessionId)
      setSessionId(location.state.sessionId)  
      // 1. openvidu 객체 생성
      const newOV = new OpenVidu();
      // socket 통신 과정에서 많은 log를 남기게 되는데 필요하지 않은 log를 띄우지 않게 하는 모드
      newOV.enableProdMode();
      // 2. initSesison 생성
      const newSession = newOV.initSession();
      setSession(newSession)
      // JSON.parse(JSON.stringify(newSession))
      // 3. 미팅을 종료하거나 뒤로가기 등의 이벤트를 통해 세션을 disconnect 해주기 위해 state에 저장
      setOV(newOV);
      // 4. session에 connect하는 과정
      newSession.on('streamCreated', (e) => {
        const newSubscriber = newSession.subscribe(
          e.stream,
          undefined
          // JSON.parse(e.stream.connection.data).clientData
        );
        
        const newSubscribers = subscribers;
        newSubscribers.push(newSubscriber);
        
        setSubscribers([...subscribers,newSubscribers]);
        setIsConnect(true)
      });
      // 1-3 예외처리
      newSession.on('exception', (exception) => {
        console.warn(exception);
      });
      // 1-2 session에서 disconnect한 사용자 삭제
      newSession.on('streamDestroyed', (e) => {
        if (e.stream.typeOfVideo === 'CUSTOM') {
          deleteSubscriber(e.stream.streamManager);
        } else {
          setDestroyedStream(e.stream.streamManager);
          setCheckMyScreen(true);
        }
      });
      // 커넥팅 // 닉네임 받기~
      setUsername(localStorage.getItem("nickname"))
      newSession.connect( tokenStuff, { clientData: username})
        .then(async () => {
          await newOV.getUserMedia({
            audioSource: false,
            videoSource: undefined,
            resolution: '240x180',
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
            newSession.publish(newPublisher)
            setPublisher(newPublisher)
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
    joinSession()
    return () => {
      // onbeforeunload()
      onbeforeunload()
      // window.removeEventListener("beforeunload", onbeforeunload);
    };
  },[])

  const leaveSession = () => {
    setTimeout(function(){
      setSession(undefined);
      setSubscribers([])
      setSessionId("")
      setOV(undefined)
      setPublisher(undefined)
    },1500)
    console.log("나가 ㅋㅋ")
  }
  // 브라우저 새로고침, 종료, 라우트 변경
  const onbeforeunload = () => {
    console.log(session)
    session.disconnect()
    session.unsubscribe(subscribers)
    // e.preventDefault();
    // e.returnValue = "";
    leaveSession();
  };

  useEffect(() => {
    window.onpopstate = () => {
      history.push("/main");
    };
  },[]);
  useEffect(()=>{
    console.log(subscribers)
  },[subscribers])
  
  return (
    <div className='room'>
      <div className='video-container'>
        <h2>{location.state.roomTitle}</h2>
        <hr></hr>
        <div className='video-chat'>
          <div className='room-video'>
            {publisher !== null ? (
              <VideoRecord streamManager={publisher} check={true}></VideoRecord>
            ) : null}
            {/* <VideoRecord streamManager={subscribers[0]} check={false}></VideoRecord> */}
            {/* {subscribers.map((sub,index)=>{
              return(
                <VideoRecord streamManager={subscribers[0]} check={false} key={index}></VideoRecord>
              )
            })} */}
            {subscribers.length !== 0 ? <VideoRecord streamManager={subscribers[0]} check={false}></VideoRecord> : null}
            
            
            
          </div>
          <div className='room-chat'>
            <Tempo></Tempo>
          </div>
        </div>
        <Link to="/main"><button>Emergency</button></Link>
      </div>
      {/* <Chat></Chat> */}
    </div>
  )
}

export default Room