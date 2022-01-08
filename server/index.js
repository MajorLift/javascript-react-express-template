const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const PORT = 3000;
const app = express();

/**
* Automatically parse urlencoded body content from incoming requests and place it
* in req.body
*/
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * handle requests for static files
 */
app.use(express.static(path.resolve(__dirname, '../dist')));

/**
* --- Express Routes ---
* Express will attempt to match these routes in the order they are declared here.
* If a route handler / middleware handles a request and sends a response without
* calling `next()`, then none of the route handlers after that route will run!
* This can be very useful for adding authorization to certain routes...
*/

/**
 * 404 handler
 */
app.use('*', (req,res) => {
  res.status(404).send('Not Found');
});

/**
 * express error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

/**
 * start server
 */
app.listen(PORT, () => { console.log(`Listening on port ${PORT}...`); });

module.exports = app;
