import "./ChatDetail.scss"
import Cam from "../../assets/cam.png";
import Add from "../../assets/add.png";
import More from "../../assets/more.png";
import ChatBox from "../chatBox/ChatBox"
import ChatInputBox from "../chatInputBox/ChatInputBox"

const ChatDetail = () => {
    return (
    <div className="chat">
      <div className="chatInfo">
        <span>조원영,서현웅...외 4명</span>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <ChatBox message={"massage"}></ChatBox>
      <ChatInputBox></ChatInputBox>
    </div>
  )
}

export default ChatDetail
