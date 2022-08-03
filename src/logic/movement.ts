import { ref, toRaw } from 'vue'
import { BlockMovement, type RefCod } from '@/types'
import { currentBlock } from './game'
import { getBlockSize } from './block'
import { HEIGHT, WIDTH } from './constants'
import { updateBoard } from './board'

export const refCod = ref<RefCod>()
export const moveDirection = ref<BlockMovement>()

export function initMovement() {
  const [_blockHeight, blockWidth] = getBlockSize(currentBlock.value)

  if (blockWidth % 2 === 0) {
    refCod.value = [-1, WIDTH / 2 - blockWidth / 2]
  } else {
    refCod.value = [
      -1,
      WIDTH / 2 - Math.floor(blockWidth / 2) - Math.floor(Math.random() * 2)
    ]
  }
  moveDirection.value = BlockMovement.Down
}
