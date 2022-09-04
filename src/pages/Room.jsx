import React, { useState ,useEffect} from 'react'
import OpenViduSession from "openvidu-react"
import axios from "axios"
import { OpenVidu } from 'openvidu-browser'

const APPLICATION_SERVER_URL = "https://3.35.133.225/"

const Room = () => {
  const [session,setSession] = useState(undefined)
  const [OV, setOV] = useState();
  const [sessionId, setSessionId] = useState("");
  const [username, setUsername] = useState("");
  const [token,setToken] = useState("")
  const [publisher, setPublisher] = useState(null);
  const [subscribers, setSubscribers] = useState([]);
  const [destroyedStream,setDestroyedStream] = useState("")
  const [checkMyScreen,setCheckMyScreen] = useState("")

  const getToken = async (sessionId) => {
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
  const joinSession = () => {
    // 1. openvidu 객체 생성
    const newOV = new OpenVidu();
    // socket 통신 과정에서 많은 log를 남기게 되는데 필요하지 않은 log를 띄우지 않게 하는 모드
    newOV.enableProdMode();
    // 2. initSesison 생성
    const newSession = newOV.initSession();
    // JSON.parse(JSON.stringify(newSession))
    // 3. 미팅을 종료하거나 뒤로가기 등의 이벤트를 통해 세션을 disconnect 해주기 위해 state에 저장
    setOV(newOV);
    setSession(newSession);

    // 4. session에 connect하는 과정
    
   }
   const connection = (e) => {
    e.preventDefault()
    // 4-a token 생성
    console.log(session)
    getToken(sessionId).then((token) => {
      session.connect(token, { clientData: username})
        .then(async () => {
          let newPublisher = OV.initPublisher(
            undefined,
            {
              audioSource: undefined,  // The source of audio. If undefined default audio input
              videoSource: undefined, // The source of video. If undefined default video input
              publishAudio: true,  // Whether you want to start the publishing with audio unmuted or muted
              publishVideo: true, // Whether you want to start the publishing with video enabled or disabled
              resolution: '1280x720',  // The resolution of your video
              frameRate: 10,   // The frame rate of your video
              insertMode: 'APPEND',  // How the video will be inserted according to targetElement
              mirror: true   // Whether to mirror your local video or not
            })
          // 4-b user media 객체 생성
        //   newOV
        //     .getUserMedia({
        //       audioSource: false,
        //       videoSource: undefined,
        //       resolution: '1280x720',
        //       frameRate: 10,
        //     })
        //     .then((mediaStream) => {
        //       var videoTrack = mediaStream.getVideoTracks()[0];

              
        // 4-c publish
        session.publish(newPublisher)
          })
        // newPublisher.once('accessAllowed', () => {
        //         newSession.publish(newPublisher);
        //         setPublisher(newPublisher);
        //       });
        //     });
        // })
        .catch((error) => {
          console.warn(
            'There was an error connecting to the session:',
            error.code,
            error.message
          );
        });
    })
  }
  const stream = () =>{
    session.on('streamCreated', (e) => {
      const newSubscriber = session.subscribe(
        e.stream,
        undefined
        // JSON.parse(e.stream.connection.data).clientData
      );
      
      const newSubscribers = subscribers;
      newSubscribers.push(newSubscriber);
  
      setSubscribers([...newSubscribers]);
    });
    // 1-2 session에서 disconnect한 사용자 삭제
    session.on('streamDestroyed', (e) => {
      e.preventDefault()
      console.log("지우기 전")
      if (e.stream.typeOfVideo === 'CUSTOM') {
        deleteSubscriber(e.stream.streamManager);
      } else {
        setDestroyedStream(e.stream.streamManager);
        setCheckMyScreen(true);
      }
    });
    // 1-3 예외처리
    session.on('exception', (exception) => {
      console.warn(exception);
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
  const handleChangeSessionId = (e) => {
    e.preventDefault()
    setSessionId(e.target.value)
  }
  const leaveSession = () => {
    session.disconnect()
  }
  useEffect(()=>{
    joinSession()
  },[])
  return (
    <div className='room'>
      <div>
      {/* {session === undefined ? ( */}
        <div id="join">
          <div id="join-dialog">
              <h1> Join a video session </h1>
              <form onSubmit={(e)=>connection(e)}>
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
      {/* ) : (
          <div id="session">
          <OpenViduSession
            id="opv-session"
            sessionName={session}
            user={username}
            token={token}
            joinSession={sessionId}
            leaveSession={publisher}
            // error={this.handlerErrorEvent}
            error={"error"}
          />
          </div>
      )} */}
      </div>
    </div>
  )
}

export default Room