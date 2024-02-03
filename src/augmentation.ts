import type { Mergeattr } from './index';

declare module '@ckeditor/ckeditor5-core' {
	interface PluginsMap {
		[ Mergeattr.pluginName ]: Mergeattr;
	}
}
