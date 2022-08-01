import { ref } from 'vue'
import { createBlock, createBoard, createEmptyBlock } from './board'
import { GameState, type Board } from '@/types'

export const gameState = ref<GameState>()
export const gameBoard = ref<Board>()

export const nextBlock = ref(createEmptyBlock())

export function initGame() {
  gameState.value = GameState.Init
  gameBoard.value = createBoard()

  gameState.value = GameState.FallStart
}

function updateBoard() {
  const board = gameBoard.value!

  for (let row = 0; row < board.length; ++row) {
    for (let col = 0; col < board[0].length; ++col) {
      board[row][col].state = 0
      board[row][col].color = undefined
    }
  }
}

export function nextTick() {
  // updateBoard()

  nextBlock.value = createBlock()

  // const board = gameBoard.value!

  // const width = board[0].length

  // for (let row = 0; row < 4; ++row) {
  //   for (let col = 0; col < 4; ++col) {
  //     const state = nextBlock[row][col]

  //     board[row][col + (width / 2 - 2)].state = state

  //     if (state === 1) {
  //       board[row][col + (width / 2 - 2)].color = color
  //     }
  //   }
  // }
}
