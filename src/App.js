import React, { useState, useEffect } from "react";
import Chance from "chance";
const chance = new Chance();
const axios = require("axios");
const NodeRSA = require("node-rsa");
const CryptoJS = require("crypto-js");

function App() {
  const [text, setText] = useState({ text: "", key: "" });
  const [publicRSAkey, setPublicRSAkey] = useState();

  useEffect(() => {
    (async function () {
      try {
        const publicKey = await axios.get("api/keys/getkey");
        setPublicRSAkey(publicKey.data.key);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      await axios.post("/api/keys/decrypt", text);
    } catch (error) {
      console.error("error is", error);
    }
  };

  const handleOnCHange = (e) => {
    const key = chance.guid();
    var ciphertext = CryptoJS.AES.encrypt(e.target.value, key).toString();
    let publicEncryption = new NodeRSA(publicRSAkey);
    const encriptedKey = publicEncryption.encrypt(key, "base64");
    const encriptBox = { text: ciphertext, key: encriptedKey };
    console.log(text);
    setText({ ...encriptBox });
  };

  return (
    <div
      className="App"
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <form onSubmit={onSubmit}>
          <input type="text" name="name" onChange={handleOnCHange} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}

export default App;
