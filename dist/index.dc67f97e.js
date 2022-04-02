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
})({"2v9qX":[function(require,module,exports) {
"use strict";
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "a89e3113dc67f97e";
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

},{}],"e0TrB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "generalTimer", ()=>generalTimer
);
var _playerJs = require("./player.js");
var _timeJs = require("./lib/time.js");
var _weaponJs = require("./weapon.js");
var _enemyJs = require("./enemy.js");
var _hitboxJs = require("./hitbox.js");
const can = document.getElementById('gra');
const ctx = can.getContext('2d');
const canWidth = can.width;
const canHeight = can.height;
let trialWeapon1 = new _weaponJs.Weapon('Sztylet', 6, 9, 1, 20, 420), trialWeapon2 = new _weaponJs.Weapon('Miecz', 8, 12, 5, 35, 1200);
let enemy1 = new _enemyJs.Enemy(580, 30, 50, 65, 40, trialWeapon1, new _hitboxJs.Hitbox(undefined, undefined, 50, 65), 4, 1, 'gold', 4);
let enemyHitbox = new _hitboxJs.Hitbox(enemy1.x, enemy1.y, enemy1.width, enemy1.height);
let player1 = new _playerJs.Player(250, 250, 50, 65, 100, trialWeapon1, new _hitboxJs.Hitbox(undefined, undefined, 50, 65), 5, 5);
const generalTimer = new _timeJs.Timer();
console.log('Enemy: ', enemy1);
console.log('Player: ', player1);
console.log(player1.movingDirectionAxisX);
playerWeapon = trialWeapon1;
let attackList = [];
can.addEventListener('click', (e)=>{
    player1.movingPlayer(e.offsetX, e.offsetY);
});
function drawAll() {
    ctx.clearRect(0, 0, canWidth, canHeight);
    enemy1.drawEnemy(ctx);
    player1.drawPlayer(ctx);
    requestAnimationFrame(drawAll);
}
function drawText(textX, textY, textToDisplay, fontColor, fontSize, fontFamily = 'Monospace') {
    ctx.fillStyle = fontColor;
    ctx.font = fontSize + 'px ' + fontFamily;
    ctx.fillText(textToDisplay, textX, textY);
}
function gameLoop() {
    updateHitboxs();
    if (_hitboxJs.checkCollisionWith(player1.hitbox, enemyHitbox)) {
        if (enemy1.aiState != 'toattack') {
            generalTimer.listOfTicks.push(new _timeJs.Tick('EnemyLightAttack', generalTimer.generalGameTime, generalTimer.generalGameTime + enemy1.weapon.speedLightAttack));
            console.log(generalTimer.listOfTicks[0]);
        }
        enemy1.aiState = 'toattack';
    } else {
        enemy1.aiState = 'quest';
        if (generalTimer.listOfTicks[0] === 'EnemyLightAttack') {
            generalTimer.listOfTicks.pop();
            console.log('The Last Tick has be deleted');
        }
    }
}
function updateHitboxs() {
    player1.hitbox.x = player1.x;
    player1.hitbox.y = player1.y;
    enemyHitbox.x = enemy1.x;
    enemyHitbox.y = enemy1.y;
}
function enemyLoop() {
    enemy1.enemyAi(attackList, player1, generalTimer);
}
function playerLoop() {
    player1.playerMove();
}
setInterval(gameLoop, 10);
setInterval(enemyLoop, 25);
setInterval(playerLoop, 25);
setInterval(_timeJs.timeLoop, 1, generalTimer);
requestAnimationFrame(drawAll);

},{"./player.js":"3yick","./lib/time.js":"lctuB","./weapon.js":"ihCsK","./enemy.js":"ey3S5","./hitbox.js":"5AMNB","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3yick":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Player", ()=>Player
);
var _creatureJs = require("./lib/creature.js");
var _hitboxJs = require("./hitbox.js");
class Player extends _creatureJs.Creature {
    constructor(x, y, width, height, hitbox, weapon, hp, movingSpeed){
        super(x, y, width, height, hitbox, weapon, hp, movingSpeed);
        this.movingDirectionAxisX;
        this.movingDirectionAxisY;
        this.targetX;
        this.targetY;
        this.isMovingX;
        this.isMovingY;
    }
    drawPlayer(ctx) {
        const { x , y , height , width  } = this;
        ctx.fillStyle = 'green';
        ctx.fillRect(x, y, width, height);
    }
    movingPlayer(layerX, layerY) {
        const { x , y , targetX , targetY , movingDirectionAxisX , movingDirectionAxisY , isMovingX , isMovingY  } = this;
        this.movingDirectionAxisX = x > layerX ? this.movingDirectionAxisX = 'Left' : this.movingDirectionAxisX = 'Right';
        this.targetX = layerX;
        this.movingDirectionAxisY = y > layerY ? this.movingDirectionAxisY = 'Up' : this.movingDirectionAxisY = 'Down';
        this.targetY = layerY;
        this.isMovingX = true;
        this.isMovingY = true;
    }
    playerMove() {
        const { x , y , targetX , targetY , movingDirectionAxisX , movingDirectionAxisY , isMovingX , isMovingY , movingSpeed  } = this;
        if (isMovingX) {
            if (movingDirectionAxisX === 'Left') {
                this.x -= movingSpeed;
                if (x == targetX || x <= targetX || x <= 0) this.isMovingX = false;
            } else if (movingDirectionAxisX === 'Right') {
                this.x += movingSpeed;
                if (x == targetX || x >= targetX || x >= 780) this.isMovingX = false;
            }
        }
        if (isMovingY) {
            if (movingDirectionAxisY === 'Up') {
                this.y -= movingSpeed;
                if (y === targetY || y <= targetY || y <= 0) this.isMovingY = false;
            } else if (movingDirectionAxisY === 'Down') {
                this.y += movingSpeed;
                if (y === targetY || y >= targetY || y >= 630) this.isMovingY = false;
            }
        }
    }
    playerAttack() {
    }
}

},{"./lib/creature.js":"6wrLr","./hitbox.js":"5AMNB","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6wrLr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Creature", ()=>Creature
);
class Creature {
    // :x, y, width, height, hp, weapon, hitbox;
    constructor(x, y, width, height, hp, weapon, hitbox, movingSpeed){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.hitbox = hitbox;
        this.weapon = weapon;
        this.hp = hp;
        this.movingSpeed = movingSpeed;
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

},{}],"5AMNB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Hitbox", ()=>Hitbox
);
parcelHelpers.export(exports, "checkCollisionWith", ()=>checkCollisionWith
);
class Hitbox {
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}
function checkCollisionWith(hitbox1, hitbox2) {
    if (hitbox1.x < hitbox2.x + hitbox2.width && hitbox1.x + hitbox1.width > hitbox2.x && hitbox1.y < hitbox2.y + hitbox2.height && hitbox1.height + hitbox1.y > hitbox2.y) //console.log('Kolizja pomiędzy '+hitbox1+' a '+hitbox2);
    return true;
    else return false;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lctuB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Timer", ()=>Timer
);
parcelHelpers.export(exports, "Tick", ()=>Tick
);
parcelHelpers.export(exports, "timeLoop", ()=>timeLoop
);
class Timer {
    generalGameTime = 0;
    listOfTicks = new Array;
    checkTheTickTime() {
        for(var i = 0; i < this.listOfTicks.length; i++)if (this.listOfTicks[i].endTime == this.generalGameTime) this.listOfTicks[i].done = true;
        this.generalGameTime++;
    }
}
class Tick {
    constructor(nameOfTick, startTime, endTime, done = false){
        this.nameOfTick = nameOfTick;
        this.startTime = startTime;
        this.endTime = endTime;
        this.done = done;
    }
}
function timeLoop(timerObject) {
    timerObject.checkTheTickTime();
//console.log(timerObject.generalGameTime);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ihCsK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Weapon", ()=>Weapon
);
class Weapon {
    constructor(name, minDmg, maxDmg, weight, energyLightAttack, speedLightAttack){
        this.name = name;
        this.minDmg = minDmg;
        this.maxDmg = maxDmg;
        this.weight = weight;
        this.energyLightAttack = energyLightAttack;
        this.speedLightAttack = speedLightAttack;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ey3S5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Enemy", ()=>Enemy
);
var _creatureJs = require("./lib/creature.js");
var _mainJs = require("./main.js");
var _timeJs = require("./lib/time.js");
class Enemy extends _creatureJs.Creature {
    constructor(x, y, width, height, hitbox, weapon, hp, movingSpeed, defendChance, drop, dropAmount){
        super(x, y, width, height, hitbox, weapon, hp, movingSpeed);
        this.objectiveX;
        this.objectiveY;
        this.defendChance = defendChance;
        this.drop = drop;
        this.dropAmount = dropAmount;
        this.isAlive = true;
        this.aiState = 'quest';
        this.walkingDirectionX = 'none';
        this.walkingDirectionY = 'none';
    }
    drawEnemy(ctx) {
        const { x , y , width , height  } = this;
        ctx.fillStyle = 'red';
        ctx.fillRect(x, y, width, height);
    }
    wherePlayer(playerObject) {
        const { x , y  } = this;
        if (playerObject.x > x) {
            this.walkingDirectionX = 'Right';
            this.objectiveX = playerObject.x;
        } else {
            this.walkingDirectionX = 'Left';
            this.objectiveX = playerObject.x;
        }
        if (playerObject.y > y) {
            this.walkingDirectionY = 'Down';
            this.objectiveY = playerObject.y;
        } else {
            this.walkingDirectionY = 'Up';
            this.objectiveY = playerObject.y;
        }
    }
    moveToPlayer(playerObject) {
        const { x , y , walkingDirectionX , walkingDirectionY , movingSpeed  } = this;
        if (walkingDirectionX === 'Left' && x != playerObject.x) this.x -= movingSpeed;
        else if (walkingDirectionX === 'Right' && x != playerObject.x) this.x += movingSpeed;
        if (walkingDirectionY === 'Up' && y != playerObject.y) this.y -= movingSpeed;
        else if (walkingDirectionY === 'Down' && y != playerObject.y) this.y += movingSpeed;
    }
    attackThePlayer(playerObject) {
        const { weapon  } = this;
        const givenDmg = Math.floor(Math.random() * (weapon.maxDmg - weapon.minDmg + 1) + weapon.minDmg);
        playerObject.life -= givenDmg;
    }
    enemyAi(attackList, playerObject, generalTimer) {
        const { isAlive , aiState , weapon  } = this;
        if (isAlive) {
            this.wherePlayer(playerObject);
            if (aiState === 'quest') {
                this.moveToPlayer(playerObject);
                attackList.pop();
                generalTimer.listOfTicks.pop();
            //console.log('The Last Tick has be deleted');
            } else if (aiState === 'toattack') {
                if (attackList[attackList.length - 1] == null) attackList.push('EnemyLightAttack');
                if (generalTimer.listOfTicks[0].done === true) {
                    generalTimer.listOfTicks.pop();
                    attackList.pop();
                    console.log('Attack!');
                    this.attackThePlayer(playerObject);
                    generalTimer.listOfTicks.push(new _timeJs.Tick('EnemyLightAttack', generalTimer.generalGameTime, generalTimer.generalGameTime + this.weapon.speedLightAttack));
                }
            //console.log(generalTimer.listOfTicks);
            }
        }
    }
}

},{"./main.js":"e0TrB","./lib/time.js":"lctuB","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./lib/creature.js":"6wrLr"}]},["2v9qX","e0TrB"], "e0TrB", "parcelRequire94c2")

//# sourceMappingURL=index.dc67f97e.js.map
