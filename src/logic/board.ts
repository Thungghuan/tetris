import { HEIGHT, WIDTH } from './constants'

export function createBoard() {
  return Array.from({ length: HEIGHT }, () =>
    Array.from({ length: WIDTH }, () => 0)
  )
}
