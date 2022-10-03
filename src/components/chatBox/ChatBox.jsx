import React, { useEffect, useRef , useState } from "react";
import "../chat/Chat.scss"

const ChatBox = ({ data ,userData }) => {
  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  return (
    <div
      ref={ref}
      className={`message ${data.user === userData.username && "owner"}`}>
      <div className="messageInfo">
        {/* <img
            src={
              message.senderId === currentUser.uid
                ? currentUser.photoURL
                : data.user.photoURL
            }
            alt=""
          />
          <span>just now</span> */}
      </div>
      <div className="messageContent">{data.user}
        {data.message === "" ? null : <p>{data.message}</p>}
      </div>
    </div>
  );
};

export default ChatBox;