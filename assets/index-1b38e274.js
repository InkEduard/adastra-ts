const h="modulepreload",v=function(e,i){return new URL(e,i).href},f={},u=function(i,o,a){if(!o||o.length===0)return i();const m=document.getElementsByTagName("link");return Promise.all(o.map(t=>{if(t=v(t,a),t in f)return;f[t]=!0;const r=t.endsWith(".css"),_=r?'[rel="stylesheet"]':"";if(!!a)for(let s=m.length-1;s>=0;s--){const l=m[s];if(l.href===t&&(!r||l.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${t}"]${_}`))return;const n=document.createElement("link");if(n.rel=r?"stylesheet":h,r||(n.as="script",n.crossOrigin=""),n.href=t,document.head.appendChild(n),r)return new Promise((s,l)=>{n.addEventListener("load",s),n.addEventListener("error",()=>l(new Error(`Unable to preload CSS for ${t}`)))})})).then(()=>i()).catch(t=>{const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=t,window.dispatchEvent(r),!r.defaultPrevented)throw t})};var c=(e=>(e.Touchstart="touchstart",e.Mousedown="mousedown",e.Mousemove="mousemove",e.Keydown="keydown",e.Scroll="scroll",e))(c||{});const w=async()=>{const{default:e}=await u(()=>import("./module.esm-0217f008.js"),[],import.meta.url);if(document.querySelector('[x-data*="menu"]')){const{default:o}=await u(()=>import("./index-805a5ec0.js"),[],import.meta.url);e.plugin(o)}const{default:i}=await u(()=>import("./index-2b0f18ee.js"),[],import.meta.url);if(e.plugin(i),document.querySelector('[x-data*="swiper"]')){const{default:o}=await u(()=>import("./index-f63d6a75.js").then(a=>a.t),["./index-f63d6a75.js","./index-816446ca.css"],import.meta.url);e.plugin(o)}e.start(),window.Alpine=e},p=setTimeout(()=>{d()},800),d=()=>{clearTimeout(p),Object.values(c).forEach(e=>document.removeEventListener(e,d,{capture:!0})),w()},E=e=>{document.addEventListener(e,d,{capture:!0})};Object.values(c).forEach(e=>{E(e)});export{u as _};