import { c as create_ssr_component, v as validate_component, b as subscribe, e as each, d as escape, f as null_to_empty, g as add_attribute, i as identity, o as onDestroy, m as missing_component, s as setContext, h as assign, j as now, l as loop } from './index2-af991d7a.js';
import { w as writable } from './index4-d46cba10.js';
import { p as page } from './stores-6a36a006.js';
import { F as Fa$1 } from './fa-d4dd1dea.js';
import { faSignIn, faPen, faExternalLinkAlt, faCircleCheck, faClock, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { P as Permission } from './permissions-bab9c681.js';
import { f as focusManager, o as onlineManager, p as parseFilterArgs, a as parseQueryArgs, n as notifyManager, b as noop, h as hashQueryKey, c as partialMatchKey, d as hashQueryKeyByOptions, S as Subscribable, m as matchQuery, e as matchMutation, g as getAbortController, i as isCancelable, j as isValidTimeout, k as functionalUpdate, r as replaceEqualDeep, t as timeUntilStale, l as ensureQueryKeyArray, R as Retryer, q as isCancelledError, s as getLogger } from './logger-ad840b96.js';
import { P as PUBLIC_SERVICE_URL } from './public-4ac8c09d.js';

const defaults = {
  duration: 4e3,
  initial: 1,
  next: 0,
  pausable: false,
  dismissable: true,
  reversed: false,
  intro: { x: 256 }
};
const createToast = () => {
  const { subscribe: subscribe2, update } = writable([]);
  let count = 0;
  const options = {};
  const _obj = (obj) => obj instanceof Object;
  const push = (msg, opts = {}) => {
    const param = { target: "default", ..._obj(msg) ? msg : { ...opts, msg } };
    const conf = options[param.target] || {};
    const entry = {
      ...defaults,
      ...conf,
      ...param,
      theme: { ...conf.theme, ...param.theme },
      classes: [...conf.classes || [], ...param.classes || []],
      id: ++count
    };
    update((n) => entry.reversed ? [...n, entry] : [entry, ...n]);
    return count;
  };
  const pop = (id) => {
    update((n) => {
      if (!n.length || id === 0)
        return [];
      if (_obj(id))
        return n.filter((i) => id(i));
      const target = id || Math.max(...n.map((i) => i.id));
      return n.filter((i) => i.id !== target);
    });
  };
  const set = (id, opts = {}) => {
    const param = _obj(id) ? { ...id } : { ...opts, id };
    update((n) => {
      const idx = n.findIndex((i) => i.id === param.id);
      if (idx > -1) {
        n[idx] = { ...n[idx], ...param };
      }
      return n;
    });
  };
  const _init = (target = "default", opts = {}) => {
    options[target] = opts;
    return options;
  };
  return { subscribe: subscribe2, push, pop, set, _init };
};
const toast = createToast();
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function get_interpolator(a, b) {
  if (a === b || a !== a)
    return () => a;
  const type = typeof a;
  if (type !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
    throw new Error("Cannot interpolate values of different type");
  }
  if (Array.isArray(a)) {
    const arr = b.map((bi, i) => {
      return get_interpolator(a[i], bi);
    });
    return (t) => arr.map((fn) => fn(t));
  }
  if (type === "object") {
    if (!a || !b)
      throw new Error("Object cannot be null");
    if (is_date(a) && is_date(b)) {
      a = a.getTime();
      b = b.getTime();
      const delta = b - a;
      return (t) => new Date(a + t * delta);
    }
    const keys = Object.keys(b);
    const interpolators = {};
    keys.forEach((key) => {
      interpolators[key] = get_interpolator(a[key], b[key]);
    });
    return (t) => {
      const result = {};
      keys.forEach((key) => {
        result[key] = interpolators[key](t);
      });
      return result;
    };
  }
  if (type === "number") {
    const delta = b - a;
    return (t) => a + t * delta;
  }
  throw new Error(`Cannot interpolate ${type} values`);
}
function tweened(value, defaults2 = {}) {
  const store = writable(value);
  let task;
  let target_value = value;
  function set(new_value, opts) {
    if (value == null) {
      store.set(value = new_value);
      return Promise.resolve();
    }
    target_value = new_value;
    let previous_task = task;
    let started = false;
    let { delay = 0, duration = 400, easing = identity, interpolate = get_interpolator } = assign(assign({}, defaults2), opts);
    if (duration === 0) {
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      store.set(value = target_value);
      return Promise.resolve();
    }
    const start = now() + delay;
    let fn;
    task = loop((now2) => {
      if (now2 < start)
        return true;
      if (!started) {
        fn = interpolate(value, new_value);
        if (typeof duration === "function")
          duration = duration(value, new_value);
        started = true;
      }
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      const elapsed = now2 - start;
      if (elapsed > duration) {
        store.set(value = new_value);
        return false;
      }
      store.set(value = fn(easing(elapsed / duration)));
      return true;
    });
    return task.promise;
  }
  return {
    set,
    update: (fn, opts) => set(fn(target_value, value), opts),
    subscribe: store.subscribe
  };
}
const css$5 = {
  code: "._toastItem.svelte-l65oht{width:var(--toastWidth, 16rem);height:var(--toastHeight, auto);min-height:var(--toastMinHeight, 3.5rem);margin:var(--toastMargin, 0 0 0.5rem 0);padding:var(--toastPadding, 0);background:var(--toastBackground, rgba(66, 66, 66, 0.9));color:var(--toastColor, #fff);box-shadow:var(\n    --toastBoxShadow,\n    0 4px 6px -1px rgba(0, 0, 0, 0.1),\n    0 2px 4px -1px rgba(0, 0, 0, 0.06)\n  );border:var(--toastBorder, none);border-radius:var(--toastBorderRadius, 0.125rem);position:relative;display:flex;flex-direction:row;align-items:center;overflow:hidden;will-change:transform, opacity;-webkit-tap-highlight-color:transparent}._toastMsg.svelte-l65oht{padding:var(--toastMsgPadding, 0.75rem 0.5rem);flex:1 1 0%}.pe.svelte-l65oht,._toastMsg.svelte-l65oht a{pointer-events:auto}._toastBtn.svelte-l65oht{width:var(--toastBtnWidth, 2rem);height:var(--toastBtnHeight, 100%);cursor:pointer;outline:none}._toastBtn.svelte-l65oht::after{content:var(--toastBtnContent, '✕');font:var(--toastBtnFont, 1rem sans-serif);display:flex;align-items:center;justify-content:center}._toastBar.svelte-l65oht{top:var(--toastBarTop, auto);right:var(--toastBarRight, auto);bottom:var(--toastBarBottom, 0);left:var(--toastBarLeft, 0);height:var(--toastBarHeight, 6px);width:var(--toastBarWidth, 100%);position:absolute;display:block;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:none;background:transparent;pointer-events:none}._toastBar.svelte-l65oht::-webkit-progress-bar{background:transparent}._toastBar.svelte-l65oht::-webkit-progress-value{background:var(--toastProgressBackground, var(--toastBarBackground, rgba(33, 150, 243, 0.75)))}._toastBar.svelte-l65oht::-moz-progress-bar{background:var(--toastProgressBackground, var(--toastBarBackground, rgba(33, 150, 243, 0.75)))}",
  map: null
};
const ToastItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $progress, $$unsubscribe_progress;
  let { item } = $$props;
  const progress = tweened(item.initial, { duration: item.duration, easing: identity });
  $$unsubscribe_progress = subscribe(progress, (value) => $progress = value);
  const close = () => toast.pop(item.id);
  const autoclose = () => {
    if ($progress === 1 || $progress === 0) {
      close();
    }
  };
  let next = item.initial;
  let componentProps = {};
  const check = (prop, kind = "undefined") => typeof prop === kind;
  onDestroy(() => {
    if (check(item.onpop, "function")) {
      item.onpop(item.id);
    }
  });
  if ($$props.item === void 0 && $$bindings.item && item !== void 0)
    $$bindings.item(item);
  $$result.css.add(css$5);
  {
    if (!check(item.progress)) {
      item.next = item.progress;
    }
  }
  {
    if (next !== item.next) {
      next = item.next;
      progress.set(next).then(autoclose);
    }
  }
  {
    if (item.component) {
      const { props = {}, sendIdTo } = item.component;
      componentProps = {
        ...props,
        ...sendIdTo && { [sendIdTo]: item.id }
      };
    }
  }
  $$unsubscribe_progress();
  return `<div class="${["_toastItem svelte-l65oht", item.pausable ? "pe" : ""].join(" ").trim()}"><div role="${"status"}" class="${["_toastMsg svelte-l65oht", item.component ? "pe" : ""].join(" ").trim()}">${item.component ? `${validate_component(item.component.src || missing_component, "svelte:component").$$render($$result, Object.assign(componentProps), {}, {})}` : `<!-- HTML_TAG_START -->${item.msg}<!-- HTML_TAG_END -->`}</div>
  ${item.dismissable ? `<div class="${"_toastBtn pe svelte-l65oht"}" role="${"button"}" tabindex="${"0"}"></div>` : ``}
  <progress class="${"_toastBar svelte-l65oht"}"${add_attribute("value", $progress, 0)}></progress>
</div>`;
});
const css$4 = {
  code: "._toastContainer.svelte-yh90az{top:var(--toastContainerTop, 1.5rem);right:var(--toastContainerRight, 2rem);bottom:var(--toastContainerBottom, auto);left:var(--toastContainerLeft, auto);position:fixed;margin:0;padding:0;list-style-type:none;pointer-events:none;z-index:var(--toastContainerZIndex, 9999)}",
  map: null
};
const SvelteToast = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $toast, $$unsubscribe_toast;
  $$unsubscribe_toast = subscribe(toast, (value) => $toast = value);
  let { options = {} } = $$props;
  let { target = "default" } = $$props;
  let items;
  const getCss = (theme) => Object.keys(theme).reduce((a, c) => `${a}${c}:${theme[c]};`, "");
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.target === void 0 && $$bindings.target && target !== void 0)
    $$bindings.target(target);
  $$result.css.add(css$4);
  {
    toast._init(target, options);
  }
  items = $toast.filter((i) => i.target === target);
  $$unsubscribe_toast();
  return `<ul class="${"_toastContainer svelte-yh90az"}">${each(items, (item) => {
    return `<li class="${escape(null_to_empty(item.classes.join(" ")), true) + " svelte-yh90az"}"${add_attribute("style", getCss(item.theme), 0)}>${validate_component(ToastItem, "ToastItem").$$render($$result, { item }, {}, {})}
    </li>`;
  })}
</ul>`;
});
const css$3 = {
  code: "footer.svelte-1x4ngxa.svelte-1x4ngxa{display:flex;flex-direction:column;justify-content:center;align-items:center;padding:50px 0;background:var(--vscode-layer1);width:100%;min-height:300px;margin-top:8rem}footer.svelte-1x4ngxa a.svelte-1x4ngxa{font-weight:bold}@media(min-width: 480px){footer.svelte-1x4ngxa.svelte-1x4ngxa{padding:12px 0}}nav.svelte-1x4ngxa.svelte-1x4ngxa{display:flex;justify-content:center}nav.svelte-1x4ngxa a.svelte-1x4ngxa{display:grid;place-content:center;height:100%;padding:0.5rem 3rem;text-decoration-line:underline;color:var(--vscode-text)}@media(max-width: 42rem){nav.svelte-1x4ngxa.svelte-1x4ngxa{flex-direction:column;gap:3rem}}.impressum.svelte-1x4ngxa.svelte-1x4ngxa{color:var(--vscode-text);display:flex;flex-direction:column;justify-content:center}.impressum.svelte-1x4ngxa strong.svelte-1x4ngxa{color:white}.impressum.svelte-1x4ngxa h3.svelte-1x4ngxa{color:white}.impressumContent.svelte-1x4ngxa.svelte-1x4ngxa{display:flex;flex-direction:row}@media(max-width: 32rem){.impressumContent.svelte-1x4ngxa.svelte-1x4ngxa{flex-direction:column}}.impressumContent.svelte-1x4ngxa p.svelte-1x4ngxa{min-width:250px;align-self:center}",
  map: null
};
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$3);
  return `<footer class="${"svelte-1x4ngxa"}"><div class="${"impressum svelte-1x4ngxa"}"><h3 class="${"svelte-1x4ngxa"}">Impressum</h3>
		<div class="${"impressumContent svelte-1x4ngxa"}"><p class="${"svelte-1x4ngxa"}"><strong class="${"svelte-1x4ngxa"}">Address</strong>
				<br>
				CODE Education GmbH
				<br>
				Lohmühlenstrasse 65
				<br>
				12435 Berlin
				<br>
				Deutschland
				<br></p>
			<p class="${"svelte-1x4ngxa"}"><strong class="${"svelte-1x4ngxa"}">Contact</strong>
				<br>
				Name: Daniel Azomji
				<br>
				Email: daniel.azomji@code.berlin
				<br>
				Tel.: +49 123 4567891
			</p></div></div>
	<nav class="${"svelte-1x4ngxa"}"><a href="${"#"}" class="${"svelte-1x4ngxa"}">Privacy</a></nav>
</footer>`;
});
async function signOut(options) {
  const { callbackUrl = window.location.href } = options ?? {};
  const csrfTokenResponse = await fetch("/auth/csrf");
  const { csrfToken } = await csrfTokenResponse.json();
  const res = await fetch(`/auth/signout`, {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Auth-Return-Redirect": "1"
    },
    body: new URLSearchParams({
      csrfToken,
      callbackUrl
    })
  });
  const data = await res.json();
  const url = data.url ?? callbackUrl;
  window.location.href = url;
  if (url.includes("#"))
    window.location.reload();
}
const css$2 = {
  code: "a.column.svelte-15xwa96:hover .propertyCaption.svelte-15xwa96{text-decoration:underline;text-decoration-color:var(--vscode-text)}a.column.svelte-15xwa96.svelte-15xwa96:hover{text-decoration:none}h2.svelte-15xwa96.svelte-15xwa96{margin:0}.row.svelte-15xwa96.svelte-15xwa96{display:flex;justify-content:space-between}.column.svelte-15xwa96.svelte-15xwa96{display:flex;flex-direction:column;align-items:start}.propertyCaption.svelte-15xwa96.svelte-15xwa96{color:white;margin-bottom:2px}.property.svelte-15xwa96.svelte-15xwa96{color:var(--vscode-text)}.avatar.svelte-15xwa96.svelte-15xwa96{--size:3rem;display:flex;width:var(--size);height:var(--size);background-size:cover;border-radius:50%}.userInfoCard.svelte-15xwa96.svelte-15xwa96{position:absolute;display:flex;flex-direction:column;z-index:999;width:20rem;padding:1rem;border-radius:6px;background:var(--vscode-layer2);box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.2)}.signOutButton.svelte-15xwa96.svelte-15xwa96{background:none;border-radius:6px;cursor:pointer;border:2px solid var(--vscode-text);color:var(--vscode-text);transition-duration:0.1s;height:2.2rem;margin-top:1rem}.signOutButton.svelte-15xwa96.svelte-15xwa96:hover{background:var(--vscode-text);color:var(--vscode-layer2);font-weight:bold}",
  map: null
};
const UserInfoCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { user } = $$props;
  let { signOut: signOut2 } = $$props;
  let { isMe } = $$props;
  let { style } = $$props;
  if ($$props.user === void 0 && $$bindings.user && user !== void 0)
    $$bindings.user(user);
  if ($$props.signOut === void 0 && $$bindings.signOut && signOut2 !== void 0)
    $$bindings.signOut(signOut2);
  if ($$props.isMe === void 0 && $$bindings.isMe && isMe !== void 0)
    $$bindings.isMe(isMe);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  $$result.css.add(css$2);
  return `<div class="${"userInfoCard svelte-15xwa96"}"${add_attribute("style", style, 0)}><div class="${"row svelte-15xwa96"}"><div class="${"column svelte-15xwa96"}" style="${"height: 5rem"}"><h2 class="${"propertyCaption svelte-15xwa96"}" style="${"margin-right: auto"}">${escape(user.name)}</h2>
			<span class="${"property svelte-15xwa96"}" style="${"margin-right: auto; margin-bottom: 2rem"}">${escape(user.email)}</span></div>

		<div class="${"avatar svelte-15xwa96"}" style="${"background-image: url('https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'); background-size: cover"}"><span style="${"background-image: url('" + escape(user.profilePictureSrc, true) + "')"}"></span></div></div>

	<div class="${"row svelte-15xwa96"}"><div class="${"column svelte-15xwa96"}"><h2 class="${"propertyCaption svelte-15xwa96"}">Permissions</h2>
			${each(user.permissions, (permissionId) => {
    return `<span class="${"property svelte-15xwa96"}">${escape(Permission[permissionId].text)}</span>`;
  })}</div>

		<a class="${"column svelte-15xwa96"}"${add_attribute("href", `/articles?authors=${user.email}`, 0)}><h2 class="${"propertyCaption svelte-15xwa96"}">Articles ${validate_component(Fa$1, "Fa").$$render(
    $$result,
    {
      icon: faExternalLinkAlt,
      style: "padding-left: 0.1rem; font-size: 0.7rem; padding-bottom: 1.5px"
    },
    {},
    {}
  )}</h2>

			<span class="${"property svelte-15xwa96"}">${validate_component(Fa$1, "Fa").$$render(
    $$result,
    {
      icon: faCircleCheck,
      style: "padding-right: 0.3rem; color: var(--success)"
    },
    {},
    {}
  )}
				${escape(user.articleInfo.publishedCount)} published
			</span>

			<span class="${"property svelte-15xwa96"}">${validate_component(Fa$1, "Fa").$$render(
    $$result,
    {
      icon: faClock,
      style: "padding-right: 0.3rem; color: var(--neutral)"
    },
    {},
    {}
  )}
				${escape(user.articleInfo.pendingCount)} pending</span>

			<span class="${"property svelte-15xwa96"}">${validate_component(Fa$1, "Fa").$$render(
    $$result,
    {
      icon: faCircleXmark,
      style: "padding-right: 0.3rem; color: var(--error)"
    },
    {},
    {}
  )}
				${escape(user.articleInfo.rejectedCount)} rejected
			</span></a></div>

	${isMe ? `<button class="${"signOutButton svelte-15xwa96"}">Sign out</button>` : ``}
</div>`;
});
const me = writable({ isSignedIn: true, isLoading: true });
function watch() {
  page.subscribe(async (data) => {
    const isSignedIn = Object.keys(data.data.session || {}).length > 0;
    if (!isSignedIn) {
      me.set({
        isSignedIn,
        isLoading: false
      });
      return;
    }
    const res = await fetch(PUBLIC_SERVICE_URL + "/api/me");
    const meData = await res.json();
    me.set({
      isSignedIn,
      isLoading: false,
      ...meData
    });
  });
}
const css$1 = {
  code: "header.svelte-immyvp{position:relative;display:flex;align-items:center;justify-content:center;background:var(--vscode-layer1)}.navContainer.svelte-immyvp{display:flex;flex-direction:column;width:min(calc(100% - 2rem), 70rem)}.lowerNav.svelte-immyvp{position:relative;display:flex;height:4rem}.upperNav.svelte-immyvp{display:flex;height:8rem}.lowerNavItem.svelte-immyvp{display:flex;justify-content:center;width:100%;height:100%;color:var(--vscode-text)}.logoContainer.svelte-immyvp{display:grid;place-content:center;width:100%;height:100%}.logo.svelte-immyvp{fill:white;height:3rem}.avatar.svelte-immyvp{--size:3rem;display:flex;align-items:center;justify-content:center;width:var(--size);height:var(--size);background-size:cover;border-radius:50%}.header-avatar.svelte-immyvp{position:relative;margin:3px;cursor:pointer;margin-right:calc(1.25rem + 3px);box-sizing:content-box;color:var(--vscode-text)}.header-avatar.svelte-immyvp:hover{margin:0;margin-right:calc(1.25rem + 3px - 3px);border:3px solid var(--vscode-layer2)}.googleSigninButton.svelte-immyvp{height:2.2rem;padding:0 1.5rem;border:none;cursor:pointer;transition-duration:0.2s;font-size:0.9rem;font-weight:bold;color:var(--vscode-layer1);background:white;display:flex;align-items:center;justify-content:center;border-radius:6px}.googleSigninButton.svelte-immyvp:hover{filter:brightness(0.8)}.googleSigninButton.svelte-immyvp:active{transform:scale(0.98)}.composeButton.svelte-immyvp{--size:4.5rem;font-size:1.2rem;text-decoration:none !important;position:absolute;display:flex;align-items:center;justify-content:center;right:1rem;bottom:calc(var(--size) / -2);width:var(--size);height:var(--size);background:var(--primary);box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.2);border-radius:50%;color:white;transition-duration:0.2s}.composeButton.svelte-immyvp:hover{filter:brightness(1.1)}.composeButton.svelte-immyvp:active{transform:scale(0.95)}.accountInfoContainer.svelte-immyvp{position:relative;display:flex;flex-direction:column;align-items:end;justify-content:center;min-width:20rem;height:100%}@media(max-width: 800px){.accountInfoContainer.svelte-immyvp{min-width:auto;width:5rem}}",
  map: null
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isSmol;
  let $me, $$unsubscribe_me;
  let $page, $$unsubscribe_page;
  $$unsubscribe_me = subscribe(me, (value) => $me = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  watch();
  const isLoggedIn = Object.keys($page?.data?.session || {}).length;
  let innerWidth = 0;
  let user;
  let { isAccountPopupOpen = false } = $$props;
  const userProfilePicture = $page?.data?.session?.user?.image;
  const userEmail = $page?.data?.session?.user?.email;
  const username = $page?.data?.session?.user?.name;
  const usernameOrEmail = username || userEmail;
  if ($$props.isAccountPopupOpen === void 0 && $$bindings.isAccountPopupOpen && isAccountPopupOpen !== void 0)
    $$bindings.isAccountPopupOpen(isAccountPopupOpen);
  $$result.css.add(css$1);
  isSmol = innerWidth < 900;
  {
    if ($me.isSignedIn) {
      user = {
        name: username,
        email: userEmail,
        profilePictureSrc: userProfilePicture,
        permissions: $me?.me?.permissions ?? [],
        articles: {},
        articleInfo: $me?.me?.articleInfo ?? {}
      };
    }
  }
  $$unsubscribe_me();
  $$unsubscribe_page();
  return `

<header class="${"svelte-immyvp"}"><div class="${"navContainer svelte-immyvp"}"><nav class="${"upperNav svelte-immyvp"}"><div class="${"accountInfoContainer svelte-immyvp"}"></div>
			<a class="${"logoContainer svelte-immyvp"}" href="${"/"}"><svg xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 102.6 26.9"}" class="${"logo svelte-immyvp"}"><path d="${"M13.3 20.5c-3.6 0-6.5-3.2-6.5-7.1s2.9-7.1 6.5-7.1c1.7 0 3.3.8 4.5 2l4.6-4.5C19.9 1.5 16.7 0 13.1 0 5.9 0 0 6 0 13.5 0 20.9 5.9 27 13.1 27c3.6 0 6.9-1.5 9.2-3.9l-4.6-4.5c-1.1 1.2-2.7 1.9-4.4 1.9zM32.2.6L19.5 13l-.4.4 13.1 12.9 4.5-4.4-8.9-8.4L36.7 5 32.2.6zm35.1.3h-8.6V26h8.7C75.3 26 81 21.2 81 13.5 81 5.7 75.3.9 67.3.9zm0 19.5h-2.1V6.6h2.1c4.6 0 7 3 7 6.9 0 3.7-2.6 6.9-7 6.9zm35.3-13.8V.9H84V26h18.6v-5.6H90.5v-4.3h11.8v-5.6H90.5V6.6h12.1zM42.8.6L38.3 5l8.9 8.5-8.9 8.4 4.5 4.4 13.1-12.9-.4-.4L42.8.6z"}"></path></svg></a>
			<div class="${"accountInfoContainer svelte-immyvp"}">${isLoggedIn ? `${userProfilePicture ? `<button style="${"border: none; background: none"}"><div class="${"avatar header-avatar svelte-immyvp"}"${add_attribute("title", `Signed in as ${usernameOrEmail}`, 0)} style="${"background-image: url('https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'); background-size: cover"}"><span style="${"background-image: url('" + escape(userProfilePicture, true) + "')"}"></span></div>
							${isAccountPopupOpen ? `${validate_component(UserInfoCard, "UserInfoCard").$$render(
    $$result,
    {
      user,
      isMe: true,
      signOut,
      style: "right: 1.25rem; top: 6rem;"
    },
    {},
    {}
  )}` : ``}</button>` : ``}` : `${isSmol ? `<button style="${"border: none; background: none"}"><span class="${"avatar header-avatar svelte-immyvp"}"${add_attribute("title", `Sign in with @code.berlin`, 0)}>${validate_component(Fa$1, "Fa").$$render($$result, { icon: faSignIn }, {}, {})}</span></button>` : `<button class="${"googleSigninButton svelte-immyvp"}">${validate_component(Fa$1, "Fa").$$render(
    $$result,
    {
      icon: faGoogle,
      style: "padding-right: 0.8rem"
    },
    {},
    {}
  )}
						Sign in with @code.berlin
					</button>`}`}</div></nav>
		<nav class="${"lowerNav svelte-immyvp"}"><a href="${"/articles?tags=Campus"}" class="${"lowerNavItem svelte-immyvp"}">Campus</a>
			<a href="${"/articles?tags=Social"}" class="${"lowerNavItem svelte-immyvp"}">Social</a>
			<a href="${"/articles?tags=Technology"}" class="${"lowerNavItem svelte-immyvp"}">Technology</a>
			<a href="${"/articles?tags=Academic"}" class="${"lowerNavItem svelte-immyvp"}">Academic</a>
			<a href="${"/articles?tags=Opinion"}" class="${"lowerNavItem svelte-immyvp"}">Opinion</a>

			<a href="${"/compose"}" class="${"composeButton svelte-immyvp"}">${validate_component(Fa$1, "Fa").$$render($$result, { icon: faPen }, {}, {})}</a></nav></div>
	
</header>`;
});
class Query {
  constructor(config) {
    this.abortSignalConsumed = false;
    this.hadObservers = false;
    this.defaultOptions = config.defaultOptions;
    this.setOptions(config.options);
    this.observers = [];
    this.cache = config.cache;
    this.queryKey = config.queryKey;
    this.queryHash = config.queryHash;
    this.initialState = config.state || this.getDefaultState(this.options);
    this.state = this.initialState;
    this.meta = config.meta;
    this.scheduleGc();
  }
  setOptions(options) {
    var _a;
    this.options = Object.assign(Object.assign({}, this.defaultOptions), options);
    this.meta = options === null || options === void 0 ? void 0 : options.meta;
    this.cacheTime = Math.max(this.cacheTime || 0, (_a = this.options.cacheTime) !== null && _a !== void 0 ? _a : 5 * 60 * 1e3);
  }
  setDefaultOptions(options) {
    this.defaultOptions = options;
  }
  scheduleGc() {
    this.clearGcTimeout();
    if (isValidTimeout(this.cacheTime)) {
      this.gcTimeout = setTimeout(() => {
        this.optionalRemove();
      }, this.cacheTime);
    }
  }
  clearGcTimeout() {
    clearTimeout(this.gcTimeout);
    this.gcTimeout = void 0;
  }
  optionalRemove() {
    if (!this.observers.length) {
      if (this.state.isFetching) {
        if (this.hadObservers) {
          this.scheduleGc();
        }
      } else {
        this.cache.remove(this);
      }
    }
  }
  setData(updater, options) {
    var _a, _b;
    const prevData = this.state.data;
    let data = functionalUpdate(updater, prevData);
    if ((_b = (_a = this.options).isDataEqual) === null || _b === void 0 ? void 0 : _b.call(_a, prevData, data)) {
      data = prevData;
    } else if (this.options.structuralSharing !== false) {
      data = replaceEqualDeep(prevData, data);
    }
    this.dispatch({
      data,
      type: "success",
      dataUpdatedAt: options === null || options === void 0 ? void 0 : options.updatedAt
    });
    return data;
  }
  setState(state, setStateOptions) {
    this.dispatch({ type: "setState", state, setStateOptions });
  }
  cancel(options) {
    var _a;
    const promise = this.promise;
    (_a = this.retryer) === null || _a === void 0 ? void 0 : _a.cancel(options);
    return promise ? promise.then(noop).catch(noop) : Promise.resolve();
  }
  destroy() {
    this.clearGcTimeout();
    this.cancel({ silent: true });
  }
  reset() {
    this.destroy();
    this.setState(this.initialState);
  }
  isActive() {
    return this.observers.some((observer) => observer.options.enabled !== false);
  }
  isFetching() {
    return this.state.isFetching;
  }
  isStale() {
    return this.state.isInvalidated || !this.state.dataUpdatedAt || this.observers.some((observer) => observer.getCurrentResult().isStale);
  }
  isStaleByTime(staleTime = 0) {
    return this.state.isInvalidated || !this.state.dataUpdatedAt || !timeUntilStale(this.state.dataUpdatedAt, staleTime);
  }
  onFocus() {
    var _a;
    const observer = this.observers.find((x) => x.shouldFetchOnWindowFocus());
    if (observer) {
      observer.refetch();
    }
    (_a = this.retryer) === null || _a === void 0 ? void 0 : _a.continue();
  }
  onOnline() {
    var _a;
    const observer = this.observers.find((x) => x.shouldFetchOnReconnect());
    if (observer) {
      observer.refetch();
    }
    (_a = this.retryer) === null || _a === void 0 ? void 0 : _a.continue();
  }
  addObserver(observer) {
    if (this.observers.indexOf(observer) === -1) {
      this.observers.push(observer);
      this.hadObservers = true;
      this.clearGcTimeout();
      this.cache.notify({ type: "observerAdded", query: this, observer });
    }
  }
  removeObserver(observer) {
    if (this.observers.indexOf(observer) !== -1) {
      this.observers = this.observers.filter((x) => x !== observer);
      if (!this.observers.length) {
        if (this.retryer) {
          if (this.retryer.isTransportCancelable || this.abortSignalConsumed) {
            this.retryer.cancel({ revert: true });
          } else {
            this.retryer.cancelRetry();
          }
        }
        if (this.cacheTime) {
          this.scheduleGc();
        } else {
          this.cache.remove(this);
        }
      }
      this.cache.notify({ type: "observerRemoved", query: this, observer });
    }
  }
  getObserversCount() {
    return this.observers.length;
  }
  invalidate() {
    if (!this.state.isInvalidated) {
      this.dispatch({ type: "invalidate" });
    }
  }
  fetch(options, fetchOptions) {
    var _a, _b, _c, _d, _e, _f;
    if (this.state.isFetching) {
      if (this.state.dataUpdatedAt && (fetchOptions === null || fetchOptions === void 0 ? void 0 : fetchOptions.cancelRefetch)) {
        this.cancel({ silent: true });
      } else if (this.promise) {
        (_a = this.retryer) === null || _a === void 0 ? void 0 : _a.continueRetry();
        return this.promise;
      }
    }
    if (options) {
      this.setOptions(options);
    }
    if (!this.options.queryFn) {
      const observer = this.observers.find((x) => x.options.queryFn);
      if (observer) {
        this.setOptions(observer.options);
      }
    }
    const queryKey = ensureQueryKeyArray(this.queryKey);
    const abortController = getAbortController();
    const queryFnContext = {
      queryKey,
      pageParam: void 0,
      meta: this.meta
    };
    Object.defineProperty(queryFnContext, "signal", {
      enumerable: true,
      get: () => {
        if (abortController) {
          this.abortSignalConsumed = true;
          return abortController.signal;
        }
        return void 0;
      }
    });
    const fetchFn = () => {
      if (!this.options.queryFn) {
        return Promise.reject("Missing queryFn");
      }
      this.abortSignalConsumed = false;
      return this.options.queryFn(queryFnContext);
    };
    const context = {
      fetchOptions,
      options: this.options,
      queryKey,
      state: this.state,
      fetchFn,
      meta: this.meta
    };
    if ((_b = this.options.behavior) === null || _b === void 0 ? void 0 : _b.onFetch) {
      (_c = this.options.behavior) === null || _c === void 0 ? void 0 : _c.onFetch(context);
    }
    this.revertState = this.state;
    if (!this.state.isFetching || this.state.fetchMeta !== ((_d = context.fetchOptions) === null || _d === void 0 ? void 0 : _d.meta)) {
      this.dispatch({ type: "fetch", meta: (_e = context.fetchOptions) === null || _e === void 0 ? void 0 : _e.meta });
    }
    this.retryer = new Retryer({
      fn: context.fetchFn,
      abort: (_f = abortController === null || abortController === void 0 ? void 0 : abortController.abort) === null || _f === void 0 ? void 0 : _f.bind(abortController),
      onSuccess: (data) => {
        var _a2, _b2;
        this.setData(data);
        (_b2 = (_a2 = this.cache.config).onSuccess) === null || _b2 === void 0 ? void 0 : _b2.call(_a2, data, this);
        if (this.cacheTime === 0) {
          this.optionalRemove();
        }
      },
      onError: (error) => {
        var _a2, _b2;
        if (!(isCancelledError(error) && error.silent)) {
          this.dispatch({
            type: "error",
            error
          });
        }
        if (!isCancelledError(error)) {
          (_b2 = (_a2 = this.cache.config).onError) === null || _b2 === void 0 ? void 0 : _b2.call(_a2, error, this);
          getLogger().error(error);
        }
        if (this.cacheTime === 0) {
          this.optionalRemove();
        }
      },
      onFail: () => {
        this.dispatch({ type: "failed" });
      },
      onPause: () => {
        this.dispatch({ type: "pause" });
      },
      onContinue: () => {
        this.dispatch({ type: "continue" });
      },
      retry: context.options.retry,
      retryDelay: context.options.retryDelay
    });
    this.promise = this.retryer.promise;
    return this.promise;
  }
  dispatch(action) {
    this.state = this.reducer(this.state, action);
    notifyManager.batch(() => {
      this.observers.forEach((observer) => {
        observer.onQueryUpdate(action);
      });
      this.cache.notify({ query: this, type: "queryUpdated", action });
    });
  }
  getDefaultState(options) {
    const data = typeof options.initialData === "function" ? options.initialData() : options.initialData;
    const hasInitialData = typeof options.initialData !== "undefined";
    const initialDataUpdatedAt = hasInitialData ? typeof options.initialDataUpdatedAt === "function" ? options.initialDataUpdatedAt() : options.initialDataUpdatedAt : 0;
    const hasData = typeof data !== "undefined";
    return {
      data,
      dataUpdateCount: 0,
      dataUpdatedAt: hasData ? initialDataUpdatedAt !== null && initialDataUpdatedAt !== void 0 ? initialDataUpdatedAt : Date.now() : 0,
      error: null,
      errorUpdateCount: 0,
      errorUpdatedAt: 0,
      fetchFailureCount: 0,
      fetchMeta: null,
      isFetching: false,
      isInvalidated: false,
      isPaused: false,
      status: hasData ? "success" : "idle"
    };
  }
  reducer(state, action) {
    var _a, _b;
    switch (action.type) {
      case "failed":
        return Object.assign(Object.assign({}, state), { fetchFailureCount: state.fetchFailureCount + 1 });
      case "pause":
        return Object.assign(Object.assign({}, state), { isPaused: true });
      case "continue":
        return Object.assign(Object.assign({}, state), { isPaused: false });
      case "fetch":
        return Object.assign(Object.assign(Object.assign({}, state), { fetchFailureCount: 0, fetchMeta: (_a = action.meta) !== null && _a !== void 0 ? _a : null, isFetching: true, isPaused: false }), !state.dataUpdatedAt && {
          error: null,
          status: "loading"
        });
      case "success":
        return Object.assign(Object.assign({}, state), { data: action.data, dataUpdateCount: state.dataUpdateCount + 1, dataUpdatedAt: (_b = action.dataUpdatedAt) !== null && _b !== void 0 ? _b : Date.now(), error: null, fetchFailureCount: 0, isFetching: false, isInvalidated: false, isPaused: false, status: "success" });
      case "error":
        const error = action.error;
        if (isCancelledError(error) && error.revert && this.revertState) {
          return Object.assign({}, this.revertState);
        }
        return Object.assign(Object.assign({}, state), { error, errorUpdateCount: state.errorUpdateCount + 1, errorUpdatedAt: Date.now(), fetchFailureCount: state.fetchFailureCount + 1, isFetching: false, isPaused: false, status: "error" });
      case "invalidate":
        return Object.assign(Object.assign({}, state), { isInvalidated: true });
      case "setState":
        return Object.assign(Object.assign({}, state), action.state);
      default:
        return state;
    }
  }
}
class QueryCache extends Subscribable {
  constructor(config) {
    super();
    this.config = config || {};
    this.queries = [];
    this.queriesMap = {};
  }
  build(client, options, state) {
    var _a;
    const queryKey = options.queryKey;
    const queryHash = (_a = options.queryHash) !== null && _a !== void 0 ? _a : hashQueryKeyByOptions(queryKey, options);
    let query = this.get(queryHash);
    if (!query) {
      query = new Query({
        cache: this,
        queryKey,
        queryHash,
        options: client.defaultQueryOptions(options),
        state,
        defaultOptions: client.getQueryDefaults(queryKey),
        meta: options.meta
      });
      this.add(query);
    }
    return query;
  }
  add(query) {
    if (!this.queriesMap[query.queryHash]) {
      this.queriesMap[query.queryHash] = query;
      this.queries.push(query);
      this.notify({
        type: "queryAdded",
        query
      });
    }
  }
  remove(query) {
    const queryInMap = this.queriesMap[query.queryHash];
    if (queryInMap) {
      query.destroy();
      this.queries = this.queries.filter((x) => x !== query);
      if (queryInMap === query) {
        delete this.queriesMap[query.queryHash];
      }
      this.notify({ type: "queryRemoved", query });
    }
  }
  clear() {
    notifyManager.batch(() => {
      this.queries.forEach((query) => {
        this.remove(query);
      });
    });
  }
  get(queryHash) {
    return this.queriesMap[queryHash];
  }
  getAll() {
    return this.queries;
  }
  find(arg1, arg2) {
    const [filters] = parseFilterArgs(arg1, arg2);
    if (typeof filters.exact === "undefined") {
      filters.exact = true;
    }
    return this.queries.find((query) => matchQuery(filters, query));
  }
  findAll(arg1, arg2) {
    const [filters] = parseFilterArgs(arg1, arg2);
    return Object.keys(filters).length > 0 ? this.queries.filter((query) => matchQuery(filters, query)) : this.queries;
  }
  notify(event) {
    notifyManager.batch(() => {
      this.listeners.forEach((listener) => {
        listener(event);
      });
    });
  }
  onFocus() {
    notifyManager.batch(() => {
      this.queries.forEach((query) => {
        query.onFocus();
      });
    });
  }
  onOnline() {
    notifyManager.batch(() => {
      this.queries.forEach((query) => {
        query.onOnline();
      });
    });
  }
}
class Mutation {
  constructor(config) {
    this.options = Object.assign(Object.assign({}, config.defaultOptions), config.options);
    this.mutationId = config.mutationId;
    this.mutationCache = config.mutationCache;
    this.observers = [];
    this.state = config.state || getDefaultState();
    this.meta = config.meta;
  }
  setState(state) {
    this.dispatch({ type: "setState", state });
  }
  addObserver(observer) {
    if (this.observers.indexOf(observer) === -1) {
      this.observers.push(observer);
    }
  }
  removeObserver(observer) {
    this.observers = this.observers.filter((x) => x !== observer);
  }
  cancel() {
    if (this.retryer) {
      this.retryer.cancel();
      return this.retryer.promise.then(noop).catch(noop);
    }
    return Promise.resolve();
  }
  continue() {
    if (this.retryer) {
      this.retryer.continue();
      return this.retryer.promise;
    }
    return this.execute();
  }
  execute() {
    let data;
    const restored = this.state.status === "loading";
    let promise = Promise.resolve();
    if (!restored) {
      this.dispatch({ type: "loading", variables: this.options.variables });
      promise = promise.then(() => {
        var _a, _b;
        (_b = (_a = this.mutationCache.config).onMutate) === null || _b === void 0 ? void 0 : _b.call(_a, this.state.variables, this);
      }).then(() => {
        var _a, _b;
        return (_b = (_a = this.options).onMutate) === null || _b === void 0 ? void 0 : _b.call(_a, this.state.variables);
      }).then((context) => {
        if (context !== this.state.context) {
          this.dispatch({
            type: "loading",
            context,
            variables: this.state.variables
          });
        }
      });
    }
    return promise.then(() => this.executeMutation()).then((result) => {
      var _a, _b;
      data = result;
      (_b = (_a = this.mutationCache.config).onSuccess) === null || _b === void 0 ? void 0 : _b.call(_a, data, this.state.variables, this.state.context, this);
    }).then(() => {
      var _a, _b;
      return (_b = (_a = this.options).onSuccess) === null || _b === void 0 ? void 0 : _b.call(_a, data, this.state.variables, this.state.context);
    }).then(() => {
      var _a, _b;
      return (_b = (_a = this.options).onSettled) === null || _b === void 0 ? void 0 : _b.call(_a, data, null, this.state.variables, this.state.context);
    }).then(() => {
      this.dispatch({ type: "success", data });
      return data;
    }).catch((error) => {
      var _a, _b;
      (_b = (_a = this.mutationCache.config).onError) === null || _b === void 0 ? void 0 : _b.call(_a, error, this.state.variables, this.state.context, this);
      getLogger().error(error);
      return Promise.resolve().then(() => {
        var _a2, _b2;
        return (_b2 = (_a2 = this.options).onError) === null || _b2 === void 0 ? void 0 : _b2.call(_a2, error, this.state.variables, this.state.context);
      }).then(() => {
        var _a2, _b2;
        return (_b2 = (_a2 = this.options).onSettled) === null || _b2 === void 0 ? void 0 : _b2.call(_a2, void 0, error, this.state.variables, this.state.context);
      }).then(() => {
        this.dispatch({ type: "error", error });
        throw error;
      });
    });
  }
  executeMutation() {
    var _a;
    this.retryer = new Retryer({
      fn: () => {
        if (!this.options.mutationFn) {
          return Promise.reject("No mutationFn found");
        }
        return this.options.mutationFn(this.state.variables);
      },
      onFail: () => {
        this.dispatch({ type: "failed" });
      },
      onPause: () => {
        this.dispatch({ type: "pause" });
      },
      onContinue: () => {
        this.dispatch({ type: "continue" });
      },
      retry: (_a = this.options.retry) !== null && _a !== void 0 ? _a : 0,
      retryDelay: this.options.retryDelay
    });
    return this.retryer.promise;
  }
  dispatch(action) {
    this.state = reducer(this.state, action);
    notifyManager.batch(() => {
      this.observers.forEach((observer) => {
        observer.onMutationUpdate(action);
      });
      this.mutationCache.notify(this);
    });
  }
}
function getDefaultState() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    isPaused: false,
    status: "idle",
    variables: void 0
  };
}
function reducer(state, action) {
  switch (action.type) {
    case "failed":
      return Object.assign(Object.assign({}, state), { failureCount: state.failureCount + 1 });
    case "pause":
      return Object.assign(Object.assign({}, state), { isPaused: true });
    case "continue":
      return Object.assign(Object.assign({}, state), { isPaused: false });
    case "loading":
      return Object.assign(Object.assign({}, state), { context: action.context, data: void 0, error: null, isPaused: false, status: "loading", variables: action.variables });
    case "success":
      return Object.assign(Object.assign({}, state), { data: action.data, error: null, status: "success", isPaused: false });
    case "error":
      return Object.assign(Object.assign({}, state), { data: void 0, error: action.error, failureCount: state.failureCount + 1, isPaused: false, status: "error" });
    case "setState":
      return Object.assign(Object.assign({}, state), action.state);
    default:
      return state;
  }
}
class MutationCache extends Subscribable {
  constructor(config) {
    super();
    this.config = config || {};
    this.mutations = [];
    this.mutationId = 0;
  }
  build(client, options, state) {
    const mutation = new Mutation({
      mutationCache: this,
      mutationId: ++this.mutationId,
      options: client.defaultMutationOptions(options),
      state,
      defaultOptions: options.mutationKey ? client.getMutationDefaults(options.mutationKey) : void 0,
      meta: options.meta
    });
    this.add(mutation);
    return mutation;
  }
  add(mutation) {
    this.mutations.push(mutation);
    this.notify(mutation);
  }
  remove(mutation) {
    this.mutations = this.mutations.filter((x) => x !== mutation);
    mutation.cancel();
    this.notify(mutation);
  }
  clear() {
    notifyManager.batch(() => {
      this.mutations.forEach((mutation) => {
        this.remove(mutation);
      });
    });
  }
  getAll() {
    return this.mutations;
  }
  find(filters) {
    if (typeof filters.exact === "undefined") {
      filters.exact = true;
    }
    return this.mutations.find((mutation) => matchMutation(filters, mutation));
  }
  findAll(filters) {
    return this.mutations.filter((mutation) => matchMutation(filters, mutation));
  }
  notify(mutation) {
    notifyManager.batch(() => {
      this.listeners.forEach((listener) => {
        listener(mutation);
      });
    });
  }
  onFocus() {
    this.resumePausedMutations();
  }
  onOnline() {
    this.resumePausedMutations();
  }
  resumePausedMutations() {
    const pausedMutations = this.mutations.filter((x) => x.state.isPaused);
    return notifyManager.batch(() => pausedMutations.reduce((promise, mutation) => promise.then(() => mutation.continue().catch(noop)), Promise.resolve()));
  }
}
function infiniteQueryBehavior() {
  return {
    onFetch: (context) => {
      context.fetchFn = () => {
        var _a, _b, _c, _d, _e, _f;
        const refetchPage = (_b = (_a = context.fetchOptions) === null || _a === void 0 ? void 0 : _a.meta) === null || _b === void 0 ? void 0 : _b.refetchPage;
        const fetchMore = (_d = (_c = context.fetchOptions) === null || _c === void 0 ? void 0 : _c.meta) === null || _d === void 0 ? void 0 : _d.fetchMore;
        const pageParam = fetchMore === null || fetchMore === void 0 ? void 0 : fetchMore.pageParam;
        const isFetchingNextPage = (fetchMore === null || fetchMore === void 0 ? void 0 : fetchMore.direction) === "forward";
        const isFetchingPreviousPage = (fetchMore === null || fetchMore === void 0 ? void 0 : fetchMore.direction) === "backward";
        const oldPages = ((_e = context.state.data) === null || _e === void 0 ? void 0 : _e.pages) || [];
        const oldPageParams = ((_f = context.state.data) === null || _f === void 0 ? void 0 : _f.pageParams) || [];
        const abortController = getAbortController();
        const abortSignal = abortController === null || abortController === void 0 ? void 0 : abortController.signal;
        let newPageParams = oldPageParams;
        let cancelled = false;
        const queryFn = context.options.queryFn || (() => Promise.reject("Missing queryFn"));
        const buildNewPages = (pages, param, page2, previous) => {
          newPageParams = previous ? [param, ...newPageParams] : [...newPageParams, param];
          return previous ? [page2, ...pages] : [...pages, page2];
        };
        const fetchPage = (pages, manual, param, previous) => {
          if (cancelled) {
            return Promise.reject("Cancelled");
          }
          if (typeof param === "undefined" && !manual && pages.length) {
            return Promise.resolve(pages);
          }
          const queryFnContext = {
            queryKey: context.queryKey,
            signal: abortSignal,
            pageParam: param,
            meta: context.meta
          };
          const queryFnResult = queryFn(queryFnContext);
          const promise2 = Promise.resolve(queryFnResult).then((page2) => buildNewPages(pages, param, page2, previous));
          if (isCancelable(queryFnResult)) {
            const promiseAsAny = promise2;
            promiseAsAny.cancel = queryFnResult.cancel;
          }
          return promise2;
        };
        let promise;
        if (!oldPages.length) {
          promise = fetchPage([]);
        } else if (isFetchingNextPage) {
          const manual = typeof pageParam !== "undefined";
          const param = manual ? pageParam : getNextPageParam(context.options, oldPages);
          promise = fetchPage(oldPages, manual, param);
        } else if (isFetchingPreviousPage) {
          const manual = typeof pageParam !== "undefined";
          const param = manual ? pageParam : getPreviousPageParam(context.options, oldPages);
          promise = fetchPage(oldPages, manual, param, true);
        } else {
          newPageParams = [];
          const manual = typeof context.options.getNextPageParam === "undefined";
          const shouldFetchFirstPage = refetchPage && oldPages[0] ? refetchPage(oldPages[0], 0, oldPages) : true;
          promise = shouldFetchFirstPage ? fetchPage([], manual, oldPageParams[0]) : Promise.resolve(buildNewPages([], oldPageParams[0], oldPages[0]));
          for (let i = 1; i < oldPages.length; i++) {
            promise = promise.then((pages) => {
              const shouldFetchNextPage = refetchPage && oldPages[i] ? refetchPage(oldPages[i], i, oldPages) : true;
              if (shouldFetchNextPage) {
                const param = manual ? oldPageParams[i] : getNextPageParam(context.options, pages);
                return fetchPage(pages, manual, param);
              }
              return Promise.resolve(buildNewPages(pages, oldPageParams[i], oldPages[i]));
            });
          }
        }
        const finalPromise = promise.then((pages) => ({
          pages,
          pageParams: newPageParams
        }));
        const finalPromiseAsAny = finalPromise;
        finalPromiseAsAny.cancel = () => {
          cancelled = true;
          abortController === null || abortController === void 0 ? void 0 : abortController.abort();
          if (isCancelable(promise)) {
            promise.cancel();
          }
        };
        return finalPromise;
      };
    }
  };
}
function getNextPageParam(options, pages) {
  var _a;
  return (_a = options.getNextPageParam) === null || _a === void 0 ? void 0 : _a.call(options, pages[pages.length - 1], pages);
}
function getPreviousPageParam(options, pages) {
  var _a;
  return (_a = options.getPreviousPageParam) === null || _a === void 0 ? void 0 : _a.call(options, pages[0], pages);
}
class QueryClient {
  constructor(config = {}) {
    this.queryCache = config.queryCache || new QueryCache();
    this.mutationCache = config.mutationCache || new MutationCache();
    this.defaultOptions = config.defaultOptions || {};
    this.queryDefaults = [];
    this.mutationDefaults = [];
  }
  mount() {
    this.unsubscribeFocus = focusManager.subscribe(() => {
      if (focusManager.isFocused() && onlineManager.isOnline()) {
        this.mutationCache.onFocus();
        this.queryCache.onFocus();
      }
    });
    this.unsubscribeOnline = onlineManager.subscribe(() => {
      if (focusManager.isFocused() && onlineManager.isOnline()) {
        this.mutationCache.onOnline();
        this.queryCache.onOnline();
      }
    });
  }
  unmount() {
    var _a, _b;
    (_a = this.unsubscribeFocus) === null || _a === void 0 ? void 0 : _a.call(this);
    (_b = this.unsubscribeOnline) === null || _b === void 0 ? void 0 : _b.call(this);
  }
  isFetching(arg1, arg2) {
    const [filters] = parseFilterArgs(arg1, arg2);
    filters.fetching = true;
    return this.queryCache.findAll(filters).length;
  }
  isMutating(filters) {
    return this.mutationCache.findAll(Object.assign(Object.assign({}, filters), { fetching: true })).length;
  }
  getQueryData(queryKey, filters) {
    var _a;
    return (_a = this.queryCache.find(queryKey, filters)) === null || _a === void 0 ? void 0 : _a.state.data;
  }
  getQueriesData(queryKeyOrFilters) {
    return this.getQueryCache().findAll(queryKeyOrFilters).map(({ queryKey, state }) => {
      const data = state.data;
      return [queryKey, data];
    });
  }
  setQueryData(queryKey, updater, options) {
    const parsedOptions = parseQueryArgs(queryKey);
    const defaultedOptions = this.defaultQueryOptions(parsedOptions);
    return this.queryCache.build(this, defaultedOptions).setData(updater, options);
  }
  setQueriesData(queryKeyOrFilters, updater, options) {
    return notifyManager.batch(() => this.getQueryCache().findAll(queryKeyOrFilters).map(({ queryKey }) => [
      queryKey,
      this.setQueryData(queryKey, updater, options)
    ]));
  }
  getQueryState(queryKey, filters) {
    var _a;
    return (_a = this.queryCache.find(queryKey, filters)) === null || _a === void 0 ? void 0 : _a.state;
  }
  removeQueries(arg1, arg2) {
    const [filters] = parseFilterArgs(arg1, arg2);
    const queryCache = this.queryCache;
    notifyManager.batch(() => {
      queryCache.findAll(filters).forEach((query) => {
        queryCache.remove(query);
      });
    });
  }
  resetQueries(arg1, arg2, arg3) {
    const [filters, options] = parseFilterArgs(arg1, arg2, arg3);
    const queryCache = this.queryCache;
    const refetchFilters = Object.assign(Object.assign({}, filters), { active: true });
    return notifyManager.batch(() => {
      queryCache.findAll(filters).forEach((query) => {
        query.reset();
      });
      return this.refetchQueries(refetchFilters, options);
    });
  }
  cancelQueries(arg1, arg2, arg3) {
    const [filters, cancelOptions = {}] = parseFilterArgs(arg1, arg2, arg3);
    if (typeof cancelOptions.revert === "undefined") {
      cancelOptions.revert = true;
    }
    const promises = notifyManager.batch(() => this.queryCache.findAll(filters).map((query) => query.cancel(cancelOptions)));
    return Promise.all(promises).then(noop).catch(noop);
  }
  invalidateQueries(arg1, arg2, arg3) {
    var _a, _b, _c;
    const [filters, options] = parseFilterArgs(arg1, arg2, arg3);
    const refetchFilters = Object.assign(Object.assign({}, filters), {
      active: (_b = (_a = filters.refetchActive) !== null && _a !== void 0 ? _a : filters.active) !== null && _b !== void 0 ? _b : true,
      inactive: (_c = filters.refetchInactive) !== null && _c !== void 0 ? _c : false
    });
    return notifyManager.batch(() => {
      this.queryCache.findAll(filters).forEach((query) => {
        query.invalidate();
      });
      return this.refetchQueries(refetchFilters, options);
    });
  }
  refetchQueries(arg1, arg2, arg3) {
    const [filters, options] = parseFilterArgs(arg1, arg2, arg3);
    const promises = notifyManager.batch(() => this.queryCache.findAll(filters).map((query) => query.fetch(void 0, Object.assign(Object.assign({}, options), { meta: { refetchPage: filters === null || filters === void 0 ? void 0 : filters.refetchPage } }))));
    let promise = Promise.all(promises).then(noop);
    if (!(options === null || options === void 0 ? void 0 : options.throwOnError)) {
      promise = promise.catch(noop);
    }
    return promise;
  }
  fetchQuery(arg1, arg2, arg3) {
    const parsedOptions = parseQueryArgs(arg1, arg2, arg3);
    const defaultedOptions = this.defaultQueryOptions(parsedOptions);
    if (typeof defaultedOptions.retry === "undefined") {
      defaultedOptions.retry = false;
    }
    const query = this.queryCache.build(this, defaultedOptions);
    return query.isStaleByTime(defaultedOptions.staleTime) ? query.fetch(defaultedOptions) : Promise.resolve(query.state.data);
  }
  prefetchQuery(arg1, arg2, arg3) {
    return this.fetchQuery(arg1, arg2, arg3).then(noop).catch(noop);
  }
  fetchInfiniteQuery(arg1, arg2, arg3) {
    const parsedOptions = parseQueryArgs(arg1, arg2, arg3);
    parsedOptions.behavior = infiniteQueryBehavior();
    return this.fetchQuery(parsedOptions);
  }
  prefetchInfiniteQuery(arg1, arg2, arg3) {
    return this.fetchInfiniteQuery(arg1, arg2, arg3).then(noop).catch(noop);
  }
  cancelMutations() {
    const promises = notifyManager.batch(() => this.mutationCache.getAll().map((mutation) => mutation.cancel()));
    return Promise.all(promises).then(noop).catch(noop);
  }
  resumePausedMutations() {
    return this.getMutationCache().resumePausedMutations();
  }
  executeMutation(options) {
    return this.mutationCache.build(this, options).execute();
  }
  getQueryCache() {
    return this.queryCache;
  }
  getMutationCache() {
    return this.mutationCache;
  }
  getDefaultOptions() {
    return this.defaultOptions;
  }
  setDefaultOptions(options) {
    this.defaultOptions = options;
  }
  setQueryDefaults(queryKey, options) {
    const result = this.queryDefaults.find((x) => hashQueryKey(queryKey) === hashQueryKey(x.queryKey));
    if (result) {
      result.defaultOptions = options;
    } else {
      this.queryDefaults.push({ queryKey, defaultOptions: options });
    }
  }
  getQueryDefaults(queryKey) {
    var _a;
    return queryKey ? (_a = this.queryDefaults.find((x) => partialMatchKey(queryKey, x.queryKey))) === null || _a === void 0 ? void 0 : _a.defaultOptions : void 0;
  }
  setMutationDefaults(mutationKey, options) {
    const result = this.mutationDefaults.find((x) => hashQueryKey(mutationKey) === hashQueryKey(x.mutationKey));
    if (result) {
      result.defaultOptions = options;
    } else {
      this.mutationDefaults.push({ mutationKey, defaultOptions: options });
    }
  }
  getMutationDefaults(mutationKey) {
    var _a;
    return mutationKey ? (_a = this.mutationDefaults.find((x) => partialMatchKey(mutationKey, x.mutationKey))) === null || _a === void 0 ? void 0 : _a.defaultOptions : void 0;
  }
  defaultQueryOptions(options) {
    if (options === null || options === void 0 ? void 0 : options._defaulted) {
      return options;
    }
    const defaultedOptions = Object.assign(Object.assign(Object.assign(Object.assign({}, this.defaultOptions.queries), this.getQueryDefaults(options === null || options === void 0 ? void 0 : options.queryKey)), options), { _defaulted: true });
    if (!defaultedOptions.queryHash && defaultedOptions.queryKey) {
      defaultedOptions.queryHash = hashQueryKeyByOptions(defaultedOptions.queryKey, defaultedOptions);
    }
    return defaultedOptions;
  }
  defaultQueryObserverOptions(options) {
    return this.defaultQueryOptions(options);
  }
  defaultMutationOptions(options) {
    if (options === null || options === void 0 ? void 0 : options._defaulted) {
      return options;
    }
    return Object.assign(Object.assign(Object.assign(Object.assign({}, this.defaultOptions.mutations), this.getMutationDefaults(options === null || options === void 0 ? void 0 : options.mutationKey)), options), { _defaulted: true });
  }
  clear() {
    this.queryCache.clear();
    this.mutationCache.clear();
  }
}
const QueryClientProvider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { queryCache = new QueryCache() } = $$props;
  let { mutationCache = new MutationCache() } = $$props;
  let { defaultOptions = {} } = $$props;
  let { client = new QueryClient({
    queryCache,
    mutationCache,
    defaultOptions
  }) } = $$props;
  setContext("queryClient", client);
  onDestroy(() => {
    client.unmount();
  });
  if ($$props.queryCache === void 0 && $$bindings.queryCache && queryCache !== void 0)
    $$bindings.queryCache(queryCache);
  if ($$props.mutationCache === void 0 && $$bindings.mutationCache && mutationCache !== void 0)
    $$bindings.mutationCache(mutationCache);
  if ($$props.defaultOptions === void 0 && $$bindings.defaultOptions && defaultOptions !== void 0)
    $$bindings.defaultOptions(defaultOptions);
  if ($$props.client === void 0 && $$bindings.client && client !== void 0)
    $$bindings.client(client);
  return `${slots.default ? slots.default({}) : ``}`;
});
const QueryClientProvider$1 = QueryClientProvider;
const css = {
  code: ".app.svelte-192hxck{display:flex;flex-direction:column;min-height:100vh}main.svelte-192hxck{flex:1;display:flex;flex-direction:column;max-width:70rem;width:calc(100% - 2rem);margin:0 auto;box-sizing:border-box;padding-top:8rem}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const queryClient = new QueryClient();
  $$result.css.add(css);
  return `${validate_component(QueryClientProvider$1, "QueryClientProvider").$$render($$result, { client: queryClient }, {}, {
    default: () => {
      return `${validate_component(SvelteToast, "SvelteToast").$$render($$result, {}, {}, {})}

	<div class="${"app svelte-192hxck"}">${validate_component(Header, "Header").$$render($$result, {}, {}, {})}

		<main class="${"svelte-192hxck"}">${slots.default ? slots.default({}) : ``}</main>

		${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div>`;
    }
  })}`;
});

export { Layout as default };
//# sourceMappingURL=_layout.svelte-17236b76.js.map
