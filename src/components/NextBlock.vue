<script setup lang="ts">
import { computed, toRef } from 'vue'
import type { Block } from '../types'
import { BlockStates, getBlockSize } from '../logic'

const props = defineProps<{
  nextBlock: Block
}>()

const block = toRef(props, 'nextBlock')

const blockType = computed(() => block.value.type)
const blockIndex = computed(() => block.value.index)
const color = computed(() => block.value.color)

const size = computed(() => {
  if (blockType.value && blockIndex.value !== undefined) {
    return getBlockSize(block.value)
  } else {
    return [0, 0]
  }
})

const nextBlock = computed(() => {
  const [height, width] = size.value

  if (blockType.value === 'I' || blockType.value === 'O') {
    return Array.from({ length: height }, () =>
      Array.from({ length: width }, () => 1)
    )
  } else {
    const nextState = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => 1)
    )

    const state = BlockStates.get(blockType.value!)![blockIndex.value]

    if (state) {
      if (width === 2) {
        for (let i = 0; i < 3; ++i) {
          for (let j = 0; j < 2; ++j) {
            nextState[i][j] = state[i][j]
          }
        }
      } else {
        for (let i = 0; i < 2; ++i) {
          for (let j = 0; j < 3; ++j) {
            nextState[i][j] = state[i][j]
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
    <div flex="~ col" w20 h20 justify-center items-center>
      <div flex v-for="(_, row) in size[0]">
        <div
          w4
          h4
          v-for="(_, col) in size[1]"
          :style="{ backgroundColor: nextBlock[row][col] === 1 ? color : '' }"
        />
      </div>
    </div>
  </div>
</template>
