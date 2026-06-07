<script setup lang="ts">
import PopularProductList from '@/Components/PopularProductList.vue';
import StatisticCard from '@/Components/StatisticCard.vue';
</script>
<template>
  <el-row :gutter="10">
    <el-col :xs="12" :sm="12" :md="9" :lg="8" :span="8">
      <PopularProductList />
    </el-col>
    <el-col :xs="12" :sm="12" :md="15" :lg="16" :span="16">
      <el-row :gutter="10">
        <el-col class="mb-10px" :xs="24" :sm="12" :md="6" :span="6" v-for="(value, index) in Array.from({ length: 4 })">
          <StatisticCard />
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
