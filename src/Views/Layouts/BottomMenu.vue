<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Wallet from '@/Components/Wallet.vue';
import { darkmodeState } from '@/stores/darkmodeState';
import Icon from '@/Components/Icon.vue';

const containerRef = ref<HTMLElement | null>(null)
const affixWidth = ref('100%');
const darkmode = darkmodeState();

const updateAffixWidth = () => {
  if (!containerRef.value) {
    affixWidth.value = '100%'
    return
  }

  const width = containerRef.value.clientWidth
  affixWidth.value = width ? `${width}px` : '100%'
}

onMounted(() => {
  updateAffixWidth()
  window.addEventListener('resize', updateAffixWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateAffixWidth)
})
</script>
<template>
  <div ref="containerRef" class="w-100 d-xs-block d-none">
    <el-affix cl position="bottom" :offset="40" :style="{ width: affixWidth }">
      <div class="w-100 d-flex flex-center">
        <el-card body-class="w-content d-flex flex-center">
          <Wallet />
          <el-switch v-model="darkmode.isDarkMode" active-action-icon="Moon" inactive-action-icon="Sunny" />
          <Icon name="Setting" />
        </el-card>
      </div>
    </el-affix>
  </div>
</template>
