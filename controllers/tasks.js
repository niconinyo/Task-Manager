/* 
---------------------------------------------------------------------------------------
NOTE: Remember that all routes on this page are prefixed with `localhost:3000/pets`
---------------------------------------------------------------------------------------
*/


// /* Require modules
// --------------------------------------------------------------- */
const express = require('express')
const router = express.Router()


// /* Require the db connection, and models
// --------------------------------------------------------------- */
const db = require('../models')



// router.get('/', function (req, res) {
//     db.user.find({})
//         .then(user => res.render('tasks/task-index' + user._id), {tasks:task})
// })

// New Route (GET/Read): This route renders a form 
// which the user will fill out to POST (create) a new location
router.get('/new/:userId', (req, res) => {
    res.render('task/new-task', {userId: req.params.userId})
})

router.get('/:userId', (req, res) => {
    res.render('task/task-index', {userId: req.params.userId})})


router.get('/details/:id', (req, res) => {
    db.tasks.findById(req.params.id)
    .then( task => res.render('task/task-details', {task: task}))
})
// // Create Route (POST/Create): This route receives the POST request sent from the new route,
// // creates a new pet document using the form data, 
// // and redirects the user to the new task show page
router.post('/', (req, res) => {
    db.tasks.create(req.body)
    .then(task => res.render('task/task-details', {task: task}))
})

// // Edit Route (GET/Read): This route renders a form
// // the user will use to PUT (edit) properties of an existing pet
router.get('/:id/edit', (req, res) => {
    db.tasks.findById(req.params.id)
        .then(task => res.render('task/edit-task', {taskToEdit: task}))
})
// // Update Route (PUT/Update): This route receives the PUT request sent from the edit route, 
// // edits the specified pet document using the form data,
// // and redirects the user back to the show page for the updated location.
router.put('/:id', async (req, res) => {
    const updatedTask = await db.tasks.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    if (updatedTask) res.redirect(`/tasks/details/${updatedTask._id}`)
})
// // Destroy Route (DELETE/Delete): This route deletes a pet document 
// // using the URL parameter (which will always be the pet document's ID)
router.delete('/:id', async (req, res) => {
    const deletedTask = await db.tasks.findByIdAndRemove(req.params.id)
    if (deletedTask) res.redirect(`/user/home/${deletedTask.creator}`)
        
})


// // Show Route (GET/Read): Will display an individual user document
// // using the URL parameter (which is the document _id)
// router.get('/:id', function (req, res) {
//     db.user.findById(req.params.id)
//         .then(user => res.render('./home'))
//         .catch(() => res.send('404 Error: Page Not Found'))
// })





/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router

