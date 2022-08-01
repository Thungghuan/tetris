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
  if (gameState.value === GameState.FallStart) {
    nextBlock.value = createBlock()

    gameState.value = GameState.Falling
  }

  if (gameState.value === GameState.Falling) {
    gameState.value = GameState.FallEnd
  }

  if (gameState.value === GameState.FallEnd) {
    gameState.value = GameState.FallStart
  }
}
