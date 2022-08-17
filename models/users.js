const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    Username: { 
        type: String, 
        unique: true, 
        required: true, 
        trim: true
    },

    email:{
        type: String,
        required: true,
        unique: true,
       //insert validator here
       match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "Invalid Email" ]
    },

    thoughts:[
        {
            type: Schema.Types.ObjectId,
            ref: 'thoughtText'
        }],

    friends:[
        {
            type: Schema.Types.ObjectId,
            ref: 'username'
        }]
},
{
    toJSON: {
      virtuals: true,
    },
    id: false,
  })

userSchema
  .virtual('FriendListLength')
  // Getter
  .get(function () {
    return this.friends.length;
  })


const User = mongoose.model('User', userSchema);

module.exports = User