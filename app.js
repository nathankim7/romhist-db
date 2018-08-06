var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var path = require('path')
const mongoose = require('mongoose')
const { ApolloServer } = require('apollo-server-express')
const { typeDefs, resolvers } = require('./schema')

mongoose.connect('mongodb://nathankim7:testpassword1@ds151530.mlab.com:51530/ics3un')
mongoose.connection.on('open', () => { console.log('connected!') })

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

var app = express();

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, './dist')))

if (process.argv[2] && process.argv[2] === '-s') {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + 'index.html'));
  })
}

server.applyMiddleware({ app })

module.exports = app;
