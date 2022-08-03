<script setup lang="ts">
import type { Lattice } from '@/types'
import { toRef } from 'vue'

const props = defineProps<{
  lattice: Lattice
}>()

const lattice = toRef(props, 'lattice')
</script>

<template>
  <div
    w6
    h6
    bg-gray-300
    :style="{ backgroundColor: lattice.state === 1 ? lattice.color : '' }"
  >
    <!-- {{ lattice.state }} -->
  </div>
</template>
