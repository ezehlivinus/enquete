import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
    /**
     * showForm
     */
    public showForm( { view }: HttpContextContract ) {
        return view.render('auth.register')
    }
    
}
