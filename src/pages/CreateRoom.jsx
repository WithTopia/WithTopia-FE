import React,{useState,useEffect} from 'react';
import { OpenVidu } from 'openvidu-browser';

const CreateRoom = () => {
  class UserVideoComponent extends Component {
    constructor(props) {
        super(props);

        this.handleVideoClicked = this.handleVideoClicked.bind(this);
    }

    getNicknameTag() {
        // Gets the nickName of the user
        return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
    }

    handleVideoClicked(event) {
        // Triggers event for the parent component to update its main video display (other UserVideoComponent)
        if (this.props.mainVideoStream) {
            this.props.mainVideoStream(this.props.streamManager);
        }
    }
  }
  // --- 1) Get an OpenVidu object ( OpenVidu 객체 가져오기 )---
  this.OV = new OpenVidu();
  // --- 2) Init a session (세션 초기화 ) ---
  this.setState({
      session: this.OV.initSession(),
    }, () => {});
  //1.관심 있는 세션 이벤트 구독
  var mySession = this.state.session;

  // On every new Stream received...
  mySession.on('streamCreated', (event) => {
  // Subscribe to the Stream to receive it. Second parameter is undefined
  // so OpenVidu doesn't create an HTML video by its own
    var subscriber = mySession.subscribe(event.stream, undefined);
    //We use an auxiliar array to push the new stream
    var subscribers = this.state.subscribers;
    subscribers.push(subscriber);
    // Update the state with the new subscribers
    this.setState({
        subscribers: subscribers,
      });
    });

    // On every Stream destroyed...
  mySession.on('streamDestroyed', (event) => {
    event.preventDefault();

    // Remove the stream from 'subscribers' array
    this.deleteSubscriber(event.stream.streamManager);
  });

  // On every asynchronous exception...
  mySession.on('exception', (exception) => {
      console.warn(exception);
  });

  // 'getToken' method is simulating what your server-side should do.
  // 'token' parameter should be retrieved and returned by your own backend
  this.getToken().then(token => {

  // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
  // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
  mySession.connect(token, { clientData: this.state.myUserName })
      .then(() => {

// --- 5) Get your own camera stream ---
//나만의 카메라 스트림 가져오기

  // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
  // element: we will manage it on our own) and with the desired properties
  let publisher = this.OV.initPublisher(undefined, {
      audioSource: undefined, // The source of audio. If undefined default microphone
      videoSource: undefined, // The source of video. If undefined default webcam
      publishAudio: true,     // Whether you want to start publishing with your audio unmuted or not
      publishVideo: true,     // Whether you want to start publishing with your video enabled or not
      resolution: '640x480',  // The resolution of your video
      frameRate: 30,          // The frame rate of your video
      insertMode: 'APPEND',   // How the video is inserted in the target element 'video-container'
      mirror: false           // Whether to mirror your local video or not
  });
  // --- 6) Publish your stream ---
  //		스트림 게시
  mySession.publish(publisher);

  // Set the main video in the page to display our webcam and store our Publisher
  this.setState({
    mainStreamManager: publisher,
    publisher: publisher,
    });
  })
  .catch(error => {
  console.log('There was an error connecting to the session:', error.code, error.message);
    });
  });
    
        
    

    const leaveSession = () => {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
    const mySession = this.state.session;

    if (mySession) {
        mySession.disconnect();
    }

    // Empty all properties...
    this.OV = null;
    this.setState({
        mySessionId: 'SessionA',
        myUserName: 'Participant' + Math.floor(Math.random() * 100),
        session: undefined,
        mainStreamManager: undefined,
        publisher: undefined,
        subscribers: [],
      });
    }

  return (
    <div className='create-room'>
      <video autoPlay={true} ref={this.videoRef} />
      <div className="streamcomponent" onClick={this.handleVideoClicked}>
          <OpenViduVideoComponent streamManager={this.props.streamManager} />
        <div><p>{this.getNicknameTag()}</p></div>
      </div>
      {this.state.publisher !== undefined ? (
      <div className="stream-container col-md-6 col-xs-6">
          <UserVideoComponent streamManager={this.state.publisher}
            mainVideoStream={this.handleMainVideoStream} />
      </div>
    ) : null}
    {this.state.mainStreamManager !== undefined ? (
        <div id="main-video" className="col-md-6">
            <UserVideoComponent streamManager={this.state.mainStreamManager} />
        </div>
    ) : null}
    </div>
  )
}

export default CreateRoom