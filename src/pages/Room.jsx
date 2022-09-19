import React, { useState ,useEffect ,useCallback} from 'react'
// import Chat from "../components/chat/Chat"
import { OpenVidu } from 'openvidu-browser'
import { useLocation ,Link } from 'react-router-dom'
import VideoRecord from '../components/videoRecord/VideoRecord'
import Tempo from "../components/tempo/Tempo"
import { createBrowserHistory } from 'history';
import axios from 'axios'

const url = process.env.REACT_APP_SERVER_URL
const history = createBrowserHistory()

const Room = () => {
  const location = useLocation();
  let tokenStuff = location.state.token
  console.log(tokenStuff)
  const [session,setSession] = useState(undefined)
  const [OV, setOV] = useState();
  const [sessionId, setSessionId] = useState("");
  const [username, setUsername] = useState("");
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
    console.log("나가 ㅋㅋ")
    // session.unsubscribe(subscribers)
    // setSession(undefined);
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
    // socket 통신 과정에서 많은 log를 남기게 되는데 필요하지 않은 log를 띄우지 않게 하는 모드
    // newOV.enableProdMode();
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
        // JSON.parse(e.stream.connection.data).clientData
      );
      
      const newSubscribers = subscribers;
      newSubscribers.push(newSubscriber);
      
      setSubscribers([...subscribers,newSubscribers]);
      setIsConnect(true)
    });
    // 1-3 예외처리
    newsession.on('exception', (exception) => {
      console.warn(exception);
    });
    // 1-2 session에서 disconnect한 사용자 삭제
    newsession.on('streamDestroyed', (e) => {
      if (e.stream.typeOfVideo === 'CUSTOM') {
        deleteSubscriber(e.stream.streamManager);
      } else {
        setDestroyedStream(e.stream.streamManager);
        setCheckMyScreen(true);
      }
    });
    // 커넥팅 // 닉네임 받기~
    let nickname = localStorage.getItem("nickname")
    newsession.connect( tokenStuff, { clientData: nickname })
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
          newPublisher.once("accessAllowed", () => {
            newsession.publish(newPublisher);
            setPublisher(newPublisher)
          });
          // newsession.publish(newPublisher)
          // setPublisher(newPublisher)
        })
      })
      .catch((error) => {
        console.warn(
          'There was an error connecting to the session:',
          error,
          error.code,
          error.message
      );
    });
  },[session])
  useEffect(()=>{
    window.addEventListener("beforeunload", onbeforeunload);
    
    joinSession()
    // setTimeout(,1000)
    return () => {
      // onbeforeunload()
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
        <h2>{location.state.roomTitle}</h2>
        <hr></hr>
        <div className='video-chat'>
          <div className='room-video'>
            {publisher !== null ? (
              <VideoRecord streamManager={publisher}></VideoRecord>
            ) : null}
            {subscribers.length !== 0 ? (
              <VideoRecord streamManager={subscribers[0]}></VideoRecord>
            ) : null}
            {/* {subscribers.length !== 0 ? subscribers.map((sub,index)=>{
              return(
                <VideoRecord streamManager={subscribers[0]} check={false} key={index}></VideoRecord>
              )
            }) : null} */}
          </div>
          <div className='room-chat'>
            <Tempo></Tempo>
          </div>
        </div>
        <a href="/main"><button>Emergency</button></a>
      </div>
      {/* <Chat></Chat> */}
    </div>
  )
}

export default Room