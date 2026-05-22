<script setup lang="ts">
import { useRouter } from 'vue-router';
interface MenuItem {
  title: string
  route?: string
  sub?: MenuItem[]
};

const route = useRouter();
const menuList: MenuItem[] = [
  { title: "Dashboard", route: 'dashboard' },
];
</script>
<template>
  <el-aside width="200px">
    <el-scrollbar>
      <el-menu>
        <template v-for="(menu, parent) in menuList" :key="parent">
          <el-sub-menu v-if="'sub' in menu" :index="String(parent)">
            <template #title>{{ menu.title }}</template>
            <el-menu-item-group v-for="(submenu, child) in menu.sub" :key="parent + '-' + child">
              <el-menu-item :index="parent + '-' + child" @click="route.push({name: menu.route})">{{ submenu.title }}</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item v-else :ref="parent" :index="String(parent)" @click="route.push({name: menu.route})">{{ menu.title }}</el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>
