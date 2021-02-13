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
            value: snippet.value
          }))
      }
      res.render('snippets/index', { viewData })
      console.log(viewData)
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Returns a HTML form for creating a new snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async new (req, res) {
    const viewData = {
      value: undefined
    }
    res.render('snippets/new', { viewData })
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
        value: req.body.value
      })
      // save snippet to the database.
      await snippet.save()

      // redirect to start page.
      res.redirect('.')
    } catch (error) {
      console.log(error)
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
      res.redirect('..')
    }
  }

  /**
   * Updates a snippet.
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
      res.redirect('..')
    } catch (error) {
      console.log(error)
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
      res.render('snippets/remove', { viewData })
    } catch (error) {
      res.redirect('..')
    }
  }

  /**
   * Deletes a snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   *
   */
  async delete (req, res) {
    try {
      await Snippet.deleteOne({ _id: req.body.id })
      res.redirect('..')
    } catch (error) {
      console.log(error)
      res.redirect('./remove')
    }
  }
}
