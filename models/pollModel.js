import mongoose from "mongoose";

const pollSchema = mongoose.Schema({
    title: String,
    owner: String,
    pollId: String,
    votes: Array,
    voters: Array,
    choices: Array,
})

pollSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const Poll = mongoose.model('Poll', pollSchema)

export default Poll