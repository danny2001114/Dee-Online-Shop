<script setup lang="ts">
import EmptyImage from "@/assets/img/Empty_Img.png"
import ProductService from "@/Composables/ProductService";
import ConfirmModal from "@/Components/ConfirmModal.vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const id = useRoute().params.id as string;
const product = ProductService.getDetail(id);
const router = useRouter();
const activeTab = ref("detail");
const modalVisible = ref(false);

const destory = () => {
  ProductService.deleteProduct(id)
  .then(() => {
    router.push({ name: "product.list" })
  });
}

</script>
<template>
  <ConfirmModal v-model:visible="modalVisible" :callback="destory">
    Are You Sure Want To Delete?
  </ConfirmModal>
  <div class="mb-md d-flex flex-ver-center">
    <el-button type="primary" @click="router.push({ name: 'product.list' })">Back</el-button>
    <el-button class="ml-auto" type="primary" @click="router.push({ name: 'product.edit', params: { id } })">
      Edit
    </el-button>
    <el-button type="danger" @click="modalVisible = true">
      Delete
    </el-button>
  </div>
  <el-row :gutter="10">
    <el-col :span="5">
      <el-card>
        <img :src="product?.imageUrl ? product.imageUrl : EmptyImage">
      </el-card>
    </el-col>
    <el-col :span="19">
      <el-card>
        <el-tabs v-model="activeTab" class="demo-tabs">
          <el-tab-pane label="Detail" name="detail">
            <el-row>
              <el-col :span="12" v-adjust-size:width="'.info-label'">
                <h4 class="d-inline-block info-label mr-md">Name</h4>: {{ product?.name }} <br>
                <h4 class="d-inline-block info-label mt-md mr-md">Price</h4>: {{ product?.price.toLocaleString() }} MMK
                <p class="mt-md" :class="{ 'text-placeholder': !(product?.remark) }">
                  {{ product?.remark ? product.remark : "There is no description!" }}
                </p>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="Stock" name="stock">

          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-col>
  </el-row>
</template>
