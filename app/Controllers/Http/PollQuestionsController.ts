import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules, validator } from '@ioc:Adonis/Core/Validator'
import Poll from 'App/Models/Poll'
import PollQuestion from 'App/Models/PollQuestion'

export default class PollQuestionsController {
  // List a polls
  public async index ({ view, response, params }: HttpContextContract) {
    const poll = await Poll.findByOrFail('id', params.poll_id)
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const poll_id = poll.id

    await poll.preload('questions')
    const questions = poll.questions
    return response.json({questions, poll_id})

    // return view.render('questions/index', { polls })
  }

  //  create a question
  public async create ({ view, request, response, params }: HttpContextContract) {
    return view.render('questions/create')
  }

  //  store a new question
  public async store ({ request, response, params, session }: HttpContextContract) {
    const poll = await Poll.findByOrFail('id', params.poll_id)

    const questionSchema = schema.create({
      content: schema.string({ trim: true}),
    })

    const optionSchema = schema.create({
      options: schema.array([
        rules.minLength(1),
      ]).members(
        schema.string({ trim: true })
      ),
    })

    try {
      const validatedData = await request.validate({
        schema: questionSchema,
      })

      // return validatedData

      const question = new PollQuestion()
      question.content = validatedData.content
      question.pollId = params.poll_id

      await question.save()

      session.flash('success', 'Question has been created')

      return response.redirect().toRoute('polls.show', {id: params.poll_id})
    } catch (error) {
      return response.status(422).send({error: error.messages})
    }
  }

  //   show the form for editing a question
  public async edit ({ view, request, response, params }: HttpContextContract) {
    const poll = await Poll.findByOrFail('id', params.id)
    return view.render('polls/edit', { poll })
  }

  //   show a single question
  public async show ({ view, request, response, params }: HttpContextContract) {
    const poll = await Poll.findByOrFail('id', params.poll_id)
    const title = poll.title

    await poll.preload('questions')
    const questions = poll.questions
    return response.json({questions})
    // return view.render('polls/show', { title, poll, questions })
  }

  //   update/modify a question
  public async update ({ view, request, response, params }: HttpContextContract) {
    console.log('Reached backend')
    return response.json({'data': 'Ezeh'})
  }

  //   delete a question
  public async delete ({ view, request, response, params}: HttpContextContract) {

  }
}
