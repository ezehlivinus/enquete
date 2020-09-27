import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PollQuestions extends BaseSchema {
  protected tableName = 'poll_questions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('content')
      table.integer('pollId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('polls')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
