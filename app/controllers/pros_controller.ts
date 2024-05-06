import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProsController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    try {
      const pro = await User.query().where('usertype', 'Professionnel').exec()
      return response.ok(pro)
    } catch (error) {
      return response.badRequest(error.message)
    }
  }

  async byId({ response, params }: HttpContext) {
    try {
      const proId = params.id

      const pro = await User.query().where('usertype', 'Professionnel').where("id", proId).exec() // get pro id

      return response.ok(pro)
    } catch (error) {
      return response.badRequest(error.message)
    }
  }
}
