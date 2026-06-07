<script lang="ts" setup>
import DetailCard from "@/Components/DetailCard.vue";
import ProductService from "@/Composables/ProductService";
import type { ProductModel } from "@/Models/ProductModel";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const products = ProductService.getList();
const router = useRouter();
const cart = ref<Record<string, number>>({});

watch(products, (products) => {
  products.forEach(item => {
    cart.value[item.id] = 0;
  });
})

const handleChange = (value: number | undefined) => {
  if (value == null || isNaN(value)) {
    value = 0
    return
  }
}

const prepareProjectDetails = (data: ProductModel): Record<string, Record<string, any>> => {
  const result: Record<string, any> = {};

  result[data.name] = {
    "Price": data.price.toLocaleString() + " MMK",
    "Stocks": 14
  };

  return result;
}
</script>
<template>
  <div class="mb-md d-flex flex-ver-center">
    <el-button class="ml-auto" type="primary" @click="router.push({ name: 'product.create' })">
      <el-icon>
        <Plus />
      </el-icon> <span class="d-inline-block ms-sm">Add</span>
    </el-button>
    <el-button type="primary" @click="router.push({ name: 'product.create' })">Purchase</el-button>
  </div>
  <el-row :gutter="10">
    <el-col class="card" :xs="24" :sm="12" :md="6" :lg="4" :span="4" v-for="product in products" :key="product.id">
      <DetailCard xs="horizontal" sm="horizontal" md="vertical" :image="product.imageUrl" :data="prepareProjectDetails(product)"
        @click="router.push({ name: 'product.detail', params: { id: product.id } })" />
      <el-input-number v-model="cart[product.id]" class="mt-sm w-100" :min="0" :max="99999" @change="handleChange"
        :value-on-clear="0" />
    </el-col>
  </el-row>
</template>
