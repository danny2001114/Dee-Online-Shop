<script setup lang="ts">
import UploadImage from '@/Components/UploadImage.vue';
import ProductService from '@/Composables/ProductService';
import { reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useParsePrice, useFormatPrice } from '@/Utilities/helpers';
import type { ProductForm } from '@/Models/ProductModel';

const id = useRoute().params.id as string;
const router = useRouter();
const product = id ? ProductService.getDetail(id) : null;

const form = reactive<ProductForm>({
  name: "",
  price: "",
  imageUrl: "",
  uploadFile: null,
  remark: ""
});
const prevImgUrl = ref('');
const isLoaded = ref(false);

if (product) {
  watch(product, (product) => {
    if (!product) return;

    prevImgUrl.value = product.imageUrl;

    Object.assign<ProductForm, ProductForm>(form, {
      name: product.name,
      price: String(product.price),
      imageUrl: product.imageUrl,
      remark: product.remark,
    });

    isLoaded.value = true;
  }, { immediate: true });
}

const create = async () => {
  await ProductService.createProduct(form)
    .then(() => {
      router.push({ name: 'product.list' });
    });
}

const update = async () => {
  if (!isLoaded.value) return;

  await ProductService.updateProduct(id, form, prevImgUrl.value)
    .then(() => {
      router.push({ name: 'product.detail', params: { id } });
    });
}
</script>
<template>
  <div class="mb-md">
    <el-button type="primary" @click="router.push({ name: 'product.list' })">Back</el-button>
  </div>
  <el-form :model="form" label-width="auto">
    <el-row :gutter="10">
      <el-col :span="5">
        <el-card class="overflow-x-hide pos-relative">
          <UploadImage v-model:upload="form.uploadFile" v-model:imageUrl="form.imageUrl" />
        </el-card>
      </el-col>
      <el-col :span="19">
        <el-card class="max-w-md">
          <el-form-item label="Name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="Price">
            <el-input v-model="form.price" type="text" inputmode="decimal" maxlength="7" :formatter="useFormatPrice"
              :parser="useParsePrice">
              <template #suffix> MMK</template>
            </el-input>
          </el-form-item>
          <el-form-item label="Description">
            <el-input v-model="form.remark" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"
              placeholder="Please input" />
          </el-form-item>
          <div class="d-flex flex-center">
            <el-button class="min-w-50" type="primary" @click="update" v-if="id">Update</el-button>
            <el-button class="min-w-50" type="primary" @click="create" v-else>Add</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-form>
</template>
