<script setup lang="ts">
import { reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useAuth from '@/Composables/useAuth';
import type { AuthCreateForm } from '@/Models/UserModel';
import { ElMessage } from 'element-plus';
import { useCurrentUser } from 'vuefire';

const router = useRouter();
const isEdit = useRoute().params.username ?? null;
const currentUser = useCurrentUser();

const getAllAvatars = import.meta.glob('@/assets/img/avatars/*.{png,jpg,jpeg}', {
  eager: true,
  import: 'default'
});

const avatars = Object.values(getAllAvatars).map((url) => location.origin + url);

const form = reactive<AuthCreateForm>({
  username: "",
  password: "",
  email: "",
  avatar: avatars[0] as string,
});

const selectAvatar = (url: string) => {
  form.avatar = url;
}

const create = async () => {
  try {
    await useAuth.createAuth(form);
    router.push({name: 'user.list'});

    ElMessage.success("Created User Successfully!");
  } 
  catch (err) {
    console.error(err);
    ElMessage.error("Failed To Create User!");
  }
}

if (isEdit) {
  watch(currentUser, (user) => {
    if (!user) return;

    Object.assign(form, {
      username: user.displayName ?? "",
      email: user.email ?? "",
      avatar: user.photoURL ?? ""
    });

  }, { immediate: true });
}

const update = async () => {
  try {
    await useAuth.updateAuth(form);
    router.back();

    ElMessage.success("Updated Profile Successfully!");
  }
  catch (err) {
    console.error(err);
    ElMessage.error("Failed To Update Profile!");
  }
}
</script>
<template>
  <el-form :model="form" label-width="auto">
    <el-row :gutter="10">
      <el-col :span="5">
        <el-card class="w-100">
          <el-row :gutter="10" v-resize:height="'.avatar'">
            <el-col class="text-center content-center min-h-md avatar" :span="6"  v-for="(url, index) in avatars" :key="index">
              <el-avatar :size="form.avatar === url ? 'large' : ''" :src="url" @click="selectAvatar(url as string)" />
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="19">
        <el-card class="max-w-md">
          <el-alert class="mb-md" title="Create New User And Sing In" type="primary" show-icon :closable="false" />
          <el-form-item class="max-w-md" label="User Name">
            <el-input v-model="form.username" clearable />
          </el-form-item>
          <el-form-item class="max-w-md" label="Email">
            <el-input v-model="form.email" clearable />
          </el-form-item>
          <el-form-item class="max-w-md" label="Password">
            <el-input v-model="form.password" type="password" show-password clearable />
          </el-form-item>

          <div class="d-flex flex-center">
            <el-button type="default" @click="router.push({ name: 'user.list' })">Back</el-button>
            <el-button type="primary" @click="update" v-if="isEdit">Update</el-button>
            <el-button type="primary" @click="create" v-else>Sing In</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-form>
</template>
