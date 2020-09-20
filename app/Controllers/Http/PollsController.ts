import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, validator } from '@ioc:Adonis/Core/Validator'
import Poll from 'App/Models/Poll'

export default class PollsController {
// List a polls
  public async index ({ view }: HttpContextContract) {
    const polls = await Poll.all()

    return view.render('polls/index', { polls })
  }

  //   render the form for creating a poll
  public async create ({ view }: HttpContextContract) {
    return view.render('polls/create')
  }

  //   save/store a new poll
  public async store ({ request, response }: HttpContextContract) {
    const pollSchema = schema.create({
      title: schema.string({trim: true}),
    })

    const data = await request.validate({
      schema: pollSchema,
    })

    const poll = await Poll.create(data)

    return response.redirect().toRoute('polls.index')
  }

  //   show the form for editing a poll
  public async edit () {

  }

  //   show a single poll
  public async show ({ view, request, response, params }: HttpContextContract) {
    const poll = await Poll.findByOrFail('id', params.id)
    return view.render('polls/show', { poll })
  }

  //   update/modify a poll
  public async update () {

  }

  //   delete/destroy a poll
  public async delete () {

  }
}
