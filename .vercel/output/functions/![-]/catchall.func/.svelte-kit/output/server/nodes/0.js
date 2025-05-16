

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.Dcww8Tg_.js","_app/immutable/chunks/abR5r1hs.js","_app/immutable/chunks/AfbuXoTy.js"];
export const stylesheets = [];
export const fonts = [];
