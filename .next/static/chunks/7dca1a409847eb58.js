(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,88143,(e,t,a)=>{"use strict";function r({widthInt:e,heightInt:t,blurWidth:a,blurHeight:r,blurDataURL:i,objectFit:s}){let n=a?40*a:e,o=r?40*r:t,l=n&&o?`viewBox='0 0 ${n} ${o}'`:"";return`%3Csvg xmlns='http://www.w3.org/2000/svg' ${l}%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='${l?"none":"contain"===s?"xMidYMid":"cover"===s?"xMidYMid slice":"none"}' style='filter: url(%23b);' href='${i}'/%3E%3C/svg%3E`}Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"getImageBlurSvg",{enumerable:!0,get:function(){return r}})},87690,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0});var r={VALID_LOADERS:function(){return s},imageConfigDefault:function(){return n}};for(var i in r)Object.defineProperty(a,i,{enumerable:!0,get:r[i]});let s=["default","imgix","cloudinary","akamai","custom"],n={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:14400,formats:["image/webp"],maximumRedirects:3,dangerouslyAllowLocalIP:!1,dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"attachment",localPatterns:void 0,remotePatterns:[],qualities:[75],unoptimized:!1}},8927,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"getImgProps",{enumerable:!0,get:function(){return d}}),e.r(33525);let r=e.r(43369),i=e.r(88143),s=e.r(87690),n=["-moz-initial","fill","none","scale-down",void 0];function o(e){return void 0!==e.default}function l(e){return void 0===e?e:"number"==typeof e?Number.isFinite(e)?e:NaN:"string"==typeof e&&/^[0-9]+$/.test(e)?parseInt(e,10):NaN}function d({src:e,sizes:t,unoptimized:a=!1,priority:d=!1,preload:c=!1,loading:u,className:m,quality:h,width:f,height:p,fill:g=!1,style:b,overrideSrc:y,onLoad:_,onLoadingComplete:x,placeholder:v="empty",blurDataURL:w,fetchPriority:j,decoding:N="async",layout:C,objectFit:S,objectPosition:P,lazyBoundary:k,lazyRoot:E,...I},A){var O;let M,R,T,{imgConf:z,showAltText:L,blurComplete:D,defaultLoader:$}=A,U=z||s.imageConfigDefault;if("allSizes"in U)M=U;else{let e=[...U.deviceSizes,...U.imageSizes].sort((e,t)=>e-t),t=U.deviceSizes.sort((e,t)=>e-t),a=U.qualities?.sort((e,t)=>e-t);M={...U,allSizes:e,deviceSizes:t,qualities:a}}if(void 0===$)throw Object.defineProperty(Error("images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config"),"__NEXT_ERROR_CODE",{value:"E163",enumerable:!1,configurable:!0});let F=I.loader||$;delete I.loader,delete I.srcSet;let G="__next_img_default"in F;if(G){if("custom"===M.loader)throw Object.defineProperty(Error(`Image with src "${e}" is missing "loader" prop.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader`),"__NEXT_ERROR_CODE",{value:"E252",enumerable:!1,configurable:!0})}else{let e=F;F=t=>{let{config:a,...r}=t;return e(r)}}if(C){"fill"===C&&(g=!0);let e={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[C];e&&(b={...b,...e});let a={responsive:"100vw",fill:"100vw"}[C];a&&!t&&(t=a)}let B="",q=l(f),W=l(p);if((O=e)&&"object"==typeof O&&(o(O)||void 0!==O.src)){let t=o(e)?e.default:e;if(!t.src)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(t)}`),"__NEXT_ERROR_CODE",{value:"E460",enumerable:!1,configurable:!0});if(!t.height||!t.width)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(t)}`),"__NEXT_ERROR_CODE",{value:"E48",enumerable:!1,configurable:!0});if(R=t.blurWidth,T=t.blurHeight,w=w||t.blurDataURL,B=t.src,!g)if(q||W){if(q&&!W){let e=q/t.width;W=Math.round(t.height*e)}else if(!q&&W){let e=W/t.height;q=Math.round(t.width*e)}}else q=t.width,W=t.height}let K=!d&&!c&&("lazy"===u||void 0===u);(!(e="string"==typeof e?e:B)||e.startsWith("data:")||e.startsWith("blob:"))&&(a=!0,K=!1),M.unoptimized&&(a=!0),G&&!M.dangerouslyAllowSVG&&e.split("?",1)[0].endsWith(".svg")&&(a=!0);let H=l(h),V=Object.assign(g?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:S,objectPosition:P}:{},L?{}:{color:"transparent"},b),Y=D||"empty"===v?null:"blur"===v?`url("data:image/svg+xml;charset=utf-8,${(0,i.getImageBlurSvg)({widthInt:q,heightInt:W,blurWidth:R,blurHeight:T,blurDataURL:w||"",objectFit:V.objectFit})}")`:`url("${v}")`,Q=n.includes(V.objectFit)?"fill"===V.objectFit?"100% 100%":"cover":V.objectFit,X=Y?{backgroundSize:Q,backgroundPosition:V.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:Y}:{},Z=function({config:e,src:t,unoptimized:a,width:i,quality:s,sizes:n,loader:o}){if(a){let e=(0,r.getDeploymentId)();if(t.startsWith("/")&&!t.startsWith("//")&&e){let a=t.includes("?")?"&":"?";t=`${t}${a}dpl=${e}`}return{src:t,srcSet:void 0,sizes:void 0}}let{widths:l,kind:d}=function({deviceSizes:e,allSizes:t},a,r){if(r){let a=/(^|\s)(1?\d?\d)vw/g,i=[];for(let e;e=a.exec(r);)i.push(parseInt(e[2]));if(i.length){let a=.01*Math.min(...i);return{widths:t.filter(t=>t>=e[0]*a),kind:"w"}}return{widths:t,kind:"w"}}return"number"!=typeof a?{widths:e,kind:"w"}:{widths:[...new Set([a,2*a].map(e=>t.find(t=>t>=e)||t[t.length-1]))],kind:"x"}}(e,i,n),c=l.length-1;return{sizes:n||"w"!==d?n:"100vw",srcSet:l.map((a,r)=>`${o({config:e,src:t,quality:s,width:a})} ${"w"===d?a:r+1}${d}`).join(", "),src:o({config:e,src:t,quality:s,width:l[c]})}}({config:M,src:e,unoptimized:a,width:q,quality:H,sizes:t,loader:F}),J=K?"lazy":u;return{props:{...I,loading:J,fetchPriority:j,width:q,height:W,decoding:N,className:m,style:{...V,...X},sizes:Z.sizes,srcSet:Z.srcSet,src:y||Z.src},meta:{unoptimized:a,preload:c||d,placeholder:v,fill:g}}}},98879,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"default",{enumerable:!0,get:function(){return o}});let r=e.r(71645),i="undefined"==typeof window,s=i?()=>{}:r.useLayoutEffect,n=i?()=>{}:r.useEffect;function o(e){let{headManager:t,reduceComponentsToState:a}=e;function o(){if(t&&t.mountedInstances){let e=r.Children.toArray(Array.from(t.mountedInstances).filter(Boolean));t.updateHead(a(e))}}return i&&(t?.mountedInstances?.add(e.children),o()),s(()=>(t?.mountedInstances?.add(e.children),()=>{t?.mountedInstances?.delete(e.children)})),s(()=>(t&&(t._pendingUpdate=o),()=>{t&&(t._pendingUpdate=o)})),n(()=>(t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null),()=>{t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null)})),null}},25633,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0});var r={default:function(){return p},defaultHead:function(){return u}};for(var i in r)Object.defineProperty(a,i,{enumerable:!0,get:r[i]});let s=e.r(55682),n=e.r(90809),o=e.r(43476),l=n._(e.r(71645)),d=s._(e.r(98879)),c=e.r(42732);function u(){return[(0,o.jsx)("meta",{charSet:"utf-8"},"charset"),(0,o.jsx)("meta",{name:"viewport",content:"width=device-width"},"viewport")]}function m(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===l.default.Fragment?e.concat(l.default.Children.toArray(t.props.children).reduce((e,t)=>"string"==typeof t||"number"==typeof t?e:e.concat(t),[])):e.concat(t)}e.r(33525);let h=["name","httpEquiv","charSet","itemProp"];function f(e){let t,a,r,i;return e.reduce(m,[]).reverse().concat(u().reverse()).filter((t=new Set,a=new Set,r=new Set,i={},e=>{let s=!0,n=!1;if(e.key&&"number"!=typeof e.key&&e.key.indexOf("$")>0){n=!0;let a=e.key.slice(e.key.indexOf("$")+1);t.has(a)?s=!1:t.add(a)}switch(e.type){case"title":case"base":a.has(e.type)?s=!1:a.add(e.type);break;case"meta":for(let t=0,a=h.length;t<a;t++){let a=h[t];if(e.props.hasOwnProperty(a))if("charSet"===a)r.has(a)?s=!1:r.add(a);else{let t=e.props[a],r=i[a]||new Set;("name"!==a||!n)&&r.has(t)?s=!1:(r.add(t),i[a]=r)}}}return s})).reverse().map((e,t)=>{let a=e.key||t;return l.default.cloneElement(e,{key:a})})}let p=function({children:e}){let t=(0,l.useContext)(c.HeadManagerContext);return(0,o.jsx)(d.default,{reduceComponentsToState:f,headManager:t,children:e})};("function"==typeof a.default||"object"==typeof a.default&&null!==a.default)&&void 0===a.default.__esModule&&(Object.defineProperty(a.default,"__esModule",{value:!0}),Object.assign(a.default,a),t.exports=a.default)},18556,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"ImageConfigContext",{enumerable:!0,get:function(){return s}});let r=e.r(55682)._(e.r(71645)),i=e.r(87690),s=r.default.createContext(i.imageConfigDefault)},65856,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"RouterContext",{enumerable:!0,get:function(){return r}});let r=e.r(55682)._(e.r(71645)).default.createContext(null)},70965,(e,t,a)=>{"use strict";function r(e,t){let a=e||75;return t?.qualities?.length?t.qualities.reduce((e,t)=>Math.abs(t-a)<Math.abs(e-a)?t:e,0):a}Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"findClosestQuality",{enumerable:!0,get:function(){return r}})},1948,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"default",{enumerable:!0,get:function(){return n}});let r=e.r(70965),i=e.r(43369);function s({config:e,src:t,width:a,quality:s}){if(t.startsWith("/")&&t.includes("?")&&e.localPatterns?.length===1&&"**"===e.localPatterns[0].pathname&&""===e.localPatterns[0].search)throw Object.defineProperty(Error(`Image with src "${t}" is using a query string which is not configured in images.localPatterns.
Read more: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns`),"__NEXT_ERROR_CODE",{value:"E871",enumerable:!1,configurable:!0});let n=(0,r.findClosestQuality)(s,e),o=(0,i.getDeploymentId)();return`${e.path}?url=${encodeURIComponent(t)}&w=${a}&q=${n}${t.startsWith("/")&&o?`&dpl=${o}`:""}`}s.__next_img_default=!0;let n=s},5500,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"Image",{enumerable:!0,get:function(){return x}});let r=e.r(55682),i=e.r(90809),s=e.r(43476),n=i._(e.r(71645)),o=r._(e.r(74080)),l=r._(e.r(25633)),d=e.r(8927),c=e.r(87690),u=e.r(18556);e.r(33525);let m=e.r(65856),h=r._(e.r(1948)),f=e.r(18581),p={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/williammullins.github.io/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0};function g(e,t,a,r,i,s,n){let o=e?.src;e&&e["data-loaded-src"]!==o&&(e["data-loaded-src"]=o,("decode"in e?e.decode():Promise.resolve()).catch(()=>{}).then(()=>{if(e.parentElement&&e.isConnected){if("empty"!==t&&i(!0),a?.current){let t=new Event("load");Object.defineProperty(t,"target",{writable:!1,value:e});let r=!1,i=!1;a.current({...t,nativeEvent:t,currentTarget:e,target:e,isDefaultPrevented:()=>r,isPropagationStopped:()=>i,persist:()=>{},preventDefault:()=>{r=!0,t.preventDefault()},stopPropagation:()=>{i=!0,t.stopPropagation()}})}r?.current&&r.current(e)}}))}function b(e){return n.use?{fetchPriority:e}:{fetchpriority:e}}"undefined"==typeof window&&(globalThis.__NEXT_IMAGE_IMPORTED=!0);let y=(0,n.forwardRef)(({src:e,srcSet:t,sizes:a,height:r,width:i,decoding:o,className:l,style:d,fetchPriority:c,placeholder:u,loading:m,unoptimized:h,fill:p,onLoadRef:y,onLoadingCompleteRef:_,setBlurComplete:x,setShowAltText:v,sizesInput:w,onLoad:j,onError:N,...C},S)=>{let P=(0,n.useCallback)(e=>{e&&(N&&(e.src=e.src),e.complete&&g(e,u,y,_,x,h,w))},[e,u,y,_,x,N,h,w]),k=(0,f.useMergedRef)(S,P);return(0,s.jsx)("img",{...C,...b(c),loading:m,width:i,height:r,decoding:o,"data-nimg":p?"fill":"1",className:l,style:d,sizes:a,srcSet:t,src:e,ref:k,onLoad:e=>{g(e.currentTarget,u,y,_,x,h,w)},onError:e=>{v(!0),"empty"!==u&&x(!0),N&&N(e)}})});function _({isAppRouter:e,imgAttributes:t}){let a={as:"image",imageSrcSet:t.srcSet,imageSizes:t.sizes,crossOrigin:t.crossOrigin,referrerPolicy:t.referrerPolicy,...b(t.fetchPriority)};return e&&o.default.preload?(o.default.preload(t.src,a),null):(0,s.jsx)(l.default,{children:(0,s.jsx)("link",{rel:"preload",href:t.srcSet?void 0:t.src,...a},"__nimg-"+t.src+t.srcSet+t.sizes)})}let x=(0,n.forwardRef)((e,t)=>{let a=(0,n.useContext)(m.RouterContext),r=(0,n.useContext)(u.ImageConfigContext),i=(0,n.useMemo)(()=>{let e=p||r||c.imageConfigDefault,t=[...e.deviceSizes,...e.imageSizes].sort((e,t)=>e-t),a=e.deviceSizes.sort((e,t)=>e-t),i=e.qualities?.sort((e,t)=>e-t);return{...e,allSizes:t,deviceSizes:a,qualities:i,localPatterns:"undefined"==typeof window?r?.localPatterns:e.localPatterns}},[r]),{onLoad:o,onLoadingComplete:l}=e,f=(0,n.useRef)(o);(0,n.useEffect)(()=>{f.current=o},[o]);let g=(0,n.useRef)(l);(0,n.useEffect)(()=>{g.current=l},[l]);let[b,x]=(0,n.useState)(!1),[v,w]=(0,n.useState)(!1),{props:j,meta:N}=(0,d.getImgProps)(e,{defaultLoader:h.default,imgConf:i,blurComplete:b,showAltText:v});return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(y,{...j,unoptimized:N.unoptimized,placeholder:N.placeholder,fill:N.fill,onLoadRef:f,onLoadingCompleteRef:g,setBlurComplete:x,setShowAltText:w,sizesInput:e.sizes,ref:t}),N.preload?(0,s.jsx)(_,{isAppRouter:!a,imgAttributes:j}):null]})});("function"==typeof a.default||"object"==typeof a.default&&null!==a.default)&&void 0===a.default.__esModule&&(Object.defineProperty(a.default,"__esModule",{value:!0}),Object.assign(a.default,a),t.exports=a.default)},94909,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0});var r={default:function(){return c},getImageProps:function(){return d}};for(var i in r)Object.defineProperty(a,i,{enumerable:!0,get:r[i]});let s=e.r(55682),n=e.r(8927),o=e.r(5500),l=s._(e.r(1948));function d(e){let{props:t}=(0,n.getImgProps)(e,{defaultLoader:l.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/williammullins.github.io/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0}});for(let[e,a]of Object.entries(t))void 0===a&&delete t[e];return{props:t}}let c=o.Image},57688,(e,t,a)=>{t.exports=e.r(94909)},71689,75254,87316,51975,50682,64659,e=>{"use strict";var t=e.i(71645);let a=e=>{let t=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,a)=>a?a.toUpperCase():t.toLowerCase());return t.charAt(0).toUpperCase()+t.slice(1)},r=(...e)=>e.filter((e,t,a)=>!!e&&""!==e.trim()&&a.indexOf(e)===t).join(" ").trim();var i={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let s=(0,t.forwardRef)(({color:e="currentColor",size:a=24,strokeWidth:s=2,absoluteStrokeWidth:n,className:o="",children:l,iconNode:d,...c},u)=>(0,t.createElement)("svg",{ref:u,...i,width:a,height:a,stroke:e,strokeWidth:n?24*Number(s)/Number(a):s,className:r("lucide",o),...!l&&!(e=>{for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0})(c)&&{"aria-hidden":"true"},...c},[...d.map(([e,a])=>(0,t.createElement)(e,a)),...Array.isArray(l)?l:[l]])),n=(e,i)=>{let n=(0,t.forwardRef)(({className:n,...o},l)=>(0,t.createElement)(s,{ref:l,iconNode:i,className:r(`lucide-${a(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,n),...o}));return n.displayName=a(e),n};e.s(["default",()=>n],75254);let o=n("arrow-left",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);e.s(["ArrowLeft",()=>o],71689);let l=n("calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);e.s(["Calendar",()=>l],87316);let d=n("tag",[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",key:"vktsd0"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor",key:"kqv944"}]]);e.s(["Tag",()=>d],51975);let c=n("github",[["path",{d:"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",key:"tonef"}],["path",{d:"M9 18c-4.51 2-5-2-7-2",key:"9comsn"}]]);e.s(["Github",()=>c],50682);let u=n("chevron-down",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);e.s(["ChevronDown",()=>u],64659)},64542,e=>{"use strict";var t=e.i(43476),a=e.i(22016),r=e.i(57688),i=e.i(71689),s=e.i(87316),n=e.i(51975),o=e.i(50682),l=e.i(64659),d=e.i(75254);let c=(0,d.default)("chevron-right",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]),u=(0,d.default)("x",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),m=(0,d.default)("menu",[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]]);var h=e.i(71645);function f(){let[e,d]=(0,h.useState)(0),[f,p]=(0,h.useState)(!1),[g,b]=(0,h.useState)(!1),[y,_]=(0,h.useState)(null);(0,h.useEffect)(()=>{let e=()=>{let e=window.innerHeight,t=document.documentElement.scrollHeight-e;d(Math.min(100,Math.max(0,window.scrollY/t*100)))};return window.addEventListener("scroll",e),e(),()=>window.removeEventListener("scroll",e)},[]);let x=[{id:"graphic-form",title:"Graphic Form",content:"I wanted the infographic to be interpretable at a glance — something a viewer could absorb without needing a legend tutorial. To accomplish this, I leaned on familiar visual metaphors. The first panel uses a choropleth map of Kansas counties, a form most people intuitively understand as representing geographic variation. The second panel takes the shape of a thermometer paired with a humidity gauge, connecting the data directly to the physical phenomenon it represents. These skeuomorphic touches make the data feel grounded and tangible rather than abstract."},{id:"text",title:"Text",content:"I used text sparingly within the graphic panels themselves. Overloading a visualization with labels and annotations can create clutter that competes with the data for a viewer's attention. Instead, I reserved detailed explanation for the surrounding narrative — letting the figures speak visually and the text provide context where needed. Titles were kept bold and concise to establish a clear entry point for each section."},{id:"themes",title:"Themes & General Design",content:"The visual theme blends minimalist and skeuomorphic design principles. On the minimalist side, I used bold, geometric typefaces outside of the figures and maintained generous whitespace to let each element breathe. On the skeuomorphic side, I incorporated natural textures, subtle drop shadows, and real-world object references (like the thermometer) to give the infographic a tactile quality. This combination aimed to feel polished and professional without feeling sterile."},{id:"colors",title:"Colors",content:"The color palette draws from the Kansas landscape itself — warm earth tones (tans, creams, and burnt siennas) form the background, while a deep red (#7a1800) anchors the heat-related data. A muted sage green (#6b7f6a) provides contrast for secondary elements."},{id:"typography",title:"Typography",content:"I selected typefaces that balance readability with visual character. Headers use a bold, geometric sans-serif that commands attention and establishes hierarchy. Body text within the figures is kept clean and legible at smaller sizes."},{id:"context",title:"Contextualizing the Data",content:"Raw indemnity numbers are hard to interpret without context. To address this, I grounded the data in two ways: geographically, by overlaying the total losses onto a recognizable county map so viewers can connect the data to real places; and causally, by highlighting the actual causes of loss."}],v=`# ============================================================================
# Kansas Extreme Heat & Crop Loss — Data & Visualization Code
# Author: Will Mulligan
# Data Sources: USDA RMA Cause of Loss (2015–2025),
#               US Census TIGER/Line Shapefiles
# Note: Individual plot outputs were composed into the final infographic
#       layout in Affinity Designer.
# ============================================================================

# ~~ Load libraries ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
library(tidyverse)   # core data wrangling & visualization
library(janitor)     # clean column names
library(here)        # project-relative file paths
library(lubridate)   # date handling
library(readtext)    # reading text files
library(archive)     # archive extraction
library(readr)       # fast delimited file reading
library(sf)          # simple features for spatial data
library(tigris)      # US Census shapefiles
library(showtext)    # custom Google Fonts in plots

# ============================================================================
# 1. DATA INGESTION — USDA RMA Cause of Loss
# ============================================================================

col_names <- c(
  "Commodity_Year_Identifier",
  "State_Code",
  "State_Abbreviation",
  "County_Code",
  "County_Name",
  "Commodity_Code",
  "Commodity_Name",
  "Insurance_Plan_Code",
  "Insurance_Plan_Name_Abbreviation",
  "Coverage_Category",
  "Stage_Code",
  "Cause_of_Loss_Code",
  "Cause_of_Loss_Description",
  "Month_of_Loss",
  "Month_of_Loss_Name",
  "Year_of_Loss",
  "Policies_Earning_Premium",
  "Policies_Indemnified",
  "Net_Planted_Quantity",
  "Net_Endorsed_Acres",
  "Liability",
  "Total_Premium",
  "Producer_Paid_Premium",
  "Subsidy",
  "State_Private_Subsidy",
  "Additional_Subsidy",
  "EFA_Premium_Discount",
  "Net_Determined_Quantity",
  "Indemnity_Amount",
  "Loss_Ratio"
)

col_types <- cols(
  .default                        = col_character(),
  Commodity_Year_Identifier       = col_integer(),
  State_Code                      = col_character(),
  County_Code                     = col_character(),
  Commodity_Code                  = col_character(),
  Insurance_Plan_Code             = col_character(),
  Cause_of_Loss_Code              = col_character(),
  Month_of_Loss                   = col_integer(),
  Year_of_Loss                    = col_integer(),
  Policies_Earning_Premium        = col_integer(),
  Policies_Indemnified            = col_integer(),
  Net_Planted_Quantity            = col_double(),
  Net_Endorsed_Acres              = col_double(),
  Liability                       = col_double(),
  Total_Premium                   = col_double(),
  Producer_Paid_Premium           = col_double(),
  Subsidy                         = col_double(),
  State_Private_Subsidy           = col_double(),
  Additional_Subsidy              = col_double(),
  EFA_Premium_Discount            = col_double(),
  Net_Determined_Quantity         = col_double(),
  Indemnity_Amount                = col_double(),
  Loss_Ratio                      = col_double()
)

year_range <- seq(from = 2015, to = 2025, by = 1)
data <- data.frame()

for (year in year_range) {
  link <- paste0(
    "https://pubfs-rma.fpac.usda.gov/pub/Web_Data_Files/",
    "Summary_of_Business/cause_of_loss/colsom_", year, ".zip"
  )

  temp <- tempfile(fileext = ".zip")
  download.file(link, temp, mode = "wb")
  unzip(temp, exdir = tempdir())

  txt_file <- file.path(tempdir(), paste0("colsom_", year, ".txt"))
  data_temp <- read_delim(
    txt_file,
    delim          = "|",
    col_names      = col_names,
    col_types      = col_types,
    show_col_types = FALSE
  )

  data <- bind_rows(data, data_temp)
}

# ============================================================================
# 2. DATA CLEANING
# ============================================================================

data_clean <- data %>%
  mutate(
    state_name = case_when(
      State_Abbreviation %in% state.abb ~
        state.name[match(State_Abbreviation, state.abb)],
      TRUE ~ State_Abbreviation
    )
  ) %>%
  clean_names() %>%
  filter(commodity_year_identifier >= 2020)

# ============================================================================
# 3. VISUALIZATION ONE — Kansas County Choropleth Map
# ============================================================================

county_totals <- data_clean %>%
  filter(state_name == "Kansas") %>%
  group_by(county_code) %>%
  summarise(
    indemnity = sum(indemnity_amount, na.rm = TRUE),
    .groups = "drop"
  )

ks_counties <- counties(state = "KS", cb = TRUE, year = 2024) %>%
  st_transform(crs = 4326) %>%
  left_join(county_totals, by = c("COUNTYFP" = "county_code"))

map <- ggplot(ks_counties) +
  geom_sf(
    aes(fill = indemnity),
    color    = "#0d0d1a",
    linewidth = 0.3
  ) +
  scale_fill_viridis_c(
    option = "magma",
    trans  = "log10",
    name   = "Total Indemnity"
  ) +
  labs(title = "Kansas County Drought & Heat Crop Losses") +
  theme(
    axis.text        = element_blank(),
    axis.ticks       = element_blank(),
    panel.grid       = element_blank(),
    panel.background = element_rect(fill = "transparent", colour = NA),
    plot.background  = element_rect(fill = "transparent", colour = NA)
  )

map

# ============================================================================
# 4. VISUALIZATION TWO — Loss Breakdown by Cause
# ============================================================================

percent_by_cause <- data_clean %>%
  filter(state_name == "Kansas") %>%
  group_by(cause_of_loss_description) %>%
  summarize(
    total_loss = sum(indemnity_amount),
    .groups = "drop"
  ) %>%
  mutate(percent_by_cause = (total_loss / sum(total_loss)) * 100) %>%
  arrange(desc(percent_by_cause)) %>%
  select(cause_of_loss_description, total_loss, percent_by_cause)

percent_by_heat <- percent_by_cause %>%
  filter(cause_of_loss_description %in% perils_of_interest) %>%
  summarize(
    total_percent = sum(percent_by_cause),
    other         = 100 - total_percent
  )

# ============================================================================
# 5. VISUALIZATION THREE — Most Impacted Crops
# ============================================================================

most_impacted <- data_clean %>%
  filter(
    state_name == "Kansas",
    cause_of_loss_description %in% perils_of_interest
  ) %>%
  group_by(commodity_name) %>%
  summarize(loss = sum(indemnity_amount)) %>%
  arrange(desc(loss))

ggplot(most_impacted, aes(x = reorder(commodity_name, loss), y = loss)) +
  geom_col() +
  scale_colour_gradient(
    low  = "#E8A838",
    high = "#1a0a00"
  ) +
  scale_y_reverse()`;return(0,t.jsxs)("article",{className:"min-h-screen bg-gray-50 py-20",children:[(0,t.jsx)("div",{className:"fixed top-0 left-0 w-full h-1 bg-transparent z-50",children:(0,t.jsx)("div",{className:"h-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 transition-all duration-150",style:{width:`${e}%`}})}),(0,t.jsxs)("div",{className:"relative w-full h-96 md:h-[28rem]",children:[(0,t.jsx)("div",{className:"absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-500 via-red-500 to-rose-600"}),(0,t.jsx)("div",{className:"absolute inset-0 bg-black/30"}),(0,t.jsx)("div",{className:"absolute inset-0 flex items-center justify-center px-6",children:(0,t.jsxs)("div",{className:"text-white text-center max-w-7xl",children:[(0,t.jsxs)("h1",{className:"text-4xl md:text-5xl font-extrabold tracking-tight mb-4",children:[(0,t.jsx)("p",{children:"Crop Indemnity in Kansas"}),(0,t.jsx)("p",{children:"Between 2020 and 2025"})]}),(0,t.jsx)("p",{className:"text-sm md:text-base mb-2",children:"Author: William Mullins ・ Date: March 12, 2026"})]})})]}),(0,t.jsx)("div",{className:"container mx-auto px-6",children:(0,t.jsxs)("div",{className:"max-w-7xl mx-auto",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mt-10 mb-8",children:[(0,t.jsxs)(a.default,{href:"/blog",className:"inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors",children:[(0,t.jsx)(i.ArrowLeft,{className:"w-4 h-4 mr-2"})," Back to Blog"]}),(0,t.jsxs)("a",{href:"https://github.com/willrmull/eds240-infographic.git",target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium",children:[(0,t.jsx)(o.Github,{className:"w-4 h-4"}),"View on GitHub"]})]}),(0,t.jsxs)("header",{className:"mb-12",children:[(0,t.jsxs)("div",{className:"flex gap-2 mb-4",children:[(0,t.jsx)("span",{className:"px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium",children:"Infographic"}),(0,t.jsx)("span",{className:"px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium",children:"Agriculture"})]}),(0,t.jsxs)("div",{className:"flex items-center text-gray-600 text-sm border-b border-gray-200 pb-8",children:[(0,t.jsxs)("span",{className:"flex items-center mr-6",children:[(0,t.jsx)(s.Calendar,{className:"w-4 h-4 mr-2"}),"March 12, 2026"]}),(0,t.jsxs)("span",{className:"flex items-center",children:[(0,t.jsx)(n.Tag,{className:"w-4 h-4 mr-2"}),"Data Visualization · Infographic"]})]})]}),(0,t.jsx)("div",{className:"h-px bg-gray-300 my-10"}),(0,t.jsxs)("section",{className:"mb-12",children:[(0,t.jsx)("h2",{className:"text-3xl font-bold text-gray-900 mb-6",children:"Introduction"}),(0,t.jsxs)("div",{className:"prose prose-lg max-w-none text-gray-700",children:[(0,t.jsx)("p",{className:"mb-4",children:"Over the past few years, Kansas has endured extreme heatwaves, particularly in 2022 and 2023, yet their impact has gone largely unreported. As a former resident who lived through these events, the silence feels strange. Kansas may not carry the fiscal or demographic weight of other states, but that hardly explains how historic heatwaves passed by without notice."}),(0,t.jsx)("p",{children:"To investigate, I drew on crop insurance data from the USDA Risk Management Agency's Cause of Loss database (2020–2025), which records the cause of each insured crop loss, the affected crop, and the indemnity paid to the farmer. I supplemented this with temperature data from NOAA and geographic boundary files from the U.S. Census Bureau's TIGER/Line shapefiles. Together, these sources allowed me to map, measure, and contextualize the damage."})]})]}),(0,t.jsx)("div",{className:"h-px bg-gray-300 my-10"}),(0,t.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-8",children:[(0,t.jsxs)("div",{className:"p-4",children:[(0,t.jsx)("h3",{className:"text-2xl font-bold text-gray-900 mb-4",children:"About"}),(0,t.jsx)("p",{className:"text-lg text-gray-700"})]}),(0,t.jsx)("div",{className:"p-4",children:(0,t.jsx)("div",{className:"lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] flex items-start",children:(0,t.jsx)(r.default,{src:"/images/Infographic.svg",alt:"Eaton and Palisades Fires Infographic",width:2481,height:3508,style:{width:"100%",height:"auto"},className:"rounded-xl shadow-lg max-h-[calc(100vh-8rem)] object-contain",unoptimized:!0})})})]}),(0,t.jsx)("div",{className:"h-px bg-gray-300 my-10"}),(0,t.jsxs)("section",{className:"mb-16",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-6",children:[(0,t.jsx)("h2",{className:"text-3xl font-bold text-gray-900",children:"Designing the Infographic: Approach and Decisions"}),(0,t.jsx)("button",{onClick:()=>b(!g),className:"lg:hidden p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors","aria-label":"Toggle design sections",children:g?(0,t.jsx)(u,{className:"w-5 h-5"}):(0,t.jsx)(m,{className:"w-5 h-5"})})]}),(0,t.jsxs)("div",{className:"flex flex-col lg:flex-row gap-8",children:[(0,t.jsx)("nav",{className:`lg:w-64 shrink-0 ${g?"block":"hidden lg:block"}`,children:(0,t.jsx)("div",{className:"lg:sticky lg:top-24",children:(0,t.jsx)("ul",{className:"space-y-1",children:x.map(e=>(0,t.jsxs)("li",{children:[(0,t.jsx)("button",{onClick:()=>{_(y===e.id?null:e.id),b(!1)},className:`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${y===e.id?"bg-orange-100 text-orange-800 border-l-4 border-orange-500":"text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`,children:(0,t.jsxs)("span",{className:"flex items-center justify-between",children:[e.title,(0,t.jsx)(c,{className:`w-4 h-4 transition-transform ${y===e.id?"rotate-90":""}`})]})}),y===e.id&&(0,t.jsx)("div",{className:"lg:hidden px-4 py-3 text-gray-700 text-sm leading-relaxed bg-gray-50 rounded-b-lg mt-1",children:e.content})]},e.id))})})}),(0,t.jsx)("div",{className:"hidden lg:block flex-1 min-h-[300px]",children:y?(0,t.jsxs)("div",{className:"bg-white rounded-xl border border-gray-200 p-8 shadow-sm",children:[(0,t.jsx)("h3",{className:"text-xl font-semibold text-gray-900 mb-4",children:x.find(e=>e.id===y)?.title}),(0,t.jsx)("p",{className:"text-gray-700 leading-relaxed text-base",children:x.find(e=>e.id===y)?.content})]}):(0,t.jsx)("div",{className:"bg-gray-100 rounded-xl border border-dashed border-gray-300 p-8 flex items-center justify-center min-h-[300px]",children:(0,t.jsx)("p",{className:"text-gray-400 text-sm",children:"Select a section from the sidebar to read more."})})})]})]}),(0,t.jsx)("div",{className:"h-px bg-gray-300 my-10"}),(0,t.jsxs)("section",{className:"mb-16",children:[(0,t.jsxs)("button",{onClick:()=>p(!f),className:"flex items-center gap-3 w-full text-left group",children:[(0,t.jsx)("span",{className:`flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${f?"bg-orange-100 text-orange-700":"bg-gray-200 text-gray-500 group-hover:bg-gray-300"}`,children:(0,t.jsx)(l.ChevronDown,{className:`w-4 h-4 transition-transform ${f?"rotate-180":""}`})}),(0,t.jsx)("h2",{className:"text-2xl font-bold text-gray-900",children:"Full Code"}),(0,t.jsx)("span",{className:"text-sm text-gray-400 ml-2",children:f?"Click to collapse":"Expand to view full infographic code"})]}),f&&(0,t.jsxs)("div",{className:"mt-6 rounded-xl overflow-hidden border border-gray-200 shadow-sm",children:[(0,t.jsxs)("div",{className:"bg-gray-900 text-gray-300 px-6 py-3 text-xs font-mono flex items-center justify-between",children:[(0,t.jsx)("span",{children:"R"}),(0,t.jsx)("button",{onClick:()=>{navigator.clipboard.writeText(v)},className:"text-gray-500 hover:text-white transition-colors text-xs",children:"Copy"})]}),(0,t.jsx)("pre",{className:"bg-gray-950 text-gray-300 p-6 overflow-x-auto text-sm leading-relaxed max-h-[600px] overflow-y-auto",children:(0,t.jsx)("code",{children:v})})]})]})]})})]})}e.s(["default",()=>f],64542)}]);