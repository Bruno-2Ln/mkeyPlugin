// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Plugin from 'App/Models/Plugin'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreatePlugin from 'App/Validators/CreatePluginValidator'
import UpdatePlugin from 'App/Validators/UpdatePluginValidator'
// import { cuid } from '@ioc:Adonis/Core/Helpers'
// import RowNotFoundException from 'App/Exceptions/RowNotFoundException'

export default class PluginsController {
  public async listOfPlugins() {
    const plugins = await Database.from(Plugin.table).orderBy('updated_at', 'desc')
    return {
      plugins,
    }
  }

  public async createPlugin({ request }: HttpContextContract) {
    const pluginFile = request.file('file', {
      extnames: ['zip'],
    })!
    await pluginFile.moveToDisk('./')
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const download_url = pluginFile.fileName
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
    }
  }

  public async patchPluginBySlug({ request, params }) {
    // const payload = request.all()
    const plugin = await Plugin.findByOrFail('slug', params.slug)
    const pluginFile = request.file('file', {
      extnames: ['zip'],
    })!
    await pluginFile.moveToDisk('./')
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
