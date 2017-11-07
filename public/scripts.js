var socket = io.connect();

socket.on('connect', function(){
});
// When 'new_tweet' events are fired, do something with the packaged tweet

function addTweetListItem (name, content, id) {
  console.log(name, content, id)
  return (`<li>
  <h4 class='tweet-name'>
    <a href="users/${name}">
      ${name}
    </a>
  </h4>
  <p class="tweet-content">
    <a href="tweets/${id}">
      ${content}
    </a>
  </p>
</li>`)
}

socket.on('newTweet', function (tweet) {
  let listItem = addTweetListItem(tweet.name, tweet.content, tweet.id)
  $('.tweetList').append(listItem)

  // some logic to add the new tweet to the DOM…
});
