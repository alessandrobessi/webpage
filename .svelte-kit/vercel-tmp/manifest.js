export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.ico"]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.DqR5Z0Et.js",app:"_app/immutable/entry/app.Dqn8kQHn.js",imports:["_app/immutable/entry/start.DqR5Z0Et.js","_app/immutable/chunks/_9IsAGxx.js","_app/immutable/chunks/AfbuXoTy.js","_app/immutable/chunks/Czefwyi5.js","_app/immutable/entry/app.Dqn8kQHn.js","_app/immutable/chunks/AfbuXoTy.js","_app/immutable/chunks/BhgL6my-.js","_app/immutable/chunks/abR5r1hs.js","_app/immutable/chunks/Dx1usP5A.js","_app/immutable/chunks/Czefwyi5.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/validate",
				pattern: /^\/api\/validate\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/validate/_server.js'))
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
