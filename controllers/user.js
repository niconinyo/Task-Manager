/* 
---------------------------------------------------------------------------------------
NOTE: Remember that all routes on this page are prefixed with `localhost:3000/pets`
---------------------------------------------------------------------------------------
*/


/* Require modules
--------------------------------------------------------------- */
const express = require('express')
const router = express.Router()


/* Require the db connection, and models
--------------------------------------------------------------- */
const db = require('../models')


/* Routes
--------------------------------------------------------------- */
// Index Route (GET/Read): Will display all pets
router.get('/', function (req, res) {
    db.user.find({})
        .then(user => res.render('tasks/task-index' + user._id), {tasks:task})
})

// New Route (GET/Read): This route renders a form 
// which the user will fill out to POST (create) a new location
router.get('/tasks/new', (req, res) => {
    db.user.findById({})
    .then (user => res.render('./task/new-task' + user._id))
})

// Create Route (POST/Create): This route receives the POST request sent from the new route,
// creates a new pet document using the form data, 
// and redirects the user to the new task show page
router.post('/tasks', (req, res) => {
    db.user.findByIdAndUpdate('650e2519d3eb63f5150db8cb',
    {
        $push: {
            tasks: req.body
        }
    },
    { new: true })
    res.render('./task/new-task')
})

// Edit Route (GET/Read): This route renders a form
// the user will use to PUT (edit) properties of an existing pet
router.get('/tasks/:id/edit', (req, res) => {
    db.user.findById(req.params.id)
        .then(tasks => res.send('You\'ll be editing your task ' + tasks._id))
})
// Update Route (PUT/Update): This route receives the PUT request sent from the edit route, 
// edits the specified pet document using the form data,
// and redirects the user back to the show page for the updated location.
router.put('/tasks/:id', (req, res) => {
    db.user.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        .then(task => res.json(task))
})
// Destroy Route (DELETE/Delete): This route deletes a pet document 
// using the URL parameter (which will always be the pet document's ID)
router.delete('/tasks/:id', (req, res) => {
    db.user.findByIdAndRemove(req.params.id)
        .then(task => res.send('You\'ve deleted task ' + user.tasks.taskName))
})


// Show Route (GET/Read): Will display an individual user document
// using the URL parameter (which is the document _id)
router.get('/:id', function (req, res) {
    db.user.findById(req.params.id)
        .then(user => res.render('./home'))
        .catch(() => res.send('404 Error: Page Not Found'))
})


/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router
