<script setup lang="ts">
import { toRef } from 'vue'
import type { Board } from '../types'

const props = defineProps<{
  board: Board
}>()

const board = toRef(props, 'board')
</script>

<template>
  <div p3 b select-none>
    <div flex v-for="row in board">
      <Lattice v-for="lattice in row" :lattice="lattice" />
    </div>
  </div>
</template>
