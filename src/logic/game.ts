import { ref } from 'vue'
import {
  createBlock,
  createBoard,
  createEmptyBlock,
  isBlockLanded,
  updateBoard
} from './board'
import { BlockMovement, GameState, type Board } from '../types'
import { initMovement } from './movement'

export const gameState = ref<GameState>()
export const gameBoard = ref<Board>()

export const currentBlock = ref(createEmptyBlock())
export const nextBlock = ref(createEmptyBlock())

export function initGame() {
  gameState.value = GameState.Init
  gameBoard.value = createBoard()

  gameState.value = GameState.FallStart
}

export function keyStrokeHandler(event: KeyboardEvent) {
  event.preventDefault()

  const key = event.key

  switch (key) {
    case 'ArrowUp':
      console.log('Rotate')
      break
    case 'ArrowDown':
      nextTick(BlockMovement.Down)
      break
    case 'ArrowLeft':
      nextTick(BlockMovement.Left)
      break
    case 'ArrowRight':
      nextTick(BlockMovement.Right)
      break
    case ' ':
      break
    default:
      break
  }
}

export function nextTick(movement?: BlockMovement) {
  if (gameState.value === GameState.FallStart) {
    if (nextBlock.value.type === null) {
      nextBlock.value = createBlock()
    }

    currentBlock.value = nextBlock.value
    nextBlock.value = createBlock()

    initMovement()

    gameState.value = GameState.Falling
  }

  if (movement) {
    updateBoard(movement)
  } else if (gameState.value === GameState.Falling) {
    updateBoard(BlockMovement.Down)
  }

  if (isBlockLanded()) {
    gameState.value = GameState.FallEnd
  }

  if (gameState.value === GameState.FallEnd) {
    gameState.value = GameState.FallStart
  }
}
