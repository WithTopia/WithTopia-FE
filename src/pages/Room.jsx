import React, { useState ,useEffect} from 'react'
import Chat from "../components/chat/Chat"
import { OpenVidu } from 'openvidu-browser'
import { createBrowserHistory } from 'history'
import { useLocation } from 'react-router-dom'
import VideoRecord from '../components/videoRecord/VideoRecord'
import Tempo from "../components/tempo/Tempo"

const url = process.env.REACT_APP_SERVER_URL
const history = createBrowserHistory()


const Room = () => {
  const location = useLocation();
  let tokenStuff = location.state.token  
  const [session,setSession] = useState("")
  const [OV, setOV] = useState();
  const [sessionId, setSessionId] = useState("");
  const [username, setUsername] = useState("");
  const [token,setToken] = useState("")
  const [publisher, setPublisher] = useState(null);
  const [subscribers, setSubscribers] = useState([]);
  const [destroyedStream,setDestroyedStream] = useState("")
  const [checkMyScreen,setCheckMyScreen] = useState("")
  const [isConnect,setIsConnect] = useState(false)

  const joinSession = () => {
    setToken(location.state.token)  
    
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
    tokenWork(newSession,newOV)
  }
  const tokenWork = (newSession,newOV) => {
    // 그놈의 토큰 처리
    newSession.connect( tokenStuff, { clientData: username})
      .then(async () => {
        newOV.getUserMedia({
          audioSource: false,
          videoSource: undefined,
          resolution: '640x480',
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
  
  const deleteSubscriber = (streamManager) => {
    const prevSubscribers = subscribers;
    let index = prevSubscribers.indexOf(streamManager, 0);
    if (index > -1) {
      prevSubscribers.splice(index, 1);
      setSubscribers([...prevSubscribers]);
    }
  };
  
  const leaveSession = () => {
    session.disconnect()
    session.unsubscribe(subscribers)
    setSession(undefined);
    setSubscribers([])
    setSessionId("")
    setPublisher(undefined)
  }
  // 브라우저 새로고침, 종료, 라우트 변경
  const onbeforeunload = (e) => {
    e.preventDefault();
    e.returnValue = "";
    leaveSession();
  };

  // 뒤로가기;
  useEffect(() => {
    window.onpopstate = () => {
      history.push("/");
    };
  },[]);

  useEffect(()=>{
    window.addEventListener("beforeunload", onbeforeunload);
    joinSession()
    return () => {
      window.removeEventListener("beforeunload", onbeforeunload);
      // 채팅 닫기 등
    };
  },[])
  return (
    <div className='room'>
      <div className='video-container'>
        <h2>{location.state.roomTitle}</h2>
        <hr></hr>
        
        <div className='video-chat'>
          <div className='room-video'>
            <VideoRecord publisher={publisher} setPublisher={setPublisher}></VideoRecord>
          </div>
          <div className='room-chat'>
            <Tempo></Tempo>
          </div>
        </div>
      </div>
      
      
      {/* <Chat></Chat> */}
    </div>
  )
}

export default Room