import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'plugins'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('download_url').notNullable().alter()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, () => {})
  }
}
