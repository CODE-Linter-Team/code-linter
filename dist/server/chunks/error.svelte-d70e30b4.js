import { c as create_ssr_component, b as subscribe, d as escape } from './index2-af991d7a.js';
import { p as page } from './stores-6a36a006.js';

const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `<h1>${escape($page.status)}</h1>
<p>${escape($page.error?.message)}</p>`;
});

export { Error as default };
//# sourceMappingURL=error.svelte-d70e30b4.js.map
