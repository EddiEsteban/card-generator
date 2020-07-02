require('dotenv').config()      // loads confirmation information from the .env file
const express = require("express")

const app = express()

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 8080

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// enter routing here *******


// have to move this under the routesController after getting handlebars working
app.use( express.static('public') )


// Start the server so that it can begin listening to client requests.
app.listen(PORT, function () {
    // Log (server-side) when the server has started
    console.log("Server listening on: http://localhost:" + PORT)
})