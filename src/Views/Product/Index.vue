<script lang="ts" setup>
import ProductService from "@/Composables/ProductService";
import { useRouter } from "vue-router";
import emptyImage from "@/assets/img/Empty_Img.png"

//   {
//     id: 3,
//     name: 'Crop Top',
//     price: 10000,
//     currency: "MMK",
//     stocks: 10,
//     sold_out: 3,
//     image: null
//   },

const products = ProductService.getList();
const router = useRouter();
</script>
<template>
  <div class="mb-md">
    <el-button type="primary" @click="router.push({ name: 'product.create' })">
      <el-icon>
        <Plus />
      </el-icon> <span class="d-inline-block ms-sm">Add</span>
    </el-button>
  </div>
  <el-row :gutter="20">
    <el-col :span="4" v-for="product in products" :key="product.id">
      <el-card class="card hv-cursor" @click="router.push({ name: 'product.detail', params: { id: product.id } })">
        <template #header>
          <img class="ratio-100" fill="contain" :src="product.imageUrl ? product.imageUrl : emptyImage" />
        </template>
        {{ product.name }} <br><br>
        {{ product.price }} MMK
        <!-- <div v-adjust-size:width="'.label'">
          <div class="d-flex g-sm mt-md">
            <h4 class="label">Stocks</h4>
            <p>: {{ product.stocks }}</p>
          </div>
          <div class="d-flex g-sm mt-md">
            <h4 class="label">Sold Out</h4>
            <p>: {{ product.sold_out }}</p>
          </div>
        </div> -->
      </el-card>
    </el-col>
  </el-row>
</template>
