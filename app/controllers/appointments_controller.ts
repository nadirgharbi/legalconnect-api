import Appointment from '#models/appointment'
import User from '#models/user'
// import User from '#models/user'
import { createAppointmentValidator, updateAppointmentsValidator } from '#validators/appointment'
import type { HttpContext } from '@adonisjs/core/http'

export default class AppointmentsController {
  /**
   * Display a list of resource
   */
  async index({ auth }: HttpContext) {
    try {
      // Vérifier si l'utilisateur est correctement authentifié
      await auth.authenticate()

      // Récupérer l'utilisateur authentifié
      const user = auth.user!

      // Récupérer l'ID de l'utilisateur
      const userID = user.id

      // Vérifier le type de l'utilisateur
      if (user.usertype === 'Client') {
        // Récupérer les rendez-vous du client
        const clientAppointments = await Appointment.query().where('client_id', userID).exec()
        return clientAppointments
      } else if (user.usertype === 'Professionnel') {
        // Récupérer les rendez-vous du professionnel
        const proAppointments = await Appointment.query().where('pro_id', userID).exec()
        return proAppointments
      } else {
        // Si l'utilisateur n'est ni client ni professionnel, retourner une réponse vide
        return []
      }
    } catch (error) {
      console.log(error)
      // Gérer les erreurs ici
      return {} // Retourner une réponse vide en cas d'erreur
    }
  }

  /**
   * Display form to create a new record
   */
  async create({ request, response, auth }: HttpContext) {
    try {
      await auth.authenticate()

      const user = auth.user!
      const userId = user.id

      const userPro = await User.query()
        .where('usertype', 'Professionnel')
        .where('id', userId)
        .exec()

      const userClient = await User.query().where('usertype', 'Client').where('id', userId).exec()

      const payload = await request.validateUsing(createAppointmentValidator)

      // Ajout du rendez vous uniquement si les id du client et du pro corressponde
      if (
        (userClient[0].usertype === 'Client' && userId === payload.client_id) ||
        (userPro[0].usertype === 'Professionnel' && userId === payload.pro_id)
      ) {
        const appointment = await Appointment.create(payload)
        // response.ok
        return response.created(appointment)
      } else {
        return response.unauthorized()
      }
    } catch (error) {
      console.log(error)

      return response.badRequest(error.messages)
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const appointmentId = params.id

      // on cherhce l'id dans la base
      const appointment = await Appointment.findOrFail(appointmentId)
      const payload = await request.validateUsing(updateAppointmentsValidator)

      // fusion des donnees avec les donnes deja presentes
      appointment.merge(payload)

      appointment.save()
      return response.ok(appointment)
    } catch (error) {
      return response.badRequest(error.messages)
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const appointmentId = params.id

      // on cherhce l'id dans la base
      const appointment = await Appointment.findOrFail(appointmentId)

      appointment.delete()

      return response.noContent()
    } catch (error) {
      return response.badRequest(error.message)
    }
  }

  /**
   * Handle form submission for the create action
   */
  // async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  // async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  // async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  // async update({ params, request }: HttpContext) {}
}
