<script setup lang="ts">
import Icon from '@/Components/Icon.vue';
import { useRoute, useRouter } from 'vue-router';

interface MenuItem {
  title: string
  icon: string
  route?: string
  sub?: MenuItem[]
};

const router = useRouter();
const route = useRoute();
const menuList: MenuItem[] = [
  { title: "Dashboard", route: 'dashboard', icon: "HomeFilled" },
  { title: "User", route: 'user.list', icon: "UserFilled" },
  { title: "Product", route: 'product.list', icon: "GoodsFilled" },
];

const activeNav = menuList.findIndex(nav => {
  if (nav.sub) {
    return nav.sub.findIndex(subNav => subNav.route == route.name)
  }

  return nav.route == route.name;
})
</script>
<template>
  <el-aside class="p-sm pl-md w-content d-xs-none">
    <el-card body-class="p-sm">
      <el-menu :default-active="String(activeNav)">
        <template v-for="(menu, parent) in menuList" :key="parent">
          <el-sub-menu v-if="menu.sub" :index="String(parent)">
            <template #title>
              <Icon :name="menu.icon" /> <span>{{ menu.title }}</span>
            </template>

            <el-menu-item v-for="(submenu, child) in menu.sub" :key="parent + '-' + child" :index="parent + '-' + child"
              @click="router.push({ name: submenu.route })">
              <Icon :name="submenu.icon" /> {{ submenu.title }}
            </el-menu-item>
          </el-sub-menu>

          <el-menu-item v-else :index="String(parent)" @click="router.push({ name: menu.route })">
            <Icon :name="menu.icon" />
            <template #title>{{ menu.title }}</template>
          </el-menu-item>
        </template>
      </el-menu>
    </el-card>
  </el-aside>
</template>
