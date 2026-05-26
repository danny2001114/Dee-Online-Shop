<script setup lang="ts">
import useAuth from '@/Composables/useAuth';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { getCurrentUser, useCurrentUser } from 'vuefire';

const router = useRouter();
const currentUser = useCurrentUser();

const logout = () => {
  useAuth.logout()
  .then(() => {
    router.push({ name: "login" });
  })
  .catch(() => {
    ElMessage.error("Failed To Logout!");
  });
}

const editProfile = () => {
  router.push({name: "profile.edit", params: {username: currentUser.value?.displayName}})
}
</script>
<template>
  <el-header class="d-flex flex-ver-center flex-hor-end g-md">
    <el-avatar class="hv-cursor" :src="currentUser?.photoURL" title="Edit Profile" @click="editProfile"/>
    <el-button type="danger" title="Logout" @click="logout">
      <el-icon><House /></el-icon>
    </el-button>
  </el-header>
</template>
