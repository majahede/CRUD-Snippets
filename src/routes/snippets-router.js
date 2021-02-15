import express from 'express'
import { SnippetsController } from '../controllers/snippets-controller.js'
import { UserController } from '../controllers/user-controller.js'

export const router = express.Router()

const snippetsController = new SnippetsController()
const userController = new UserController()

router.get('/', (req, res, next) => snippetsController.index(req, res, next))

router.get('/new', userController.authorize, snippetsController.new)
router.post('/create', userController.authorize, snippetsController.create)

router.get('/:id/edit', userController.authorize, snippetsController.authorize, snippetsController.edit)
router.post('/:id/update', userController.authorize, snippetsController.authorize, snippetsController.update)

router.get('/:id/remove', userController.authorize, snippetsController.authorize, snippetsController.remove)
router.post('/:id/delete', userController.authorize, snippetsController.authorize, snippetsController.delete)
