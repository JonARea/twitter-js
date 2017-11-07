const express = require('express')
const router = express.Router()

const tweetBank = require('../tweetBank.js')

router.get('/', (req, res) => {
  let tweets = tweetBank.list()
  res.render('index', {title: 'Tweets', tweets: tweets})
})

module.exports = router
