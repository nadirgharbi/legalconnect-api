import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
export default class UsersController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    return User.all()
  }

  async byId({ auth, response, params }: HttpContext) {
    await auth.authenticate() // verifie que l'utilisateur est authentifier

    const userId = params.id

    try {
      const getUser = await User.query().where('usertype', 'Client').where('id', userId).exec()

      getUser.map((e) => {
        return response.ok(e)
      })
    } catch (error) {
      console.log(error)
    }
  }
}
