import { createBlock } from './board'
import type { Board } from '@/types'

function updateBoard(board: Board) {
  for (let row = 0; row < board.length; ++row) {
    for (let col = 0; col < board[0].length; ++col) {
      board[row][col].state = 0
      board[row][col].color = undefined
    }
  }
}

export function nextTick(board: Board) {
  updateBoard(board)

  const [nextBlock, color] = createBlock()
  const width = board[0].length

  for (let row = 0; row < 4; ++row) {
    for (let col = 0; col < 4; ++col) {
      const state = nextBlock[row][col]

      board[row][col + (width / 2 - 2)].state = state

      if (state === 1) {
        board[row][col + (width / 2 - 2)].color = color
      }
    }
  }
}
