var express = require('express')
var CryptoJS = require('crypto-js')
var app = express();

app.use(express.json())

function isValidSignature(body, notificationKey, signatureKey) {
  return CryptoJS.HmacSHA512(JSON.stringify(body), notificationKey).toString(CryptoJS.enc.Hex) === signatureKey
}

app.post('/notification-test', (req, res) => {
  const notificationKey = ''; // enter your notification key here
  const signatureKey = req.headers['x-remuno-sig'];
  const isValid = isValidSignature(req.body, notificationKey, signatureKey);
  console.log('Signature is valid: ', isValid);
  res.sendStatus(200);
})

app.listen(80, () => {
  console.log('Listening on port 80!');
})

module.exports = app;