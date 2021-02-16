import { Snippet } from '../models/snippet.js'

/**
 * Encapsulates a controller.
 */
export class SnippetsController {
  /**
   * Displays snippets.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index (req, res, next) {
    try {
      const viewData = {
        snippets: (await Snippet.find({}))
          .map(snippet => ({ // Transform to object.
            id: snippet._id,
            value: snippet.value,
            userId: snippet.userId,
            username: snippet.username
          }))
      }
      res.render('snippets/index', { viewData })
      console.log(req.session)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Returns a HTML form for creating a new snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async new (req, res, next) {
    try {
      const viewData = {
        value: undefined
      }
      res.render('snippets/new', { viewData })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Create new snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   *
   */
  async create (req, res) {
    try {
      const snippet = new Snippet({
        value: req.body.value,
        userId: req.session.userId,
        username: req.session.username
      })
      // save snippet to the database.
      await snippet.save()
      req.session.flash = { type: 'success', text: 'The snippet was created successfully.' }
      // redirect to start page.
      res.redirect('.')
      console.log(snippet)
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('./new')
    }
  }

  /**
   * Returns a HTML form for editing a snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async edit (req, res) {
    try {
      const snippet = await Snippet.findOne({ _id: req.params.id })
      const viewData = {
        id: snippet._id,
        value: snippet.value
      }
      res.render('snippets/edit', { viewData })
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('..')
    }
  }

  /**
   * Updates a specified snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   *
   */
  async update (req, res) {
    try {
      await Snippet.updateOne({ _id: req.body.id }, {
        value: req.body.value
      })
      req.session.flash = { type: 'success', text: 'The snippet was updated successfully.' }
      res.redirect('..')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('./edit')
    }
  }

  /**
   * Returns a HTML form for removing a snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async remove (req, res) {
    try {
      const snippet = await Snippet.findOne({ _id: req.params.id })
      const viewData = {
        id: snippet._id,
        value: snippet.value
      }
      console.log(typeof viewData.id)
      res.render('snippets/remove', { viewData })
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('..')
    }
  }

  /**
   * Deletes a specified snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   *
   */
  async delete (req, res) {
    try {
      await Snippet.deleteOne({ _id: req.body.id })
      req.session.flash = {
        type: 'success', text: 'The snippet was deleted successfully.'
      }
      res.redirect('..')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('./remove')
    }
  }

  /**
   * Check if user is authorized.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Function} next - Error.
   */
  async authorize (req, res, next) {
    try {
      const snippet = await Snippet.findOne({ _id: req.params.id })
      if (req.session.userId !== snippet.userId) {
        const error = new Error('Forbidden')
        error.status = 403
        return next(error)
      }
      next()
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('..')
    }
  }
}
