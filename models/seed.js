const seedTest = {
    user: [{
    username: 'wrlucas',
    firstName:'Winston',
    lastName: 'Lucas',
    email: 'wrlucasas@gmail.com',
    password: 'password'
    }],

    tasks: [{
        taskName: 'test name',
        title: 'test title',
        description: 'test description',
        status: 'test status',
        dueDate: Date.now(),

    }]
}
module.exports = seedTest;


