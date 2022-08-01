import { COLORS, HEIGHT, WIDTH } from './constants'
import { BlockStates } from './block'
import type { Block, Board } from '../types'

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
  const allBlocks: Pick<Block, 'type' | 'index'>[] = []

  for (const [type, blocks] of BlockStates) {
    blocks.forEach((_, index) => {
      // matching every block with its type
      allBlocks.push({
        type,
        index
      })
    })
  }

  const randomIdx = Math.floor(Math.random() * allBlocks.length)

  return {
    ...allBlocks[randomIdx],
    color: getRandomColor()
  }
}

export function createEmptyBlock(): Block {
  return {
    type: null,
    index: 0,
    color: ''
  }
}
