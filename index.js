/*
    ; Actual API we're building
    ; It's value is an import of the express package (which is a function)
*/
const express = require('express');
const app = express();
const PORT = 8080;

/*
* Express does not parse json in the body by default
    - We need to set up middleware that tells express to parse json
    before the actual data hits the function that we're using to
    handle the request.
    - Middleware is shared code that runs before every endpoint
    callback ; common middleware is built into express itself
*/
app.use(express.json());

/*
A get endpoint to the t-shirt URI ; we'll handle
requests to it by passing a callback function as the
second argument.
'/tshirt' ROUTE : GET http://localhost:8080/tshirt

Whenever a client or end user requests that url, it
will fire this callback function to handle the request.
    - This function takes in req (to handle incoming
    data)and res (to handle outgoing data)
    - .send will send a data payload along with the
    response

*/
app.get('/tshirt', (req, res) => {
    res.status(200).send({
        tshirt: 'tshirt emoji',
        size: 'large'
    });
});

/*
Route Params: :id captures the dynamic values in the
URL (so a million t-shirts could more easily be
handled and then rendered.)
    * recap: post to create data on the server
*/
app.post('/tshirt/:id', (req, res) => {
    const { id } = req.params;
    const { logo } = req.body;

    if (!logo)
    {
        res.status(418).send({ message: 'We need a logo!' })
    }

    res.send({
        tshirt: 'tshirtemoji with your ${logo} and ID of ${id}',
    });
});

// Listen  on specified port (to fire up the API)
app.listen(
    PORT,
    () => console.log('its alive on http://localhost:${PORT}')
);