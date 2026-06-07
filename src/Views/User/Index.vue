<script setup lang="ts">
import DetailCard from "@/Components/DetailCard.vue";
import Icon from "@/Components/Icon.vue";
import UserService from "@/Composables/UserService";
import type { UserModel } from "@/Models/UserModel";
import { Teleport } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const users = UserService.getList();

const prepareUserDetails = (data: UserModel): Record<string, any>[] => {
  return [
    {
      "Name": data.username,
      "Email": data.email
    }
  ];
}
</script>
<template>
  <div>
    <el-button type="primary" @click="router.push({ name: 'user.create' })">
      <Icon name="Plus" />
      <span class="d-inline-block ms-sm">Sign Up</span>
    </el-button>
  </div>
  <el-row :gutter="10" class="mt-md">
    <el-col class="card" :xs="24" :sm="12" :md="6" :lg="4" :span="4" v-for="user in users" :key="user.id">
      <DetailCard xs="horizontal" sm="horizontal" md="vertical" :image="user.avatar" :data="prepareUserDetails(user)" />
    </el-col>
  </el-row>
</template>
