const jwt = require("jsonwebtoken");
const secret_key = "jtaimeherlingga";

function signPayload(payload) {
  return jwt.sign(payload, secret_key);
}

function verifyToken(token) {
  return jwt.verify(token, secret_key);
}

module.exports = {
  signPayload,
  verifyToken,
};
