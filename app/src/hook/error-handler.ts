import { type App, type ComponentPublicInstance, type Plugin } from 'vue';
import api from '~/api';
import { getVueComponentName } from '~/utils/get-vue-component-name';

interface IErrorInterceptorOptions {
  tracing?: boolean;
}

const errorHandler = (error: unknown, vm: ComponentPublicInstance | null, info: string, options: IErrorInterceptorOptions): boolean => {
	const source = getVueComponentName(vm);

  console.warn(`[${source}] ${info}, ${error}`);

  if (options.tracing) {
    api.post<void>('v1/logger', {
      level: 'error',
      context: 'APP',
      source,
      info,
      error: error?.toString(),
    });
  }

	return false;
};

export const errorInterceptor: Plugin = {
  install: (app: App, options: IErrorInterceptorOptions) => {
    app.config.errorHandler = (...args) => errorHandler(...args, options);
  }
};
