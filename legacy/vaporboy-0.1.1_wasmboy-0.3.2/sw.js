"use strict";var precacheConfig=[["assets/borders/gbaBorder.png","0ba19d15d5750062478e7429fafe860a"],["assets/borders/gbcBorder.png","12a8ce0773d3782b2dbdc04c20bdfe3c"],["assets/borders/supergameboy-1.png","1f8878e64f56d756ccd51fd25b196874"],["assets/cartridges/512/cartridge-black.jpg","5f65975eec21863d61488d88be47db4f"],["assets/cartridges/512/cartridge-black.png","5091b77937d7e52c0514cc50454a801a"],["assets/cartridges/512/cartridge-grey-blank.jpg","8c2c783d71ce0fd7ed60b69fadbbdd64"],["assets/cartridges/512/cartridge-grey-blank.png","6c6e6f85d3832332992cd799a55c6520"],["assets/cartridges/512/cartridge-grey.jpg","55c25ca4bc5a90446b644176e835741b"],["assets/cartridges/512/cartridge-grey.png","4048d18fb01871f2157fa2a29b202b51"],["assets/cartridges/original/cartridge-black.png","d793fba5552154832c6607b8ea12f16b"],["assets/cartridges/original/cartridge-grey-blank.png","ceb9fd42d9c0a235c494acb90ab13a7e"],["assets/cartridges/original/cartridge-grey.png","259f38f1e944d2360e0f3d886759c8c3"],["assets/favicon.ico","ad3a6564f054edb9ea0659cc2cbcb18d"],["assets/homebrew/geometrix/geometrix.gbc","65ff11b0a8a995b94019091c3c49050b"],["assets/homebrew/geometrix/geometrix.png","3ec6d1af3cece89a0065789cdd0822aa"],["assets/homebrew/tobutobugirl/tobutobugirl.gb","48ea776eace6f2582b70dc965cf2df1f"],["assets/homebrew/tobutobugirl/tobutobugirl.png","6561d6b092a084d1826b2b91df92dfd5"],["assets/homebrew/ucity/ucity.gbc","a13bebff10a53c113554b8e882343d9d"],["assets/homebrew/ucity/ucity.png","d1ff999554f7cf094a0461fa4297df89"],["assets/icon.png","cf3fdf7af60a294d6d3f48cb7ad82488"],["assets/icons/mipmap-hdpi/VaporBoyAppIcon.png","96a7dca335c48fd833af5e8de239836e"],["assets/icons/mipmap-mdpi/VaporBoyAppIcon.png","64d520ed1ea72df4288dfd898f25def0"],["assets/icons/mipmap-xhdpi/VaporBoyAppIcon.png","7df1d3bbc269e4020a89940d3a7db2ba"],["assets/icons/mipmap-xxhdpi/VaporBoyAppIcon.png","b5c6a72c78aa83d275e880e5734fef3d"],["assets/icons/mipmap-xxxhdpi/VaporBoyAppIcon.png","47c2d83bfd1f6498ad4d8aea2f174f32"],["assets/icons/web_hi_res_512.png","3d7fcbaede049690c851daa1bb3d5951"],["assets/iosAddToHomescreen.png","acc996a555caae89b78df06f9fe84b94"],["assets/iosShare.png","d7704f6cffa4dc8343df27f3b79203d5"],["assets/privacypolicy.html","b3bbb935bbb1cf69ad68c48bcf595810"],["assets/robots.txt","5e0bd1c281a62a380d7a948085bfe2d1"],["assets/vaporboy/512/vaporboyarizona.jpg","2e031c8835e9e2c8c4809d313b11763e"],["assets/vaporboy/512/vaporboyarizona.png","d065de5ef2df73ce1961dcf3b0d779c7"],["assets/vaporboy/512/vaporboybluebeach.jpg","7b2d5d2b3713354ce881c7b87db669a7"],["assets/vaporboy/512/vaporboybluebeach.png","c3a3c3f51f923fb36584a26a23e6c912"],["assets/vaporboy/512/vaporboyvhs.jpg","bd234c57a664cdc98e8a0823e39b60b3"],["assets/vaporboy/512/vaporboyvhs.png","ff1feeb63f4031c83a6f74f251518e4c"],["assets/vaporboy/original/vaporboyarizona.png","fadf695ca4b5ea4ef2f101da83c669d8"],["assets/vaporboy/original/vaporboybluebeach.png","8fd33647b92b8ce1baa14c3f16b3af25"],["assets/vaporboy/original/vaporboyvhs.png","a95e4edcc8b0f5e0d0583c8067e01ebe"],["bundle.a4a83.js","ff30fa6b4b77d85df6ef43913631612d"],["favicon.ico","ad3a6564f054edb9ea0659cc2cbcb18d"],["index.html","a8faa988d283214256c9cb6bde078ab1"],["manifest.json","34242dc07c2ccc220862c49f2056bb0a"],["style.ce50c.css","920454245a0f4d2b40e93011d70347a6"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var r=new URL(e);return"/"===r.pathname.slice(-1)&&(r.pathname+=a),r.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,r,s){var t=new URL(e);return s&&t.pathname.match(s)||(t.search+=(t.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(r)),t.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var r=new URL(a).pathname;return e.some(function(e){return r.match(e)})},stripIgnoredUrlParameters=function(e,a){var r=new URL(e);return r.hash="",r.search=r.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),r.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],r=e[1],s=new URL(a,self.location),t=createCacheKey(s,hashParamName,r,!1);return[s.toString(),t]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(r){if(!a.has(r)){var s=new Request(r,{credentials:"same-origin"});return fetch(s).then(function(a){if(!a.ok)throw new Error("Request for "+r+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(r,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(r){return Promise.all(r.map(function(r){if(!a.has(r.url))return e.delete(r)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,r=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(a=urlsToCacheKeys.has(r))||(r=addDirectoryIndex(r,"index.html"),a=urlsToCacheKeys.has(r));!a&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(r=new URL("index.html",self.location).toString(),a=urlsToCacheKeys.has(r)),a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(r)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});