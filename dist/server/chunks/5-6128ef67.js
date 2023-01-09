import { P as PUBLIC_SERVICE_URL } from './public-4ac8c09d.js';

async function load({ params }) {
  const res = await fetch(PUBLIC_SERVICE_URL + `/api/articles/${params.articleId}`);
  const json = await res.json();
  const { article } = json;
  return {
    article
  };
}

var _page_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 5;
const component = async () => (await import('./_page.svelte-79f84862.js')).default;
const file = '_app/immutable/components/pages/articles/_articleId_/_page.svelte-d6df4ccb.js';
const imports = ["_app/immutable/components/pages/articles/_articleId_/_page.svelte-d6df4ccb.js","_app/immutable/chunks/index-f19977a0.js","_app/immutable/chunks/codeUniversityEntityBytemdPlugin-105ad71e.js","_app/immutable/modules/pages/articles/_articleId_/_page.ts-0d4dd7cf.js","_app/immutable/chunks/public-7ea8bfe8.js","_app/immutable/chunks/_page-e2eeaa0a.js"];
const stylesheets = ["_app/immutable/assets/_page-17da45d1.css"];
const fonts = [];

export { component, file, fonts, imports, index, stylesheets, _page_ts as universal };
//# sourceMappingURL=5-6128ef67.js.map
