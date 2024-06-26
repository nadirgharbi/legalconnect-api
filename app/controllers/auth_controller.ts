import type { HttpContext } from '@adonisjs/core/http'
import { loginValidator, registerValidator, updateUserValidator } from '#validators/auth'
import User from '#models/user'

export default class AuthController {
  async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)

    return response.ok({
      token: token,
      ...user.serialize(),
    })
  }

  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)

    const user = await User.create(payload)

    console.log('user : ', user)

    return response.created(user)
  }

  async logout({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const token = auth.user?.currentAccessToken.identifier
    if (!token) {
      return response.badRequest({ message: 'Token not found' })
    }
    await User.accessTokens.delete(user, token)
    return response.ok({ message: 'Logged out' })
  }

  async update({ auth, request, response }: HttpContext) {
    try {
      await auth.authenticate()
      const user = auth.user!

      const payload = await request.validateUsing(updateUserValidator)

      user.merge(payload) // fusion des imformations que l'utilisateur modifie

      user.save()
      return response.ok(user)
    } catch (error) {
      return error
    }
  }
}
