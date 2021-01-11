const express = require("express");
var CryptoJS = require("crypto-js");

const router = express.Router();

const NodeRSA = require("node-rsa");
const key = new NodeRSA({ b: 1024 });

var public_key = key.exportKey("public");
var private_key = key.exportKey("private");
router.get("/getkey", async (req, res) => {
  try {
    res.json({ key: public_key });
  } catch (err) {
    console.error(err.message);
    res.status(400).json("Error: " + err);
  }
});

router.post("/decrypt", async (req, res) => {
  try {
    const { text, key } = req.body;
    const key_private = new NodeRSA(private_key);
    const AES_key = key_private.decrypt(key, "utf8");
    var bytes = CryptoJS.AES.decrypt(text, AES_key);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    console.log("original text is", originalText);
  } catch (err) {
    console.error(err.message);
    res.status(400).json("Error: " + err);
  }
});

module.exports = router;
