import React, { useContext, useEffect, useRef , useState } from "react";
import "./ChatBox.scss"
import logo from "../../assets/cam.png"

const Message = ({ message }) => {
  // const { currentUser } = useContext("AuthContext");
  // const { data } = useContext("ChatContext");
  const [owner, setOwner] = useState(false)
  const ref = useRef();

  useEffect(() => {
    
  }, [message]);

  return (
    <div>
      <div
        ref={ref}
        className={`message` + owner ? " owner" : ""}>
        <div className="messageInfo">
          <img
            src={logo}
            alt=""/>
          <span>just now</span>
        </div>
        <div className="messageContent">
          <p>{message}</p>
          <p>{message}</p>
          <p>{message}</p>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;