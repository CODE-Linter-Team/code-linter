const load = async (event) => {
  return {
    session: await event.locals.getSession()
  };
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 0;
const component = async () => (await import('./_layout.svelte-17236b76.js')).default;
const file = '_app/immutable/components/pages/_layout.svelte-3729e3d0.js';
const imports = ["_app/immutable/components/pages/_layout.svelte-3729e3d0.js","_app/immutable/chunks/index-f19977a0.js","_app/immutable/chunks/stores-c0c3161c.js","_app/immutable/chunks/index-27d11f01.js","_app/immutable/chunks/stores-dc8a6f79.js","_app/immutable/chunks/singletons-8ad6d977.js","_app/immutable/chunks/index-c82aa2f9.js","_app/immutable/chunks/logger-03ca5b72.js","_app/immutable/chunks/permissions-d250b562.js","_app/immutable/chunks/public-7ea8bfe8.js"];
const stylesheets = ["_app/immutable/assets/_layout-192a51df.css","_app/immutable/assets/SvelteToast-8600cd0d.css","_app/immutable/assets/index-af927694.css","_app/immutable/assets/logger-d7ae9d9f.css"];
const fonts = ["_app/immutable/assets/fira-mono-cyrillic-ext-400-normal-3df7909e.woff2","_app/immutable/assets/fira-mono-all-400-normal-1e3b098c.woff","_app/immutable/assets/fira-mono-cyrillic-400-normal-c7d433fd.woff2","_app/immutable/assets/fira-mono-greek-ext-400-normal-9e2fe623.woff2","_app/immutable/assets/fira-mono-greek-400-normal-a8be01ce.woff2","_app/immutable/assets/fira-mono-latin-ext-400-normal-6bfabd30.woff2","_app/immutable/assets/fira-mono-latin-400-normal-e43b3538.woff2"];

export { component, file, fonts, imports, index, _layout_server_ts as server, stylesheets };
//# sourceMappingURL=0-fc2588b5.js.map
