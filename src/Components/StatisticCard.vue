<script setup lang="ts">
</script>
<template>
  <el-card>
    <el-statistic class="ratio-25" :value="98500">
      <template #title>
        <div style="display: inline-flex; align-items: center">
          Customers
          <el-tooltip effect="dark" content="Number of users who logged into the product in one day" placement="top">
            <el-icon style="margin-left: 4px" :size="12">
              <Warning />
            </el-icon>
          </el-tooltip>
        </div>
      </template>
    </el-statistic>
  </el-card>
</template>
