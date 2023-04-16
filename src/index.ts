import { readFile, writeFile } from 'fs'
import { tags, Tag } from 'swf-types'
import { packAsync } from 'free-tex-packer-core'
import { PackerExporterType } from 'free-tex-packer-core'

const RGB_2_HEX = (r: number, g: number, b: number) =>
  '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')

readFile(process.cwd() + '/swfs/bunny.swf', async (_, data) => {
  // expected output: CWS
  const typeCompression = Array.from({ length: 3 })
    .map((_, index) => String.fromCharCode(data[index]))
    .join('')

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
    contents: Buffer.from(img.data)
  }))

  // debugs
  console.log(current)
  writeFile('./test.json', JSON.stringify(current), () => {})

  // unhandled error: "free-tex-packer-core: Error reading, mine must be a string" ?
  const packerAtlas = await packAsync(current)
  console.log(packerAtlas)
})
