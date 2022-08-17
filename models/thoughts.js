const mongoose = require('mongoose');

const reaction = new mongoose.Schema({
    reactionId: {
        type: mongoose.Types.ObjectId, 
        default: mongoose.Types.ObjectId
    },

    reactionBody:{
        type: string,
        minLength: 1,
        maxLength: 280
    },

    userName:{
        type: String,
        required: true
    },

    createdAt:{
        type: Date,
        default: Date.now,
    }
})

const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },

    createdAt:{
        type: Date,
        default: Date.now,
    },

    userName:{
        type: String,
        required: true,
    },

    reactions:[reaction]

})

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought