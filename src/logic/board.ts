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

export function updateBlock(refCod: RefCod, isRemove: boolean = false) {
  const [blockHeight, blockWidth] = getBlockSize(currentBlock.value)
  const state = getBlockState(currentBlock.value)

  const [startRow, startCol] = refCod

  const removeHeight = Math.min(startRow + 1, blockHeight)
  const removeWidth = blockWidth

  for (let row = 0; row < removeHeight; ++row) {
    for (let col = 0; col < removeWidth; ++col) {
      if (isRemove) {
        gameBoard.value![startRow - row][startCol + col].state -=
          state[blockHeight - 1 - row][col]
      } else {
        gameBoard.value![startRow - row][startCol + col].state +=
          state[blockHeight - 1 - row][col]
      }

      if (state[blockHeight - 1 - row][col]) {
        gameBoard.value![startRow - row][startCol + col].color = isRemove
          ? undefined
          : currentBlock.value.color
      }
    }
  }
}

export function isBlockLanded() {
  const [refRow, refCol] = refCod.value!

  if (refRow === HEIGHT - 1) return true

  const blockState = getBlockState(currentBlock.value)
  const [blockHeight, blockWidth] = getBlockSize(currentBlock.value)

  const blockFloor = []
  for (let col = 0; col < blockWidth; ++col) {
    let lastRow = blockHeight - 1

    while (lastRow >= 0 && blockState[lastRow][col] === 0) lastRow--

    blockFloor.push(lastRow)
  }

  return blockFloor.some((row, col) => {
    if (refRow - (blockHeight - 1 - row) + 1 < 0) return false

    return (
      gameBoard.value![refRow - (blockHeight - 1 - row) + 1][refCol + col]
        .state === 1
    )
  })
}

function canBlockMove(lastCod: RefCod, moveDirection: BlockMovement) {
  const [_blockHeight, blockWidth] = getBlockSize(currentBlock.value)

  if (moveDirection === BlockMovement.Left && refCod.value![1] === 0)
    return false
  if (
    moveDirection === BlockMovement.Right &&
    refCod.value![1] + blockWidth === WIDTH
  )
    return false

  return true
}

export function updateBoard(moveDirection: BlockMovement) {
  const lastCod = refCod.value!

  if (!canBlockMove(lastCod, moveDirection)) return

  updateBlock(lastCod, true)

  switch (moveDirection) {
    case BlockMovement.Down:
      refCod.value![0]++
      break
    case BlockMovement.Left:
      refCod.value![1]--
      break
    case BlockMovement.Right:
      refCod.value![1]++
    default:
      break
  }

  updateBlock(refCod.value!)
}
