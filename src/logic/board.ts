import { COLORS, HEIGHT, WIDTH } from './constants'
import { BLOCKS } from './block'
import type { Block, Board, Lattice } from '../types'

export function createBoard(): Board {
  return Array.from({ length: HEIGHT }, () =>
    Array.from({ length: WIDTH }, () => ({
      state: 0
    }))
  )
}

let lastColor = COLORS[0]

function getRandomColor() {
  const nextColors = COLORS.filter((color) => color !== lastColor)

  const colorLength = nextColors.length
  const color = nextColors[Math.floor(Math.random() * colorLength)]

  lastColor = color

  return color
}

export function createBlock(): Block {
  const allBlocks = BLOCKS.flat()
  const randomIdx = Math.floor(Math.random() * allBlocks.length)

  return [allBlocks[randomIdx], getRandomColor()]
}
