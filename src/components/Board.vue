<script setup lang="ts">
import { HEIGHT, WIDTH } from '../logic'
</script>

<template>
  <div>
    <div flex v-for="row in HEIGHT">
      <Lattice v-for="col in WIDTH" />
    </div>
  </div>
</template>
