import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'appointments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('reason').notNullable()
      table.integer('client_id').unsigned().references('id').inTable('users').notNullable()
      table.integer('pro_id').unsigned().references('id').inTable('users').notNullable()
      table.dateTime('date').notNullable()
      table.dateTime('starting_at').notNullable()
      table.boolean('is_visio').notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('first_name', 'full_name')
      table.dropColumns('last_name', 'gender', 'type')
    })
  }
}
