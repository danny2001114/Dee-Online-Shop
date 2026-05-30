<script setup lang="ts">
import { ref, watch } from 'vue';
import type { UploadInstance } from 'element-plus'

const props = defineProps<{
  imageUrl: string,
  upload: File | string | null | undefined;
}>();

const emit = defineEmits<{
  (e: "update:imageUrl", url: string): void;
  (e: "update:upload", file: File | null): void;
}>();

const imageUrlRef = ref(props.imageUrl);
const uploadRef = ref<UploadInstance>();

watch(() => props.imageUrl, (val) => {
  imageUrlRef.value = val || '';
}, { immediate: true });

watch(() => props.upload, (val) => {
  if (!val) {
    if (!props.imageUrl) {
      imageUrlRef.value = '';
    }
    return;
  }

  if (typeof val === 'string') {
    imageUrlRef.value = val;
    return;
  }

  try {
    imageUrlRef.value = URL.createObjectURL(val as File);
  } catch {
    imageUrlRef.value = '';
  }
})

const uploadProfile = (file: any) => {
  const raw = (file && (file.raw ?? file)) as File | undefined;
  if (!raw) return;

  const previewUrl = URL.createObjectURL(raw);
  imageUrlRef.value = previewUrl;
  emit('update:upload', raw);
  emit('update:imageUrl', previewUrl);
}

const handleExceed = (files: any) => {
  if (!files || !files.length) return;
  uploadRef.value?.clearFiles();

  const first = files[0];
  const raw = (first && (first.raw ?? first)) as File | undefined;
  if (!raw) return;

  const previewUrl = URL.createObjectURL(raw);
  imageUrlRef.value = previewUrl;
  emit('update:upload', raw);
  emit('update:imageUrl', previewUrl);
}

const handleRemove = () => {
  uploadRef.value?.clearFiles();
  imageUrlRef.value = '';
  emit('update:upload', null);
  emit('update:imageUrl', '');
}
</script>
<template>
  <el-icon class="hv-cursor pos-absolute pos-t-0 pos-r-0 z-top" size="large"
    v-if="imageUrlRef" @click.stop="handleRemove">
    <CircleCloseFilled color="#F56C6C" />
  </el-icon>
  <el-upload class="w-100 inherit-all-w pos-relative" ref="uploadRef" :auto-upload="false" :show-file-list="false"
    :limit="1" :on-exceed="handleExceed" :on-change="uploadProfile" :on-remove="handleRemove">
    <img :src="imageUrlRef" v-if="imageUrlRef" fit="contain" />
    <el-icon class="d-block text-center content-center border-md border-dash ratio-100 h-auto" v-else>
      <Plus />
    </el-icon>
  </el-upload>
</template>
