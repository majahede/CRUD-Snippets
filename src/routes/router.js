import express from 'express'
import { router as snippetsRouter } from './snippets-router.js'

export const router = express.Router()

router.use('/', snippetsRouter)
