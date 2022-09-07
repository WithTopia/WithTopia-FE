import React, { useContext, useState } from "react";
import Attach from "../../assets/attach.png";

const ChatInputBox = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const handleSend = async () => {
  };
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <img src={Attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Attach} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatInputBox