parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"JPWb":[function(require,module,exports) {
var i=Vue,e=i.createApp,t=i.ref,o=i.computed,s=i.onMounted,n=[{id:"economy",label:"経済"},{id:"entertainment",label:"エンタメ"},{id:"sports",label:"スポーツ"},{id:"technology",label:"テクノロジー"}],a=[{id:0,thumbnail:"https://picsum.photos/id/237/800/450",title:"経済タイトル1",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proinornare magna eros, eu pellentesque tortor vestibulum ut.Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",author:"John Smith",categories:["economy"]},{id:1,thumbnail:"https://picsum.photos/id/238/800/450",title:"エンタメタイトル1",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proinornare magna eros, eu pellentesque tortor vestibulum ut.Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",author:"John Smith",categories:["entertainment"]},{id:2,thumbnail:"https://picsum.photos/id/239/800/450",title:"スポーツタイトル1",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proinornare magna eros, eu pellentesque tortor vestibulum ut.Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",author:"John Smith",categories:["sports"]},{id:3,thumbnail:"https://picsum.photos/id/240/800/450",title:"テクノロジータイトル1",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proinornare magna eros, eu pellentesque tortor vestibulum ut.Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",author:"John Smith",categories:["technology"]},{id:4,thumbnail:"https://picsum.photos/id/241/800/450",title:"経済タイトル2",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proinornare magna eros, eu pellentesque tortor vestibulum ut.Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",author:"John Smith",categories:["economy"]},{id:5,thumbnail:"https://picsum.photos/id/242/800/450",title:"経済タイトル3",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proinornare magna eros, eu pellentesque tortor vestibulum ut.Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",author:"John Smith",categories:["economy"]},{id:6,thumbnail:"https://picsum.photos/id/243/800/450",title:"経済タイトル4",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proinornare magna eros, eu pellentesque tortor vestibulum ut.Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",author:"John Smith",categories:["economy"]}],r=e({setup:function(){var i=n.map(function(i){return i.id}),e=t(""),s=t(n),r=t(n[0].id),u=o(function(){var e={};return i.forEach(function(i){var t=a.filter(function(e){return e.categories.includes(i)});e[i]={items:t,category:i}}),e}),m=t(!1);return{categoryItems:s,currentCategoryId:r,onClickCategory:function(t){var o=i.indexOf(r.value),s=i.indexOf(t);e.value=o<s?"left":"right",document.startViewTransition(function(){r.value=t})},mediaItemsCategorize:u,mediaItemsWrapperClass:e,isOpenModal:m,openModal:function(){e.value="",document.startViewTransition(function(){m.value=!0})},closeModal:function(){document.startViewTransition(function(){m.value=!1})}}}}),u='\n<article class="media">\n  <figure class="media-left">\n    <p class="image is-16by9">\n      <img v-if="showThumbnail" :src="thumbnail" :class="\'image-item-\' + id" />\n    </p>\n  </figure>\n  <div class="media-content">\n    <div class="content">\n      <h3>{{ title }}</h3>\n      <p>{{ description }}</p>\n      <p><small>{{ author }}</small></p>\n    </div>\n  </div>\n</article>\n';r.component("media",{props:["id","thumbnail","title","description","author","showThumbnail"],template:u}),r.mount("#app");
},{}]},{},["JPWb"], null)
//# sourceMappingURL=/canvas-practice/script.f04d1339.js.map