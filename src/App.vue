<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
<!--  <header>-->
<!--    <div class="wrapper">-->
<!--      <nav>-->
<!--        <RouterLink to="/">Index</RouterLink>-->
<!--      </nav>-->
<!--    </div>-->
<!--  </header>-->
  <RouterView />
  <el-config-provider size="small" z-index="3000">
  </el-config-provider>
</template>

<style scoped>
</style>
