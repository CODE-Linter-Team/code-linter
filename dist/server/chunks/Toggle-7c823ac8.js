import { c as create_ssr_component } from './index2-af991d7a.js';

const css = {
  code: ".svelte-kccw17.svelte-kccw17{box-sizing:border-box}label.svelte-kccw17.svelte-kccw17{--padding:4px;--height:22px;--width:52px;position:relative;width:var(--width);height:calc(var(--height) + 2 * var(--padding));cursor:pointer}input.svelte-kccw17.svelte-kccw17{display:none}div.svelte-kccw17.svelte-kccw17{width:100%;height:100%;border-radius:99rem;transition-duration:0.2s}input.svelte-kccw17:not(:checked)~div.svelte-kccw17{background:var(--vscode-layer2)}input.svelte-kccw17:checked~div.svelte-kccw17{background:var(--primary)}span.svelte-kccw17.svelte-kccw17{position:absolute;width:var(--height);height:var(--height);border-radius:50%;top:var(--padding);transition-duration:0.2s;background:white}input.svelte-kccw17:not(:checked)~span.svelte-kccw17{left:var(--padding)}input.svelte-kccw17:checked~span.svelte-kccw17{left:calc(var(--width) - var(--height) - var(--padding))}",
  map: null
};
const Toggle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { isToggled } = $$props;
  if ($$props.isToggled === void 0 && $$bindings.isToggled && isToggled !== void 0)
    $$bindings.isToggled(isToggled);
  $$result.css.add(css);
  return `<label class="${"svelte-kccw17"}"><input type="${"checkbox"}" ${isToggled ? "checked" : ""} disabled class="${"svelte-kccw17"}">
	<div class="${"svelte-kccw17"}"></div>
	<span class="${"svelte-kccw17"}"></span>
</label>`;
});

export { Toggle as T };
//# sourceMappingURL=Toggle-7c823ac8.js.map