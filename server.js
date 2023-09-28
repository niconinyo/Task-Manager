/* Require modules
--------------------------------------------------------------- */
require('dotenv').config()
const path = require('path');
const express = require('express');
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const methodOverride = require('method-override');

// Allows us to interpret POST requests from the browser as another request type: DELETE, PUT, etc.


/* Require the routes in the controllers folder
--------------------------------------------------------------- */
const userCtrl = require('./controllers/user')

const taskCtrl = require('./controllers/tasks')


/* Require the db connection, models, and seed data
--------------------------------------------------------------- */
const db = require('./models');


/* Create the Express app
--------------------------------------------------------------- */
const app = express();


// Detect if running in a dev environment
if (process.env.ON_HEROKU === 'false') {
    // Configure the app to refresh the browser when nodemon restarts
    const liveReloadServer = livereload.createServer();
    liveReloadServer.server.once("connection", () => {
        // wait for nodemon to fully restart before refreshing the page
        setTimeout(() => {
        liveReloadServer.refresh("/");
        }, 100);
    });
    app.use(connectLiveReload());
}

// Body parser: used for POST/PUT/PATCH routes: 
// this will take incoming strings from the body that are URL encoded and parse them 
// into an object that can be accessed in the request parameter as a property called body (req.body).
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
// Allows us to interpret POST requests from the browser as another request type: DELETE, PUT, etc.
app.use(methodOverride('_method'));
/* Configure the app (app.set)
--------------------------------------------------------------- */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));




/* Mount routes
--------------------------------------------------------------- */
// app.get('/', function (req, res) {
//     res.send('Task Manager')
// });

// // When a GET request is sent to `/seed`, the pets collection is seeded
app.get('/seed', function (req, res) {
    // Remove any existing pets
    db.user.deleteMany({})
        .then(removedUser => {
            console.log(`Removed ${removedUser.deletedCount}`)
            // Seed the pets collection with the seed data
            db.user.insertMany(db.seedTest.user)
                .then(addedUser => {
                    console.log(`Added ${addedUser.length} users created`)
                   
                })
        })
    db.tasks.deleteMany({})
        .then(removedTasks => {
            console.log(`Removed ${removedTasks.deletedCount}`)

            db.tasks.insertMany(db.seedTest.tasks)
                .then(addedTasks => {
                    console.log(`Added ${addedTasks.length} tasks created`)
                    res.json(addedTasks)
        })
});})

/* Mount routes
--------------------------------------------------------------- */
app.get('/', function (req, res) {
    res.render('landing') 
});

// New Route (GET/Read): This route renders a form 
// which the user will fill out to POST (create) a new location





app.get('/about', function (req, res) {
    res.send('You\'ve hit the about route')
});


app.use('/user', userCtrl)
app.use('/tasks', taskCtrl)
// // The "catch-all" route: Runs for any other URL that doesn't match the above routes
// app.get('*', function (req, res) {
//     res.send('404 Error: Page Not Found')
// });


/* Tell the app to listen on the specified port
--------------------------------------------------------------- */
app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});
