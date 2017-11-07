const express = require('express')
const router = express.Router()

const tweetBank = require('../tweetBank.js')

router.get('/', (req, res) => {
  let tweets = tweetBank.list()
  res.render('index', {title: 'Tweets', tweets: tweets})
})

router.get( '/users/:name', (req, res) => {
  let user = req.params.name
  let userTweets = tweetBank.find({name: user})
  res.render('index', {title: 'Tweets', tweets: userTweets, showForm: true, name: user})
});

router.get('/tweets/:id', (req,res) => {
  let id = Number(req.params.id)
  let tweet = tweetBank.find({id: id})
  res.render('index', {tweets: tweet})
})

router.get('/tweets', (req, res) => {
  res.render('index', {showForm: true})
})

router.post('/tweets', (req, res) => {
  let name = req.body.name
  let text = req.body.text
  tweetBank.add(name, text)
  let newTweet = tweetBank.find({name: name, content: text})[0]
  module.io.sockets.emit('newTweet', newTweet)
  res.redirect(`/tweets/${newTweet.id}`)
})

module.exports = function(io) {
  module.io = io
  return router
}
