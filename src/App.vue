<script setup lang="ts">
import { ref } from 'vue'
import { createBoard, nextTick } from './logic'

const board = ref(createBoard())
</script>

<template>
  <div mxauto w90vw flex="~ col" justify-center items-center font-mono>
    <div py3 text-xl>TETRIS</div>

    <Board :board="board" />

    <button m2 @click="nextTick(board)">NextTick</button>
  </div>
</template>

<style>
body {
  height: 100vh;
  overflow: hidden;
}
</style>
