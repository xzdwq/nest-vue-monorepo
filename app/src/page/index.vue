<template>
  <div>
    <div>Index</div>
    <div>{{ testApiResult }}</div>
    <button @click="fetchApi">Refresh</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import api from '~/api';

const testApiResult = ref<string>();

onMounted(async () => {
  await fetchApi();
  throw Error('test error')
});

const fetchApi = async (): Promise<void> => {
  const result = await api.get<string>('v1/logger').catch();
  testApiResult.value = result.data;
  await api.post<void>('v1/logger', {
      level: 'info',
      source: 'index',
      info: 'test',
      error: 'test error',
    });
};
</script>
