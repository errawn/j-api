import express from 'express'
import bodyParser from 'body-parser'
import chalk from 'chalk'
import morgan from 'morgan'
import mongoose from 'mongoose'

import { MONGO_URI } from './config/keys'

const app = express()
app.use(bodyParser.json())
app.use(morgan('combined'))

// Db definition
mongoose.connect(MONGO_URI, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  // we're connected!
  console.log(chalk.green('MongoDB Connected!!'))
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.listen(3000, () => console.log(chalk.green('App running at port 3000!')))