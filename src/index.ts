import { readFile } from 'node:fs'

import type { tags } from 'swf-types'

readFile(process.cwd() + '/swfs/bunny.swf', async (_, data) => {
  const SWF = (await import('swf-parser')).parseSwf(data)

  const images = SWF.tags.filter((tag) => {
    const mediaType = (tag as tags.DefineBitmap).mediaType
    return String(mediaType).startsWith('image')
  }) as tags.DefineBitmap[]

  const className = (
    SWF.tags.filter((tag) => {
      return (tag as tags.PlaceObject).name
    })[0] as tags.PlaceObject
  ).name

  const current = images.map((img) => {
    return {
      path: className as string,
      contents: img.data
    }
  })

  console.log(current)

  // const packerAtlas = await packAsync(current)
})
