<script setup lang="ts">
import { ref } from 'vue'
import { createBoard, createEmptyBlock, nextTick } from './logic'
import NextBlock from './components/NextBlock.vue'

const board = ref(createBoard())
const nextBlock = createEmptyBlock()
</script>

<template>
  <div
    mxauto
    w90vw
    flex="~ col"
    justify-center
    items-center
    font-mono
    select-none
  >
    <div flex="~ col" justify-center items-center>
      <div py3 text-xl>TETRIS</div>

      <Board :board="board" />

      <div wfull>
        <div mxauto my3 p3 b flex>
          <NextBlock :block="nextBlock" />

          <div btn @click="nextTick(board)">NextTick</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
body {
  height: 100vh;
  overflow: hidden;
}
</style>
