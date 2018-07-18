import express from 'express'
import bodyParser from 'body-parser'
import chalk from 'chalk'
import morgan from 'morgan'
import mongoose from 'mongoose'
import { MONGO_URI } from './config/keys'

import { ApolloServer } from 'apollo-server-express'
import path from 'path'
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas'

// Model
import models from './models'

const app = express()
app.use(bodyParser.json())
app.use(morgan('combined'))

// Db definition
mongoose.connect(MONGO_URI, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, chalk.red('connection error:')))
db.once('open', function() {
  // we're connected!
  console.log(chalk.green('MongoDB Connected!!'))
})

// Route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

// Apollo Server
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './graphql/schema')))
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './graphql/resolvers')))

const server = new ApolloServer({
  // These will be defined for both new or existing servers
  typeDefs,
  resolvers,
  // Bind context
  context: { models }
  ,
})

server.applyMiddleware({ app })

app.listen({ port: 3000 }, () => console.log(chalk.green('App running at port 3000!')))