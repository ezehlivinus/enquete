import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Polls extends BaseSchema {
  protected tableName = 'polls'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title')
      table.bigInteger('creator')
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
