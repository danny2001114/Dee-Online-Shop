<script setup lang="ts">
import useUser from "@/Composables/useUser";
import { useRouter } from "vue-router";

const router = useRouter();
const users = useUser.list();

</script>
<template>
  <div>
    <el-button type="primary" @click="router.push({ name: 'user.create' })">
      <el-icon>
        <Plus />
      </el-icon> <span class="d-inline-block ms-sm">Sign Up</span>
    </el-button>
  </div>
  <el-row :gutter="20" class="mt-md">
    <el-col :span="4" v-for="user in users" :key="user.id">
      <el-card class="card">
        <template #header>
          <img :src="user.avatar" />
        </template>
        <div class="mb-sm">{{ user.username }}</div>
        <div>{{ user.email }}</div>
      </el-card>
    </el-col>
  </el-row>
</template>
