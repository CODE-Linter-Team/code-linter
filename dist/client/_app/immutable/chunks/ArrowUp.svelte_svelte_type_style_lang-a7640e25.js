import{S as C,i as P,s as D,k as m,l as B,m as k,h as c,n as w,p as r,b as S,B as u,a6 as A,H as g}from"./index-f19977a0.js";const v={"--toastBackground":"var(--vscode-layer2)","--toastColor":"var(--vscode-text)","--toastBorderRadius":"6px","--toastBoxShadow":"0 0 16px 0 rgba(0, 0, 0, 0.2)","--toastPadding":"0 0.5rem"},F={success:{...v,"--toastBarBackground":"var(--success)"},neutral:{...v,"--toastBarBackground":"var(--neutral)"},error:{...v,"--toastBarBackground":"var(--error)"}};const h=/[a-zA-Z]/,f=(n,e=0)=>[...Array(n).keys()].map(t=>t+e);function d(n,e,t){const s=n.slice();return s[7]=e[t],s}function p(n){let e;return{c(){e=m("div"),this.h()},l(t){e=B(t,"DIV",{class:!0,style:!0}),k(e).forEach(c),this.h()},h(){w(e,"class","cube svelte-1w8rpx6"),r(e,"animation-delay",n[7]*(+n[6]/10)+n[5]),r(e,"left",n[7]*(+n[3]/3+ +n[3]/15)+n[1]),g(e,"pause-animation",n[4])},m(t,s){S(t,e,s)},p(t,s){s&10&&r(e,"left",t[7]*(+t[3]/3+ +t[3]/15)+t[1]),s&16&&g(e,"pause-animation",t[4])},d(t){t&&c(e)}}}function L(n){let e,t=f(3,0),s=[];for(let l=0;l<t.length;l+=1)s[l]=p(d(n,t,l));return{c(){e=m("div");for(let l=0;l<s.length;l+=1)s[l].c();this.h()},l(l){e=B(l,"DIV",{class:!0,style:!0});var a=k(e);for(let _=0;_<s.length;_+=1)s[_].l(a);a.forEach(c),this.h()},h(){w(e,"class","wrapper svelte-1w8rpx6"),r(e,"--size",n[3]+n[1]),r(e,"--color",n[0]),r(e,"--duration",n[2])},m(l,a){S(l,e,a);for(let _=0;_<s.length;_+=1)s[_].m(e,null)},p(l,[a]){if(a&122){t=f(3,0);let _;for(_=0;_<t.length;_+=1){const i=d(l,t,_);s[_]?s[_].p(i,a):(s[_]=p(i),s[_].c(),s[_].m(e,null))}for(;_<s.length;_+=1)s[_].d(1);s.length=t.length}a&10&&r(e,"--size",l[3]+l[1]),a&1&&r(e,"--color",l[0]),a&4&&r(e,"--duration",l[2])},i:u,o:u,d(l){l&&c(e),A(s,l)}}}function R(n,e,t){var y;let{color:s="#FF3E00"}=e,{unit:l="px"}=e,{duration:a="1.5s"}=e,{size:_="60"}=e,{pause:i=!1}=e,b=((y=a.match(h))==null?void 0:y[0])??"s",z=a.replace(h,"");return n.$$set=o=>{"color"in o&&t(0,s=o.color),"unit"in o&&t(1,l=o.unit),"duration"in o&&t(2,a=o.duration),"size"in o&&t(3,_=o.size),"pause"in o&&t(4,i=o.pause)},[s,l,a,_,i,b,z]}class T extends C{constructor(e){super(),P(this,e,R,L,D,{color:0,unit:1,duration:2,size:3,pause:4})}}export{T as P,F as T};
