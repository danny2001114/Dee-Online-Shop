<script setup lang="ts">
import Wallet from '@/Components/Wallet.vue';
import { useLoading } from '@/stores/loadingState';

const loading = useLoading();
</script>
<template>
  <div :class="{ 'd-none': loading.isLoading }">
    <div class="pos-fixed pos-b-0 p-md w-100 flex-center d-xs-flex d-none">
      <el-card body-class="w-content d-flex flex-center">
        <Wallet />
        <div id="bottom-menu-right-slots"></div>
      </el-card>
    </div>
  </div>
</template>
