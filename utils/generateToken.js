const jwt = require('jsonwebtoken');
require('dotenv').config();
const generateToken = (userId,expiry) =>{
  return  jwt.sign({_id: userId},process.env.JWT_SECRET,{expiresIn:expiry});
};
module.exports = generateToken;