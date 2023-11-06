import { createApp } from 'vue';
import app from '~/app.vue';
import { errorInterceptor } from '~/hook/error-handler';
import router from '~/router';

const appInstance = createApp(app);

appInstance
  .use(router)
  .use(errorInterceptor, {
    tracing: true,
  })
  .mount('#app');
