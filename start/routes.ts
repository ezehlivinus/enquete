/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.on('/').render('welcome')

Route.get('register', 'AuthController.showForm').as('register-form')
Route.post('register', 'AuthController.register').as('register')
Route.post('logout', 'AuthController.logout').as('logout')
Route.get('login', 'AuthController.loginForm').as('login-form')
Route.post('login', 'AuthController.login').as('login')

// Polls route group
Route
  .group(() => {
    Route.get('/', 'PollsController.index').as('polls.index')
    Route.get('/create', 'PollsController.create').as('polls.create')
    Route.post('/new-poll', 'PollsController.store').as('polls.store')
    Route.get('/:id/edit', 'PollsController.edit').as('polls.edit')
    Route.post('/:id/update', 'PollsController.update').as('polls.update')
    Route.post('/:id/delete', 'PollsController.delete').as('polls.delete')
    Route.get('/:id', 'PollsController.show').as('polls.show')

    // PollQuestion
    Route
      .group(() => {
        Route.get('/', 'PollQuestionsController.index').as('questions.index')
        Route.get('/create', 'PollQuestionsController.create').as('questions.create')
        Route.post('/new-question', 'PollQuestionsController.store').as('questions.store')
        Route.get('/:id/edit', 'PollQuestionsController.edit').as('questions.edit')
        Route.post('/:id/update', 'PollQuestionsController.update').as('questions.update')
        Route.post('/:id/delete', 'PollQuestionsController.delete').as('questions.delete')
        Route.get('/:id', 'PollQuestionsController.show').as('questions.show')
      })
      .prefix('/:poll_id/questions')
  })
  .prefix('/polls')
