function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{};var r,n={save:(e,t)=>{try{const r=JSON.stringify(t);localStorage.setItem(e,r)}catch(e){console.error("Set state error: ",e.message)}},load:e=>{try{const t=localStorage.getItem(e);return null===t?void 0:JSON.parse(t)}catch(e){console.error("Get state error: ",e.message)}},remove:e=>{try{return localStorage.removeItem(e)}catch(e){console.error("Get state error: ",e.message)}}},o="Expected a function",i=NaN,a="[object Symbol]",f=/^\s+|\s+$/g,u=/^[-+]0x[0-9a-f]+$/i,c=/^0b[01]+$/i,l=/^0o[0-7]+$/i,s=parseInt,d="object"==typeof t&&t&&t.Object===Object&&t,v="object"==typeof self&&self&&self.Object===Object&&self,m=d||v||Function("return this")(),g=Object.prototype.toString,p=Math.max,y=Math.min,b=function(){return m.Date.now()};function h(e,t,r){var n,i,a,f,u,c,l=0,s=!1,d=!1,v=!0;if("function"!=typeof e)throw new TypeError(o);function m(t){var r=n,o=i;return n=i=void 0,l=t,f=e.apply(o,r)}function g(e){var r=e-c;return void 0===c||r>=t||r<0||d&&e-l>=a}function h(){var e=b();if(g(e))return w(e);u=setTimeout(h,function(e){var r=t-(e-c);return d?y(r,a-(e-l)):r}(e))}function w(e){return u=void 0,v&&n?m(e):(n=i=void 0,f)}function O(){var e=b(),r=g(e);if(n=arguments,i=this,c=e,r){if(void 0===u)return function(e){return l=e,u=setTimeout(h,t),s?m(e):f}(c);if(d)return u=setTimeout(h,t),m(c)}return void 0===u&&(u=setTimeout(h,t)),f}return t=T(t)||0,j(r)&&(s=!!r.leading,a=(d="maxWait"in r)?p(T(r.maxWait)||0,t):a,v="trailing"in r?!!r.trailing:v),O.cancel=function(){void 0!==u&&clearTimeout(u),l=0,n=c=i=u=void 0},O.flush=function(){return void 0===u?f:w(b())},O}function j(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function T(e){if("number"==typeof e)return e;if(function(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&g.call(e)==a}(e))return i;if(j(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=j(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(f,"");var r=c.test(e);return r||l.test(e)?s(e.slice(2),r?2:8):u.test(e)?i:+e}r=function(e,t,r){var n=!0,i=!0;if("function"!=typeof e)throw new TypeError(o);return j(r)&&(n="leading"in r?!!r.leading:n,i="trailing"in r?!!r.trailing:i),h(e,t,{leading:n,maxWait:t,trailing:i})};const w={form:document.querySelector(".feedback-form")},O="feedback-form-state",S=n.load(O)||{};if(S!=={})for(let e in S)w.form[e].value=S[e];w.form.addEventListener("input",e(r)((function(e){let t={...n.load(O),[e.target.name]:e.target.value};n.save(O,t)}),500)),w.form.addEventListener("submit",(function(e){e.preventDefault();let t=new FormData(e.currentTarget),r={};t.forEach(((e,t)=>{r[t]=e})),console.log("objFormData: ",r),n.remove(O),e.currentTarget.reset(),t={}}));
//# sourceMappingURL=03-feedback.60005db9.js.map