<script setup lang="ts">
import NavMenu from '@/Components/NavMenu.vue';
</script>
<template>
  <Teleport to="#mobile-nav-menu">
    <NavMenu prefix="mobile" mode="horizontal" />
  </Teleport>
  <el-aside class="p-sm pl-md w-content d-xs-none">
    <el-card body-class="p-sm">
      <NavMenu prefix="desktop" />
    </el-card>
  </el-aside>
</template>
