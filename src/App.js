import React, { useState } from "react";
const axios = require("axios");
const NodeRSA = require("node-rsa");

function App() {
  const [text, setText] = useState("");

  const onSubmit = async () => {
    const publicKey = await axios.get("/api/keys/getkey");
    let key_public = new NodeRSA(publicKey.data.key);
    const encriptedText = key_public.encrypt(text, "base64");
    console.log(encriptedText);
    await axios.post("/api/keys/decrypt", {
      textToDecrypt: encriptedText,
    });
  };

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <label>
          text:
          <input
            type="text"
            name="name"
            onChange={(text) => setText(text.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
