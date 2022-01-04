export const range = (max: number) => Array.from(Array(max).keys())

export const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
