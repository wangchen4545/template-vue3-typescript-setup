<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'

defineProps<{ msg: string }>()
const count = ref(0)
</script>

<style scoped>

</style>
