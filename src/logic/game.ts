import { ref } from 'vue'
import {
  createBlock,
  createBoard,
  createEmptyBlock,
  isBlockLanded,
  updateBoard
} from './board'
import { BlockMovement, GameState, type Board } from '@/types'
import { initMovement } from './movement'

export const gameState = ref<GameState>()
export const gameBoard = ref<Board>()

export const currentBlock = ref(createEmptyBlock())
export const nextBlock = ref(createEmptyBlock())

export function initGame() {
  gameState.value = GameState.Init
  gameBoard.value = createBoard()

  gameState.value = GameState.FallStart

  // setInterval(() => {
  //   nextTick()
  // }, 60)
}

export function nextTick() {
  if (gameState.value === GameState.FallStart) {
    if (nextBlock.value.type === null) {
      nextBlock.value = createBlock()
    }

    currentBlock.value = nextBlock.value
    nextBlock.value = createBlock()

    initMovement()

    gameState.value = GameState.Falling
  }

  if (gameState.value === GameState.Falling) {
    updateBoard(BlockMovement.Down)

    if (isBlockLanded()) {
      gameState.value = GameState.FallEnd
    }
  }

  if (gameState.value === GameState.FallEnd) {
    gameState.value = GameState.FallStart
  }
}
