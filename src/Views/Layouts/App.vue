<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/Views/Layouts/Header.vue';
import SidePannel from '@/Views/Layouts/SidePannel.vue';
import { useRoute } from 'vue-router';
import Loading from '@/Components/Loading.vue';
import { useLoading } from "@/stores/loadingState"

const route = useRoute();
const loading = useLoading();
</script>

<template>
    <Loading v-if="loading.isLoading" />
    <template v-else>
      <main class="min-h-screen w-100" v-if="route.name === 'login'">
        <RouterView />
      </main>
  
      <template v-else>
        <Header />
        <el-container>
          <SidePannel />
          <el-main>
            <RouterView />
          </el-main>
        </el-container>
      </template>
    </template>
</template>
