<script setup lang="ts">
import { ref, watch } from 'vue';
import type { UploadInstance } from 'element-plus'

const props = defineProps<{
  upload: File | string | null | undefined;
}>();

const emit = defineEmits<{
  (e: "update:upload", file: File | null): void;
}>();

const uploadRef = ref<UploadInstance>();
const imageUrl = ref('');

watch(() => props.upload, (val) => {
  if (!val) {
    imageUrl.value = '';
    return;
  }

  if (typeof val === 'string') {
    imageUrl.value = val;
    return;
  }

  try {
    imageUrl.value = URL.createObjectURL(val as File);
  } catch {
    imageUrl.value = '';
  }
}, { immediate: true })

const uploadProfile = (file: any) => {
  const raw = (file && (file.raw ?? file)) as File | undefined;
  if (!raw) return;

  emit('update:upload', raw);
  imageUrl.value = URL.createObjectURL(raw);
}

const handleExceed = (files: any) => {
  if (!files || !files.length) return;
  uploadRef.value?.clearFiles();

  const first = files[0];
  const raw = (first && (first.raw ?? first)) as File | undefined;
  if (!raw) return;

  emit('update:upload', raw);
  imageUrl.value = URL.createObjectURL(raw);
}

const handleRemove = () => {
  uploadRef.value?.clearFiles();
  imageUrl.value = '';
  emit('update:upload', null);
}
</script>
<template>
  <el-icon class="d-flex flex-hor-end w-100 mb-sm hv-cursor" size="large" v-if="imageUrl" @click.stop="handleRemove">
    <CircleCloseFilled color="#F56C6C" />
  </el-icon>
  <el-upload class="w-100 inherit-all-w pos-relative" ref="uploadRef" :auto-upload="false" :show-file-list="false" :limit="1"
    :on-exceed="handleExceed" :on-change="uploadProfile" :on-remove="handleRemove">
    <img :src="imageUrl" v-if="imageUrl" fit="contain" />
    <el-icon class="d-block text-center content-center border-md border-dash ratio-100 h-auto" v-else>
      <Plus />
    </el-icon>
  </el-upload>
</template>
