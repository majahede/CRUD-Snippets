import express from 'express'
import hbs from 'express-hbs'
import logger from 'morgan'
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

    // View enginge set up
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

    // register routes
    app.use('/', router)

    app.listen(process.env.PORT, () =>
      console.log(`Server running now at http://localhost:${process.env.PORT}`)
    )
  } catch (err) {
    console.error(err.message)
    process.exitCode = 1
  }
}

main()
