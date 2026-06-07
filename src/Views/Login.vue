<script setup lang="ts">
import useAuth from '@/Composables/UserService';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import type { AuthLogin } from '@/Models/UserModel';

const router = useRouter();
const form = reactive<AuthLogin>({
  email: "",
  password: ""
});

const login = async () => {
  await useAuth.login(form)
  .then(() => {
    router.push({ name: "dashboard" });
  });
}
</script>
<style>
.background {
  background: url('../assets/img/background.jpg') no-repeat center center;
}
</style>
<template>
  <div class="min-h-screen d-grid grid-center">
    <el-card class="max-w-md mb-lg">
      <el-form :model="form" label-width="auto">
        <el-form-item label="Email">
          <el-input v-model="form.email" clearable />
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="form.password" show-password clearable />
        </el-form-item>
        <el-button class="w-100" type="primary" @click="login">Login</el-button>
      </el-form>
    </el-card>
  </div>
</template>
