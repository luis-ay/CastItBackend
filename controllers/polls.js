import Poll from '../models/pollModel.js'

export const getPolls = async (req, res) => { //will be called at /home and /polls
    const ownerId = req.params.userId
    try {
        const polls =  await Poll.find({owner: ownerId})
        res.status(200).json(polls)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}
export const getAllPolls = async (req, res) => { //will be called at /home and /polls
    try {
        const polls =  await Poll.find()
        res.status(200).json(polls)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getPoll = async (req, res) => { //will be called at results/:pollId
    const pollId = req.params.pollId
    try {
        const poll =  await Poll.findOne({pollId: pollId})
        console.log('single poll found',poll)
        res.status(200).json(poll)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}


export const createPoll = async (req, res) => { //will be called at /create
    const poll = req.body
    const newPoll = new Poll(poll)
    console.log('newPoll',newPoll)
    try {
        await newPoll.save()
        res.status(201).json(newPoll)
    } catch (error) {
        res.status(409).json(error.message)
    }
}

export const updatePoll = async (req, res) => { //will be called at /vote/:pollId
    const updatedPollId = req.params.pollId
    const updatedPollVote = req.body.vote
    const newVoter = req.body.voter
    console.log('vote',updatedPollVote)
    console.log('updating poll with id:', updatedPollId)
    try {
        const poll = await Poll.findOneAndUpdate({pollId: updatedPollId}, {
            $push: {
                votes: updatedPollVote,
                voters: newVoter
            }
        })
        await poll.save()
        res.status(200).json(updatedPollId)
    } catch (error) {
        res.status(409).json(error.message)
    }
}