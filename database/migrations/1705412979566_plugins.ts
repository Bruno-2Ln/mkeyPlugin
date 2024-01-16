import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'plugins'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.string('slug').notNullable().unique()
      table.string('version').notNullable()
      table.text('description', 'longtext').notNullable()
      table.string('download_url').notNullable()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table
        .timestamp('created_at', { precision: 6 })
        .notNullable()
        .defaultTo(this.raw('CURRENT_TIMESTAMP'))
      table
        .timestamp('updated_at', { precision: 6 })
        .notNullable()
        .defaultTo(this.raw('CURRENT_TIMESTAMP'))
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
