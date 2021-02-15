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
    res.render('snippets/login')
    console.log(User)
  }

  /**
   * Returns a HTML form for signing in.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async signUp (req, res) {
    res.render('snippets/signup')
    console.log(User)
  }

  /**
   * Register user to database.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async register (req, res, next) {
    try {
      const user = new User({
        username: req.body.username,
        password: req.body.password
      })
      // save user to the database.
      await user.save()

      req.session.flash = { type: 'success', text: 'The account was created successfully.' }
      // redirect to start page.
      res.redirect('..')
    } catch (error) {
      req.session.flash = { type: 'danger', text: 'The username is already taken.' }
      res.redirect('/login')
    }
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
        req.session.user = user
        req.session.userId = user._id
        req.session.userName = user.username
        req.session.loggedIn = true
        res.redirect('..')
      })
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('login')
    }
  }
}
