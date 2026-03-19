(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,88143,(e,t,a)=>{"use strict";function i({widthInt:e,heightInt:t,blurWidth:a,blurHeight:i,blurDataURL:r,objectFit:s}){let l=a?40*a:e,n=i?40*i:t,o=l&&n?`viewBox='0 0 ${l} ${n}'`:"";return`%3Csvg xmlns='http://www.w3.org/2000/svg' ${o}%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='${o?"none":"contain"===s?"xMidYMid":"cover"===s?"xMidYMid slice":"none"}' style='filter: url(%23b);' href='${r}'/%3E%3C/svg%3E`}Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"getImageBlurSvg",{enumerable:!0,get:function(){return i}})},87690,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i={VALID_LOADERS:function(){return s},imageConfigDefault:function(){return l}};for(var r in i)Object.defineProperty(a,r,{enumerable:!0,get:i[r]});let s=["default","imgix","cloudinary","akamai","custom"],l={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:14400,formats:["image/webp"],maximumRedirects:3,dangerouslyAllowLocalIP:!1,dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"attachment",localPatterns:void 0,remotePatterns:[],qualities:[75],unoptimized:!1}},8927,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"getImgProps",{enumerable:!0,get:function(){return d}}),e.r(33525);let i=e.r(43369),r=e.r(88143),s=e.r(87690),l=["-moz-initial","fill","none","scale-down",void 0];function n(e){return void 0!==e.default}function o(e){return void 0===e?e:"number"==typeof e?Number.isFinite(e)?e:NaN:"string"==typeof e&&/^[0-9]+$/.test(e)?parseInt(e,10):NaN}function d({src:e,sizes:t,unoptimized:a=!1,priority:d=!1,preload:c=!1,loading:m,className:h,quality:u,width:p,height:g,fill:f=!1,style:x,overrideSrc:y,onLoad:b,onLoadingComplete:_,placeholder:v="empty",blurDataURL:j,fetchPriority:w,decoding:R="async",layout:C,objectFit:N,objectPosition:$,lazyBoundary:E,lazyRoot:A,...S},T){var k;let P,V,D,{imgConf:I,showAltText:H,blurComplete:M,defaultLoader:O}=T,W=I||s.imageConfigDefault;if("allSizes"in W)P=W;else{let e=[...W.deviceSizes,...W.imageSizes].sort((e,t)=>e-t),t=W.deviceSizes.sort((e,t)=>e-t),a=W.qualities?.sort((e,t)=>e-t);P={...W,allSizes:e,deviceSizes:t,qualities:a}}if(void 0===O)throw Object.defineProperty(Error("images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config"),"__NEXT_ERROR_CODE",{value:"E163",enumerable:!1,configurable:!0});let z=S.loader||O;delete S.loader,delete S.srcSet;let L="__next_img_default"in z;if(L){if("custom"===P.loader)throw Object.defineProperty(Error(`Image with src "${e}" is missing "loader" prop.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader`),"__NEXT_ERROR_CODE",{value:"E252",enumerable:!1,configurable:!0})}else{let e=z;z=t=>{let{config:a,...i}=t;return e(i)}}if(C){"fill"===C&&(f=!0);let e={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[C];e&&(x={...x,...e});let a={responsive:"100vw",fill:"100vw"}[C];a&&!t&&(t=a)}let U="",G=o(p),q=o(g);if((k=e)&&"object"==typeof k&&(n(k)||void 0!==k.src)){let t=n(e)?e.default:e;if(!t.src)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(t)}`),"__NEXT_ERROR_CODE",{value:"E460",enumerable:!1,configurable:!0});if(!t.height||!t.width)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(t)}`),"__NEXT_ERROR_CODE",{value:"E48",enumerable:!1,configurable:!0});if(V=t.blurWidth,D=t.blurHeight,j=j||t.blurDataURL,U=t.src,!f)if(G||q){if(G&&!q){let e=G/t.width;q=Math.round(t.height*e)}else if(!G&&q){let e=q/t.height;G=Math.round(t.width*e)}}else G=t.width,q=t.height}let F=!d&&!c&&("lazy"===m||void 0===m);(!(e="string"==typeof e?e:U)||e.startsWith("data:")||e.startsWith("blob:"))&&(a=!0,F=!1),P.unoptimized&&(a=!0),L&&!P.dangerouslyAllowSVG&&e.split("?",1)[0].endsWith(".svg")&&(a=!0);let B=o(u),Y=Object.assign(f?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:N,objectPosition:$}:{},H?{}:{color:"transparent"},x),X=M||"empty"===v?null:"blur"===v?`url("data:image/svg+xml;charset=utf-8,${(0,r.getImageBlurSvg)({widthInt:G,heightInt:q,blurWidth:V,blurHeight:D,blurDataURL:j||"",objectFit:Y.objectFit})}")`:`url("${v}")`,J=l.includes(Y.objectFit)?"fill"===Y.objectFit?"100% 100%":"cover":Y.objectFit,K=X?{backgroundSize:J,backgroundPosition:Y.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:X}:{},Z=function({config:e,src:t,unoptimized:a,width:r,quality:s,sizes:l,loader:n}){if(a){let e=(0,i.getDeploymentId)();if(t.startsWith("/")&&!t.startsWith("//")&&e){let a=t.includes("?")?"&":"?";t=`${t}${a}dpl=${e}`}return{src:t,srcSet:void 0,sizes:void 0}}let{widths:o,kind:d}=function({deviceSizes:e,allSizes:t},a,i){if(i){let a=/(^|\s)(1?\d?\d)vw/g,r=[];for(let e;e=a.exec(i);)r.push(parseInt(e[2]));if(r.length){let a=.01*Math.min(...r);return{widths:t.filter(t=>t>=e[0]*a),kind:"w"}}return{widths:t,kind:"w"}}return"number"!=typeof a?{widths:e,kind:"w"}:{widths:[...new Set([a,2*a].map(e=>t.find(t=>t>=e)||t[t.length-1]))],kind:"x"}}(e,r,l),c=o.length-1;return{sizes:l||"w"!==d?l:"100vw",srcSet:o.map((a,i)=>`${n({config:e,src:t,quality:s,width:a})} ${"w"===d?a:i+1}${d}`).join(", "),src:n({config:e,src:t,quality:s,width:o[c]})}}({config:P,src:e,unoptimized:a,width:G,quality:B,sizes:t,loader:z}),Q=F?"lazy":m;return{props:{...S,loading:Q,fetchPriority:w,width:G,height:q,decoding:R,className:h,style:{...Y,...K},sizes:Z.sizes,srcSet:Z.srcSet,src:y||Z.src},meta:{unoptimized:a,preload:c||d,placeholder:v,fill:f}}}},98879,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"default",{enumerable:!0,get:function(){return n}});let i=e.r(71645),r="undefined"==typeof window,s=r?()=>{}:i.useLayoutEffect,l=r?()=>{}:i.useEffect;function n(e){let{headManager:t,reduceComponentsToState:a}=e;function n(){if(t&&t.mountedInstances){let e=i.Children.toArray(Array.from(t.mountedInstances).filter(Boolean));t.updateHead(a(e))}}return r&&(t?.mountedInstances?.add(e.children),n()),s(()=>(t?.mountedInstances?.add(e.children),()=>{t?.mountedInstances?.delete(e.children)})),s(()=>(t&&(t._pendingUpdate=n),()=>{t&&(t._pendingUpdate=n)})),l(()=>(t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null),()=>{t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null)})),null}},25633,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i={default:function(){return g},defaultHead:function(){return m}};for(var r in i)Object.defineProperty(a,r,{enumerable:!0,get:i[r]});let s=e.r(55682),l=e.r(90809),n=e.r(43476),o=l._(e.r(71645)),d=s._(e.r(98879)),c=e.r(42732);function m(){return[(0,n.jsx)("meta",{charSet:"utf-8"},"charset"),(0,n.jsx)("meta",{name:"viewport",content:"width=device-width"},"viewport")]}function h(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===o.default.Fragment?e.concat(o.default.Children.toArray(t.props.children).reduce((e,t)=>"string"==typeof t||"number"==typeof t?e:e.concat(t),[])):e.concat(t)}e.r(33525);let u=["name","httpEquiv","charSet","itemProp"];function p(e){let t,a,i,r;return e.reduce(h,[]).reverse().concat(m().reverse()).filter((t=new Set,a=new Set,i=new Set,r={},e=>{let s=!0,l=!1;if(e.key&&"number"!=typeof e.key&&e.key.indexOf("$")>0){l=!0;let a=e.key.slice(e.key.indexOf("$")+1);t.has(a)?s=!1:t.add(a)}switch(e.type){case"title":case"base":a.has(e.type)?s=!1:a.add(e.type);break;case"meta":for(let t=0,a=u.length;t<a;t++){let a=u[t];if(e.props.hasOwnProperty(a))if("charSet"===a)i.has(a)?s=!1:i.add(a);else{let t=e.props[a],i=r[a]||new Set;("name"!==a||!l)&&i.has(t)?s=!1:(i.add(t),r[a]=i)}}}return s})).reverse().map((e,t)=>{let a=e.key||t;return o.default.cloneElement(e,{key:a})})}let g=function({children:e}){let t=(0,o.useContext)(c.HeadManagerContext);return(0,n.jsx)(d.default,{reduceComponentsToState:p,headManager:t,children:e})};("function"==typeof a.default||"object"==typeof a.default&&null!==a.default)&&void 0===a.default.__esModule&&(Object.defineProperty(a.default,"__esModule",{value:!0}),Object.assign(a.default,a),t.exports=a.default)},18556,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"ImageConfigContext",{enumerable:!0,get:function(){return s}});let i=e.r(55682)._(e.r(71645)),r=e.r(87690),s=i.default.createContext(r.imageConfigDefault)},65856,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"RouterContext",{enumerable:!0,get:function(){return i}});let i=e.r(55682)._(e.r(71645)).default.createContext(null)},70965,(e,t,a)=>{"use strict";function i(e,t){let a=e||75;return t?.qualities?.length?t.qualities.reduce((e,t)=>Math.abs(t-a)<Math.abs(e-a)?t:e,0):a}Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"findClosestQuality",{enumerable:!0,get:function(){return i}})},1948,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"default",{enumerable:!0,get:function(){return l}});let i=e.r(70965),r=e.r(43369);function s({config:e,src:t,width:a,quality:s}){if(t.startsWith("/")&&t.includes("?")&&e.localPatterns?.length===1&&"**"===e.localPatterns[0].pathname&&""===e.localPatterns[0].search)throw Object.defineProperty(Error(`Image with src "${t}" is using a query string which is not configured in images.localPatterns.
Read more: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns`),"__NEXT_ERROR_CODE",{value:"E871",enumerable:!1,configurable:!0});let l=(0,i.findClosestQuality)(s,e),n=(0,r.getDeploymentId)();return`${e.path}?url=${encodeURIComponent(t)}&w=${a}&q=${l}${t.startsWith("/")&&n?`&dpl=${n}`:""}`}s.__next_img_default=!0;let l=s},5500,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"Image",{enumerable:!0,get:function(){return _}});let i=e.r(55682),r=e.r(90809),s=e.r(43476),l=r._(e.r(71645)),n=i._(e.r(74080)),o=i._(e.r(25633)),d=e.r(8927),c=e.r(87690),m=e.r(18556);e.r(33525);let h=e.r(65856),u=i._(e.r(1948)),p=e.r(18581),g={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/williammullins.github.io/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0};function f(e,t,a,i,r,s,l){let n=e?.src;e&&e["data-loaded-src"]!==n&&(e["data-loaded-src"]=n,("decode"in e?e.decode():Promise.resolve()).catch(()=>{}).then(()=>{if(e.parentElement&&e.isConnected){if("empty"!==t&&r(!0),a?.current){let t=new Event("load");Object.defineProperty(t,"target",{writable:!1,value:e});let i=!1,r=!1;a.current({...t,nativeEvent:t,currentTarget:e,target:e,isDefaultPrevented:()=>i,isPropagationStopped:()=>r,persist:()=>{},preventDefault:()=>{i=!0,t.preventDefault()},stopPropagation:()=>{r=!0,t.stopPropagation()}})}i?.current&&i.current(e)}}))}function x(e){return l.use?{fetchPriority:e}:{fetchpriority:e}}"undefined"==typeof window&&(globalThis.__NEXT_IMAGE_IMPORTED=!0);let y=(0,l.forwardRef)(({src:e,srcSet:t,sizes:a,height:i,width:r,decoding:n,className:o,style:d,fetchPriority:c,placeholder:m,loading:h,unoptimized:u,fill:g,onLoadRef:y,onLoadingCompleteRef:b,setBlurComplete:_,setShowAltText:v,sizesInput:j,onLoad:w,onError:R,...C},N)=>{let $=(0,l.useCallback)(e=>{e&&(R&&(e.src=e.src),e.complete&&f(e,m,y,b,_,u,j))},[e,m,y,b,_,R,u,j]),E=(0,p.useMergedRef)(N,$);return(0,s.jsx)("img",{...C,...x(c),loading:h,width:r,height:i,decoding:n,"data-nimg":g?"fill":"1",className:o,style:d,sizes:a,srcSet:t,src:e,ref:E,onLoad:e=>{f(e.currentTarget,m,y,b,_,u,j)},onError:e=>{v(!0),"empty"!==m&&_(!0),R&&R(e)}})});function b({isAppRouter:e,imgAttributes:t}){let a={as:"image",imageSrcSet:t.srcSet,imageSizes:t.sizes,crossOrigin:t.crossOrigin,referrerPolicy:t.referrerPolicy,...x(t.fetchPriority)};return e&&n.default.preload?(n.default.preload(t.src,a),null):(0,s.jsx)(o.default,{children:(0,s.jsx)("link",{rel:"preload",href:t.srcSet?void 0:t.src,...a},"__nimg-"+t.src+t.srcSet+t.sizes)})}let _=(0,l.forwardRef)((e,t)=>{let a=(0,l.useContext)(h.RouterContext),i=(0,l.useContext)(m.ImageConfigContext),r=(0,l.useMemo)(()=>{let e=g||i||c.imageConfigDefault,t=[...e.deviceSizes,...e.imageSizes].sort((e,t)=>e-t),a=e.deviceSizes.sort((e,t)=>e-t),r=e.qualities?.sort((e,t)=>e-t);return{...e,allSizes:t,deviceSizes:a,qualities:r,localPatterns:"undefined"==typeof window?i?.localPatterns:e.localPatterns}},[i]),{onLoad:n,onLoadingComplete:o}=e,p=(0,l.useRef)(n);(0,l.useEffect)(()=>{p.current=n},[n]);let f=(0,l.useRef)(o);(0,l.useEffect)(()=>{f.current=o},[o]);let[x,_]=(0,l.useState)(!1),[v,j]=(0,l.useState)(!1),{props:w,meta:R}=(0,d.getImgProps)(e,{defaultLoader:u.default,imgConf:r,blurComplete:x,showAltText:v});return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(y,{...w,unoptimized:R.unoptimized,placeholder:R.placeholder,fill:R.fill,onLoadRef:p,onLoadingCompleteRef:f,setBlurComplete:_,setShowAltText:j,sizesInput:e.sizes,ref:t}),R.preload?(0,s.jsx)(b,{isAppRouter:!a,imgAttributes:w}):null]})});("function"==typeof a.default||"object"==typeof a.default&&null!==a.default)&&void 0===a.default.__esModule&&(Object.defineProperty(a.default,"__esModule",{value:!0}),Object.assign(a.default,a),t.exports=a.default)},94909,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i={default:function(){return c},getImageProps:function(){return d}};for(var r in i)Object.defineProperty(a,r,{enumerable:!0,get:i[r]});let s=e.r(55682),l=e.r(8927),n=e.r(5500),o=s._(e.r(1948));function d(e){let{props:t}=(0,l.getImgProps)(e,{defaultLoader:o.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/williammullins.github.io/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0}});for(let[e,a]of Object.entries(t))void 0===a&&delete t[e];return{props:t}}let c=n.Image},57688,(e,t,a)=>{t.exports=e.r(94909)},71689,75254,87316,51975,50682,64659,e=>{"use strict";var t=e.i(71645);let a=e=>{let t=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,a)=>a?a.toUpperCase():t.toLowerCase());return t.charAt(0).toUpperCase()+t.slice(1)},i=(...e)=>e.filter((e,t,a)=>!!e&&""!==e.trim()&&a.indexOf(e)===t).join(" ").trim();var r={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let s=(0,t.forwardRef)(({color:e="currentColor",size:a=24,strokeWidth:s=2,absoluteStrokeWidth:l,className:n="",children:o,iconNode:d,...c},m)=>(0,t.createElement)("svg",{ref:m,...r,width:a,height:a,stroke:e,strokeWidth:l?24*Number(s)/Number(a):s,className:i("lucide",n),...!o&&!(e=>{for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0})(c)&&{"aria-hidden":"true"},...c},[...d.map(([e,a])=>(0,t.createElement)(e,a)),...Array.isArray(o)?o:[o]])),l=(e,r)=>{let l=(0,t.forwardRef)(({className:l,...n},o)=>(0,t.createElement)(s,{ref:o,iconNode:r,className:i(`lucide-${a(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,l),...n}));return l.displayName=a(e),l};e.s(["default",()=>l],75254);let n=l("arrow-left",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);e.s(["ArrowLeft",()=>n],71689);let o=l("calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);e.s(["Calendar",()=>o],87316);let d=l("tag",[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",key:"vktsd0"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor",key:"kqv944"}]]);e.s(["Tag",()=>d],51975);let c=l("github",[["path",{d:"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",key:"tonef"}],["path",{d:"M9 18c-4.51 2-5-2-7-2",key:"9comsn"}]]);e.s(["Github",()=>c],50682);let m=l("chevron-down",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);e.s(["ChevronDown",()=>m],64659)},55900,e=>{"use strict";let t=(0,e.i(75254).default)("chevron-up",[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]);e.s(["ChevronUp",()=>t],55900)},79745,e=>{"use strict";var t=e.i(43476),a=e.i(22016),i=e.i(57688),r=e.i(71689),s=e.i(87316),l=e.i(51975),n=e.i(50682),o=e.i(64659),d=e.i(55900),c=e.i(71645);let m=({code:e,index:a,title:i,expandedCode:r,copiedIndex:s,onToggle:l,onCopy:n})=>{let c=r[a]??!1;return(0,t.jsxs)("div",{className:"relative mb-6",children:[(0,t.jsxs)("button",{onClick:()=>l(a),className:"w-full flex items-center justify-between bg-gradient-to-r from-teal-700 to-cyan-700 text-white px-4 py-2 rounded-t-lg text-sm font-medium hover:from-teal-600 hover:to-cyan-600 transition-all",children:[(0,t.jsxs)("span",{className:"flex items-center gap-2",children:[c?(0,t.jsx)(d.ChevronUp,{className:"w-4 h-4"}):(0,t.jsx)(o.ChevronDown,{className:"w-4 h-4"}),i||"View Code"]}),(0,t.jsx)("span",{className:"text-xs opacity-75",children:"R"})]}),c&&(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)("pre",{className:"bg-gray-900 text-gray-100 p-4 rounded-b-lg overflow-x-auto text-sm border-l-4 border-teal-500",children:(0,t.jsx)("code",{children:e})}),(0,t.jsx)("button",{onClick:()=>n(e,a),className:"absolute top-2 right-2 text-xs bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600 transition",children:s===a?"Copied!":"Copy"})]})]})},h=({headers:e,rows:a,caption:i})=>(0,t.jsxs)("div",{className:"overflow-x-auto my-6",children:[(0,t.jsxs)("table",{className:"min-w-full border border-gray-300 rounded-lg overflow-hidden",children:[(0,t.jsx)("thead",{className:"bg-gradient-to-r from-teal-600 to-cyan-600 text-white",children:(0,t.jsx)("tr",{children:e.map((e,a)=>(0,t.jsx)("th",{className:"px-4 py-3 text-left text-sm font-semibold",children:e},a))})}),(0,t.jsx)("tbody",{className:"bg-white divide-y divide-gray-200",children:a.map((e,a)=>(0,t.jsx)("tr",{className:a%2==0?"bg-gray-50":"bg-white",children:e.map((e,a)=>(0,t.jsx)("td",{className:"px-4 py-3 text-sm text-gray-700",children:"number"==typeof e?e.toLocaleString():e},a))},a))})]}),i&&(0,t.jsx)("p",{className:"text-sm text-gray-500 mt-2 text-center italic",children:i})]});function u(){let[e,o]=(0,c.useState)(0),[d,u]=(0,c.useState)(null),[p,g]=(0,c.useState)({}),[f,x]=(0,c.useState)(!1),y=(0,c.useRef)(null);(0,c.useEffect)(()=>{if(window.katex)return void x(!0);let e=document.createElement("link");e.rel="stylesheet",e.href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css",e.crossOrigin="anonymous",document.head.appendChild(e);let t=document.createElement("script");t.src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js",t.crossOrigin="anonymous",t.onload=()=>{let e=document.createElement("script");e.src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js",e.crossOrigin="anonymous",e.onload=()=>{x(!0)},document.head.appendChild(e)},document.head.appendChild(t)},[]),(0,c.useEffect)(()=>{f&&y.current&&window.renderMathInElement&&window.renderMathInElement(y.current,{delimiters:[{left:"$$",right:"$$",display:!0},{left:"\\[",right:"\\]",display:!0},{left:"$",right:"$",display:!1},{left:"\\(",right:"\\)",display:!1}],throwOnError:!1,trust:!0,strict:!1})},[f]),(0,c.useEffect)(()=>{let e=()=>{let e=window.innerHeight,t=document.documentElement.scrollHeight-e;o(Math.min(100,Math.max(0,window.scrollY/t*100)))};return window.addEventListener("scroll",e),e(),()=>window.removeEventListener("scroll",e)},[]);let b=(e,t)=>{navigator.clipboard.writeText(e),u(t),setTimeout(()=>u(null),1500)},_=e=>{g(t=>({...t,[e]:!t[e]}))},v=[`library(tidyverse)
library(here)
library(janitor)
library(readxl)
library(viridis)
library(car)
library(patchwork)
library(broom)
library(stringr)`,`# ============================================================================
# Read in Data 
# ============================================================================

variables <- c("Regional_AW_Vol", "Regional_ICA", "Regional_ETc_Vol", "Regional_Ep_Vol")

original_names <- c(
  "V1" = "Year", "V2" = "RO", "V3" = "HR", "V4" = "PA", "V5" = "DAU-Co", 
  "V6" = "Grain", "V7" = "Rice", "V8" = "Cotton", "V9" = "Sugar Beet", 
  "V10" = "Corn", "V11" = "Dry Beans", "V12" = "Safflower", 
  "V13" = "Other Field", "V14" = "Alfalfa", "V15" = "Pasture",
  "V16" = "Tomato Processing", "V17" = "Tomato Fresh", "V18" = "Cucurbits", 
  "V19" = "Onion & Garlic", "V20" = "Potatoes", "V21" = "Truck Crops", 
  "V22" = "Almonds & Pistachios", "V23" = "Other Deciduous", 
  "V24" = "Citrus & Subtropical", "V25" = "Vineyard", "V26" = "Total"
)

all_tables <- list()
for (parameter in variables) {
  temporary_sheet <- read_excel(here::here("data", "water_use.xlsx"), 
                                sheet = parameter, 
                                skip = 1) 
  
  # Clean Sheet
  temporary_sheet <- temporary_sheet %>% 
    select_if(~!all(is.na(.))) %>% 
    remove_empty(which = "cols")
  
  # Remove column unique to Regional_ICA (Multi-Crop)
  if(parameter == "Regional_ICA") {
    indices_to_remove <- grep("ulti", names(temporary_sheet))
    temporary_sheet <- temporary_sheet[, -indices_to_remove]
  }
  
  # Create index of year columns and space between year columns
  year_index <- grep("Year", names(temporary_sheet))
  intervals <- c(diff(year_index), ncol(temporary_sheet) - year_index[length(year_index)] + 1)
  
  # Initalize list for storing the blocks from each parameter
  blocks <- list()
  
  for (count in seq_along(year_index)) {
    start <- year_index[count]
    end   <- start + intervals[count] - 1

    block <- temporary_sheet[, start:end, drop = FALSE]
    colnames(block) <- paste0("V", seq_len(ncol(block)))
    
    # Only keep rows with four digit number in the year column
    block <- block %>%
      filter(grepl("^\\\\d{4}$", V1))
    
    # Convert all columns to character for safe binding
    block <- block %>%
      mutate(across(everything(), as.character))
    
    blocks[[length(blocks) + 1]] <- block
    blocks[[count]] <- block
  }
  
  df_stacked <- bind_rows(blocks) 
  colnames(df_stacked) <- original_names[colnames(df_stacked)]
  
  pivoted_table <- df_stacked %>%
    pivot_longer(
      cols = !c("Year", "RO", "HR", "PA", "DAU-Co"),
      names_to = "Crop_Type",
      values_to = "Value"
    ) %>%
    mutate(
      Parameter = parameter,
      Value = suppressWarnings(as.numeric(Value))
    )
  
  all_tables[[parameter]] <- pivoted_table
}

combined_long <- bind_rows(all_tables)

# Now pivot wider to get each parameter as a column
final_data <- bind_rows(all_tables) %>%
  pivot_wider(
    names_from = Parameter,
    values_from = Value,
    values_fn = mean
  ) %>% 
filter(Crop_Type != "Total", Regional_AW_Vol >= 0)`,`# Select vineyard data
vineyard_data <- final_data %>%
  filter(Crop_Type == "Vineyard", Regional_AW_Vol > 0, Regional_ICA > 0) %>%
  mutate(
    across(Regional_AW_Vol:Regional_Ep_Vol, ~replace_na(., 0)), # Remove NA Variables
    aw_per_acre = Regional_AW_Vol / Regional_ICA,
    log_aw = log(Regional_AW_Vol)
  )

# Format Hydrologic Region Names
vineyard_data$HR <- gsub("0[0-9]_", "", vineyard_data$HR)
vineyard_data$HR <- gsub("10_", "", vineyard_data$HR)
vineyard_data$HR <- factor(vineyard_data$HR)

# View
head(vineyard_data, 10)`,`# Get Summary AW Data For Each Region
regional_summary <- vineyard_data %>%
  group_by(HR) %>%
  summarise(
    n = n(),
    mean_AW = mean(Regional_AW_Vol),
    median_AW = median(Regional_AW_Vol),
    sd_AW = sd(Regional_AW_Vol),
    se_AW = sd_AW / sqrt(n)) %>%
  arrange(mean_AW)

regional_summary`,`vineyard_data %>%
  ggplot(aes(x = reorder(HR, Regional_AW_Vol, FUN = median),
             y = Regional_AW_Vol)) +
  geom_boxplot(aes(fill = HR), outlier.alpha = 0.3) +
  scale_fill_viridis_d() +
  scale_y_log10(labels = scales::comma) +
  labs(
    x = "Hydrologic Region",
    y = "Applied Water Volume (Acre-Feet, Log Scale)",
    title = "Applied Water Volume Distribution Across California Regions",
    subtitle = "Regions ordered by median water use"
  ) +
  theme(
    axis.text.x = element_text(angle = 45, hjust = 1),
    legend.position = "none",
    plot.title = element_text(hjust = 0.5, face = "bold"),
    plot.subtitle = element_text(hjust = 0.5)
  )`,`set.seed(123)

gamma_model <- glm(Regional_AW_Vol ~
                        Regional_ETc_Vol + 
                        Regional_Ep_Vol + 
                        log(Regional_ICA) + 
                        HR, 
                     family = Gamma(link = "log"),
                     data = vineyard_data)

summary(gamma_model)`,`# Extract true parameters
true_coefs <- coef(gamma_model)
true_dispersion <- summary(gamma_model)$dispersion

# Function to simulate data
simulate_vineyard_data <- function(predictors, betas, dispersion, n_sim = 1) {
  # Design matrix
   X <- model.matrix(~ Regional_ETc_Vol + Regional_Ep_Vol + 
                      log(Regional_ICA) + HR, data = predictors)
   
  #  Linear predictor (log scale)
  eta <- X %*% betas
   
  # Mean (inverse link)
  mean <- exp(eta)
  
  # Gamma shape parameter 
  shape <- 1 / dispersion
  
  # Simulate response
  y_sim <- rgamma(nrow(predictors), shape = shape, scale = mean / shape)
  
  return(y_sim)
}`,`# Number of simulations
n_sims <- 500 
results <- vector("list", n_sims)

# Run simulations
for (i in 1:n_sims) {
  # Simulate new response
  vineyard_sim <- vineyard_data
  vineyard_sim$Regional_AW_Vol <- simulate_vineyard_data(
    vineyard_data, true_coefs, true_dispersion
  )
  
  # Refit model
  model_sim <- glm(
    Regional_AW_Vol ~ Regional_ETc_Vol + Regional_Ep_Vol + 
    log(Regional_ICA) + HR,
    family = Gamma(link = "log"),
    data = vineyard_sim
  )
  
  # Store results
  results[[i]] <- list(
    coefs = coef(model_sim),
    converged = model_sim$converged
  )
}

# Extract coefficient matrix
coef_matrix <- do.call(rbind, lapply(results, function(x) x$coefs))`,`param_summary <- data.frame(
  Parameter = names(true_coefs),
  True_Value = true_coefs,
  Mean_Estimate = colMeans(coef_matrix),
  SD = apply(coef_matrix, 2, sd),
  CI_Lower = apply(coef_matrix, 2, quantile, 0.025),
  CI_Upper = apply(coef_matrix, 2, quantile, 0.975),
  row.names = NULL
)

# Check if 95% CI contains true value
param_summary <- param_summary %>% mutate(Contain_95 = if_else(
  True_Value >= CI_Lower & True_Value <= CI_Upper, "Yes", "No"
  ))

print(param_summary)`,`model_null <- glm(
  Regional_AW_Vol ~ Regional_ETc_Vol + Regional_Ep_Vol + log(Regional_ICA),
  family = Gamma(link = "log"),
  data = vineyard_data
)

lrt <- anova(model_null, gamma_model, test = "LRT")
print(lrt)

round(lrt$Deviance[2], 2)`,`# Extract regional coefficients
regional_effects <- tidy(gamma_model, conf.int = TRUE) %>%
  filter(grepl("^HR", term)) %>%
  mutate(
    Region = gsub("^HR", "", term),
    pct_change = (exp(estimate) - 1) * 100,
    ci_low = (exp(conf.low) - 1) * 100,
    ci_high = (exp(conf.high) - 1) * 100,
    signif = p.value < 0.05
  ) %>%
  arrange(desc(pct_change))

# Add reference region
reference_region <- levels(vineyard_data$HR)[1]
regional_effects <- regional_effects %>%
  add_row(
    Region = reference_region,
    pct_change = 0,
    ci_low = 0,
    ci_high = 0,
    signif = NA,
    .before = 1
  )

# Display table
regional_effects %>%
  select(Region, pct_change, ci_low, ci_high, signif)`,`ggplot(regional_effects, aes(x = reorder(Region, pct_change), 
                            y = pct_change)) +
  geom_col(aes(fill = pct_change), width = 0.7) +
  geom_errorbar(aes(ymin = ci_low, ymax = ci_high), 
                width = 0.2, linewidth = 0.8) +
  geom_hline(yintercept = 0, linetype = "solid", linewidth = 0.5) +
  scale_fill_viridis_c(
    name = "% Difference in\\nExpected Water Use"
  ) +
  coord_flip() +
  labs(
    title = "Regional Water Use Coefficients",
    subtitle = "Percent difference in expected water use compared to Central Coast (reference region)",
    x = "Hydrologic Region",
    y = "% Difference in Expected Water Use\\n(controlling for climate, precipitation, and vineyard size)",
    caption = "Error bars show 95% confidence intervals"
  ) +
  theme(
    plot.title = element_text(hjust = 0.5, face = "bold", size = 14),
    plot.subtitle = element_text(hjust = 0.5, size = 11),
    legend.position = "none"
  )`,`# Get predictions
vineyard_data$predicted <- predict(gamma_model, type = "response")
vineyard_data$residuals <- residuals(gamma_model, type = "pearson")

# Calculate R-squared
r_squared <- cor(vineyard_data$Regional_AW_Vol, vineyard_data$predicted)^2

# Predicted vs actual plot
ggplot(vineyard_data, aes(x = Regional_AW_Vol, y = predicted)) +
  geom_point(aes(color = HR), alpha = 0.5) +
  geom_abline(slope = 1, intercept = 0, 
              color = "black", linetype = "dashed", linewidth = 1) +
  scale_x_log10(labels = scales::comma) +
  scale_y_log10(labels = scales::comma) +
  scale_color_viridis_d() +
  annotate("text", 
           x = min(vineyard_data$Regional_AW_Vol) * 2, 
           y = max(vineyard_data$predicted) * 0.8,
           label = paste0("R\xb2 = ", round(r_squared, 3)),
           hjust = 0, size = 5, fontface = "bold") +
  labs(
    title = "Model Performance: Predicted vs Observed Water Use",
    x = "Observed Applied Water (Acre-Feet, Log Scale)",
    y = "Predicted Applied Water (Acre-Feet, Log Scale)",
    color = "Hydrologic\\nRegion"
  ) +
  theme(legend.position = "right")`];return(0,t.jsxs)("article",{className:"min-h-screen bg-gray-50",children:[(0,t.jsx)("div",{className:"fixed top-0 left-0 w-full h-1 bg-transparent z-50",children:(0,t.jsx)("div",{className:"h-full bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 transition-all duration-150",style:{width:`${e}%`}})}),(0,t.jsxs)("div",{className:"relative w-full h-96 md:h-[28rem]",children:[(0,t.jsx)("div",{className:"absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-500 via-cyan-500 via-sky-500 to-blue-600"}),(0,t.jsx)("div",{className:"absolute inset-0 bg-black/30"}),(0,t.jsx)("div",{className:"absolute inset-0 flex items-center justify-center px-6",children:(0,t.jsxs)("div",{className:"text-white text-center max-w-4xl",children:[(0,t.jsx)("h1",{className:"text-4xl md:text-5xl font-extrabold tracking-tight mb-4",children:"Regional Water Use Efficiency in California Vineyards"}),(0,t.jsx)("p",{className:"text-sm md:text-base mb-2",children:"Author: William Mullins ・ Date: December 5, 2025"}),(0,t.jsxs)("a",{href:"https://github.com/willrmull/Vineyard_Water_Usage",target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-2 text-white hover:text-gray-300 transition",children:[(0,t.jsx)(n.Github,{className:"w-5 h-5"}),(0,t.jsx)("span",{children:"GitHub"})]})]})})]}),(0,t.jsx)("div",{className:"container mx-auto px-6",children:(0,t.jsxs)("div",{className:"max-w-4xl mx-auto",children:[(0,t.jsxs)(a.default,{href:"/blog",className:"inline-flex items-center text-teal-600 hover:text-teal-800 mt-10 mb-8 transition-colors",children:[(0,t.jsx)(r.ArrowLeft,{className:"w-4 h-4 mr-2"})," Back to Blog"]}),(0,t.jsxs)("header",{className:"mb-12",children:[(0,t.jsxs)("div",{className:"flex gap-2 mb-4 flex-wrap",children:[(0,t.jsx)("span",{className:"px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium",children:"Water Resources"}),(0,t.jsx)("span",{className:"px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium",children:"Agriculture"}),(0,t.jsx)("span",{className:"px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium",children:"Statistical Modeling"})]}),(0,t.jsxs)("div",{className:"flex items-center text-gray-600 text-sm border-b border-gray-200 pb-8",children:[(0,t.jsxs)("span",{className:"flex items-center mr-6",children:[(0,t.jsx)(s.Calendar,{className:"w-4 h-4 mr-2"}),"December 5, 2025"]}),(0,t.jsxs)("span",{className:"flex items-center",children:[(0,t.jsx)(l.Tag,{className:"w-4 h-4 mr-2"}),"R · GLM · Environmental Analysis"]})]})]}),(0,t.jsxs)("div",{ref:y,className:"prose prose-lg prose-slate mx-auto text-gray-700",children:[(0,t.jsx)("h2",{className:"text-3xl font-bold text-gray-900 mb-4",children:"Introduction"}),(0,t.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"The California Water Challenge"}),(0,t.jsx)("p",{className:"text-lg font-semibold text-teal-700 mb-4",children:"Does hydrologic region affect vineyard water use in California, after controlling for evapotranspiration, precipitation, and irrigated crop area?"}),(0,t.jsx)("p",{children:"California's agriculture is the state's dominant water consumer, accounting for approximately 80% of its developed water supply. The efficiency of this water use is paramount for economic resilience and environmental stewardship, particularly as climate change exacerbates drought frequency and intensifies competition for limited resources."}),(0,t.jsx)("p",{children:"Vineyards represent a significant and geographically diverse component of the state's agricultural portfolio, spanning disparate climate zones from the cool coastal valleys to the hot interior regions. While climatic factors are known drivers of water demand, regional differences inherent to California's 10 major hydrologic regions include additional variables such as such as water management practices, regulatory structures, soil characteristics, and crop varieties—may exert an independent and measurable influence on observed water use efficiency."}),(0,t.jsx)("p",{children:"The aim of this analysis is to quantify the magnitude and direction of the independent effect of hydrologic region on vineyard water use efficiency across California."}),(0,t.jsxs)("div",{className:"grid md:grid-cols-2 gap-8 my-8",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h4",{className:"text-xl font-semibold text-gray-800 mb-3",children:"California Hydrologic Regions"}),(0,t.jsx)("p",{children:"The state is divided into 10 hydrologic regions, each with distinct climate characteristics that influence agricultural water demand."})]}),(0,t.jsx)("div",{className:"flex justify-center",children:(0,t.jsx)("div",{className:"w-full max-w-sm",children:(0,t.jsx)("div",{className:"relative h-96 w-full",children:(0,t.jsx)(i.default,{src:"/images/HR_ZONES.png",alt:"California Hydrologic Regions map",fill:!0,sizes:"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",className:"object-contain rounded",priority:!0})})})})]}),(0,t.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"About the Data"}),(0,t.jsxs)("p",{children:["Data was extracted from the California Department of Water Resources"," ",(0,t.jsx)("strong",{children:"Statewide Agricultural Water Use Data (2016-2020)"})," ","Excel Application Tool. This dataset provides annual estimates for water use variables across 20 crop types and multiple geographic scales."]}),(0,t.jsx)("p",{children:(0,t.jsx)("strong",{children:"Key variables used in this analysis:"})}),(0,t.jsxs)("ul",{className:"list-disc pl-6 space-y-2 mb-6",children:[(0,t.jsxs)("li",{children:[(0,t.jsx)("strong",{children:"Regional Applied Water Volume (AW)"}),": Total irrigation water applied to vineyards in acre-feet"]}),(0,t.jsxs)("li",{children:[(0,t.jsx)("strong",{children:"Regional Irrigated Crop Area (ICA)"}),": Total vineyard acreage receiving irrigation"]}),(0,t.jsxs)("li",{children:[(0,t.jsxs)("strong",{children:["Regional Crop Evapotranspiration (","$ET_c$",")"]}),": Total water lost to atmosphere from soil and plants (acre-feet)—represents crop water demand"]}),(0,t.jsxs)("li",{children:[(0,t.jsxs)("strong",{children:["Regional Effective Precipitation (","$E_p$",")"]}),": Rainfall that effectively contributes to crop water needs (acre-feet)"]}),(0,t.jsxs)("li",{children:[(0,t.jsx)("strong",{children:"Hydrologic Region (HR)"}),": California's 10 major hydrologic regions, defined by watershed boundaries and climate characteristics"]})]}),(0,t.jsxs)("p",{children:["Data availability:"," ",(0,t.jsx)("a",{href:"https://data.ca.gov/dataset/statewide-agricultural-water-use-data-2016-2020",className:"text-teal-600 hover:text-teal-800 underline",target:"_blank",rel:"noopener noreferrer",children:"California DWR Water Use Data"}),"."]}),(0,t.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"Directed Acyclic Graph (DAG)"}),(0,t.jsx)("p",{children:"The following DAG illustrates the conceptual model of how the variables relate:"}),(0,t.jsxs)("ol",{className:"list-decimal pl-6 space-y-3 mb-6",children:[(0,t.jsxs)("li",{children:[(0,t.jsx)("strong",{children:"Hydrologic Region (HR) → Climate Driven Variables"}),": HR defines the local climate conditions. Different regions have different temperatures, humidity, and weather patterns. This drives both ","$ET_c$"," (water lost) and ","$E_p$"," (water gained naturally)."]}),(0,t.jsxs)("li",{children:[(0,t.jsx)("strong",{children:"Climate Driven Variables → Water Use"}),": After accounting for natural water supply (","$E_p$","), the deficit between demand (","$ET_c$",") and supply must be met through irrigation."]}),(0,t.jsxs)("li",{children:[(0,t.jsx)("strong",{children:"Vineyard Size (ICA) → Total Volume"}),": Larger vineyards require proportionally more total water (a scaling relationship)."]})]}),(0,t.jsx)("p",{children:"After controlling for climate and size, regional coefficients isolate potential management efficiency differences. The reference region (Central Coast) represents the efficiency baseline."}),(0,t.jsx)("div",{className:"flex justify-center",children:(0,t.jsx)("div",{className:"my-6 w-full max-w-5xl",children:(0,t.jsx)("div",{className:"relative h-96 w-full",children:(0,t.jsx)(i.default,{src:"/images/D.png",alt:"Directed Acyclic Graph (DAG)",fill:!0,sizes:"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",className:"object-contain rounded"})})})}),(0,t.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"Import Packages"}),(0,t.jsx)("p",{children:"The analysis requires the following packages:"}),(0,t.jsx)(m,{code:v[0],index:0,title:"Import Packages",expandedCode:p,copiedIndex:d,onToggle:_,onCopy:b}),(0,t.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"Data Processing Pipeline"}),(0,t.jsx)("p",{children:"The data is stored in an Excel application, which means that data for each of the variables is stored on its own individual sheets. The following code is used to read in data from each of the sheets and convert it into a standard data frame."}),(0,t.jsx)(m,{code:v[1],index:1,title:"Read in Data",expandedCode:p,copiedIndex:d,onToggle:_,onCopy:b}),(0,t.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"Data Preparation"}),(0,t.jsx)("p",{children:"Now that the data has been read in, we can select data collected from vineyards which applied water to their crops."}),(0,t.jsx)(m,{code:v[2],index:2,title:"Data Preparation",expandedCode:p,copiedIndex:d,onToggle:_,onCopy:b}),(0,t.jsx)("h2",{className:"text-3xl font-bold text-gray-900 mt-12 mb-4",children:"Data Exploration"}),(0,t.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"Regional Water Use Summary"}),(0,t.jsx)(m,{code:v[3],index:3,title:"Regional Summary Statistics",expandedCode:p,copiedIndex:d,onToggle:_,onCopy:b}),(0,t.jsx)(h,{headers:["Hydrologic Region","n","Mean AW","Median AW","SD","SE"],rows:[["South Lahontan",23,"128.78","39.43","295.28","61.57"],["South Coast",46,"1,287.72","296.49","2,120.16","312.60"],["Sacramento River",206,"3,631.83","134.91","8,249.17","574.75"],["North Coast",121,"5,936.57","443.85","10,137.34","921.58"],["Colorado River",25,"6,748.80","386.15","13,446.13","2,689.23"],["Central Coast",163,"9,917.94","1,476.95","22,978.53","1,799.82"],["San Francisco Bay",80,"10,135.80","138.55","25,803.39","2,884.91"],["San Joaquin River",182,"17,764.87","3,262.99","41,878.19","3,104.22"],["Tulare Lake",166,"38,072.24","5,663.51","58,246.36","4,520.79"]],caption:"Applied Water (AW) summary statistics by Hydrologic Region"}),(0,t.jsx)("p",{children:(0,t.jsx)("strong",{children:"Key observations:"})}),(0,t.jsxs)("ul",{className:"list-disc pl-6 space-y-2 mb-6",children:[(0,t.jsxs)("li",{children:[(0,t.jsx)("strong",{children:"Large variation between regions"}),": Mean water use ranges from 129 acre-feet (South Lahontan) to 38,072 acre-feet (Tulare Lake)—a nearly 300-fold difference"]}),(0,t.jsxs)("li",{children:[(0,t.jsx)("strong",{children:"High within-region variability"}),": Standard deviations exceed means in all regions, indicating right-skewed distributions"]}),(0,t.jsxs)("li",{children:[(0,t.jsxs)("strong",{children:["Median ","<"," Mean everywhere"]}),": Consistent with right skew caused by a few very large vineyard operations"]})]}),(0,t.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"Distribution of Water Use"}),(0,t.jsx)("p",{children:"This log-scale boxplot reveals that while most regions have modest median use (100-1,000 acre-feet), there are many high water volume outliers in regions like Central Coast, San Joaquin River, and Tulare Lake."}),(0,t.jsx)(m,{code:v[4],index:4,title:"Box Plot Code",expandedCode:p,copiedIndex:d,onToggle:_,onCopy:b}),(0,t.jsx)("div",{className:"flex justify-center",children:(0,t.jsx)("div",{className:"my-6 w-full max-w-5xl",children:(0,t.jsx)("div",{className:"relative h-96 w-full",children:(0,t.jsx)(i.default,{src:"/images/boxplot_aw.png",alt:"Box Plot of Applied Water Volume by Hydrologic Region",fill:!0,sizes:"(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw",className:"object-contain rounded",priority:!0})})})}),(0,t.jsx)("h2",{className:"text-3xl font-bold text-gray-900 mt-12 mb-4",children:"Statistical Model"}),(0,t.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"Model Specification"}),(0,t.jsx)("h4",{className:"text-xl font-semibold text-gray-800 mt-6 mb-2",children:"Why Gamma?"}),(0,t.jsx)("p",{children:"The Gamma distribution is appropriate here because:"}),(0,t.jsxs)("ol",{className:"list-decimal pl-6 space-y-2 mb-6",children:[(0,t.jsxs)("li",{children:[(0,t.jsx)("strong",{children:"Positive support"}),": Water use cannot be zero or negative in irrigated areas"]}),(0,t.jsxs)("li",{children:[(0,t.jsx)("strong",{children:"Right-skewed"}),": The distribution has a long right tail (high outliers)"]}),(0,t.jsxs)("li",{children:[(0,t.jsx)("strong",{children:"Mean-variance relationship"}),": Variance increases with the mean (heteroscedasticity)"]})]}),(0,t.jsx)("h4",{className:"text-xl font-semibold text-gray-800 mt-6 mb-2",children:"Model Statistical Notation"}),(0,t.jsx)("div",{className:"my-4 overflow-x-auto text-center py-2",children:"$$Y_i \\sim \\text{Gamma}(\\text{shape} = k, \\text{scale} = \\theta_i)$$"}),(0,t.jsx)("p",{children:(0,t.jsx)("strong",{children:"Where:"})}),(0,t.jsxs)("ul",{className:"list-disc pl-6 space-y-2 mb-6",children:[(0,t.jsxs)("li",{children:["$Y_i$"," = Regional Applied Water Volume for observation"," ","$i$"]}),(0,t.jsxs)("li",{children:["$k = 1/\\phi$"," is the shape parameter (constant across observations)"]}),(0,t.jsxs)("li",{children:["$\\phi$"," is the dispersion parameter"]}),(0,t.jsxs)("li",{children:["$\\theta_i$"," is the scale parameter (varies by observation)"]})]}),(0,t.jsx)("p",{children:(0,t.jsx)("strong",{children:"Gamma Regression Equation:"})}),(0,t.jsx)("div",{className:"my-4 overflow-x-auto text-center py-2",children:"$$\\log(\\mu) = \\beta_0 + \\beta_1 ET_c + \\beta_2 E_p + \\beta_3 \\log(ICA) + \\beta_4 HR_4 + \\beta_5 HR_5 + \\cdots + \\beta_k HR_k$$"}),(0,t.jsx)("p",{children:(0,t.jsx)("strong",{children:"Coefficient Interpretation:"})}),(0,t.jsxs)("ul",{className:"list-disc pl-6 space-y-2 mb-6",children:[(0,t.jsxs)("li",{children:["$\\beta_1, \\beta_2$",": Multiplicative change in water use per unit increase in ","$ET_c$"," or ","$E_p$"]}),(0,t.jsxs)("li",{children:["$\\beta_3$",": Change in water use per % change in vineyard area"]}),(0,t.jsxs)("li",{children:["$\\beta_4 - \\beta_{11}$",": Regional multiplier relative to Central Coast (reference region)"]})]}),(0,t.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"Model Fitting"}),(0,t.jsx)(m,{code:v[5],index:5,title:"Gamma Model",expandedCode:p,copiedIndex:d,onToggle:_,onCopy:b}),(0,t.jsx)(h,{headers:["Parameter","Estimate","Std. Error","t value","Pr(>|t|)"],rows:[["(Intercept)","7.473e-01","1.753e-02","42.624","< 2e-16 ***"],["Regional_ETc_Vol","9.758e-07","3.035e-07","3.215","0.00135 **"],["Regional_Ep_Vol","-7.294e-06","2.672e-06","-2.730","0.00645 **"],["log(Regional_ICA)","1.010e+00","2.213e-03","456.617","< 2e-16 ***"],["HRColorado River","6.531e-01","3.313e-02","19.712","< 2e-16 ***"],["HRNorth Coast","-1.257e-02","1.857e-02","-0.677","0.49850"],["HRSacramento River","2.045e-01","1.645e-02","12.432","< 2e-16 ***"],["HRSan Francisco Bay","5.207e-02","2.117e-02","2.460","0.01406 *"],["HRSan Joaquin River","2.495e-01","1.660e-02","15.029","< 2e-16 ***"],["HRSouth Coast","3.332e-01","2.572e-02","12.956","< 2e-16 ***"],["HRSouth Lahontan","5.557e-01","3.475e-02","15.993","< 2e-16 ***"],["HRTulare Lake","5.399e-01","1.755e-02","30.769","< 2e-16 ***"]],caption:"Gamma GLM Coefficient Estimates (Dispersion parameter: 0.0234)"}),(0,t.jsx)("p",{className:"text-sm text-gray-600 mt-2",children:"Signif. codes: 0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1"}),(0,t.jsx)("h2",{className:"text-3xl font-bold text-gray-900 mt-12 mb-4",children:"Model Validation Through Simulation"}),(0,t.jsx)("p",{children:"To ensure the model is correctly specified and is able to reliably estimate parameters, simulations are used. This process involves:"}),(0,t.jsxs)("ol",{className:"list-decimal pl-6 space-y-2 mb-6",children:[(0,t.jsx)("li",{children:'Using coefficients from the model as the "true" values'}),(0,t.jsx)("li",{children:"Generating 500 synthetic datasets using those parameters"}),(0,t.jsx)("li",{children:"Refitting the model for each dataset"}),(0,t.jsx)("li",{children:"Checking if that model recovers the true parameters"})]}),(0,t.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"Simulation Procedure"}),(0,t.jsx)(m,{code:v[6],index:6,title:"Simulation Function",expandedCode:p,copiedIndex:d,onToggle:_,onCopy:b}),(0,t.jsx)(m,{code:v[7],index:7,title:"Run Simulations",expandedCode:p,copiedIndex:d,onToggle:_,onCopy:b}),(0,t.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"Simulation Results"}),(0,t.jsx)(m,{code:v[8],index:8,title:"Parameter Summary",expandedCode:p,copiedIndex:d,onToggle:_,onCopy:b}),(0,t.jsx)(h,{headers:["Parameter","True Value","Recovered","Difference","% Error"],rows:[["(Intercept)","7.473e-01","7.427e-01","4.60e-03","0.62"],["Regional_ETc_Vol","9.758e-07","8.633e-07","1.12e-07","11.52"],["Regional_Ep_Vol","-7.294e-06","-8.424e-06","1.13e-06","15.49"],["log(Regional_ICA)","1.010e+00","1.010e+00","3.76e-04","0.04"],["HRColorado River","6.531e-01","6.622e-01","-9.14e-03","1.40"],["HRNorth Coast","-1.257e-02","-5.219e-03","-7.35e-03","58.49"],["HRSacramento River","2.045e-01","1.988e-01","5.74e-03","2.80"],["HRSan Francisco Bay","5.207e-02","3.966e-02","1.24e-02","23.84"],["HRSan Joaquin River","2.495e-01","2.610e-01","-1.15e-02","4.62"],["HRSouth Coast","3.332e-01","3.452e-01","-1.20e-02","3.59"],["HRSouth Lahontan","5.557e-01","5.573e-01","-1.54e-03","0.28"],["HRTulare Lake","5.399e-01","5.557e-01","-1.58e-02","2.93"]],caption:"Parameter Recovery Summary (Mean absolute % error: 10.47, Max: 58.49)"}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{children:"Interpretation"}),": For all of the parameters the model was able to recover the true value of the mean within its 95% confidence interval. This suggests that the model is successfully able to recover the parameter values."]}),(0,t.jsx)("h2",{className:"text-3xl font-bold text-gray-900 mt-12 mb-4",children:"Statistical Inference"}),(0,t.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"Hypothesis Testing"}),(0,t.jsx)("h4",{className:"text-xl font-semibold text-gray-800 mt-6 mb-2",children:"Overall Test: Do Regions Differ?"}),(0,t.jsx)("p",{children:(0,t.jsxs)("strong",{children:["Null Hypothesis (","$H_0$","):"]})}),(0,t.jsx)("div",{className:"my-4 overflow-x-auto text-center py-2",children:"$$\\beta_4 = \\beta_5 = \\cdots = \\beta_{11} = 0$$"}),(0,t.jsx)("p",{children:"All HR coefficients are zero, meaning there are NO differences in water use between hydrologic regions after controlling for climate factors and vineyard size."}),(0,t.jsx)("p",{children:(0,t.jsxs)("strong",{children:["Alternative Hypothesis (","$H_1$","):"]})}),(0,t.jsx)("div",{className:"my-4 overflow-x-auto text-center py-2",children:"$$\\text{At least one } \\beta_i \\neq 0$$"}),(0,t.jsx)("p",{children:"At least one region differs in water use, indicating that regional factors beyond climate (e.g., efficiency, technology, regulations) affect water use."}),(0,t.jsx)("h4",{className:"text-xl font-semibold text-gray-800 mt-6 mb-2",children:"Likelihood Ratio Test"}),(0,t.jsxs)("p",{children:["The ","$H_0$"," is tested by comparing the full gamma model (with HR) to a reduced gamma model (without HR):"]}),(0,t.jsx)(m,{code:v[9],index:9,title:"Likelihood Ratio Test",expandedCode:p,copiedIndex:d,onToggle:_,onCopy:b}),(0,t.jsx)(h,{headers:["Model","Resid. Df","Resid. Dev","Df","Deviance","Pr(>Chi)"],rows:[["Null (without HR)","1008","63.545","-","-","-"],["Full (with HR)","1000","23.979","8","39.566","< 2.2e-16 ***"]],caption:"Analysis of Deviance Table (Likelihood Ratio Test)"}),(0,t.jsx)("p",{children:(0,t.jsx)("strong",{children:"Results:"})}),(0,t.jsxs)("ul",{className:"list-disc pl-6 space-y-2 mb-6",children:[(0,t.jsxs)("li",{children:[(0,t.jsx)("strong",{children:"Test Statistic"}),": ","$\\chi^2$"," = 39.57 (df = 8)"]}),(0,t.jsxs)("li",{children:[(0,t.jsx)("strong",{children:"P-value"}),": ","<"," 2.2e-16"]}),(0,t.jsxs)("li",{children:[(0,t.jsx)("strong",{children:"Conclusion"}),": We"," ",(0,t.jsx)("strong",{children:"reject the null hypothesis"}),". There is evidence that the hydrologic regions affect the water applied by vineyards even after controlling for climate demand, precipitation, and vineyard size."]})]}),(0,t.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"Individual Region Comparisons"}),(0,t.jsx)(m,{code:v[10],index:10,title:"Regional Effects",expandedCode:p,copiedIndex:d,onToggle:_,onCopy:b}),(0,t.jsx)("h4",{className:"text-xl font-semibold text-gray-800 mt-6 mb-2",children:"Percent Change Calculation"}),(0,t.jsx)("div",{className:"my-4 overflow-x-auto text-center py-2",children:"$$\\text{Percent Change} = (\\exp(\\beta_j) - 1) \\times 100\\%$$"}),(0,t.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"Visualizing Regional Coefficients"}),(0,t.jsx)(m,{code:v[11],index:11,title:"Regional Coefficients Plot",expandedCode:p,copiedIndex:d,onToggle:_,onCopy:b}),(0,t.jsx)("div",{className:"flex justify-center",children:(0,t.jsx)("div",{className:"my-6 w-full max-w-5xl",children:(0,t.jsx)("div",{className:"relative h-96 w-full",children:(0,t.jsx)(i.default,{src:"/images/refcomp.png",alt:"Box Plot of Applied Water Volume by Hydrologic Region",fill:!0,sizes:"(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw",className:"object-contain rounded",priority:!0})})})}),(0,t.jsx)("p",{children:"Of the nine regions, only one, the North Coast, did not differ a statistically significant amount from the coefficient of the Central Coast."}),(0,t.jsx)("h2",{className:"text-3xl font-bold text-gray-900 mt-12 mb-4",children:"Model Fit and Diagnostics"}),(0,t.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"Predicted vs Observed Values"}),(0,t.jsx)(m,{code:v[12],index:12,title:"Model Diagnostics",expandedCode:p,copiedIndex:d,onToggle:_,onCopy:b}),(0,t.jsx)("h4",{className:"text-xl font-semibold text-gray-800 mt-6 mb-2",children:"Model Validation Metric"}),(0,t.jsx)("div",{className:"my-4 overflow-x-auto text-center py-2",children:"$$R^2 = \\text{cor}\\left(y_i, \\hat{y}_i\\right)^2$$"}),(0,t.jsx)("div",{className:"flex justify-center",children:(0,t.jsx)("div",{className:"my-6 w-full max-w-5xl",children:(0,t.jsx)("div",{className:"relative h-96 w-full",children:(0,t.jsx)(i.default,{src:"/images/actualpredicted.png",alt:"ActualvsPredicted",fill:!0,sizes:"(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw",className:"object-contain rounded",priority:!0})})})}),(0,t.jsxs)("p",{children:["The model explains ",(0,t.jsx)("strong",{children:"98.6%"})," of variance in water use, indicating excellent fit."]}),(0,t.jsx)("h2",{className:"text-3xl font-bold text-gray-900 mt-12 mb-4",children:"Discussion"}),(0,t.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"Key Findings"}),(0,t.jsxs)("p",{children:["This analysis provides evidence that"," ",(0,t.jsx)("strong",{children:"hydrologic regions in California differ substantially in vineyard water use efficiency"})," ","even after accounting for climate-driven water demand, effective precipitation, and vineyard size."]}),(0,t.jsx)("h4",{className:"text-xl font-semibold text-gray-800 mt-6 mb-2",children:"Main Results"}),(0,t.jsxs)("ol",{className:"list-decimal pl-6 space-y-3 mb-6",children:[(0,t.jsxs)("li",{children:[(0,t.jsx)("strong",{children:"Regional effects are statistically significant and large"}),(0,t.jsxs)("ul",{className:"list-disc pl-6 mt-2 space-y-1",children:[(0,t.jsxs)("li",{children:["LRT test: ","$\\chi^2$"," = 39.6, p ","<"," 0.001"]}),(0,t.jsx)("li",{children:"Coefficients ranged from -1% to +92% percent different from reference level"})]})]}),(0,t.jsxs)("li",{children:[(0,t.jsx)("strong",{children:"Three regions show substantially higher coefficients"}),(0,t.jsxs)("ul",{className:"list-disc pl-6 mt-2 space-y-1",children:[(0,t.jsx)("li",{children:"Colorado River: 92% higher expected water use"}),(0,t.jsx)("li",{children:"Tulare Lake: 72% higher expected water use"}),(0,t.jsx)("li",{children:"South Lahontan: 74% higher expected water use"})]})]}),(0,t.jsxs)("li",{children:[(0,t.jsx)("strong",{children:"Model validation confirms reliability"}),(0,t.jsxs)("ul",{className:"list-disc pl-6 mt-2 space-y-1",children:[(0,t.jsx)("li",{children:"Simulation showed parameter recovery"}),(0,t.jsxs)("li",{children:["High ","$R^2$"," (0.986) — the majority of variation can be explained by the model"]})]})]})]}),(0,t.jsx)("h3",{className:"text-2xl font-semibold text-gray-800 mt-8 mb-3",children:"Future Directions"}),(0,t.jsx)("p",{children:"Further investigation should be done into finding what is causing the regional variation in water use between the regions. The results of this investigation imply that additional variables outside of water need are affecting some of these regions. Investigations should look into whether this is caused by management decisions or by additional environmental factors not considered in this study."})]})]})})]})}e.s(["default",()=>u])}]);