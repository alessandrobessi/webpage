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
		client: {start:"_app/immutable/entry/start.8oWvE3kc.js",app:"_app/immutable/entry/app.CLZEEj24.js",imports:["_app/immutable/entry/start.8oWvE3kc.js","_app/immutable/chunks/BXzMczJn.js","_app/immutable/chunks/Bga2Wgnu.js","_app/immutable/chunks/DXR0O3iS.js","_app/immutable/entry/app.CLZEEj24.js","_app/immutable/chunks/Bga2Wgnu.js","_app/immutable/chunks/6eZ0blPR.js","_app/immutable/chunks/BUpkqG-s.js","_app/immutable/chunks/CrAbsLbI.js","_app/immutable/chunks/DXR0O3iS.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
