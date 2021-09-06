# Emoji Link Shortner API

This is the API for an emoji link shortner.

## Creating a short URL

Send a request with the long link as the `new` parameter

```
GET https://emoji-link.net/new?=https://example.com/thisisareallylonglink
```

Response:

```
 {
    "Status":200,
    "Message":"Successfully created new link",
    "LongURL":"https://example.com/thisisareallylonglink",
    "ShortURL":"https://emoji-link.net/🔗/🌑🍌💶👝📰"
 }
```

## Following a link

Following an emoji link will redirect you to the long URL with a `303 See Other` response code.
