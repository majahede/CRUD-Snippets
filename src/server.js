import express from 'express'
import hbs from 'express-hbs'
import session from 'express-session'
import logger from 'morgan'
import helmet from 'helmet'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { router } from './routes/router.js'
import { connectDB } from './config/mongoose.js'

/**
 * The main function of the application.
 */
const main = async () => {
  try {
    await connectDB()
    const app = express()

    const directoryFullName = dirname(fileURLToPath(import.meta.url))

    // Set up morgan logger.
    app.use(logger('dev'))

    app.use(helmet())

    // View enginge setup.
    app.engine('hbs', hbs.express4({
      defaultLayout: join(directoryFullName, 'views', 'layouts', 'default'),
      partialsDir: join(directoryFullName, 'views', 'partials')
    }))

    app.set('view engine', 'hbs')
    app.set('views', join(directoryFullName, 'views'))

    // Parse requests of the contetn type applications/x-www-form-urlencoded
    // Populates the request object with a body object (req.body)
    app.use(express.urlencoded({ extended: false }))

    // serve static files.
    app.use(express.static(join(directoryFullName, '..', 'public')))

    // Setup and use session middleware.
    const sessionOptions = {
      name: process.env.SESSION_NAME,
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        sameSite: 'lax'
      }
    }

    if (app.get('env') === 'production') {
      app.set('trust proxy', 1)
      sessionOptions.cookie.secure = true
    }

    app.use(session(sessionOptions))

    app.use((req, res, next) => {
      // Flash messages - survives only a round trip.
      if (req.session.flash) {
        res.locals.flash = req.session.flash
        delete req.session.flash
      }
      next()
    })

    app.use((req, res, next) => {
      // Flash messages - survives only a round trip.
      if (req.session.loggedIn) {
        res.locals.loggedIn = req.session.loggedIn
      }
      next()
    })

    // register routes
    app.use('/', router)

    // Error handler.
    app.use(function (err, req, res, next) {
    // 404 Not Found.
      if (err.status === 404) {
        return res
          .status(404)
          .sendFile(join(directoryFullName, 'views', 'errors', '404.html'))
      }

      // 403 Forbidden.
      if (err.status === 403) {
        return res
          .status(403)
          .sendFile(join(directoryFullName, 'views', 'errors', '403.html'))
      }

      // 500 Internal Server Error.
      if (req.app.get('env') !== 'development') {
        return res
          .status(500)
          .sendFile(join(directoryFullName, 'views', 'errors', '500.html'))
      }
    })

    app.listen(process.env.PORT, () => {
      console.log(`Server running now at http://localhost:${process.env.PORT}`)
    })
  } catch (err) {
    console.error(err.message)
    process.exitCode = 1
  }
}

main()
