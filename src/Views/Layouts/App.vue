<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/Views/Layouts/Header.vue';
import SidePannel from '@/Views/Layouts/SidePannel.vue';
import { useRoute } from 'vue-router';
import Loading from '@/Components/Loading.vue';
import { useLoading } from "@/stores/loadingState";
import BottomMenu from './BottomMenu.vue';

const route = useRoute();
const loading = useLoading();
</script>
<style>
</style>
<template>
  <Loading v-if="loading.isLoading" />
  <template v-else>

    <el-container class="w-100" v-if="route.name === 'login'">
      <main class="w-100">
        <RouterView />
      </main>
    </el-container>

    <template v-else>
      <Header />
      <el-container>
        <SidePannel />
        <el-main class="p-ver-sm">
          <RouterView />
          <BottomMenu />
        </el-main>
      </el-container>
    </template>

  </template>
</template>
