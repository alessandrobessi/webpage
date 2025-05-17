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
		client: {start:"_app/immutable/entry/start.SX8xXACr.js",app:"_app/immutable/entry/app.CZWypbrk.js",imports:["_app/immutable/entry/start.SX8xXACr.js","_app/immutable/chunks/C-3eoQpO.js","_app/immutable/chunks/VnKtvPWD.js","_app/immutable/chunks/BQCMUEkA.js","_app/immutable/entry/app.CZWypbrk.js","_app/immutable/chunks/VnKtvPWD.js","_app/immutable/chunks/GolhScvZ.js","_app/immutable/chunks/BR9drO80.js","_app/immutable/chunks/PYsbZxsr.js","_app/immutable/chunks/BQCMUEkA.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
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
				endpoint: __memo(() => import('./entries/endpoints/api/validate/_server.js'))
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
