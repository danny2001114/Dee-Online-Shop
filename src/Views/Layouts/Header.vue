<script setup lang="ts">
import useAuth from '@/Composables/useAuth';
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
  useAuth.logout(router);
}
</script>
<template>
  <el-button type="danger" @click="logout">Logout</el-button>
</template>
