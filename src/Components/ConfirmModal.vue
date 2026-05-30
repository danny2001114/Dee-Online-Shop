<script lang="ts" setup>
import { ref, watch } from 'vue';

const props = defineProps<{
  visible: boolean,
  callback?: Function
}>();

const emit = defineEmits<{
  (e: "update:visible", visible: boolean): void;
}>();

const modalVisible = ref(props.visible);

watch(() => props.visible, (val) => {
  modalVisible.value = val;
}, { immediate: true });

watch(modalVisible, (visible) => {
  emit("update:visible", visible);
});

const func = () => {
  modalVisible.value = false;
  props.callback?.();
};
</script>
<template>
  <el-dialog class="max-w-sm text-center" footer-class="text-center" v-model="modalVisible" :show-close="true">
    <slot />
    <template #footer>
        <el-button @click="modalVisible = false">Cancel</el-button>
        <el-button type="danger" @click="func">Confirm</el-button>
    </template>
  </el-dialog>
</template>
