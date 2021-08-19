const BASEURL = new URL("https://emoji-link.net/")
const randomEmojiLib = require('random-unicode-emoji')
var stringLength = 5

/**
 * Generator function to get a random emoji string from the 'random unicode emoji' library
 */
function* getRandomEmojiString() {
  var randEmojiArray = randomEmojiLib.random({ count: stringLength })
  // console.log(JSON.stringify(randEmojiArray))
  yield randEmojiArray.join('')
}

/**
 * Gets a unique emoji string by iterating over the gernatator and checking KV to see if there is already a match.
 * @returns string unique emoji
 */
async function getUniqueRandomEmojiString() {
  var emojiGen = getRandomEmojiString()
  var emojiString = emojiGen.next().value

  while (await doesKVKeyExist(emojiString)) {
    stringLength++
    emojiString = emojiGen.next().value
  }

  return emojiString
}

/**
 * Checks KV to see if the key exists
 * @param {String} key
 * @returns {Boolean}
 */
async function doesKVKeyExist(key) {
  const value = await LINKS.get(key)
  return value === null ? false : true
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  var requestURLObj = new URL(request.url)

  // Get the pathname to look for a short link
  requestPath = requestURLObj.pathname.split('/')

  if (requestPath[1]) {
    var longURLResult = await LINKS.get(decodeURIComponent(requestPath[1]))

    if (longURLResult) {
      var requested_url = new URL(longURLResult)
      return Response.redirect(requested_url.toString(), 303)
    } else {
      return new Response(
        JSON.stringify({
          Status: 404,
          Message: 'Short url not found',
          ShortUrl: null,
        }),
        {
          status: 404,
          statusText: 'Not found',
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }
  } else {
    // If there is no short link, check if are we trying to create a new one
    if (requestURLObj.searchParams.get('new')) {
      try {
        var longURL = new URL(requestURLObj.searchParams.get('new'))

        try {
          // Get a unique and random string
          var randomKey = await getUniqueRandomEmojiString()
        } catch (e) {
          return new Response(
            JSON.stringify({
              Status: 500,
              Message: e.message,
              ShortUrl: null,
            }),
            {
              status: 500,
              statusText: 'Server error',
              headers: { 'Content-Type': 'application/json' },
            },
          )
        }

        try {
          // Put the new showr link into KV
          await LINKS.put(randomKey, longURL.toString())
        } catch (e) {
          return new Response(
            JSON.stringify({
              Status: 500,
              Message: e.message,
              ShortUrl: null,
            }),
            {
              status: 500,
              statusText: 'Server error',
              headers: { 'Content-Type': 'application/json' },
            },
          )
        }

        // Return the results to the user      
        return new Response(
          JSON.stringify({
            Status: 200,
            Message: 'Successfully created new link',
            LongURL: longURL,
            ShortURL: BASEURL + randomKey,
          }),
          {
            headers: { 'Content-Type': 'application/json' },
          },
        )
      } catch (e) {
        return new Response(
          JSON.stringify({
            Status: 400,
            Message: e.message,
            ShortUrl: null,
          }),
          {
            status: 400,
            statusText: 'Bad Request',
            headers: { 'Content-Type': 'application/json' },
          },
        )
      }
    } else {
      // If there's no shortlink and no 'new' parameter, then it's just the root URL.
      return fetch(request)
      /*
      return new Response(
        JSON.stringify({
          Status: 200,
          Message: 'Root URL specified',
          ShortUrl: null,
        }),
        {
          status: 200,
          statusText: 'OK',
          headers: { 'Content-Type': 'application/json' },
        },
      ) */
    }
  }
}
