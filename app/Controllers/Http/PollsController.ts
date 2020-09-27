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

    await Poll.create(data)

    return response.redirect().toRoute('polls.index')
  }

  //   show the form for editing a poll
  public async edit ({ view, request, response, params }: HttpContextContract) {
    const poll = await Poll.findByOrFail('id', params.id)
    return view.render('polls/edit', { poll })
  }

  //   show a single poll
  public async show ({ view, request, response, params }: HttpContextContract) {
    const poll = await Poll.findByOrFail('id', params.id)
    const title = poll.title

    return view.render('polls/show', { poll, title })
  }

  //   update/modify a poll
  public async update ({ view, request, response, params }: HttpContextContract) {
    const pollSchema = schema.create({
      title: schema.string({trim: true}),
    })

    const data = await request.validate({
      schema: pollSchema,
    })

    let poll = await Poll.findByOrFail('id', params.id)

    poll.title = data.title

    poll = await poll.save()

    return response.redirect().toRoute('polls.show', {id: poll.id})
  }

  //   delete/destroy a poll
  public async delete () {

  }
}
