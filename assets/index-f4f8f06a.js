const _="modulepreload",v=function(e,o){return new URL(e,o).href},f={},a=function(o,i,d){if(!i||i.length===0)return o();const m=document.getElementsByTagName("link");return Promise.all(i.map(t=>{if(t=v(t,d),t in f)return;f[t]=!0;const n=t.endsWith(".css"),h=n?'[rel="stylesheet"]':"";if(!!d)for(let s=m.length-1;s>=0;s--){const l=m[s];if(l.href===t&&(!n||l.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${t}"]${h}`))return;const r=document.createElement("link");if(r.rel=n?"stylesheet":_,n||(r.as="script",r.crossOrigin=""),r.href=t,document.head.appendChild(r),n)return new Promise((s,l)=>{r.addEventListener("load",s),r.addEventListener("error",()=>l(new Error(`Unable to preload CSS for ${t}`)))})})).then(()=>o()).catch(t=>{const n=new Event("vite:preloadError",{cancelable:!0});if(n.payload=t,window.dispatchEvent(n),!n.defaultPrevented)throw t})};var u=(e=>(e.Touchstart="touchstart",e.Mousedown="mousedown",e.Mousemove="mousemove",e.Keydown="keydown",e.Scroll="scroll",e))(u||{});const w=async()=>{const{default:e}=await a(()=>import("./module.esm-0217f008.js"),[],import.meta.url);if(document.querySelector('[x-data*="menu"]')){const{default:i}=await a(()=>import("./index-805a5ec0.js"),[],import.meta.url);e.plugin(i)}const{default:o}=await a(()=>import("./index-2b0f18ee.js"),[],import.meta.url);e.plugin(o),e.start(),window.Alpine=e},E=setTimeout(()=>{c()},800),c=()=>{clearTimeout(E),Object.values(u).forEach(e=>document.removeEventListener(e,c,{capture:!0})),w()},p=e=>{document.addEventListener(e,c,{capture:!0})};Object.values(u).forEach(e=>{p(e)});
