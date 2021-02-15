// import { User } from '../models/user.js'

import { User } from '../models/user.js'

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
    console.log(User)
  }

  /**
   * Authenticate and log in user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async login (req, res, next) {
    try {
      const user = await User.authenticate(req.body.username, req.body.password)
      req.session.regenerate(() => {
        res.redirect('..')
        console.log(user)
      })
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('login')
    }
  }
}
