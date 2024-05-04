/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const AuthController = () => import('#controllers/auth_controller')

router
  .group(() => {
    // Test
    router.get('/', async () => {
      return { hello: 'world' }
    })

    router.post('register', [AuthController, 'register'])
  })
  .prefix('/api/v1')
