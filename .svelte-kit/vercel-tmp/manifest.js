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
		client: {start:"_app/immutable/entry/start.BD9KI6rd.js",app:"_app/immutable/entry/app.BGPcZnxU.js",imports:["_app/immutable/entry/start.BD9KI6rd.js","_app/immutable/chunks/DFZeJYPG.js","_app/immutable/chunks/75EMG3Uh.js","_app/immutable/chunks/BCr4zGHm.js","_app/immutable/entry/app.BGPcZnxU.js","_app/immutable/chunks/Bqm4yP9Y.js","_app/immutable/chunks/75EMG3Uh.js","_app/immutable/chunks/CrSiB_9q.js","_app/immutable/chunks/BE8XQIoG.js","_app/immutable/chunks/BCr4zGHm.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
