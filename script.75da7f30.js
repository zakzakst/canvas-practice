// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"script.js":[function(require,module,exports) {
var _Vue = Vue,
  createApp = _Vue.createApp,
  ref = _Vue.ref,
  computed = _Vue.computed,
  onMounted = _Vue.onMounted;
var categoryItemsData = [{
  id: "economy",
  label: "経済"
}, {
  id: "entertainment",
  label: "エンタメ"
}, {
  id: "sports",
  label: "スポーツ"
}, {
  id: "technology",
  label: "テクノロジー"
}];
var mediaItemsData = [{
  id: 0,
  thumbnail: "https://picsum.photos/id/237/800/450",
  title: "経済タイトル1",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proinornare magna eros, eu pellentesque tortor vestibulum ut.Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",
  author: "John Smith",
  categories: ["economy"]
}, {
  id: 1,
  thumbnail: "https://picsum.photos/id/238/800/450",
  title: "エンタメタイトル1",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proinornare magna eros, eu pellentesque tortor vestibulum ut.Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",
  author: "John Smith",
  categories: ["entertainment"]
}, {
  id: 2,
  thumbnail: "https://picsum.photos/id/239/800/450",
  title: "スポーツタイトル1",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proinornare magna eros, eu pellentesque tortor vestibulum ut.Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",
  author: "John Smith",
  categories: ["sports"]
}, {
  id: 3,
  thumbnail: "https://picsum.photos/id/240/800/450",
  title: "テクノロジータイトル1",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proinornare magna eros, eu pellentesque tortor vestibulum ut.Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",
  author: "John Smith",
  categories: ["technology"]
}, {
  id: 4,
  thumbnail: "https://picsum.photos/id/241/800/450",
  title: "経済タイトル2",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proinornare magna eros, eu pellentesque tortor vestibulum ut.Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",
  author: "John Smith",
  categories: ["economy"]
}, {
  id: 5,
  thumbnail: "https://picsum.photos/id/242/800/450",
  title: "経済タイトル3",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proinornare magna eros, eu pellentesque tortor vestibulum ut.Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",
  author: "John Smith",
  categories: ["economy"]
}, {
  id: 6,
  thumbnail: "https://picsum.photos/id/243/800/450",
  title: "経済タイトル4",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proinornare magna eros, eu pellentesque tortor vestibulum ut.Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",
  author: "John Smith",
  categories: ["economy"]
}];
var app = createApp({
  setup: function setup() {
    var categories = categoryItemsData.map(function (category) {
      return category.id;
    });
    var mediaItemsWrapperClass = ref("");

    // カテゴリータブ関連
    var categoryItems = ref(categoryItemsData);
    var currentCategoryId = ref(categoryItemsData[0].id);
    var onClickCategory = function onClickCategory(id) {
      var currentCategoryIndex = categories.indexOf(currentCategoryId.value);
      var nextCategoryIndex = categories.indexOf(id);
      mediaItemsWrapperClass.value = currentCategoryIndex < nextCategoryIndex ? "left" : "right";
      document.startViewTransition(function () {
        currentCategoryId.value = id;
      });
    };

    // メディア関連
    var mediaItemsCategorize = computed(function () {
      var result = {};
      categories.forEach(function (category) {
        var items = mediaItemsData.filter(function (item) {
          return item.categories.includes(category);
        });
        result[category] = {
          items: items,
          category: category
        };
      });
      return result;
    });

    // モーダル関連
    var isOpenModal = ref(false);
    var openModal = function openModal() {
      mediaItemsWrapperClass.value = "";
      document.startViewTransition(function () {
        isOpenModal.value = true;
      });
    };
    var closeModal = function closeModal() {
      document.startViewTransition(function () {
        isOpenModal.value = false;
      });
    };
    return {
      categoryItems: categoryItems,
      currentCategoryId: currentCategoryId,
      onClickCategory: onClickCategory,
      mediaItemsCategorize: mediaItemsCategorize,
      mediaItemsWrapperClass: mediaItemsWrapperClass,
      isOpenModal: isOpenModal,
      openModal: openModal,
      closeModal: closeModal
    };
  }
});
var mediaTemplate = "\n<article class=\"media\">\n  <figure class=\"media-left\">\n    <p class=\"image is-16by9\">\n      <img v-if=\"showThumbnail\" :src=\"thumbnail\" :class=\"'image-item-' + id\" />\n    </p>\n  </figure>\n  <div class=\"media-content\">\n    <div class=\"content\">\n      <h3>{{ title }}</h3>\n      <p>{{ description }}</p>\n      <p><small>{{ author }}</small></p>\n    </div>\n  </div>\n</article>\n";
app.component("media", {
  props: ["id", "thumbnail", "title", "description", "author", "showThumbnail"],
  template: mediaTemplate
});
app.mount("#app");
},{}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63194" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map