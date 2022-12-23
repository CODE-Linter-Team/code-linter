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

const index = 2;
const component = async () => (await import('./_page.svelte-8ce97c4d.js')).default;
const file = '_app/immutable/components/pages/_page.svelte-598c0866.js';
const imports = ["_app/immutable/components/pages/_page.svelte-598c0866.js","_app/immutable/chunks/index-f19977a0.js","_app/immutable/chunks/index-c82aa2f9.js","_app/immutable/modules/pages/_page.ts-bd80b5e0.js","_app/immutable/chunks/public-7ea8bfe8.js","_app/immutable/chunks/_page-5466854c.js"];
const stylesheets = ["_app/immutable/assets/_page-2fa34bbf.css","_app/immutable/assets/index-af927694.css"];
const fonts = [];

export { component, file, fonts, imports, index, stylesheets, _page_ts as universal };
//# sourceMappingURL=2-7e25eb96.js.map
