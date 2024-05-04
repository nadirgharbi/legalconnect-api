import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('full_name', 'first_name')
      table.string('last_name').notNullable()
      table.enum('gender', ['Monsieur', 'Madame']).notNullable()
      table.enum('type', ['Client', 'Professionnel']).notNullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('first_name', 'full_name')
      table.dropColumns('last_name', 'gender', 'type')
    })
  }
}
