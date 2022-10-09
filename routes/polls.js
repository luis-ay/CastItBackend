import express from 'express'
import { getPolls, createPoll, getPoll, updatePoll, getAllPolls } from '../controllers/polls.js'

const router = express.Router()

router.get('/:userId', getPolls)
router.get('/poll/:pollId', getPoll)
router.post('/create', createPoll)
router.patch('/poll/:pollId', updatePoll)

export default router