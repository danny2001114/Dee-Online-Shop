<script setup lang="ts">
import Icon from './Icon.vue';
import { useWallet } from '@/stores/walletState'

const wallet = useWallet();
</script>
<template>
    <el-input class="max-w-sm mr-auto" :value="wallet.formattedAmount" disabled>
      <template #prepend>
        <Icon name="WalletFilled" />
      </template>
      <template #suffix>MMK</template>
    </el-input>
</template>
