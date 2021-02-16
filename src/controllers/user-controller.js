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
   * @param {Function} next - Express next middleware function.
   */
  async signIn (req, res, next) {
    try {
      res.render('snippets/login')
    } catch (error) {
      next(error)
    }
  }

  /**
   * Returns a HTML form for signing up.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async signUp (req, res, next) {
    try {
      res.render('snippets/signup')
    } catch (error) {
      next(error)
    }
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
      // redirect to log in.
      res.redirect('./login')
    } catch (error) {
      req.session.flash = { type: 'danger', text: 'The username is already taken.' }
      res.redirect('./signup')
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
        req.session.username = user.username
        req.session.loggedIn = true
        res.redirect('.')
      })
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('./login')
    }
  }

  /**
   * Log out user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async logout (req, res, next) {
    try {
      req.session.destroy()
      res.redirect('.')
    } catch (error) {
      next(error)
    }
  }

  /**
   * Check if user is logged in.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Function} next
   */
  async authorize (req, res, next) {
    try {
      if (!req.session.user) {
        const error = new Error('Not found')
        error.status = 404
        return next(error)
      }
      next()
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('..')
    }
  }
}
