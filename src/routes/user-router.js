import express from 'express'
import { UserController } from '../controllers/user-controller.js'

export const router = express.Router()

const userController = new UserController()

router.get('/login', (req, res, next) => userController.signIn(req, res, next))
