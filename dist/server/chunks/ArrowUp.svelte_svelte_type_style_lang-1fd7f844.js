import { c as create_ssr_component, d as escape, e as each } from './index2-af991d7a.js';

const durationUnitRegex = /[a-zA-Z]/;
const range = (size, startAt = 0) => [...Array(size).keys()].map((i) => i + startAt);
const css = {
  code: ".wrapper.svelte-1w8rpx6{position:relative;display:flex;justify-content:center;align-items:center;width:var(--size);height:calc(var(--size) / 2.5)}.cube.svelte-1w8rpx6{position:absolute;top:0px;width:calc(var(--size) / 5);height:calc(var(--size) / 2.5);background-color:var(--color);animation:svelte-1w8rpx6-motion var(--duration) cubic-bezier(0.895, 0.03, 0.685, 0.22) infinite}.pause-animation.svelte-1w8rpx6{animation-play-state:paused}@keyframes svelte-1w8rpx6-motion{0%{opacity:1}50%{opacity:0}100%{opacity:1}}",
  map: null
};
const Pulse = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { color = "#FF3E00" } = $$props;
  let { unit = "px" } = $$props;
  let { duration = "1.5s" } = $$props;
  let { size = "60" } = $$props;
  let { pause = false } = $$props;
  let durationUnit = duration.match(durationUnitRegex)?.[0] ?? "s";
  let durationNum = duration.replace(durationUnitRegex, "");
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.unit === void 0 && $$bindings.unit && unit !== void 0)
    $$bindings.unit(unit);
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0)
    $$bindings.duration(duration);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.pause === void 0 && $$bindings.pause && pause !== void 0)
    $$bindings.pause(pause);
  $$result.css.add(css);
  return `<div class="${"wrapper svelte-1w8rpx6"}" style="${"--size: " + escape(size, true) + escape(unit, true) + "; --color: " + escape(color, true) + "; --duration: " + escape(duration, true)}">${each(range(3, 0), (version) => {
    return `<div class="${["cube svelte-1w8rpx6", pause ? "pause-animation" : ""].join(" ").trim()}" style="${"animation-delay: " + escape(version * (+durationNum / 10), true) + escape(durationUnit, true) + "; left: " + escape(version * (+size / 3 + +size / 15) + unit, true) + ";"}"></div>`;
  })}
</div>`;
});

export { Pulse as P };
//# sourceMappingURL=ArrowUp.svelte_svelte_type_style_lang-1fd7f844.js.map
