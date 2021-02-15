import express from 'express'
import { UserController } from '../controllers/user-controller.js'

export const router = express.Router()

const userController = new UserController()

router.get('/login', (req, res, next) => userController.signIn(req, res, next))
router.get('/signup', (req, res, next) => userController.signUp(req, res, next))

router.post('/register', (req, res, next) => userController.register(req, res, next))

router.post('/login', (req, res, next) => userController.login(req, res, next))
