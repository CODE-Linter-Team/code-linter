import { c as create_ssr_component, g as add_attribute, d as escape, v as validate_component } from './index2-af991d7a.js';
import { c as codeUniversityEntityBytemdPlugin, V as Viewer } from './codeUniversityEntityBytemdPlugin-532b37f6.js';
import gfm from '@bytemd/plugin-gfm';
import gemoji from '@bytemd/plugin-gemoji';
import 'unist-util-visit';
import 'process';
import 'url';
import 'path';

const css = {
  code: ".headerImg.svelte-stv917.svelte-stv917{width:100%;height:14rem;object-fit:cover}article.svelte-stv917.svelte-stv917{color:var(--vscode-text);max-width:52rem;margin:auto}article.svelte-stv917 h1.svelte-stv917{color:white}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const article = data.article;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-js9mtb_START --><meta property="${"og:title"}"${add_attribute("content", article.title, 0)}><meta property="${"og:site_name"}" content="${"CODE Linter"}"><meta property="${"og:description"}"${add_attribute("content", article.description, 0)}><meta property="${"og:type"}" content="${"article"}"><meta property="${"article:published_time"}" content="${"CODE Linter"}"><meta property="${"article:modified_time"}" content="${"CODE Linter"}"><meta property="${"og:updated_time"}" content="${"CODE Linter"}"><meta property="${"og:image"}"${add_attribute("content", article.coverImgSrc, 0)}><!-- HEAD_svelte-js9mtb_END -->`, ""}

<article class="${"svelte-stv917"}">${article == null ? `<span>article not found</span>` : `<img${add_attribute("src", article.coverImgSrc, 0)} class="${"headerImg svelte-stv917"}">
		
		<h1 class="${"articleCaption svelte-stv917"}">${escape(article.title)}</h1>
		${validate_component(Viewer, "Viewer").$$render(
    $$result,
    {
      value: article.markdownText,
      plugins: [gfm(), gemoji(), codeUniversityEntityBytemdPlugin()]
    },
    {},
    {}
  )}`}
</article>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-79f84862.js.map
