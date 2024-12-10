const User = require("../models/User");
const bcrypt = require("bcryptjs");
const users = User;

async function findUserByUsername(username) {
  return await users.findOne({ username: { $eq: username } });
}

async function authenticate(username, password) {
  const user = await findUserByUsername(username);
  if (!user) {
    return false;
  }
  // console.log(user);
  return bcrypt.compareSync(password, user.password);
}

module.exports = { findUserByUsername, authenticate };
