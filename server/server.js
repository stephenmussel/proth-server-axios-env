require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const axios = require('axios');

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for axios requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('build'));

/** ---------- EXPRESS ROUTES ---------- **/
// REVIEW: how we use a 3rd party API to request data
// NOTES: our client makes request to /giphy with possible search parameters
app.get('/giphy', (req, res) => {
    // NOTES: our server makes a request to giphy API
    // NOTES: &limit=25 is param for receiving 25 giphy images with all the data
    axios.get(`https://api.giphy.com/v1/gifs/trending?api_key=${process.env.GIPHY_API_KEY}&limit=2&rating=g`)
    .then(response => {
        // NOTES: server gets response back which we forward back to client
        res.send(response.data)
    }).catch(error => {
        res.sendStatus(500);
    })
});

/*
Client side code:
axios.get('/giphy')
    .then(response => {
        // ex: giphy sends back response back as .data, so response could be response.data.data.
        res.send(response.data); 
            esponse.data.data.map(gif => {
                gif.small_image.url...
            }
        });
    }).catch(error => {
        res.sendStatus(500);
    });
*/

/** ---------- START SERVER ---------- **/
app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
});