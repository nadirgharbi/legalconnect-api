import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Appointment from './appointment.js'


const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare gender: string

  @column()
  declare usertype: string

  @column()
  declare firstname: string

  @column()
  declare lastname: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare specialty: string

  @column()
  declare phone: string

  @column()
  declare office_name: string

  @column()
  declare adress: string

  @column()
  declare zip: number

  @column()
  declare city: string

  @column()
  declare country: string

  @column()
  declare sign: string

  @column()
  declare profile_picture: string

  @column()
  declare roles: string

  @column()
  declare description: string

  @column()
  declare opening_hours: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => Appointment, {
    foreignKey: 'client_id',
  })
  declare todo: HasMany<typeof Appointment>

  static accessTokens = DbAccessTokensProvider.forModel(User)
}
