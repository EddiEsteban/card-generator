require('dotenv').config() // loads confirmation information from the .env file
const orm = require('./app/orm') // just to test db connection
const express = require('express')
const router = require('./app/router');

const app = express()

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 8080

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// handlebar boilerplate
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// enter routing here *******
router(app)

app.use( express.static('public') )

// Start the server so that it can begin listening to client requests.
app.listen(PORT, function () {
    // Log (server-side) when the server has started
    console.log('Server listening on: http://localhost:' + PORT)
})