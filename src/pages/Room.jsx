import React, { useState ,useEffect} from 'react'
import axios from "axios"
import { OpenVidu } from 'openvidu-browser'
import { createBrowserHistory } from 'history'
import { useLocation } from 'react-router-dom'

const APPLICATION_SERVER_URL = process.env.REACT_APP_SERVER_URL
const history = createBrowserHistory()

const Room = () => {
  const location = useLocation();
  console.log(location.state.token.slice(6))
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

  const getToken = async (sessionId) => { // openvidu 가 아닌 세션 토큰 발급
    return createSession(sessionId)
    .then((sessionId) =>
      createToken(sessionId)
    );
  };
  const createSession = async (sessionId) => {
    const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions', { customSessionId: sessionId }, {
        headers: { 'Content-Type': 'application/json', },
    });
    console.log(response.data)
    return response.data; // The sessionId
  }

  const createToken = async (sessionId) => {
      const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', {}, {
          headers: { 'Content-Type': 'application/json', },
      });
      setToken(response.data)
      console.log(response.data)
      return response.data; // The token
  }
  const joinSession2 = () => {
    setToken(location.state.token.slice(6))
    setSessionId(location.state.sessionId)
    const newOV = new OpenVidu();
    newOV.enableProdMode();
    setOV(newOV);
    let FRAME_RATE = 10;
    OV.getUserMedia({
      audioSource: false,
      videoSource: undefined,
      resolution: '1280x720',
      frameRate: FRAME_RATE
   })
  }
  const joinSession = () => {
    setToken(location.state.token)
    setSessionId(location.state.sessionId)
    // 1. openvidu 객체 생성
    const newOV = new OpenVidu();
    // socket 통신 과정에서 많은 log를 남기게 되는데 필요하지 않은 log를 띄우지 않게 하는 모드
    newOV.enableProdMode();
    // 2. initSesison 생성
    const newSession = newOV.initSession();
    // JSON.parse(JSON.stringify(newSession))
    // 3. 미팅을 종료하거나 뒤로가기 등의 이벤트를 통해 세션을 disconnect 해주기 위해 state에 저장
    setOV(newOV);
    
    // tokenWork(newSession)
    connectSession(newSession)
    // let tokenStuff = location.state.token.split("=")[2]
    let tokenStuff = location.state.token
    // 4. session에 connect하는 과정
    console.log("000000")
    console.log(session)
    newSession.on('streamCreated', (e) => {
      console.log("101010")
      const newSubscriber = newSession.subscribe(
        e.stream,
        undefined
        // JSON.parse(e.stream.connection.data).clientData
      );
      console.log("1111111")
      const newSubscribers = subscribers;
      newSubscribers.push(newSubscriber);
      console.log("2222222222")
      setSubscribers([...subscribers,newSubscribers]);
      setIsConnect(true)
      });
      // 1-3 예외처리
      newSession.on('exception', (exception) => {
        console.warn(exception);
      });
      // 1-2 session에서 disconnect한 사용자 삭제
      newSession.on('streamDestroyed', (e) => {
        console.log("3333333333333")
        if (e.stream.typeOfVideo === 'CUSTOM') {
          deleteSubscriber(e.stream.streamManager);
        } else {
          setDestroyedStream(e.stream.streamManager);
          setCheckMyScreen(true);
        }
      });
      newSession.connect( tokenStuff, { clientData: username})
      .then(async () => {
        OV.getUserMedia({
          audioSource: false,
          videoSource: undefined,
          resolution: '1280x720',
          frameRate: 10,
        })
        .then((mediaStream) => {
          let videoTrack = mediaStream.getVideoTracks()[0];
          let newPublisher = OV.initPublisher(
          username,
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
  const tokenWork = (newSession) => {
    // 그놈의 토큰 처리
  }
  const connectSession = (newSession) =>{
   
  } 
  
  const deleteSubscriber = (streamManager) => {
    const prevSubscribers = subscribers;
    let index = prevSubscribers.indexOf(streamManager, 0);
    if (index > -1) {
      prevSubscribers.splice(index, 1);
      setSubscribers([...prevSubscribers]);
    }
  };
  const handlerJoinSessionEvent = (e) => {
    e.preventDefault()

  }
  const handlerLeaveSessionEvent = (e) => {
    e.preventDefault()

  }
  const handleChangeUserName = (e) => {
    e.preventDefault()
    setUsername(e.target.value)
  }
  const handleSessionId = () => {
    
  }
  const leaveSession = () => {
    session.disconnect()
  }
  // 브라우저 새로고침, 종료, 라우트 변경
  const onbeforeunload = (event) => {
    event.preventDefault();
    event.returnValue = "";
    leaveSession();
  };

  // 뒤로가기;
  useEffect(() => {
    window.onpopstate = () => {
      history.push("/");
    };
  },[]);

  useEffect(()=>{
    // window.addEventListener("beforeunload", onbeforeunload);
    joinSession()
    // return () => {
    //   window.removeEventListener("beforeunload", onbeforeunload);
    //   // 채팅 닫기 등
    // };
  },[])
  return (
    <div className='room'>
      {/* <div>
        <div id="join">
          <div id="join-dialog">
              <h1> Join a video session </h1>
              <form>
                  <p>
                    <label>Participant: </label>
                    <input
                        type="text"
                        id="userName"
                        value={username}
                        onChange={handleChangeUserName}
                        required
                    />
                  </p>
                  <p>
                      <label> Session: </label>
                      <input
                          type="text"
                          id="sessionId"
                          value={sessionId}
                          onChange={handleChangeSessionId}
                          required
                      />
                  </p>
                  <p>
                      <input name="commit" type="submit" value="JOIN" />
                  </p>
              </form>
          </div>
      </div>
      </div> */}
    </div>
  )
}

export default Room