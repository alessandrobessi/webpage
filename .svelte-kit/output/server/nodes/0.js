

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.DVNhHAnJ.js","_app/immutable/chunks/BR9drO80.js","_app/immutable/chunks/VnKtvPWD.js"];
export const stylesheets = [];
export const fonts = [];
