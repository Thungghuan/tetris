import { HEIGHT, WIDTH } from './constants'
import type { Board, Lattice } from '../types'

export function createBoard(): Board {
  return Array.from({ length: HEIGHT }, () =>
    Array.from({ length: WIDTH }, () => ({
      state: 0
    }))
  )
}
