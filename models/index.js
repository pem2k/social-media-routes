const User = require("./users")
const Thought = require("./thoughts")


User.create({username: "Amy", email: "amy@gmail.com"})
User.create({username: "John", email: "john@gmail.com"})
User.create({username: "Emmett", email: "emmett@gmail.com"})
User.create({username: "Parker", email: "parker@gmail.com"})

module.exports = {User, Thought}