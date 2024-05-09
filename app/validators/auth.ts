import vine from '@vinejs/vine'

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(8).maxLength(32),
  })
)

export const registerValidator = vine.compile(
  vine.object({
    firstname: vine.string().minLength(3).maxLength(64),
    lastname: vine.string().minLength(3).maxLength(64),
    gender: vine.enum(['M', 'F']),
    usertype: vine.enum(['Client', 'Professionnel']),
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

    speciality: vine.string(),
    phone: vine.string().optional(),
    office_name: vine.string().optional(),
    adress: vine.string().optional(),
    zip: vine.number().optional(),
    city: vine.string().optional(),
    country: vine.string().optional(),
    sign: vine.string().optional(),
    profile_picture: vine.string().optional(),
    roles: vine.string().optional(),
    description: vine.string().optional(),
    opening_hours: vine.string().optional(),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    firstname: vine.string().minLength(3).maxLength(64).optional(),
    lastname: vine.string().minLength(3).maxLength(64).optional(),
    speciality: vine.string().optional(),
    phone: vine.string().optional(),
    office_name: vine.string().optional(),
    adress: vine.string().optional(),
    zip: vine.number().optional(),
    city: vine.string().optional(),
    country: vine.string().optional(),
    sign: vine.string().optional(),
    profile_picture: vine.string().optional(),
    roles: vine.string().optional(),
    description: vine.string().optional(),
    opening_hours: vine.string().optional(),
  })
)
