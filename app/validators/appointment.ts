import vine from '@vinejs/vine'

export const createAppointmentValidator = vine.compile(
  vine.object({
    reason: vine.string().trim(),
    client_id: vine.number(),
    pro_id: vine.number(),
    date: vine.date().nullable(),
    starting_at: vine.date().nullable(),
    is_visio: vine.boolean(),
  })
)

export const updateAppointmentsValidator = vine.compile(
  vine.object({
    reason: vine.string().trim().optional(),
    client_id: vine.number().optional(),
    pro_id: vine.number().optional(),
    date: vine.date().optional(),
    starting_at: vine.date().optional(),
    is_visio: vine.boolean().optional(),
  })
)
