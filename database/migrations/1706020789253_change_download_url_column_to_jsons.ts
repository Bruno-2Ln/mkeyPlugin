import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'plugins'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.json('download_url').alter()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, () => {})
  }
}
