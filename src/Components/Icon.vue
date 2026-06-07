<script setup lang="ts">
const props = defineProps<{
  name: string
}>();
</script>
<template>
  <el-icon>
    <component :is="name" />
  </el-icon>
</template>
