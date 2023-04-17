export const RGB_2_HEX = (r: number, g: number, b: number) =>
  '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')

export const defineTypeCompression = (data: Buffer) =>
  Array.from({ length: 3 })
    .map((_, index) => String.fromCharCode(data[index]))
    .join('')
