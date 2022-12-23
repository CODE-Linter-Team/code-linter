const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","robots.txt"]),
	mimeTypes: {".png":"image/png",".txt":"text/plain"},
	_: {
		entry: {"file":"_app/immutable/start-57952e6e.js","imports":["_app/immutable/start-57952e6e.js","_app/immutable/chunks/index-f19977a0.js","_app/immutable/chunks/singletons-8ad6d977.js","_app/immutable/chunks/index-27d11f01.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./chunks/0-c9ba76a6.js'),
			() => import('./chunks/1-1a517d03.js'),
			() => import('./chunks/2-7e25eb96.js'),
			() => import('./chunks/4-3672ac3a.js'),
			() => import('./chunks/5-ba1175f7.js'),
			() => import('./chunks/6-7be1d3af.js'),
			() => import('./chunks/7-d70df268.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/articles",
				pattern: /^\/api\/articles\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./chunks/_server.ts-71aac286.js')
			},
			{
				id: "/api/articles/[articleId]",
				pattern: /^\/api\/articles\/([^/]+?)\/?$/,
				params: [{"name":"articleId","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('./chunks/_server.ts-04b6b257.js')
			},
			{
				id: "/api/articles/[articleId]/publish",
				pattern: /^\/api\/articles\/([^/]+?)\/publish\/?$/,
				params: [{"name":"articleId","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('./chunks/_server.ts-50760530.js')
			},
			{
				id: "/api/articles/[articleId]/reject",
				pattern: /^\/api\/articles\/([^/]+?)\/reject\/?$/,
				params: [{"name":"articleId","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('./chunks/_server.ts-c4dfc4cb.js')
			},
			{
				id: "/api/assets",
				pattern: /^\/api\/assets\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./chunks/_server.ts-791544f9.js')
			},
			{
				id: "/api/assets/[assetId]",
				pattern: /^\/api\/assets\/([^/]+?)\/?$/,
				params: [{"name":"assetId","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: () => import('./chunks/_server.ts-f87f0ee3.js')
			},
			{
				id: "/api/me",
				pattern: /^\/api\/me\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./chunks/_server.ts-0f7732f8.js')
			},
			{
				id: "/articles",
				pattern: /^\/articles\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			},
			{
				id: "/articles/[articleId]",
				pattern: /^\/articles\/([^/]+?)\/?$/,
				params: [{"name":"articleId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 4 },
				endpoint: null
			},
			{
				id: "/compose",
				pattern: /^\/compose\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 5 },
				endpoint: null
			},
			{
				id: "/users",
				pattern: /^\/users\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 6 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};

export { manifest };
//# sourceMappingURL=manifest.js.map
