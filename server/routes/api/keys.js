const express = require("express");

const router = express.Router();

const NodeRSA = require("node-rsa");
const key = new NodeRSA({ b: 1024 });

var public_key = key.exportKey("public");
var private_key = key.exportKey("private");
router.get("/getkey", async (req, res) => {
  console.log("entered");

  try {
    res.json({ key: public_key });
  } catch (err) {
    console.error(err.message);
    res.status(400).json("Error: " + err);
  }
});

router.post("/decrypt", async (req, res) => {
  console.log("entered2");
  try {
    const { textToDecrypt } = req.body;
    console.log(textToDecrypt);
    const key_private = new NodeRSA(private_key);
    console.log(
      "decrypted message: " + key_private.decrypt(textToDecrypt, "utf8")
    );
  } catch (err) {
    console.error(err.message);
    res.status(400).json("Error: " + err);
  }
});

module.exports = router;
