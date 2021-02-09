import express from 'express'
import logger from 'morgan'

const app = express()

app.use(logger('dev'))

app.get('/', (req, res) => res.send('Start page'))

app.listen(8080, () =>
  console.log('Server running now at http://localhost:8080/')
)
