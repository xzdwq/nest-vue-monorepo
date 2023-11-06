import { ComponentPublicInstance } from 'vue';
import { kebabCase } from '~/utils/naming-strategy';

export const getVueComponentName = (vm: ComponentPublicInstance | null): string => {
	if (!vm) return `unknown`;
	if (vm.$root === vm) return 'root';
	const options = typeof vm === 'function' && (vm as any).cid != null ? (vm as any)?.options : vm?.$options;
	let name = options.name || options.__name || options._componentTag;
	const file = options.__file;

	if (!name && file) {
		const match = file.match(/([^/\\]+)\.vue$/);
		name = match && match[1];
	}

	return name ? kebabCase(name) : `component`;
}