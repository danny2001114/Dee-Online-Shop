<script setup lang="ts">
import EmptyImage from "@/assets/img/Empty_Img.png"

</script>
<template>
  <el-card>
    <el-space direction="vertical" alignment="start" :size="10">
      <el-card body-class="p-none overflow-hide" v-for="(value, index) in Array.from({ length: 4 })">
        <el-row>
          <el-col :xs="24" :sm="9" :md="9" :span="9">
            <el-image class="h-100" :src="EmptyImage" fit="cover" />
          </el-col>
          <el-col :xs="24" :sm="15" :md="15" :span="15">
              <el-descriptions size="small" class="p-sm" title="Product 1" :column="1" border>
                <el-descriptions-item label="Price">10,000 MMK</el-descriptions-item>
                <el-descriptions-item label="Sold Out">6</el-descriptions-item>
              </el-descriptions>
          </el-col>
        </el-row>
      </el-card>
    </el-space>
  </el-card>
</template>