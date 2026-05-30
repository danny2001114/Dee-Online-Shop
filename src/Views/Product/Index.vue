<script lang="ts" setup>
import EmptyImage from "@/assets/img/Empty_Img.png"
import ProductService from "@/Composables/ProductService";
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";

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
  <el-row :gutter="20">
    <el-col :span="4" v-for="product in products" :key="product.id">
      <el-card class="card hv-cursor" header-class="p-none" @click="router.push({ name: 'product.detail', params: { id: product.id } })">
        <template #header>
          <el-image class="ratio-100" fit="cover" :src="product.imageUrl ? product.imageUrl : EmptyImage" />
        </template>
        {{ product.name }} <br><br>
        {{ product.price.toLocaleString() }} MMK
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
      <el-input-number v-model="cart[product.id]" class="w-100" :min="0" :max="99999" @change="handleChange"
        :value-on-clear="0" />
    </el-col>
  </el-row>
</template>
