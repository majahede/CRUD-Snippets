import express from 'express'
import { SnippetsController } from '../controllers/snippets-controller.js'

export const router = express.Router()

const snippetsController = new SnippetsController()

router.get('/', (req, res, next) => snippetsController.index(req, res, next))

router.get('/new', (req, res, next) => snippetsController.new(req, res, next))
router.post('/create', (req, res, next) => snippetsController.create(req, res, next))

router.get('/:id/edit', (req, res, next) => snippetsController.edit(req, res, next))
router.post('/:id/update', (req, res, next) => snippetsController.update(req, res, next))

router.get('/:id/remove', (req, res, next) => snippetsController.remove(req, res, next))
router.post('/:id/delete', (req, res, next) => snippetsController.delete(req, res, next))
