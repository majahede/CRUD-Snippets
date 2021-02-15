import express from 'express'
import { router as snippetsRouter } from './snippets-router.js'
import { router as userRouter } from './user-router.js'

export const router = express.Router()

router.use('/', snippetsRouter)
router.use('/', userRouter)
