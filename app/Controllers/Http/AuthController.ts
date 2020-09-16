import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'


export default class AuthController {
    /**
     * showForm
     */
    public showForm( { view }: HttpContextContract ) {
        return view.render('auth/register')
    }

    /**
     * register
     */
    public async register({ request, auth, response }: HttpContextContract) {
        // 
        const validationSchema = schema.create({
            name: schema.string({ trim: true }),

            email: schema.string({ trim: true}, [
                rules.email(),
                rules.unique({ table: 'users', column: 'email'})
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

    
}
