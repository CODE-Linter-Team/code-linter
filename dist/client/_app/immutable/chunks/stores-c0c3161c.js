import{w as f}from"./index-27d11f01.js";const p={duration:4e3,initial:1,next:0,pausable:!1,dismissable:!0,reversed:!1,intro:{x:256}},d=()=>{const{subscribe:l,update:o}=f([]);let u=0;const c={},i=t=>t instanceof Object;return{subscribe:l,push:(t,s={})=>{const r={target:"default",...i(t)?t:{...s,msg:t}},e=c[r.target]||{},a={...p,...e,...r,theme:{...e.theme,...r.theme},classes:[...e.classes||[],...r.classes||[]],id:++u};return o(n=>a.reversed?[...n,a]:[a,...n]),u},pop:t=>{o(s=>{if(!s.length||t===0)return[];if(i(t))return s.filter(e=>t(e));const r=t||Math.max(...s.map(e=>e.id));return s.filter(e=>e.id!==r)})},set:(t,s={})=>{const r=i(t)?{...t}:{...s,id:t};o(e=>{const a=e.findIndex(n=>n.id===r.id);return a>-1&&(e[a]={...e[a],...r}),e})},_init:(t="default",s={})=>(c[t]=s,c)}},g=d();export{g as t};
