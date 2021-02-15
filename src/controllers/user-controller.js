// import { User } from '../models/user.js'

/**
 * Encapsulates a controller.
 */
export class UserController {
  /**
   * Returns a HTML form for signing in.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async signIn (req, res) {
    const viewData = {
      value: undefined
    }
    res.render('snippets/login', { viewData })
  }
}
