// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
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
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"ijlLy":[function(require,module,exports) {
"use strict";
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "a4f76edba0fb9392";
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = it.call(o);
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                var oldDeps = modules[asset.id][1];
                for(var dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    var id = oldDeps[dep];
                    var parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id1) {
    var modules = bundle.modules;
    if (!modules) return;
    if (modules[id1]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        var deps = modules[id1][1];
        var orphans = [];
        for(var dep in deps){
            var parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id1];
        delete bundle.cache[id1]; // Now delete the orphans.
        orphans.forEach(function(id) {
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id1);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    var parents = getParents(module.bundle.root, id);
    var accepted = false;
    while(parents.length > 0){
        var v = parents.shift();
        var a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            var p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push.apply(parents, _toConsumableArray(p));
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"jwlY8":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "drawText", ()=>drawText
);
parcelHelpers.export(exports, "setYOfUnits", ()=>setYOfUnits
);
var _clicksystemJs = require("./clicksystem.js");
var _unitJs = require("./unit.js");
var _boardJs = require("./board.js");
var _buttonsJs = require("./buttons.js");
const can = document.getElementById('canvasScreen');
const ctx = can.getContext('2d');
const canWidth = can.width;
const canHeight = can.height;
let arrayOfAxisY = [];
for(let z = 10; z < 1200;){
    arrayOfAxisY.push(z);
    z += 60;
}
let bulidingUnits = [];
const xforAll = 70;
bulidingUnits.push(new _unitJs.Unit(xforAll, undefined, 'Gdy żyje', 0, 'Gdy żyje', 'basic'));
bulidingUnits.push(new _unitJs.Unit(xforAll, undefined, 'Gdy Umrę', 3, 'Gdy Umrę', 'basic'));
bulidingUnits.push(new _unitJs.Unit(xforAll, undefined, 'Gdy dostanę obrażenia', 4, 'Gdy dostanę dmg', 'basic'));
bulidingUnits.push(new _unitJs.Unit(xforAll, undefined, 'Idź', 1, 'Idź', 'mobility'));
bulidingUnits.push(new _unitJs.Unit(xforAll, undefined, 'Podążaj za graczem', 2, 'Idź do gracza', 'mobility'));
bulidingUnits.push(new _unitJs.Unit(xforAll, undefined, 'Parowanie Ciosu', 5, 'Parowanie Ciosu', 'fight'));
bulidingUnits.push(new _unitJs.Unit(xforAll, undefined, 'Unik', 5, 'Unik', 'fight'));
bulidingUnits.push(new _unitJs.Unit(xforAll, undefined, 'Atak (Szybki Cios)', 5, 'Atak (Szybki Cios)', 'fight'));
bulidingUnits.push(new _unitJs.Unit(xforAll, undefined, 'Atak (Ciężki Cios)', 5, 'Atak (Ciężki Cios)', 'fight'));
bulidingUnits.push(new _unitJs.Unit(xforAll, undefined, 'Kolizja z graczem', 6, 'Kolizja z graczem', 'events'));
bulidingUnits.push(new _unitJs.Unit(xforAll, undefined, 'Jeżeli', 6, 'Jeżeli', 'conditions'));
bulidingUnits.push(new _unitJs.Unit(xforAll, undefined, 'mojeHP', 6, 'mojeHP', 'variable'));
bulidingUnits.push(new _unitJs.Unit(xforAll, undefined, '==', 6, '==', 'logical operators'));
bulidingUnits.push(new _unitJs.Unit(xforAll, undefined, '...', 6, '...', 'free input'));
bulidingUnits.push(new _unitJs.FreeInputUnit(xforAll, undefined, '...', 6, '...', 'free input'));
console.log(bulidingUnits[bulidingUnits.length - 1]);
for(let z1 = 10; z1 < 1200;){
    z1 += 60;
    arrayOfAxisY.push(z1);
}
let board = new _boardJs.Board();
let deleteLastUnitButton = new _buttonsJs.Button(1100, 10, 150, 50, 'Usuń ostatni blok', 'deleteLastUnit', '#3458eb');
let changeGroupButton = new _buttonsJs.Button(20, 10, 20, 20, '', 'changeGroupButton', '#c2c0eb');
const listOfGroups = [
    'basic',
    'mobility',
    'fight',
    'conditions',
    'variable',
    'logical operators',
    'free input'
];
let groupMeter = 0;
let arrayOfAxisYMeter = 0;
function setYOfUnits() {
    for(let b = 0; b < bulidingUnits.length; b++){
        if (listOfGroups[groupMeter] === bulidingUnits[b].typeOfUnit) arrayOfAxisYMeter++;
        else arrayOfAxisYMeter = 0;
        bulidingUnits[b].y = arrayOfAxisY[arrayOfAxisYMeter];
    }
//FOR przez wszystkie elementy tablicy
/*:   JEŻELI aktualna grupa będzię równa aktualnym 'klocku'
    //:   :zwiększ licznik Y
    //:   W PRZECIWNYM RAZIE
    //:    :ustaw licznik y na 0
    //:zmień y aktualnego elementu na licznikY[] 
    */ }
can.addEventListener('click', (e)=>{
    deleteLastUnitButton.buttonClick(board, e.offsetX, e.offsetY);
    if (changeGroupButton.buttonClick(board, e.offsetX, e.offsetY, groupMeter)) {
        setYOfUnits();
        groupMeter++;
        if (groupMeter > 6) {
            groupMeter = 0;
            arrayOfAxisYMeter = 0;
        }
        console.log(groupMeter);
    }
    _clicksystemJs.checkClickedOnAddingUnits(e.offsetX, e.offsetY, bulidingUnits, board, listOfGroups[groupMeter]);
});
function drawAll() {
    ctx.clearRect(0, 0, canWidth, canHeight);
    _boardJs.drawBoard(ctx, board, arrayOfAxisY);
    for(let i = 0; i < bulidingUnits.length; i++)bulidingUnits[i].drawUnit(ctx, listOfGroups[groupMeter]);
    deleteLastUnitButton.drawButton(ctx);
    changeGroupButton.drawButton(ctx);
    requestAnimationFrame(drawAll);
}
function drawText(textX, textY, textToDisplay, fontColor, fontSize, fontFamily = 'Monospace') {
    ctx.fillStyle = fontColor;
    ctx.font = fontSize + 'px ' + fontFamily;
    ctx.fillText(textToDisplay, textX, textY, 146);
}
requestAnimationFrame(drawAll);

},{"./clicksystem.js":"kbEYd","./unit.js":"7dQou","./board.js":"fGBtm","./buttons.js":"2Oz95","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kbEYd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "checkClickedOnAddingUnits", ()=>checkClickedOnAddingUnits
);
function checkClickedOnAddingUnits(clickX, clickY, bulidingUnits, board, actualGroup) {
    console.log(clickX, clickY);
    for(let i = 0; i < bulidingUnits.length; i++)if (clickX > bulidingUnits[i].x && clickX < bulidingUnits[i].x + 150 && clickY > bulidingUnits[i].y && clickY < bulidingUnits[i].y + 50) {
        console.log('The Block on the name: ' + bulidingUnits[i].nameOfUnit + ' has be clicked.');
        if (bulidingUnits[i].typeOfUnit === actualGroup) {
            if (board.unitsOfWorkSpace[0] == null) switch(bulidingUnits[i].typeOfUnit){
                case 'basic':
                    board.unitsOfWorkSpace.push(bulidingUnits[i]);
                    console.table(board.unitsOfWorkSpace);
                    break;
                case 'events':
                    board.unitsOfWorkSpace.push(bulidingUnits[i]);
                    console.table(board.unitsOfWorkSpace);
                    break;
            }
            else switch(bulidingUnits[i].typeOfUnit){
                case 'basic':
                    break;
                case 'events':
                    break;
                case 'conditions':
                    if (board.stateCreatingConditions != 'addingCondition1') {
                        board.unitsOfWorkSpace.push(bulidingUnits[i]);
                        console.table(board.unitsOfWorkSpace);
                        board.stateCreatingConditions = 'addingCondition1';
                    }
                    break;
                case 'variable':
                    if (board.stateCreatingConditions === 'addingCondition1') {
                        board.unitsOfWorkSpace.push(bulidingUnits[i]);
                        console.table(board.unitsOfWorkSpace);
                        board.stateCreatingConditions = 'addingCondition2';
                        console.log(board.stateCreatingConditions);
                    }
                    break;
                case 'logical operators':
                    if (board.stateCreatingConditions === 'addingCondition2') {
                        board.unitsOfWorkSpace.push(bulidingUnits[i]);
                        console.table(board.unitsOfWorkSpace);
                        board.stateCreatingConditions = 'addingCondition3';
                        console.log(board.stateCreatingConditions);
                    }
                    break;
                case 'free input':
                    if (board.stateCreatingConditions === 'addingCondition3') {
                        board.unitsOfWorkSpace.push(bulidingUnits[i]);
                        console.table(board.unitsOfWorkSpace);
                        board.stateCreatingConditions = 'addingCondition4';
                        console.log(board.stateCreatingConditions);
                        console.log(board.unitsOfWorkSpace[board.unitsOfWorkSpace.length - 1]);
                        board.unitsOfWorkSpace[board.unitsOfWorkSpace.length - 1].freeText = prompt('Podaj Wartość: ');
                    //                                console.log('---');
                    //                                console.log(bulidingUnits[i].unitOperation);
                    //                                console.log('---');
                    //                                console.log(board.unitsOfWorkSpace[board.unitsOfWorkSpace.length-1].unitOperation);
                    //                                
                    //                                console.log('!---!');
                    }
                    break;
                default:
                    board.unitsOfWorkSpace.push(bulidingUnits[i]);
                    console.table(board.unitsOfWorkSpace);
                    break;
            }
        }
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"7dQou":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Unit", ()=>Unit
);
parcelHelpers.export(exports, "FreeInputUnit", ()=>FreeInputUnit
);
var _enemyAImainJs = require("./enemyAImain.js");
class Unit {
    constructor(x, y, nameOfUnit, idOfUnit, unitOperation, typeOfUnit){
        this.x = x;
        this.y = y;
        this.nameOfUnit = nameOfUnit;
        this.idOfUnit = idOfUnit;
        this.unitOperation = unitOperation;
        this.typeOfUnit = typeOfUnit;
    }
    drawUnit(ctx, actualgroup) {
        let optionalFontColor;
        if (this.typeOfUnit === 'basic') ctx.fillStyle = '#c23b2d';
        else if (this.typeOfUnit === 'mobility') ctx.fillStyle = '#b57526';
        else if (this.typeOfUnit === 'fight') ctx.fillStyle = '#348ebf';
        else if (this.typeOfUnit === 'events') ctx.fillStyle = '#ebf52f';
        else if (this.typeOfUnit === 'conditions') ctx.fillStyle = '#272394';
        else if (this.typeOfUnit === 'variable') ctx.fillStyle = '#96144c';
        else if (this.typeOfUnit === 'logical operators') ctx.fillStyle = '#5eeb2f';
        else if (this.typeOfUnit === 'free input') ctx.fillStyle = '#ced9d1';
        if (this.typeOfUnit === actualgroup) {
            ctx.fillRect(this.x, this.y, 150, 50);
            _enemyAImainJs.drawText(this.x + 4, this.y + 12, this.unitOperation, 'black', 16);
        }
    }
}
class FreeInputUnit extends Unit {
    freeText = '';
}

},{"./enemyAImain.js":"jwlY8","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fGBtm":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Board", ()=>Board
);
parcelHelpers.export(exports, "drawBoard", ()=>drawBoard
);
var _enemyAImainJs = require("./enemyAImain.js");
class Board {
    unitsOfWorkSpace = [];
    stateCreatingConditions = 'none';
}
function drawBoard(ctx, board, arrayOfAxisY) {
    for(let i = 0; i < board.unitsOfWorkSpace.length; i++)if (board.unitsOfWorkSpace != null) {
        const typeOfUnit = board.unitsOfWorkSpace[i].typeOfUnit;
        if (typeOfUnit === 'basic') ctx.fillStyle = '#c23b2d';
        else if (typeOfUnit === 'mobility') ctx.fillStyle = '#b57526';
        else if (typeOfUnit === 'fight') ctx.fillStyle = '#348ebf';
        else if (typeOfUnit === 'events') ctx.fillStyle = '#ebf52f';
        else if (typeOfUnit === 'conditions') ctx.fillStyle = '#272394';
        else if (typeOfUnit === 'variable') ctx.fillStyle = '#96144c';
        else if (typeOfUnit === 'logical operators') ctx.fillStyle = '#5eeb2f';
        else if (typeOfUnit === 'free input') ctx.fillStyle = '#ced9d1';
        ctx.fillRect(575, arrayOfAxisY[i] - 5, 150, 50);
        if (board.unitsOfWorkSpace[i].freeText != undefined) _enemyAImainJs.drawText(579, arrayOfAxisY[i] - 5 + 12, board.unitsOfWorkSpace[i].freeText, 'black', 16);
        else _enemyAImainJs.drawText(579, arrayOfAxisY[i] - 5 + 12, board.unitsOfWorkSpace[i].unitOperation, 'black', 16);
    }
}

},{"./enemyAImain.js":"jwlY8","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2Oz95":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Button", ()=>Button
);
var _enemyAImainJs = require("./enemyAImain.js");
class Button {
    constructor(x, y, width, height, text, operation, color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.operation = operation;
        this.color = color;
    }
    drawButton(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        _enemyAImainJs.drawText(this.x + 2, this.y + this.height / 2, this.text, 'black', 16);
    }
    buttonClick(board, clickX, clickY, meter) {
        if (clickX >= this.x && clickX <= this.x + this.width && clickY >= this.y && clickY <= this.y + this.height) {
            if (this.operation === 'deleteLastUnit') {
                board.unitsOfWorkSpace.pop();
                if (board.stateCreatingConditions != 'none') {
                    let number = board.stateCreatingConditions.substr(15);
                    number--;
                    board.stateCreatingConditions = 'addingCondition' + number;
                }
                console.log('The Last Unit has be deleted.');
            } else if (this.operation === 'changeGroupButton') {
                console.log(true);
                return true;
            }
        }
    }
}

},{"./enemyAImain.js":"jwlY8","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["ijlLy","jwlY8"], "jwlY8", "parcelRequire94c2")

//# sourceMappingURL=enemyai.a0fb9392.js.map
