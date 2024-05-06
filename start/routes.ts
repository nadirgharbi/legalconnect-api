/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import AppointmentsController from '#controllers/appointments_controller'
import ProsController from '#controllers/pros_controller'

const AuthController = () => import('#controllers/auth_controller')

router
  .group(() => {
    // Test
    router.get('/', async () => {
      return { hello: 'api' }
    })

    router.group(() => {
      router.get('pros', [ProsController, 'index'])
      router.get('pros/:id', [ProsController, 'byId'])
    })

    // appointments
    router.group(() => {
      router.get('appointments', [AppointmentsController, 'index'])
      router.post('appointments', [AppointmentsController, 'create'])
      router.put('appointments/:id', [AppointmentsController, 'update'])
      router.delete('appointments/:id', [AppointmentsController, 'destroy'])
    })

    router
      .group(() => {
        router.post('register', [AuthController, 'register'])
        router.post('login', [AuthController, 'login'])
        router.post('logout', [AuthController, 'logout']).use(middleware.auth())
        router
          .get('user', async ({ auth, response }) => {
            try {
              const user = auth.getUserOrFail()
              return response.ok(user)
            } catch (error) {
              return response.unauthorized({ error: 'User not found' })
            }
          })
          .use(middleware.auth())
      })
      .prefix('auth/')
  })
  .prefix('/api/v1')
