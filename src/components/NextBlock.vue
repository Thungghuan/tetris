<script setup lang="ts">
import { computed, toRef } from 'vue'
import type { BlockIndex, BlockType } from '@/types'

const props = defineProps<{
  block: BlockIndex
  state: number[][]
  color: string
}>()

const block = toRef(props, 'block')
const state = toRef(props, 'state')
const color = toRef(props, 'color')

const blockType = computed(() => block.value?.split('-')[0] as BlockType)
const blockIndex = computed(() => +block.value?.split('-')[1])

// prettier-ignore
const blockSize: Record<BlockType, [number, number][]> = {
  I: [ [4, 1], [1, 4] ],
  L: [ [2, 3], [3, 2] ],
  J: [ [2, 3], [3, 2] ],
  O: [ [2, 2] ],
  T: [ [3, 2], [2, 3] ],
  S: [ [3, 2], [2, 3] ],
  Z: [ [3, 2], [2, 3] ]
}

const size = computed(() => {
  if (blockType.value && blockIndex.value !== undefined) {
    return blockSize[blockType.value as BlockType][+blockIndex.value % 2]
  } else {
    return [0, 0]
  }
})

const nextBlock = computed(() => {
  const [width, height] = size.value

  if (blockType.value === 'I' || blockType.value === 'O') {
    return Array.from({ length: height }, () =>
      Array.from({ length: width }, () => 1)
    )
  } else {
    const nextState = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => 1)
    )

    if (state.value) {
      if (width === 2) {
        for (let i = 0; i < 3; ++i) {
          for (let j = 0; j < 2; ++j) {
            nextState[i][j] = state.value[i + 1][j + 1]
          }
        }
      } else {
        for (let i = 0; i < 2; ++i) {
          for (let j = 0; j < 3; ++j) {
            nextState[i][j] = state.value[i + 2][j]
          }
        }
      }
    }

    return nextState
  }
})
</script>

<template>
  <div b select-none>
    <div flex w20 h20 justify-center items-center>
      <div v-for="(_, row) in size[1]">
        <div
          w4
          h4
          v-for="(_, col) in size[0]"
          :style="{ backgroundColor: nextBlock[row][col] === 1 ? color : '' }"
        />
      </div>
    </div>
  </div>
</template>
