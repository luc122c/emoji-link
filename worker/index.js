const emojiBaseURL = new URL(WORKER_API_URL)
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
 * Function to return an error to the user 
 * @param {error} Error object from try/catch
 * @param {Integer} HTTP status code to return to user
 */
function returnError(error, status) {
  code = parseInt(status)
  return new Response(
    JSON.stringify({
      Status: code,
      Message: error.message,
      ShortUrl: null,
    }),
    {
      status: code,
      statusText: 'Server error',
      headers: { 'Content-Type': 'application/json' },
    },
  )
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
  const requestURLObj = new URL(request.url)
  const requestPath = requestURLObj.pathname.split('/')
  const searchParams = requestURLObj.searchParams

  if (searchParams.get('new')) {
    try {
      var longURL = new URL(searchParams.get('new'))

      try {
        // Get a unique and random string
        var randomKey = await getUniqueRandomEmojiString()
      } catch (e) {
        returnError(e, 500)
      }

      try {
        // Put the new showr link into KV
        await LINKS.put(randomKey, longURL.toString())
      } catch (e) {
        returnError(e, 500)
      }

      // Return the results to the user
      return new Response(
        JSON.stringify({
          Status: 200,
          Message: 'Successfully created new link',
          LongURL: longURL,
          ShortURL: emojiBaseURL + '🔗/' + randomKey,
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
  }
  else if (requestPath[1] && decodeURIComponent(requestPath[1]) == '🔗' && requestPath[2]) {
    var longURLResult = await LINKS.get(decodeURIComponent(requestPath[2]))

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
    // If there's no shortlink and no 'new' parameter, then pass the request through to the origin.
    return await fetch(request)

    return new Response(
      JSON.stringify({
        Status: 200,
        Message: 'Pass through',
        ShortUrl: null,
      }),
      {
        status: 200,
        statusText: 'OK',
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
