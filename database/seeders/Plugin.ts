import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import Plugin from 'App/Models/Plugin'
import { faker } from '@faker-js/faker'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  private generateRandomVersionNumber() {
    const majorVersion = Math.floor(Math.random() * 11)
    const minorVersion = Math.floor(Math.random() * 100)
    return `${majorVersion}.${minorVersion.toString().padStart(2, '0')}`
  }

  public async run() {
    // Write your database queries inside the run method
    await Plugin.fetchOrCreateMany(
      'slug',
      Array.from({ length: 10 }, () => ({
        name: faker.word.adjective({ length: { min: 8, max: 12 } }),
        slug: faker.word.adjective({ length: { min: 3, max: 4 } }).toUpperCase(),
        version: this.generateRandomVersionNumber(),
        description: faker.lorem.paragraph({ min: 3, max: 10 }),
        download_url: `${cuid()}.zip`,
        created_at: DateTime.local(),
        updated_at: DateTime.local(),
      }))
    )
  }
}
