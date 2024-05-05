import vine from '@vinejs/vine'

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(8).maxLength(32),
  })
)

export const registerValidator = vine.compile(
  vine.object({
    firstName: vine.string().minLength(3).maxLength(64),
    lastName: vine.string().minLength(3).maxLength(64),
    gender: vine.enum(['Monsieur', 'Madame']),
    // type: vine.enum(['Client', 'Professionnel']),
    email: vine
      .string()
      .email()
      .unique(async (query, field) => {
        const user = await query.from('users').where('email', field).first()
        return !user
      }),
    password: vine
      .string()
      .regex(/[!@#$%^&*]/)
      .regex(/[0-9]/)
      .regex(/[A-Z]/)
      .minLength(8)
      .maxLength(32),
  })
)
