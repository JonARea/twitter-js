const express = require('express')
const app = express()
const routes = require('./routes')
const chalk = require('chalk')
const nunjucks = require('nunjucks')

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

app.use(express.static('./public'))

app.use('/', routes)

// app.get('/', (req, res) => {
//   res.render('index', { title: 'Twitter-JS', people: [{name: 'Gandalf'}, {name: 'Hermione'}, {name: 'Frodo'}]})
// })

app.listen(3000, () => {
  console.log('listening on port 3000')
})
