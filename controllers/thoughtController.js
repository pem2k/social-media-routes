const { Thought, User} = require("../models")

module.exports={
    getAllThoughts(req,res){
        Thought.find()
        .select('-__v')
        .populate('reactions')
        .then((thoughts)=> res.json(thoughts))
        .catch((err) => res.status(500).json(err))
    },

    getThoughtById(req,res){
        Thought.findOne({_id: req.params._id})
        .select('-__v')
        .populate('reactions')
        .then((thoughts)=> res.json(thoughts))
        .catch((err) => res.status(500).json(err))
    },

    createThought(req,res){
        Thought.create({thoughtText:req.body.thoughtText, username:req.body.username})
        .then((thought) =>  {
            return User.findOneAndUpdate(
                {username: req.body.username},
                {$addToSet: {thoughts: thought._id}},
                {new: true}
            )
            }).then((user) =>
            !user
            ? res
                .status(404)
                .json({ message: 'Thought created, but found no user with that ID' })
            : res.json('Thought Created')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      })
      
    },

    updateThoughtById(req,res){
        Thought.findOneAndUpdate({_id: req.params._id}, {thoughtText: req.body.thoughtText})
            .then((thought) => {
                return User.findOneAndUpdate(
                    {username: req.body.username},
                    {$addToSet: {thoughts: thought._id}},
                    {new: true}
                )
            }).then((user) =>
            !user
              ? res
                  .status(404)
                  .json({ message: 'Thought updated, but found no user with that name' })
              : res.json('Thought updated')
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },

    deleteThoughtById(req,res){
        Thought.findOneAndDelete({_id: req.params.thoughtId}, {thoughtText: req.body.thoughtText})
            .then((thought) => {
                return User.findOneAndUpdate(
                    {username: req.body.username},
                    {$pull: {thoughts: {_id:req.body._id}}},
                )
            }).then((user) =>
            !user
              ? res
                  .status(404)
                  .json({ message: 'Thought deleted, but found no user with that ID' })
              : res.json('Thought deleted')
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },
    
    createReaction(req,res){
        Thought.findOneAndUpdate(
            {_id:req.params.thoughtId},
            {$addToSet:{ reactions: req.body }}
            ).then((thought) => {
                res.json(thought)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
              });
    },

    deleteReaction(req,res){
        Thought.findOneAndUpdate(
            {_id:req.params.thoughtId},
            {$pull:{ reactions: { reactionId: req.body.reactionId }}}
            ).then((thought) => {
                res.json(thought)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
              });
    },

}
// api/thoughts
    //get all thoughts
    //get a single thought by _id
    //post create a new thought, push the created thought's _id to the associated user's thought's array 
    //put to update a thought by its _id
    //delete a thought by its _id

// api/thoughts/:thoughtId/reactions
    //POST to create a reaction stored in a single thought's reactions array field
    //DELETE to pull and remove a reaction by the reaction's reactionId value