<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import useAuth from '@/Composables/useAuth';
import type { AuthLogin } from '@/Models/UserModel';
import { ElMessage } from 'element-plus';

const router = useRouter();
const form = reactive<AuthLogin>({
  email: "",
  password: ""
});

const login = async () => {
  await useAuth.login(form)
  .then(() => {
    router.push({ name: "dashboard" });
  })
  .catch(() => {
    ElMessage.error("User Not Found!");
  });
}
</script>
<template>
  <div class="min-h-screen d-grid grid-center">
    <el-card class="max-w-md mb-lg">
      <el-form :model="form" label-width="auto">
        <el-form-item label="Username">
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
