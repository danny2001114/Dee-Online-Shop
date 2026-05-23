<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import useAuth from '@/Composables/useAuth';
import type {  LoginForm } from '@/Models/AuthModel';

const router = useRouter();
const form = reactive<LoginForm>({
  email: "",
  password: ""
});

const login = async () => {
    await useAuth.login(form, router);
}
</script>
<template>
  <div class="h-100 d-grid grid-center">
    <el-card class="max-w-md mb-lg">
      <el-form :model="form" label-width="auto">
        <el-form-item label="Username">
          <el-input v-model="form.email" clearable />
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="form.password" clearable />
        </el-form-item>
        <el-button class="w-100" type="primary" @click="login">Login</el-button>
      </el-form>
    </el-card>
  </div>
</template>
