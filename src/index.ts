import { readFile } from 'fs'
import { tags, Tag } from 'swf-types'

readFile(process.cwd() + '/swfs/bunny.swf', async (_, data) => {
  // Define type compression from reading the three first bytes of the file
  // defineTypeCompression(data)

  const SWF = (await import('swf-parser')).parseSwf(data)

  const images = SWF.tags.filter((tag) => {
    const mediaType = (tag as tags.DefineBitmap).mediaType
    return String(mediaType).startsWith('image')
  }) as Extract<Tag, tags.DefineBitmap>[]

  const className = (SWF.tags.filter((tag) => (tag as tags.PlaceObject).name)[0] as tags.PlaceObject).name
  const current = images.map((img) => ({
    path: className as string,

    // Convertion from Uint8Array to Buffer: Buffer.from(img.data)
    // we need to find a way for reading this buffer, can it be read in base64 ?
    contents: img.data
  }))

  console.log(current)

  // unhandled error: "free-tex-packer-core: Error reading, mine must be a string" ?
  // const packerAtlas = await packAsync(current)
})
