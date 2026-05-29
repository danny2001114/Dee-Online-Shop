<script setup lang="ts">
import { reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useParsePrice, useFormatPrice } from '@/Utilities/helpers';
import UploadImage from '@/Components/UploadImage.vue';
import ProductService from '@/Composables/ProductService';
import type { ProductForm } from '@/Models/ProductModel';

const id = useRoute().params.id as string;
const router = useRouter();
const product = id ? ProductService.getDetail(id) : null;

const form = reactive<ProductForm>({
  name: "",
  price: 0,
  imageUrl: "",
  prevImgUrl: "",
  uploadFile: null,
  remark: ""
});

if (product) {
  watch(product, (product) => {
    if (!product) return;

    Object.assign<ProductForm, ProductForm>(form, {
      name: product.name,
      price: product.price,
      imageUrl: "",
      prevImgUrl: product.imageUrl,
      remark: product.remark,
    });
  }, { immediate: true });
}

// const validateImage: UploadProps['beforeUpload'] = (file) => {
//   if (['image/jpeg', 'image/png'].includes(file.type)) {
//     ElMessage.error('Avatar picture must be JPG or PNG format!')
//     return false
//   } 
// else if (file.size / 1024 / 1024 > 2) {
//   ElMessage.error('Avatar picture size can not exceed 2MB!')
//   return false
// }
//   return true
// }
</script>
<template>
  <div class="mb-md">
    <el-button type="primary" @click="router.push({ name: 'product.list' })">Back</el-button>
  </div>
  <el-form :model="form" label-width="auto">
    <el-row :gutter="10">
      <el-col :span="5">
        <el-card class="overflow-x-hide">
          <UploadImage v-model:upload="form.uploadFile" />
        </el-card>
      </el-col>
      <el-col :span="19">
        <el-card class="max-w-md">
          <el-form-item label="Name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="Price">
            <el-input v-model="form.price" type="text" inputmode="decimal" :formatter="useFormatPrice"
              :parser="useParsePrice">
              <template #suffix> MMK</template>
            </el-input>
          </el-form-item>
          <el-form-item label="Description">
            <el-input v-model="form.remark" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"
              placeholder="Please input" />
          </el-form-item>
          <div class="d-flex flex-center">
            <el-button class="min-w-50" type="primary" @click="ProductService.updateProduct(id, form, form.prevImgUrl)"
              v-if="id">Update</el-button>
            <el-button class="min-w-50" type="primary" @click="ProductService.createProduct(form)" v-else>Add</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-form>
</template>
