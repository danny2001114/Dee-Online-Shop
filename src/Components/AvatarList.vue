<script setup lang="ts">
import { onMounted, ref } from 'vue';


const props = defineProps<{
  avatar: string
}>();

const emit = defineEmits<{
  (e: "update:avatar", url: string): void;
}>();

const getAllAvatars = import.meta.glob('@/assets/img/avatars/*.{png,jpg,jpeg}', {
  eager: true,
  import: 'default'
});
const avatars = Object.values(getAllAvatars).map((url) => location.origin + url);
const selectedAvatar = ref(props.avatar);

const select = (url: string): void => {
  selectedAvatar.value = url;
  emit("update:avatar", url);
}

if (!props.avatar) {
  const defaultAvatar = avatars[0] as string
  selectedAvatar.value = defaultAvatar;
  emit("update:avatar", defaultAvatar);
}
</script>
<template>
    <el-row :gutter="10" v-adjust-size:height="'.avatar'">
      <el-col :xs="4" :sm="2" :md="6" :lg="4" :span="4" class="text-center content-center min-h-md avatar" v-for="(url, index) in avatars"
        :key="index">
        <el-avatar class="hv-cursor" :size="selectedAvatar === url ? 'large' : ''" :src="url" @click="select(url)" />
      </el-col>
    </el-row>
</template>
