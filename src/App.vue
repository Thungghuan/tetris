<script setup lang="ts">
import {
  gameBoard as board,
  initGame,
  nextTick,
  nextBlock,
  currentBlock,
  keyStrokeHandler
} from './logic'
import { onKeyStroke } from '@vueuse/core'

onKeyStroke(
  ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '],
  keyStrokeHandler
)

initGame()
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
          <NextBlock :nextBlock="nextBlock" />

          <div btn @click="nextTick()">NextTick</div>
          <!-- <div btn @click="start">Start</div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style>
body {
  height: 100vh;
  /* overflow: hidden; */
}
</style>
