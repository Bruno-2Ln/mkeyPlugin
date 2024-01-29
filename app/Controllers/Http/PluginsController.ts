import Database from '@ioc:Adonis/Lucid/Database'
import Plugin from 'App/Models/Plugin'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreatePlugin from 'App/Validators/CreatePluginValidator'
import UpdatePlugin from 'App/Validators/UpdatePluginValidator'

export default class PluginsController {
  public async listOfPlugins() {
    const plugins = await Database.from(Plugin.table).orderBy('updated_at', 'desc')
    return {
      plugins,
    }
  }

  public async createPlugin({ request }: HttpContextContract) {
    const { slug, version } = request.body()
    const pluginFile = request.file('file', {
      extnames: ['zip'],
    })!
    const options = {
      name: `${slug}-${version}.zip`,
      visibility: 'public',
      ContentType: 'application/zip',
    }
    await pluginFile.moveToDisk(slug, options, 's3')
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const download_url = `${slug}/${slug}-${version}.zip`
    const plugin = new Plugin()
    const data = await request.validate(CreatePlugin)

    await plugin
      .merge({
        ...data,
        download_url,
      })
      .save()
    return {
      plugin,
      pluginFile,
    }
  }

  public async patchPluginBySlug({ request, params }) {
    const { version } = request.body()
    const plugin = await Plugin.findByOrFail('slug', params.slug)
    const pluginFile = request.file('file', {
      extnames: ['zip'],
    })!
    const options = {
      name: `${plugin.slug}-${version}.zip`,
      visibility: 'public',
      ContentType: 'application/zip',
    }
    await pluginFile.moveToDisk(plugin.slug, options, 's3')
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const download_url = `${pluginFile.fileName}`
    const data = await request.validate(UpdatePlugin)
    await plugin.merge({ ...data, download_url }).save()

    return {
      plugin,
    }
  }

  public async pluginDetailsBySlug({ params }: HttpContextContract) {
    // const message = 'Plugin not found'
    // const status = 404
    // const errorCode = 'E_ROW_NOT_FOUND'
    // try {
    const plugin = await Plugin.findByOrFail('slug', params.slug)
    return {
      plugin,
    }
    // } catch (error) {
    //   throw new RowNotFoundException(message, status, errorCode)
    // }
  }
}
