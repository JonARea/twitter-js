const express = require('express')
const app = express()
const routes = require('./routes')
const chalk = require('chalk')
const nunjucks = require('nunjucks')
const path = require('path')
const bodyParser = require('body-parser')
const socketio = require('socket.io')
const server = app.listen(3000, () => {
  console.log('listening on port 3000')
})

const io = socketio.listen(server)

app.set('view engine', 'html')
//app.engine('html', nunjucks.render)

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true,
  noCache: true
});

app.use((req, res, next) => {
  console.log(chalk.red(req.method, req.originalUrl))
  next()
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, '/public')))

app.use('/', routes(io))
