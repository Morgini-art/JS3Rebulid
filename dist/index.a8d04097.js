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
})({"1E1Rj":[function(require,module,exports) {
"use strict";
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "5aa50b56a8d04097";
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

},{}],"i5gxk":[function(require,module,exports) {
var _timeJs = require("./time.js");
var _grammarJs = require("./grammar.js");
const recognition = new webkitSpeechRecognition();
const synth = window.speechSynthesis;
const mediaDevices = navigator.mediaDevices;
let speechRecognitionList = new webkitSpeechGrammarList();
const date = new Date();
let startBtn = document.getElementById('btn-2');
let actualSpeechInfo = document.getElementById('actualSpeech');
let actualHour;
let textToSpeakActualHour;
let isRecording = false;
recognition.continuous = true;
let utterThis;
let activated = false;
let recognitionList = [];
let textToSpeak;
let rememberList = new Array();
let countDownTime = false;
let timeToCountDown;
let startTimeToCountDown;
let links = new Array();
let linkValue;
let linksParagraf = document.getElementById('links');
let recordingArguments = false;
let numberOfArguments = 0;
let argumentsOfCommand = new Array();
let nameOfOperationWithArguments;
let videoOnBtn = document.getElementById('share');
let videoWindow = document.getElementById('video');
videoOnBtn.onclick = function() {
    mediaDevices.getUserMedia({
        video: {
            width: {
                min: 1024,
                ideal: 1280,
                max: 1920
            },
            height: {
                min: 576,
                ideal: 720,
                max: 1080
            }
        },
        audio: false
    }).then(function(stream) {
        videoWindow.srcObject = stream;
    });
};
function turnoff() {
    isRecording = false;
    recognition.stop();
}
function addLink() {
    linkValue = document.getElementById('input-text').value;
    document.getElementById('input-text').value = '';
    links.push(linkValue);
    console.log(links);
    linksParagraf.innerHTML += linkValue + '<br>';
}
recognition.continuous = false;
speechRecognitionList.addFromString(_grammarJs.grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.lang = 'pl-PL';
console.log(synth, recognition);
startBtn.onclick = function() {
    recognition.start();
    console.log('Ready to receive command.');
    isRecording = true;
    activated = true;
};
recognition.addEventListener('end', function() {
    console.log('Audio capturing end.');
    if (isRecording) recognition.start();
});
recognition.onresult = function(event) {
    console.log(event);
    textToSpeak = 'Nieznane Polecenie.';
    let command = event.results[0][0].transcript;
    command = command.toLowerCase();
    console.log('Command:' + command);
    recognitionList.push(' ' + command);
    actualSpeechInfo.innerHTML = recognitionList.join(',');
    if (!activated) {
        if (command === 'asystent') {
            textToSpeak = 'Słucham cię.';
            activated = true;
        }
    }
    if (activated) {
        if (!recordingArguments) {
            if (command === 'która godzina') {
                actualHour = date.getHours();
                textToSpeakActualHour = _timeJs.convertHourName(actualHour);
                textToSpeak = textToSpeakActualHour + '  ' + date.getMinutes();
            } else if (command === 'jaki mamy dzień' || command === 'jaki dzisiaj mamy dzień' || command === 'podaj dzień tygodnia' || command === 'dzień tygodnia' || command === 'Jaki mamy dzień') textToSpeak = _timeJs.days[date.getDay()];
            else if (command === 'czy jest wieczór' || command === 'jest wieczór') {
                actualHour = date.getHours();
                if (actualHour > 17) textToSpeak = 'Tak mamy wieczór.';
                else textToSpeak = 'Nie nie mamy wieczoru.';
            } else if (command === 'czy jest rano' || command === 'jest rano') {
                actualHour = date.getHours();
                if (actualHour < 11) textToSpeak = 'Tak jest rano.';
                else textToSpeak = 'Nie nie jest rano.';
            } else if (command === 'ustaw timer na 1 minutę') {
                textToSpeak = 'Ustawiłem na 1 minutę.';
                countDownTime = true;
                timeToCountDown = 60000;
            } else if (command === 'ustaw timer na 3 minuty') {
                textToSpeak = 'Ustawiłem na 3 minuty.';
                countDownTime = true;
                timeToCountDown = 180000;
            } else if (command === 'podaj czas timera') {
                var number = parseFloat(timeToCountDown / 1000 / 60).toPrecision(2);
                textToSpeak = parseFloat(timeToCountDown / 1000 / 60).toPrecision(2);
                console.log(utterThis.text);
            } else if (command === 'dodaj') {
                textToSpeak = 'Zaczynam dodawać podaj pierwszy argument';
                recordingArguments = true;
                numberOfArguments = 2;
                nameOfOperationWithArguments = 'dodawanie';
            } else if (command === 'ile czasu mineło') {
                var startTime = startTimeToCountDown / 1000 / 60;
                var actualTime = timeToCountDown / 1000 / 60;
                textToSpeak = parseFloat(startTime - actualTime).toPrecision(2);
                console.log(utterThis.text);
            } else if (command === 'odejmij') {
                textToSpeak = 'Zaczynam odejmować podaj pierwszy argument';
                recordingArguments = true;
                numberOfArguments = 2;
                nameOfOperationWithArguments = 'odejmowanie';
            } else if (command === 'pomnóż') {
                textToSpeak = 'Zaczynam mnożyć podaj pierwszy argument';
                recordingArguments = true;
                numberOfArguments = 2;
                nameOfOperationWithArguments = 'mnożenie';
            } else if (command === 'podziel') {
                textToSpeak = 'Zaczynam dzielić podaj pierwszy argument';
                recordingArguments = true;
                numberOfArguments = 2;
                nameOfOperationWithArguments = 'dzielenie';
            } else if (command === 'oblicz zysk') {
                textToSpeak = 'Zaczynam liczyć podaj aktualną cenę produktu';
                recordingArguments = true;
                numberOfArguments = 2;
                nameOfOperationWithArguments = 'zysk';
            } else if (command === 'dziękuję') textToSpeak = 'Nie ma za co jestem tylko robotem.';
            else if (command === 'kim jesteś') textToSpeak = 'Jestem głosowym asystentem zaprogramowanym przez mojego stwórcę Adriana.';
            else if (command === 'dezaktywacja' || command === 'wyłącz się') {
                textToSpeak = 'Wyłączam się.';
                activated = false;
            } else if (command === 'wyszukaj w wikipedii' || command === 'wyszukaj w wiki') {
                textToSpeak = 'Powiedz co wyszukać.';
                recordingArguments = true;
                numberOfArguments = 1;
                nameOfOperationWithArguments = 'searchwiki';
            } else if (command === 'wyszukaj w youtube' || command === 'wyszukaj na youtube') {
                textToSpeak = 'Powiedz co wyszukać.';
                recordingArguments = true;
                numberOfArguments = 1;
                nameOfOperationWithArguments = 'searchyt';
            } else if (command === 'wyszukaj w google') {
                textToSpeak = 'Powiedz co wyszukać.';
                recordingArguments = true;
                numberOfArguments = 1;
                nameOfOperationWithArguments = 'searchgoogle';
            } else if (command === 'youtube do obejrzenia') {
                const win = window.open('https://www.youtube.com/playlist?list=WL');
                textToSpeak = 'Gotowe';
            } else if (command === 'zapamiętaj') {
                textToSpeak = 'Dobra powiedz co: .';
                recordingArguments = true;
                numberOfArguments = 1;
                nameOfOperationWithArguments = 'remember';
            } else if (command === 'zapamiętane') {
                nameOfOperationWithArguments = 'sayremembers';
                for (const word of rememberList){
                    textToSpeak = word;
                    synth.speak(utterThis);
                }
            } else if (command === 'otwórz link') {
                if (links.length > 0) {
                    textToSpeak = 'Który?';
                    recordingArguments = true;
                    numberOfArguments = 1;
                    nameOfOperationWithArguments = 'openlink';
                }
            }
        } else {
            console.log(argumentsOfCommand.typeof);
            command = event.results[0][0].transcript;
            console.log(argumentsOfCommand);
            if (command === 'jeden' || command === 'pierwszy') {
                command = 1;
                console.log(command);
            } else if (command === 'dwa' || command === 'drugi') command = 2;
            else if (command === 'trzy' || command === 'trzeci') command = 3;
            else if (command === 'cztery' || command === 'czwarty') command = 4;
            else if (command === 'pięć' || command === 'piąty') command = 5;
            else if (command === 'sześć') command = 6;
            else if (command === 'siedem') command = 7;
            else if (command === 'osiem') command = 8;
            else if (command === 'dziewięć') command = 9;
            argumentsOfCommand.push(command);
            textToSpeak = 'Podaj kolejny argument';
            numberOfArguments -= 1;
            if (numberOfArguments === 0) {
                textToSpeak = 'Wyliczam';
                recordingArguments = false;
                console.log(argumentsOfCommand);
                if (nameOfOperationWithArguments === 'dodawanie') dataResults = parseInt(argumentsOfCommand[0]) + parseInt(argumentsOfCommand[1]);
                else if (nameOfOperationWithArguments === 'odejmowanie') dataResults = parseInt(argumentsOfCommand[0]) - parseInt(argumentsOfCommand[1]);
                else if (nameOfOperationWithArguments === 'mnożenie') dataResults = parseInt(argumentsOfCommand[0]) * parseInt(argumentsOfCommand[1]);
                else if (nameOfOperationWithArguments === 'dzielenie') dataResults = parseInt(argumentsOfCommand[0]) / parseInt(argumentsOfCommand[1]);
                else if (nameOfOperationWithArguments === 'zysk') dataResults = parseInt(argumentsOfCommand[0]) * parseInt(argumentsOfCommand[1]) / 1000;
                else if (nameOfOperationWithArguments === 'searchwiki') {
                    const win = window.open('https://pl.wikipedia.org/wiki/' + argumentsOfCommand[0]);
                } else if (nameOfOperationWithArguments === 'searchyt') {
                    const win = window.open('https://www.youtube.com/results?search_query=' + argumentsOfCommand[0]);
                } else if (nameOfOperationWithArguments === 'searchgoogle') {
                    const win = window.open('https://www.google.com/search?q=' + argumentsOfCommand[0]);
                } else if (nameOfOperationWithArguments === 'remember') {
                    rememberList.push(argumentsOfCommand[0]);
                    console.log(rememberList);
                } else if (nameOfOperationWithArguments === 'openlink') {
                    console.log(links);
                    const win = window.open(links[argumentsOfCommand[0] - 1]);
                }
                if (nameOfOperationWithArguments != 'searchwiki' || nameOfOperationWithArguments != 'searchyt') textToSpeak = 'Wyliczam . ' + dataResults;
                else if (nameOfOperationWithArguments === 'searchwiki' || nameOfOperationWithArguments === 'searchyt') textToSpeak = 'Otworzyłem.';
                argumentsOfCommand.length = 0;
            }
        }
        console.log(textToSpeak);
        utterThis = new SpeechSynthesisUtterance(textToSpeak);
        if (utterThis !== undefined) synth.speak(utterThis);
    }
//console.log('Confidence: ' + event.results[0][0].confidence);
};
let dataResults;
function timer() {
    if (countDownTime) {
        timeToCountDown -= 10;
        if (timeToCountDown <= 0) {
            countDownTime = false;
            textToSpeak = 'Timer skończył odliczać czas. ' + startTimeToCountDown / 1000 + 'sekund';
            synth.speak(utterThis);
        }
    }
}
setInterval(timer, 10);

},{"./time.js":"3lqRK","./grammar.js":"eJ8Kx"}],"3lqRK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "convertHourName", ()=>convertHourName
);
parcelHelpers.export(exports, "days", ()=>days
);
function convertHourName(hour) {
    if (hour === 24) return 'dwudziesta czwarta';
    else if (hour === 23) return 'dwudziesta trzecia';
    else if (hour === 22) return 'dwudziesta druga';
    else if (hour === 21) return 'dwudziesta pierwsza';
    else if (hour === 20) return 'dwudziesta';
    else if (hour === 19) return 'dziewietnasta';
    else if (hour === 18) return 'osiemnasta';
    else if (hour === 17) return 'siedemnasta';
    else if (hour === 16) return 'szesnasta';
    else if (hour === 15) return 'pietnasta';
    else if (hour === 14) return 'czternasta';
    else if (hour === 13) return 'trzynasta';
    else if (hour === 12) return 'dwunasta';
    else if (hour === 11) return 'jedenasta';
    else if (hour === 10) return 'dziesiąta';
    else if (hour === 9) return 'dziewiąta';
    else if (hour === 8) return 'ósma';
    else if (hour === 7) return 'siódma';
    else if (hour === 6) return 'szósta';
    else if (hour === 5) return 'piąta';
    else if (hour === 4) return 'czwarta';
    else if (hour === 3) return 'trzecia';
    else if (hour === 2) return 'druga';
}
const days = [
    'Niedziela',
    'Poniedziałek',
    'Wtorek',
    'Środa',
    'Czwartek',
    'Piątek',
    'Sobotę'
];

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

},{}],"eJ8Kx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "grammar", ()=>grammar
);
const grammar = '#JSGF V1.0; grammar colors; public <color> = która godzina | jaki mamy dzień | jest rano | Jaki mamy dzień | dzień tygodnia | podaj dzień tygodnia | jaki dzisiaj mamy dzień | czy jest wieczór | ustaw timer na 1 minutę | ustaw timer na 3 minuty | podaj czas timera | ile czasu minęło | dodaj | odejmij | pomnoż | podziel | oblicz zysk;';

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["1E1Rj","i5gxk"], "i5gxk", "parcelRequire94c2")

//# sourceMappingURL=index.a8d04097.js.map
