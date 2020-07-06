require('dotenv').config() // loads confirmation information from the .env file
const express = require('express')
const router = require('./config/router');
const exphbs = require('express-handlebars');

const hbs = exphbs.create({
    helpers: {
        block: function(name){
            var blocks = this._blocks;
            content = blocks && blocks[name];
            return content ? content.join('\n') : null;
        },
        contentFor: function(name, options){
            var blocks = this._blocks || (this._blocks = {});
            block = blocks[name] || (blocks[name] = []); //Changed this to [] instead of {}
            block.push(options.fn(this));
        }
    }
});

const app = express()

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 8080

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// handlebar boilerplate
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// enter routing here *******
router(app)

app.use( express.static('public') )

// Start the server so that it can begin listening to client requests.
app.listen(PORT, function () {
    // Log (server-side) when the server has started
    console.log('Server listening on: http://localhost:' + PORT)
})