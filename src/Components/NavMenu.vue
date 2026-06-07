<script setup lang="ts">
import config from '@/App/config';
import Icon from '@/Components/Icon.vue';
import { useResponsive } from '@/Utilities/helpers';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';


interface MenuItem {
  title: string
  icon: string
  route?: string
  sub?: MenuItem[]
};

const props = defineProps<{
  prefix?: string,
  mode?: 'horizontal' | 'vertical'
}>();

const router = useRouter();
const route = useRoute();
const isEllipse = ref(false);
const menuList: MenuItem[] = config.MENU_LIST;

const activeIndex = computed(() => {
  const currentRouteName = route.name;
  
  for (let i = 0; i < menuList.length; i++) {
    const menu = menuList[i];
    
    if (!menu) continue; 

    if (menu.sub) {
      const subIdx = menu.sub.findIndex(s => s.route === currentRouteName);
      if (subIdx !== -1) {
        const subMenu = menu.sub[subIdx];
        if (subMenu) return getIndex(subMenu.title, subIdx);
      }
    }
    
    if (menu.route === currentRouteName) {
      return getIndex(menu.title, i);
    }
  }
  return '';
});

const defaultOpened = computed(() => {
  const currentRouteName = route.name;
  
  const parent = menuList.find(nav => 
    nav?.sub?.some(s => s.route === currentRouteName)
  );
  
  if (parent) {
    const idx = menuList.findIndex(n => n.title === parent.title);
    return idx !== -1 ? [getIndex(parent.title, idx)] : [];
  }
  
  return [];
});

const getIndex = (title: string, index: number): string => (props.prefix ?? "") + title + index;

const handleEllipsis = () => {
  return isEllipse.value = useResponsive(580, "<=");
};

onMounted(() => {
  window.addEventListener('resize', handleEllipsis);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleEllipsis);
});
</script>
<template>
  <el-menu :default-active="activeIndex" :default-openeds="defaultOpened" :mode="mode ?? 'vertical'"
    :ellipsis="isEllipse">
    <template v-for="(menu, parentIdx) in menuList" :key="getIndex(menu.title, parentIdx)">
      <el-sub-menu v-if="menu.sub" :index="getIndex(menu.title, parentIdx)">
        <template #title>
          <Icon :name="menu.icon" /> <span>{{ menu.title }}</span>
        </template>

        <el-menu-item v-for="(submenu, childIdx) in menu.sub" :key="getIndex(submenu.title, childIdx)"
          :index="getIndex(submenu.title, childIdx)" @click="router.push({ name: submenu.route })">
          <Icon :name="submenu.icon" /> {{ submenu.title }}
        </el-menu-item>
      </el-sub-menu>

      <el-menu-item v-else :key="getIndex(menu.title, parentIdx)" :index="getIndex(menu.title, parentIdx)"
        @click="router.push({ name: menu.route })">
        <Icon :name="menu.icon" />
        <template #title>{{ menu.title }}</template>
      </el-menu-item>
    </template>
  </el-menu>
</template>