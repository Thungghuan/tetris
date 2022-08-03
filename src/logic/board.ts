import { COLORS, HEIGHT, WIDTH } from './constants'
import { BlockStates, getBlockSize, getBlockState } from './block'
import { BlockMovement } from '../types'
import type { Block, Board, RefCod } from '../types'
import { currentBlock, gameBoard } from './game'
import { refCod } from './movement'

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

export function removeLastBlock(lastCod: RefCod) {
  const [blockHeight, blockWidth] = getBlockSize(currentBlock.value)

  const removeHeight =
    lastCod[0] + 1 < blockHeight ? lastCod[0] + 1 : blockHeight
  const removeWidth = blockWidth

  for (let row = 0; row <= removeHeight; ++row) {
    for (let col = 0; col < removeWidth; ++col) {
      const state = getBlockState(currentBlock.value)

      gameBoard.value![row][col].state -= state[row][col]
    }
  }
}

export function updateBoard(moveDirection: BlockMovement) {
  const lastCod = refCod.value!

  removeLastBlock(lastCod)

  if (moveDirection === BlockMovement.Down) {
    refCod.value![0]++
  }

  console.log('update')

  // for (let row = 0; row < board.length; ++row) {
  //   for (let col = 0; col < board[0].length; ++col) {
  //     board[row][col].state = 0
  //     board[row][col].color = undefined
  //   }
  // }
}
