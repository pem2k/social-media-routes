const { User } = require("../models")

module.exports = {
    //api/users
        //get all users
        getAllUsers(req,res){
            User.find()
            .select('-__v')
            .populate('thoughts')
            .then((users)=> res.json(users))
            .catch((err) => res.status(500).json(err))
        },
        // api/users/:_id -> get a single user by _id and populated thought and friend data
        getUserById(req,res){
            User.findOne({ _id: req.params._Id })
            .select('-__v')
            .populate('thoughts')
            .then((user)=> res.json(user))
            .catch((err) => res.status(500).json(err))
        },
        //post a new user
        createUser(req,res){
            User.create({username: req.body.username, email: req.body.email})
                .then((createdUser) => res.json(createdUser))
                .catch((err) => res.status(500).json(err));
        },
        //Put to update a user by its _id
        updateUser(req,res){
            User.findOneAndUpdate({_id: req.params._Id},{userName: req.body.userName, email: req.body.email})
            .then((updatedUser) => res.json(updatedUser))
            .catch((err) => res.status(500).json(err));
        },
        //delete to remove a user by its _id
        deleteUser(req,res){
            User.findOneAndDelete({_id: req.params._Id})
            .then((deletedUser) => res.json(deletedUser))
            .catch((err) => res.status(500).json(err));
        },

///api/users/:userId/friends/:friendId
    //post to add a new friend to a user's friend list
    //delete to remove a friend from a user's friend list
}