import { ref } from 'vue'
import { BlockMovement, type RefCod } from '@/types'
import { currentBlock } from './game'
import { getBlockSize } from './block'
import { HEIGHT, WIDTH } from './constants'

export const refCod = ref<RefCod>()
export const moveDirection = ref<BlockMovement>()

export function initMovement() {
  const { type, index } = currentBlock.value

  const [blockWidth, _blockHeight] = getBlockSize(type!, index)

  if (blockWidth % 2 === 0) {
    refCod.value = [WIDTH / 2 - blockWidth / 2, -1]
  } else {
    refCod.value = [
      WIDTH / 2 - blockWidth / 2 - Math.floor(Math.random() * 2),
      0
    ]
  }

  moveDirection.value = BlockMovement.Down
}
