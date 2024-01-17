import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Plugin extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string | null | undefined

  @column()
  public slug: string

  @column()
  public version: string

  @column()
  public description: string | null | undefined

  @column()
  public download_url: string | null | undefined

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
