<template>
  <div>
    Logs
    <button @click="fetchApi">Reload</button>
    <pre>{{ data }}</pre>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import api from '~/api';

const data = ref();

onMounted(async () => {
  await fetchApi();
});

const fetchApi = async (): Promise<void> => {
  const response = await api.get('v1/logger');
  data.value = response.data;
};
</script>
