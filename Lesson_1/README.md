# Practicing the use of the tag `<input type="hidden" />` on forms (Alpha EdTech)

This tag is used to add a hidden field, that *can't be seen or modified by the user*, to a form. For more details, check out the [MDN documentation.](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/hidden)

In this activity, we used the hidden input to send a token, that will be used for session control in
the next activities. The token was generated with the current time (in miliseconds since 01/01/1970)
and the username, to be unique for any user accessing the page.

## Requirements

* [Node.js](https://nodejs.org/en/)
* [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
* [Express](https://expressjs.com/)

### Notes

Some parts of this webpage are not optimized, and would not actually be used in production.
Keep in mind that the purpose of this exercise is solely to demonstrate the logic of sending
a request to a server and receiving a unique token to be used for the rest of the session.
There are swifter ways to do this, however the idea is the same. Some of the simplifications
used on this webpage are:

* The passwords were not encrypted;
* Page full HTML being generated in POST method response and reusing stylesheet from other pages;
* Not a Single Page Application;
* HTML with minimum elements (no meta tags).
