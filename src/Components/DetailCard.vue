<script setup lang="ts">
import EmptyImage from "@/assets/img/Empty_Img.png";
import { useStrNormalize } from "@/Utilities/helpers";

type cardStyle = "horizontal" | "vertical";

const props = defineProps<{
  data: Record<string, Record<string, any>> | Record<string, any>[]
  title?: string
  image?: string
  xs?: cardStyle
  sm?: cardStyle
  md?: cardStyle
  lg?: cardStyle
  xl?: cardStyle
}>();

const isNumber = (title: string): boolean => {
  return !isNaN(Number(title));
}

const getImgSize = (type: cardStyle | undefined): number | null => {
  if (typeof type === "undefined") return null;
  return type === "horizontal" ? 5 : 24
};

const getDetailSize = (type: cardStyle | undefined): number | null => {
  if (typeof type === "undefined") return null;
  return type === "horizontal" ? 19 : 24
};
</script>
<template>
  <el-card class="hv-cursor" body-class="p-none overflow-hide" header-class="p-none">
    <el-row>
      <el-col :xs="getImgSize(xs)" :sm="getImgSize(sm)" :md="getImgSize(md)" :lg="getImgSize(lg)" :xl="getImgSize(xl)"
        :span="24">
        <el-image v-if="image" class="h-100" fit="cover" :src="(image) ?? EmptyImage" />
      </el-col>
      <el-col :xs="getDetailSize(xs)" :sm="getDetailSize(sm)" :md="getDetailSize(md)" :lg="getDetailSize(lg)"
        :xl="getDetailSize(xl)" :span="24">
        <slot name="customDescription">
          <slot v-for="([title, details], index) in Object.entries(data)"
            :name="isNumber(title) ? 'detail-' + title : title" :data="details" :key="`${title}-${index}`">
            <el-descriptions size="small" class="p-sm" :title="isNumber(title) ? null : title" :column="1" border>
              <slot v-for="[key, val] in Object.entries(details)" :name="key" :data="val" :key="`${title}-${key}`">
                <el-descriptions-item class-name="text-truncate" :label="useStrNormalize(key)">{{ val }}</el-descriptions-item>
              </slot>
            </el-descriptions>
          </slot>
        </slot>
      </el-col>
    </el-row>
    <!-- <template #header>
      <el-image class="ratio-100" fit="cover" :src="data.imageUrl ? data.imageUrl : EmptyImage" />
    </template>
{{ data.name }} <br><br>
{{ data.price?.toLocaleString() }} MMK -->
  </el-card>
</template>