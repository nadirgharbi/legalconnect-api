import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'appointments'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.timestamp('date').alter()
      table.timestamp('starting_at').alter()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dateTime('date').alter()
      table.dateTime('starting_at').alter()
    })
  }
}
