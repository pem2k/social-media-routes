const express = require('express');
const router = express.Router()
const path = require("path");

//api/users
    //get all users
    //get a single user by _id and populated thought and friend data
    //post a new user
    //Put to update a user by its _id
    //delete to remove a user by its _id

///api/users/:userId/friends/:friendId
    //post to add a new friend to a user's friend list
    //delete to remove a friend from a user's friend list