<template>
  <div>
    <h3 class="logo">我是测试</h3>
  </div>
  <HelloWorld msg="Vue3 + ts" />
</template>

<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
import { Loading } from '@jd/mint-ui';
import { hookTest } from '@/hooks/test'

Loading.show()

setTimeout(()=>{
  Loading.hide()
},3000)

const { test } = hookTest()
test()

</script>

<style scoped lang='scss'>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  color: $color-theme;
}
</style>
