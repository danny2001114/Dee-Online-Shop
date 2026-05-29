<script setup lang="ts">
import emptyImage from "@/assets/img/Empty_Img.png"
import ProductService from "@/Composables/ProductService";
import dayjs from "dayjs";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

// const product = {
//   name: "Product 1",
//   amount: 3,
//   price: 10000,
//   currency: "MMK",
//   description: "",
//   total_stocks: 10,
//   total_canceled: 3,
//   stocks: [{
//     transactoin: "000001",
//     amount: 10,
//     price: "100000 MMK",
//     type: "stock in",
//     status: "arrived",
//     date: "2026-01-12",
//     created_by: "Aung Htet Paing",
//     updated_by: "",
//   }]
// };

const id = useRoute().params.id as string;
const product = ProductService.getDetail(id);
const router = useRouter();

// if (id) {


//   watch(product, (product) => {
//     if (!product) return;

//     Object.assign<ProductForm, ProductForm>(form, {
//       name: product.name,
//       price: product.price,
//       imageUrl: "",
//       prevImgUrl: product.imageUrl,
//       remark: product.remark,
//     });
//   }, { immediate: true });
// }

// const stockDetail = [
//   { status: "Received Amount", amount: product.total_stocks - product.total_canceled },
//   { status: "Canceled Amount", amount: product.total_canceled },
// ];

// const form = ref({
//   amount: 0,
//   date: dayjs().format('YYYY-MM-DD'),
// });

// const getSummaries = () => {
//   return [
//     'Grand Total',
//     product.total_stocks,
//     (product.total_stocks * product.price).toLocaleString() + " " + product.currency
//   ]
// }
</script>
<template>
  <div class="mb-md">
    <el-button type="primary" @click="router.push({ name: 'product.list' })">Back</el-button>
  </div>
  <el-row :gutter="10">
    <el-col :span="5">
      <el-card>
        <img :src="product?.imageUrl ? product.imageUrl : emptyImage">
      </el-card>
    </el-col>
    <el-col :span="19">
      <el-card>
        <el-row>
          <el-col :span="12" v-adjust-size:width="'.info-label'">
            <h4 class="d-inline-block info-label mr-md">Name</h4>: {{ product?.name }} <br>
            <h4 class="d-inline-block info-label mt-md mr-md">Price</h4>: {{ product?.price.toLocaleString() }} MMK <br>
            <h4 class="d-inline-block info-label mt-md">Description</h4>
            <p class="mt-md">{{ product?.remark ? product.remark : "There is no description!" }}</p>
          </el-col>

          <!-- <el-col :span="12">
            <el-date-picker class="d-block" v-model="form.date" type="date" placeholder="Enter date" />
            <el-input-number class="d-block mt-md" v-model="form.amount" :min="0" :max="999" />
            <div class="mt-md">
              <el-button type="success"><el-icon>
                  <ShoppingCart />
                </el-icon></el-button>
              <el-button type="danger"><el-icon>
                  <SoldOut />
                </el-icon></el-button>
            </div>
          </el-col> -->
        </el-row>
        <!-- <el-table class="mt-md" :data="stockDetail" border show-summary :summary-method="getSummaries">
          <el-table-column prop="status" label="Status" />
          <el-table-column prop="amount" label="Amount" />
          <el-table-column label="Price">
            <template #default="{ row }">
              {{ `${(product.price * row.amount).toLocaleString()} ${product.currency}` }}
            </template>
</el-table-column>
</el-table> -->
      </el-card>
    </el-col>
  </el-row>
</template>
