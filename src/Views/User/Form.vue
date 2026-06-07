<script setup lang="ts">
import UserService from '@/Composables/UserService';
import { onBeforeMount, reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCurrentUser } from 'vuefire';
import type { AuthForm } from '@/Models/UserModel';
import { useConfig } from '@/Utilities/helpers';
import { ElMessage } from 'element-plus';
import AvatarList from '@/Components/AvatarList.vue';

const isEdit = useRoute().name == "profile.edit";
const router = useRouter();
const currentUser = useCurrentUser();

// const getAllAvatars = import.meta.glob('@/assets/img/avatars/*.{png,jpg,jpeg}', {
//   eager: true,
//   import: 'default'
// });

// const avatars = Object.values(getAllAvatars).map((url) => location.origin + url);

const form = reactive<AuthForm>({
  username: "",
  password: "",
  email: "",
  // avatar: avatars[0] as string,
  avatar: "",
});

if (isEdit) {
  watch(currentUser, (user) => {
    if (!user) return;

    Object.assign(form, {
      username: user.displayName as string,
      email: user.email as string,
      avatar: user.photoURL as string
    } as AuthForm);

  }, { immediate: true });
}

const create = async () => {
  await UserService.createAuth(form)
    .then(() => {
      router.push({ name: 'user.list' });
    });
}

const update = async () => {
  await UserService.updateAuth(form)
    .then(() => {
      router.back();
    });
}

onBeforeMount(async () => {
  await UserService.CountUsers()
    .then(total => {
      if (total >= useConfig("MAX_USER", 0)) {
        router.push({ name: "user.list" });
        ElMessage.error("Max User Limit Exceeded!");
      }
    })
    .catch(err => {
      console.error(err);
      router.push({ name: "user.list" });
      ElMessage.error("Failed To Check User Count!");
    });
});
</script>
<template>
  <el-form :model="form" label-width="auto">
    <el-row :gutter="10">
      <el-col class="card" :xs="24" :sm="24" :md="8" :span="8">
        <el-card class="w-100">
          <AvatarList v-model:avatar="form.avatar" />
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="16" :span="16">
        <el-card class="max-w-md">
          <el-alert class="mb-md" title="Create New User And Sing In" type="primary" show-icon :closable="false"
            v-if="!isEdit" />
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
