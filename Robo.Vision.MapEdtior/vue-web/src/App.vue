<script setup lang="ts"></script>

<template>
  <Suspense>
    <RouterView />
    <template #fallback> 正在加载... </template>
  </Suspense>
</template>

<style scoped></style>
