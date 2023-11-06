<template>
  <div>
    <div>Index</div>
    <div>{{ testApiResult }}</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import api from '~/api';

const testApiResult = ref<string>();

onMounted(async () => {
  const result = await api.get<string>('v1').catch();
  testApiResult.value = result.data;
  throw Error('test error')
})
</script>
