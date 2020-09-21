import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, validator } from '@ioc:Adonis/Core/Validator'
import Poll from 'App/Models/Poll'

export default class PollQuestionsController {
  // List a polls
  public async index ({ view }: HttpContextContract) {
    const polls = await Poll.all()

    return view.render('questions/index', { polls })
  }

  //  create a question
  public async create ({ view, request, response, params }: HttpContextContract) {
    return view.render('questions/create')
  }

  //  store a new question
  public async store ({ request, response }: HttpContextContract) {

  }

  //   show the form for editing a question
  public async edit ({ view, request, response, params }: HttpContextContract) {
    const poll = await Poll.findByOrFail('id', params.id)
    return view.render('polls/edit', { poll })
  }

  //   show a single question
  public async show ({ view, request, response, params }: HttpContextContract) {
    const poll = await Poll.findByOrFail('id', params.id)
    return view.render('polls/show', { poll })
  }

  //   update/modify a question
  public async update ({ view, request, response, params }: HttpContextContract) {

  }

//   delete a question
  public async delete ({ view, request, response, params}: HttpContextContract) {

  }
}
