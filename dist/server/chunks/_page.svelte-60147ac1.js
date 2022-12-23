import { c as create_ssr_component, e as each, v as validate_component, g as add_attribute, d as escape } from './index2-af991d7a.js';
import { T as Toggle } from './Toggle-7c823ac8.js';
import { P as Permission } from './permissions-bab9c681.js';
import { faCircleCheck, faClock, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { F as Fa$1 } from './fa-d4dd1dea.js';

const css = {
  code: ".property.svelte-9a1xm9{display:flex;align-items:center;color:var(--vscode-text);font-weight:bold;font-size:1rem;min-height:52px}.userList.svelte-9a1xm9{display:flex;flex-direction:column;width:100%;max-width:40rem;gap:3rem;margin:auto}h2.svelte-9a1xm9{color:white;font-weight:bold;font-size:22px;margin:0;margin-bottom:0px}.row.svelte-9a1xm9{display:flex;justify-content:space-between;gap:2rem}.column.svelte-9a1xm9{display:flex;flex-direction:column;align-items:start;width:100%}.svelte-9a1xm9{box-sizing:border-box}.userCard.svelte-9a1xm9{display:flex;flex-direction:column;padding:2rem;gap:2rem;background:var(--vscode-card-bg);border-radius:6px}.booleanRow.svelte-9a1xm9{display:flex;align-items:center;justify-content:space-between;width:100%;padding:0.5rem 0rem;height:52px;gap:1rem;color:var(--vscode-text);font-weight:bold;font-size:1rem;cursor:pointer}.booleanRow.svelte-9a1xm9:hover div{filter:brightness(1.1)}.avatar.svelte-9a1xm9{--size:4.5rem;display:flex;width:var(--size);height:var(--size);background-size:cover;border-radius:50%}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let userInfo;
  $$result.css.add(css);
  userInfo = { permissions: [] };
  return `<div class="${"userList svelte-9a1xm9"}"><div class="${"userCard svelte-9a1xm9"}"><div class="${"row svelte-9a1xm9"}"><div class="${"column svelte-9a1xm9"}"><div class="${"avatar svelte-9a1xm9"}" style="${"background-image: url('https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'); background-size: cover"}"></div></div>
			<div class="${"column svelte-9a1xm9"}"><h2 class="${"svelte-9a1xm9"}">Linus Bolls</h2>
				<span class="${"property svelte-9a1xm9"}" style="${"min-height: 1rem"}">linus.bolls@code.berlin</span></div></div>
		<div class="${"row svelte-9a1xm9"}"><div class="${"column svelte-9a1xm9"}"><h2 class="${"svelte-9a1xm9"}">Permissions</h2>
				${each(Object.values(Permission), (permission, idx) => {
    return `<div class="${"booleanRow svelte-9a1xm9"}"${add_attribute("title", permission.text, 0)}><span class="${"svelte-9a1xm9"}">${escape(permission.text)}</span>
						${validate_component(Toggle, "Toggle").$$render(
      $$result,
      {
        isToggled: userInfo.permissions.includes(permission.id)
      },
      {},
      {}
    )}
					</div>`;
  })}</div>
			<div class="${"column svelte-9a1xm9"}"><h2 class="${"svelte-9a1xm9"}">Articles</h2>
				<span class="${"property svelte-9a1xm9"}">${validate_component(Fa$1, "Fa").$$render(
    $$result,
    {
      icon: faCircleCheck,
      style: "padding-right: 0.7rem; color: var(--success); font-size: 22px"
    },
    {},
    {}
  )}
					0 published
				</span>

				<span class="${"property svelte-9a1xm9"}">${validate_component(Fa$1, "Fa").$$render(
    $$result,
    {
      icon: faClock,
      style: "padding-right: 0.7rem; color: var(--neutral); font-size: 22px"
    },
    {},
    {}
  )}
					0 pending</span>

				<span class="${"property svelte-9a1xm9"}">${validate_component(Fa$1, "Fa").$$render(
    $$result,
    {
      icon: faCircleXmark,
      style: "padding-right: 0.7rem; color: var(--error); font-size: 22px"
    },
    {},
    {}
  )}
					0 rejected
				</span></div></div></div>
</div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-60147ac1.js.map
