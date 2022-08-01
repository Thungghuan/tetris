import { COLORS, HEIGHT, WIDTH } from './constants'
import type { Board } from '@/types'

function getRandomColor() {
  const colorLength = COLORS.length

  return COLORS[Math.floor(Math.random() * colorLength)]
}

export function nextTick(board: Board) {
  const row = Math.floor(Math.random() * HEIGHT)
  const col = Math.floor(Math.random() * WIDTH)

  board[row][col].state = 1
  board[row][col].color = getRandomColor()
}
