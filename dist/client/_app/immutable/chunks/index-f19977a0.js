function w(){}const U=t=>t;function vt(t,e){for(const n in e)t[n]=e[n];return t}function ct(t){return t()}function nt(){return Object.create(null)}function N(t){t.forEach(ct)}function W(t){return typeof t=="function"}function Ut(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let B;function Vt(t,e){return B||(B=document.createElement("a")),B.href=e,t===B.href}function Xt(t,e){return t!=t?e==e:t!==e}function Et(t){return Object.keys(t).length===0}function kt(t,...e){if(t==null)return w;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function Yt(t,e,n){t.$$.on_destroy.push(kt(e,n))}function Zt(t,e,n,s){if(t){const i=lt(t,e,n,s);return t[0](i)}}function lt(t,e,n,s){return t[1]&&s?vt(n.ctx.slice(),t[1](s(e))):n.ctx}function te(t,e,n,s){if(t[2]&&s){const i=t[2](s(n));if(e.dirty===void 0)return i;if(typeof i=="object"){const o=[],r=Math.max(e.dirty.length,i.length);for(let l=0;l<r;l+=1)o[l]=e.dirty[l]|i[l];return o}return e.dirty|i}return e.dirty}function ee(t,e,n,s,i,o){if(i){const r=lt(e,n,s,o);t.p(r,i)}}function ne(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let s=0;s<n;s++)e[s]=-1;return e}return-1}function ie(t){return t??""}const at=typeof window<"u";let V=at?()=>window.performance.now():()=>Date.now(),X=at?t=>requestAnimationFrame(t):w;const k=new Set;function ut(t){k.forEach(e=>{e.c(t)||(k.delete(e),e.f())}),k.size!==0&&X(ut)}function Y(t){let e;return k.size===0&&X(ut),{promise:new Promise(n=>{k.add(e={c:t,f:n})}),abort(){k.delete(e)}}}let I=!1;function Nt(){I=!0}function Ct(){I=!1}function At(t,e,n,s){for(;t<e;){const i=t+(e-t>>1);n(i)<=s?t=i+1:e=i}return t}function Tt(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const c=[];for(let a=0;a<e.length;a++){const f=e[a];f.claim_order!==void 0&&c.push(f)}e=c}const n=new Int32Array(e.length+1),s=new Int32Array(e.length);n[0]=-1;let i=0;for(let c=0;c<e.length;c++){const a=e[c].claim_order,f=(i>0&&e[n[i]].claim_order<=a?i+1:At(1,i,_=>e[n[_]].claim_order,a))-1;s[c]=n[f]+1;const u=f+1;n[u]=c,i=Math.max(u,i)}const o=[],r=[];let l=e.length-1;for(let c=n[i]+1;c!=0;c=s[c-1]){for(o.push(e[c-1]);l>=c;l--)r.push(e[l]);l--}for(;l>=0;l--)r.push(e[l]);o.reverse(),r.sort((c,a)=>c.claim_order-a.claim_order);for(let c=0,a=0;c<r.length;c++){for(;a<o.length&&r[c].claim_order>=o[a].claim_order;)a++;const f=a<o.length?o[a]:null;t.insertBefore(r[c],f)}}function St(t,e){t.appendChild(e)}function ft(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function Mt(t){const e=Z("style");return jt(ft(t),e),e.sheet}function jt(t,e){return St(t.head||t,e),e.sheet}function Dt(t,e){if(I){for(Tt(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function Ht(t,e,n){t.insertBefore(e,n||null)}function Rt(t,e,n){I&&!n?Dt(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function j(t){t.parentNode&&t.parentNode.removeChild(t)}function se(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function Z(t){return document.createElement(t)}function _t(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function tt(t){return document.createTextNode(t)}function re(){return tt(" ")}function oe(){return tt("")}function ce(t,e,n,s){return t.addEventListener(e,n,s),()=>t.removeEventListener(e,n,s)}function le(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function Bt(t){return Array.from(t.childNodes)}function dt(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function ht(t,e,n,s,i=!1){dt(t);const o=(()=>{for(let r=t.claim_info.last_index;r<t.length;r++){const l=t[r];if(e(l)){const c=n(l);return c===void 0?t.splice(r,1):t[r]=c,i||(t.claim_info.last_index=r),l}}for(let r=t.claim_info.last_index-1;r>=0;r--){const l=t[r];if(e(l)){const c=n(l);return c===void 0?t.splice(r,1):t[r]=c,i?c===void 0&&t.claim_info.last_index--:t.claim_info.last_index=r,l}}return s()})();return o.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,o}function mt(t,e,n,s){return ht(t,i=>i.nodeName===e,i=>{const o=[];for(let r=0;r<i.attributes.length;r++){const l=i.attributes[r];n[l.name]||o.push(l.name)}o.forEach(r=>i.removeAttribute(r))},()=>s(e))}function ae(t,e,n){return mt(t,e,n,Z)}function ue(t,e,n){return mt(t,e,n,_t)}function Lt(t,e){return ht(t,n=>n.nodeType===3,n=>{const s=""+e;if(n.data.startsWith(s)){if(n.data.length!==s.length)return n.splitText(s.length)}else n.data=s},()=>tt(e),!0)}function fe(t){return Lt(t," ")}function it(t,e,n){for(let s=n;s<t.length;s+=1){const i=t[s];if(i.nodeType===8&&i.textContent.trim()===e)return s}return t.length}function _e(t,e){const n=it(t,"HTML_TAG_START",0),s=it(t,"HTML_TAG_END",n);if(n===s)return new st(void 0,e);dt(t);const i=t.splice(n,s-n+1);j(i[0]),j(i[i.length-1]);const o=i.slice(1,i.length-1);for(const r of o)r.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new st(o,e)}function de(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function he(t,e){t.value=e??""}function me(t,e,n,s){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,s?"important":"")}function pe(t,e,n){t.classList[n?"add":"remove"](e)}function pt(t,e,{bubbles:n=!1,cancelable:s=!1}={}){const i=document.createEvent("CustomEvent");return i.initCustomEvent(t,n,s,e),i}function ye(t,e){const n=[];let s=0;for(const i of e.childNodes)if(i.nodeType===8){const o=i.textContent.trim();o===`HEAD_${t}_END`?(s-=1,n.push(i)):o===`HEAD_${t}_START`&&(s+=1,n.push(i))}else s>0&&n.push(i);return n}class Pt{constructor(e=!1){this.is_svg=!1,this.is_svg=e,this.e=this.n=null}c(e){this.h(e)}m(e,n,s=null){this.e||(this.is_svg?this.e=_t(n.nodeName):this.e=Z(n.nodeName),this.t=n,this.c(e)),this.i(s)}h(e){this.e.innerHTML=e,this.n=Array.from(this.e.childNodes)}i(e){for(let n=0;n<this.n.length;n+=1)Ht(this.t,this.n[n],e)}p(e){this.d(),this.h(e),this.i(this.a)}d(){this.n.forEach(j)}}class st extends Pt{constructor(e,n=!1){super(n),this.e=this.n=null,this.l=e}c(e){this.l?this.n=this.l:super.c(e)}i(e){for(let n=0;n<this.n.length;n+=1)Rt(this.t,this.n[n],e)}}function ge(t,e){return new t(e)}const O=new Map;let z=0;function qt(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function Ot(t,e){const n={stylesheet:Mt(e),rules:{}};return O.set(t,n),n}function et(t,e,n,s,i,o,r,l=0){const c=16.666/s;let a=`{
`;for(let m=0;m<=1;m+=c){const y=e+(n-e)*o(m);a+=m*100+`%{${r(y,1-y)}}
`}const f=a+`100% {${r(n,1-n)}}
}`,u=`__svelte_${qt(f)}_${l}`,_=ft(t),{stylesheet:d,rules:h}=O.get(_)||Ot(_,t);h[u]||(h[u]=!0,d.insertRule(`@keyframes ${u} ${f}`,d.cssRules.length));const g=t.style.animation||"";return t.style.animation=`${g?`${g}, `:""}${u} ${s}ms linear ${i}ms 1 both`,z+=1,u}function F(t,e){const n=(t.style.animation||"").split(", "),s=n.filter(e?o=>o.indexOf(e)<0:o=>o.indexOf("__svelte")===-1),i=n.length-s.length;i&&(t.style.animation=s.join(", "),z-=i,z||zt())}function zt(){X(()=>{z||(O.forEach(t=>{const{ownerNode:e}=t.stylesheet;e&&j(e)}),O.clear())})}function xe(t,e,n,s){if(!e)return w;const i=t.getBoundingClientRect();if(e.left===i.left&&e.right===i.right&&e.top===i.top&&e.bottom===i.bottom)return w;const{delay:o=0,duration:r=300,easing:l=U,start:c=V()+o,end:a=c+r,tick:f=w,css:u}=n(t,{from:e,to:i},s);let _=!0,d=!1,h;function g(){u&&(h=et(t,0,1,r,o,l,u)),o||(d=!0)}function m(){u&&F(t,h),_=!1}return Y(y=>{if(!d&&y>=c&&(d=!0),d&&y>=a&&(f(1,0),m()),!_)return!1;if(d){const E=y-c,b=0+1*l(E/r);f(b,1-b)}return!0}),g(),f(0,1),m}function $e(t){const e=getComputedStyle(t);if(e.position!=="absolute"&&e.position!=="fixed"){const{width:n,height:s}=e,i=t.getBoundingClientRect();t.style.position="absolute",t.style.width=n,t.style.height=s,Ft(t,i)}}function Ft(t,e){const n=t.getBoundingClientRect();if(e.left!==n.left||e.top!==n.top){const s=getComputedStyle(t),i=s.transform==="none"?"":s.transform;t.style.transform=`${i} translate(${e.left-n.left}px, ${e.top-n.top}px)`}}let D;function M(t){D=t}function C(){if(!D)throw new Error("Function called outside component initialization");return D}function we(t){C().$$.on_mount.push(t)}function be(t){C().$$.after_update.push(t)}function ve(t){C().$$.on_destroy.push(t)}function Ee(){const t=C();return(e,n,{cancelable:s=!1}={})=>{const i=t.$$.callbacks[e];if(i){const o=pt(e,n,{cancelable:s});return i.slice().forEach(r=>{r.call(t,o)}),!o.defaultPrevented}return!0}}function ke(t,e){return C().$$.context.set(t,e),e}function Ne(t){return C().$$.context.get(t)}const S=[],rt=[],P=[],ot=[],yt=Promise.resolve();let Q=!1;function gt(){Q||(Q=!0,yt.then(xt))}function Ce(){return gt(),yt}function H(t){P.push(t)}const K=new Set;let L=0;function xt(){const t=D;do{for(;L<S.length;){const e=S[L];L++,M(e),Gt(e.$$)}for(M(null),S.length=0,L=0;rt.length;)rt.pop()();for(let e=0;e<P.length;e+=1){const n=P[e];K.has(n)||(K.add(n),n())}P.length=0}while(S.length);for(;ot.length;)ot.pop()();Q=!1,K.clear(),M(t)}function Gt(t){if(t.fragment!==null){t.update(),N(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(H)}}let T;function $t(){return T||(T=Promise.resolve(),T.then(()=>{T=null})),T}function G(t,e,n){t.dispatchEvent(pt(`${e?"intro":"outro"}${n}`))}const q=new Set;let v;function Ae(){v={r:0,c:[],p:v}}function Te(){v.r||N(v.c),v=v.p}function wt(t,e){t&&t.i&&(q.delete(t),t.i(e))}function Wt(t,e,n,s){if(t&&t.o){if(q.has(t))return;q.add(t),v.c.push(()=>{q.delete(t),s&&(n&&t.d(1),s())}),t.o(e)}else s&&s()}const bt={duration:0};function Se(t,e,n){const s={direction:"in"};let i=e(t,n,s),o=!1,r,l,c=0;function a(){r&&F(t,r)}function f(){const{delay:_=0,duration:d=300,easing:h=U,tick:g=w,css:m}=i||bt;m&&(r=et(t,0,1,d,_,h,m,c++)),g(0,1);const y=V()+_,E=y+d;l&&l.abort(),o=!0,H(()=>G(t,!0,"start")),l=Y(b=>{if(o){if(b>=E)return g(1,0),G(t,!0,"end"),a(),o=!1;if(b>=y){const A=h((b-y)/d);g(A,1-A)}}return o})}let u=!1;return{start(){u||(u=!0,F(t),W(i)?(i=i(s),$t().then(f)):f())},invalidate(){u=!1},end(){o&&(a(),o=!1)}}}function Me(t,e,n){const s={direction:"out"};let i=e(t,n,s),o=!0,r;const l=v;l.r+=1;function c(){const{delay:a=0,duration:f=300,easing:u=U,tick:_=w,css:d}=i||bt;d&&(r=et(t,1,0,f,a,u,d));const h=V()+a,g=h+f;H(()=>G(t,!1,"start")),Y(m=>{if(o){if(m>=g)return _(0,1),G(t,!1,"end"),--l.r||N(l.c),!1;if(m>=h){const y=u((m-h)/f);_(1-y,y)}}return o})}return W(i)?$t().then(()=>{i=i(s),c()}):c(),{end(a){a&&i.tick&&i.tick(1,0),o&&(r&&F(t,r),o=!1)}}}function It(t,e){Wt(t,1,1,()=>{e.delete(t.key)})}function je(t,e){t.f(),It(t,e)}function De(t,e,n,s,i,o,r,l,c,a,f,u){let _=t.length,d=o.length,h=_;const g={};for(;h--;)g[t[h].key]=h;const m=[],y=new Map,E=new Map;for(h=d;h--;){const p=u(i,o,h),x=n(p);let $=r.get(x);$?s&&$.p(p,e):($=a(x,p),$.c()),y.set(x,m[h]=$),x in g&&E.set(x,Math.abs(h-g[x]))}const b=new Set,A=new Set;function J(p){wt(p,1),p.m(l,f),r.set(p.key,p),f=p.first,d--}for(;_&&d;){const p=m[d-1],x=t[_-1],$=p.key,R=x.key;p===x?(f=p.first,_--,d--):y.has(R)?!r.has($)||b.has($)?J(p):A.has(R)?_--:E.get($)>E.get(R)?(A.add($),J(p)):(b.add(R),_--):(c(x,r),_--)}for(;_--;){const p=t[_];y.has(p.key)||c(p,r)}for(;d;)J(m[d-1]);return m}function He(t,e){const n={},s={},i={$$scope:1};let o=t.length;for(;o--;){const r=t[o],l=e[o];if(l){for(const c in r)c in l||(s[c]=1);for(const c in l)i[c]||(n[c]=l[c],i[c]=1);t[o]=l}else for(const c in r)i[c]=1}for(const r in s)r in n||(n[r]=void 0);return n}function Re(t){return typeof t=="object"&&t!==null?t:{}}function Be(t){t&&t.c()}function Le(t,e){t&&t.l(e)}function Jt(t,e,n,s){const{fragment:i,after_update:o}=t.$$;i&&i.m(e,n),s||H(()=>{const r=t.$$.on_mount.map(ct).filter(W);t.$$.on_destroy?t.$$.on_destroy.push(...r):N(r),t.$$.on_mount=[]}),o.forEach(H)}function Kt(t,e){const n=t.$$;n.fragment!==null&&(N(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Qt(t,e){t.$$.dirty[0]===-1&&(S.push(t),gt(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Pe(t,e,n,s,i,o,r,l=[-1]){const c=D;M(t);const a=t.$$={fragment:null,ctx:[],props:o,update:w,not_equal:i,bound:nt(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(c?c.$$.context:[])),callbacks:nt(),dirty:l,skip_bound:!1,root:e.target||c.$$.root};r&&r(a.root);let f=!1;if(a.ctx=n?n(t,e.props||{},(u,_,...d)=>{const h=d.length?d[0]:_;return a.ctx&&i(a.ctx[u],a.ctx[u]=h)&&(!a.skip_bound&&a.bound[u]&&a.bound[u](h),f&&Qt(t,u)),_}):[],a.update(),f=!0,N(a.before_update),a.fragment=s?s(a.ctx):!1,e.target){if(e.hydrate){Nt();const u=Bt(e.target);a.fragment&&a.fragment.l(u),u.forEach(j)}else a.fragment&&a.fragment.c();e.intro&&wt(t.$$.fragment),Jt(t,e.target,e.anchor,e.customElement),Ct(),xt()}M(c)}class qe{$destroy(){Kt(this,1),this.$destroy=w}$on(e,n){if(!W(n))return w;const s=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return s.push(n),()=>{const i=s.indexOf(n);i!==-1&&s.splice(i,1)}}$set(e){this.$$set&&!Et(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{_t as $,Ce as A,w as B,U as C,W as D,vt as E,V as F,Y as G,pe as H,Dt as I,ce as J,N as K,Yt as L,ve as M,st as N,_e as O,He as P,Re as Q,De as R,qe as S,ie as T,$e as U,Ft as V,xe as W,H as X,Se as Y,Me as Z,je as _,re as a,ue as a0,Zt as a1,ee as a2,ne as a3,te as a4,ke as a5,se as a6,Vt as a7,ye as a8,Ne as a9,kt as aa,Xt as ab,Ee as ac,rt as ad,he as ae,Rt as b,fe as c,Te as d,oe as e,wt as f,Ae as g,j as h,Pe as i,be as j,Z as k,ae as l,Bt as m,le as n,we as o,me as p,tt as q,Lt as r,Ut as s,Wt as t,de as u,ge as v,Be as w,Le as x,Jt as y,Kt as z};