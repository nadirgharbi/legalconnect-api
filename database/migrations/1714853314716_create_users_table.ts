import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('gender', 2).notNullable()
      table.string('usertype').notNullable()
      table.string('firstname').notNullable()
      table.string('lastname').notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.string('speciality').nullable()
      table.string('phone').nullable()
      table.string('office_name').nullable()
      table.string('adress').nullable()
      table.integer('zip').nullable()
      table.string('city').nullable()
      table.string('country').nullable()
      table.string('sign').nullable()
      table.string('profile_picture').nullable()
      table.string('roles').nullable()
      table.string('description').nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
