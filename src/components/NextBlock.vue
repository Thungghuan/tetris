<script setup lang="ts">
import { toRef } from 'vue'
import type { Block } from '@/types'

const props = defineProps<{
  block: Block
}>()

const block = toRef(props, 'block')
</script>

<template>
  <div p3 b select-none>
    <div flex v-for="row in block[1]">
      <div w6 h6 bg-gray-300 v-for="lattice in row" />
    </div>
  </div>
</template>
