import { P as PUBLIC_SERVICE_URL } from './public-4ac8c09d.js';

async function load({ params }) {
  const res = await fetch(PUBLIC_SERVICE_URL + "/api/articles?states=PUBLISHED");
  const json = await res.json();
  return {
    articles: json.articles
  };
}

var _page_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 4;
const component = async () => (await import('./_page.svelte-25364ae2.js')).default;
const file = '_app/immutable/components/pages/articles/_page.svelte-fa052223.js';
const imports = ["_app/immutable/components/pages/articles/_page.svelte-fa052223.js","_app/immutable/chunks/index-f19977a0.js","_app/immutable/chunks/stores-dc8a6f79.js","_app/immutable/chunks/singletons-8ad6d977.js","_app/immutable/chunks/index-27d11f01.js","_app/immutable/chunks/public-7ea8bfe8.js","_app/immutable/chunks/logger-03ca5b72.js","_app/immutable/chunks/index-c82aa2f9.js","_app/immutable/chunks/permissions-d250b562.js","_app/immutable/chunks/ArrowUp.svelte_svelte_type_style_lang-a7640e25.js","_app/immutable/chunks/stores-c0c3161c.js","_app/immutable/modules/pages/articles/_page.ts-c62f1191.js","_app/immutable/chunks/public-7ea8bfe8.js","_app/immutable/chunks/_page-a3de0bd9.js"];
const stylesheets = ["_app/immutable/assets/_page-7c9f95b6.css","_app/immutable/assets/SvelteToast-8600cd0d.css","_app/immutable/assets/logger-d7ae9d9f.css","_app/immutable/assets/index-af927694.css","_app/immutable/assets/ArrowUp-ab04f6cd.css"];
const fonts = [];

export { component, file, fonts, imports, index, stylesheets, _page_ts as universal };
//# sourceMappingURL=4-3672ac3a.js.map
