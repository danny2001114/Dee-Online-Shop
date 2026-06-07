<script setup lang="ts">
import useAuth from '@/Composables/UserService';
import Icon from '@/Components/Icon.vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { useCurrentUser } from 'vuefire';
import Wallet from '@/Components/Wallet.vue';
import { darkmodeState } from '@/stores/darkmodeState';

const router = useRouter();
const currentUser = useCurrentUser();
const darkmode = darkmodeState();

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
  router.push({ name: "profile.edit" })
}
</script>
<template>
  <el-header class="d-flex flex-ver-center flex-hor-end g-md">
    <div id="mobile-nav-menu" class="d-xs-block d-none w-content mr-auto"></div>
    <Wallet class="d-xs-none" />
    <el-switch v-model="darkmode.isDarkMode" active-action-icon="Moon" inactive-action-icon="Sunny" />
    <Icon name="Setting" title="Logout" @click="logout" />
    <span>{{ currentUser?.displayName }}</span>
    <el-avatar class="hv-cursor" :src="currentUser?.photoURL" title="Edit Profile" @click="editProfile" />
    <Icon class="d-xs-none" name="Right" title="Logout" @click="logout" />
  </el-header>
</template>
