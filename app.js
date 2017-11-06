const express = require('express')
const app = express()
const chalk = require('chalk')

app.use((req, res, next) => {
  console.log(chalk.red(req.method, req.originalUrl))
  next()
})

app.use('/special', (req,res,next) => {
  console.log(chalk.blue('The super top secret place'))
})

app.get('/', (req, res) => {
  res.send('Welcome to the Twitter App')
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})
