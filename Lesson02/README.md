# Cookies for session management (Alpha EdTech course)

In this activiy I built a webpage to demonstrate the use of cookies for session management. For more details on cookies, check out the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies).

I used fetch for the http requests and the cookie-parser on the server side to send a token after login, and to check if that token remains the same. **The server is not optimized for multiple requests, as the purpose of this activity is to show the use of cookies for session validator.** I used a json file and node.js file system to create a fake database for persistence.

The webpage is just a login and signup page, after that the server checks if the token in the cookies is the same as it generated on login, and allows the user to advance to the next screen, which is pretty much empty for now. This webpage is a single page application (SPA).

## Requirements

* [Node.js](https://nodejs.org/en/)
* [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
* [Express](https://expressjs.com/)
* [cookie-parser](https://www.npmjs.com/package/cookie-parser)
