<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/Views/Layouts/Header.vue';
import SidePannel from '@/Views/Layouts/SidePannel.vue';

</script>

<template>
  <el-container>
    <template>
      <SidePannel />
      <el-container>
        <Header />
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </template>
  </el-container>
</template>
