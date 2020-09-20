import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
  public showForm ({ view }: HttpContextContract) {
    return view.render('auth/register')
  }

  public async register ({ request, auth, response }: HttpContextContract) {
    // 
    const validationSchema = schema.create({
      name: schema.string({ trim: true }),

      email: schema.string({ trim: true}, [
        rules.email(),
        rules.unique({ table: 'users', column: 'email'}),
      ]),

      password: schema.string({ trim: true}, [
        rules.confirmed(),
      ]),
    })

    const validatedData = await request.validate({
      schema: validationSchema,
    })

    const user = await User.create(validatedData)

    // log the user in
    await auth.login(user)

    return response.redirect('/')
  }

  public async logout ({ auth, response }: HttpContextContract) {
    await auth.logout()

    return response.redirect('/')
  }

  public async loginForm ({ view }: HttpContextContract) {
    return view.render('auth/login')
  }

  public async login ({ request, auth, session, response }: HttpContextContract) {
    const { email, password } = request.all()

    try {
      await auth.attempt(email, password)

      return response.redirect('/')
    } catch (error) {
      session.flash('notification', 'Unable to verify your details. Wrong email or password')

      return response.redirect('back')
    }
  }
}
