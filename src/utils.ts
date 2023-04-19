export const RGB_2_HEX = (r: number, g: number, b: number): string => {
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        return x.toString(16).padStart(2, '0')
      })
      .join('')
  )
}

// Define type compression from reading the three first bytes of the file
// defineTypeCompression(data)
export const defineTypeCompression = (data: Buffer): string => {
  return Array.from({ length: 3 })
    .map((_, index) => {
      return String.fromCharCode(data[index])
    })
    .join('')
}
