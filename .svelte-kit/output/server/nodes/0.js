

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.BLwQ4Czw.js","_app/immutable/chunks/BE8XQIoG.js","_app/immutable/chunks/75EMG3Uh.js"];
export const stylesheets = [];
export const fonts = [];
