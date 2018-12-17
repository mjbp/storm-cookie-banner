(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _src = require('../../src');

var _src2 = _interopRequireDefault(_src);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

window.addEventListener('DOMContentLoaded', function () {
    _src2.default.init({
        types: {
            'necessary': {
                fns: [function () {
                    console.log('Necessary fn');
                }]
            },
            'performance': {
                checked: true,
                fns: [function () {
                    console.log('Performance fn');
                }]
            },
            'advertising and marketing': {
                checked: false,
                fns: [function () {
                    console.log('Advertising and marketing fn');
                }]
            }
        }
    });
});

},{"../../src":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defaults = require('./lib/defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _lib = require('./lib');

var _lib2 = _interopRequireDefault(_lib);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
    init: function init(opts) {
        return (0, _lib2.default)(Object.assign({}, _defaults2.default, opts, {
            types: Object.keys(opts.types).reduce(function (acc, curr) {
                if (acc[curr]) {
                    acc[curr] = Object.assign({}, acc[curr], {
                        fns: acc[curr].fns.concat(opts.types[curr].fns),
                        checked: opts.types[curr].checked !== undefined ? opts.types[curr].checked : _defaults2.default.types[curr].checked !== undefined ? _defaults2.default.types[curr].checked : false
                    });
                } else acc[curr] = opts.types[curr];
                return acc;
            }, _defaults2.default.types)
        }));
    }
};

},{"./lib":6,"./lib/defaults":5}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var apply = exports.apply = function apply() {
    var perf = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'add';
    return function (state) {
        //;_; needs proper enum
        var appliedState = perf === 'add' ? Object.assign({}, state, { consent: Object.assign({}, state.consent, { performance: true }) }) : perf === 'remove' ? Object.assign({}, state, { consent: Object.assign({}, state.consent, { performance: false }) }) : state;

        Object.keys(appliedState.consent).forEach(function (key) {
            appliedState.consent[key] && appliedState.settings.types[key] && appliedState.settings.types[key].fns.forEach(function (fn) {
                return fn(appliedState);
            });
        });
    };
};

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var TRIGGER_EVENTS = exports.TRIGGER_EVENTS = window.PointerEvent ? ['pointerup', 'keydown'] : ['ontouchstart' in window ? 'touchstart' : 'click', 'keydown'];

var TRIGGER_KEYCODES = exports.TRIGGER_KEYCODES = [13, 32];

var CLASSNAME = exports.CLASSNAME = {
    BANNER: 'preferences-banner',
    FIELD: 'preferences-banner__field',
    BTN: 'preferences-banner__btn'
};

var DATA_ATTRIBUTE = exports.DATA_ATTRIBUTE = {
    TYPE: 'data-consent-type',
    ID: 'data-consent-id'
};

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = require('./utils');

exports.default = {
	name: 'CookiePreferences',
	path: '/',
	domain: '',
	secure: true,
	expiry: 365,
	types: {
		'necessary': {
			checked: true,
			disabled: true,
			fns: []
		}
	},
	policyURL: '/cookie-policy',
	classNames: {
		banner: 'preferences-banner',
		btn: 'preferences-banner__btn',
		field: 'preferences-banner__field',
		updateBtnContainer: 'preferences-banner__update',
		updateBtn: 'preferences-banner__update-btn'
	},
	updateBtnTemplate: function updateBtnTemplate(model) {
		return '<button class="' + model.classNames.updateBtn + '">Update cookie preferences</button>';
	},
	bannerTemplate: function bannerTemplate(model) {
		return '<section role="dialog" aria-live="polite" aria-label="Cookie consent" aria-describedby="preferences-banner__desc" class="' + model.classNames.banner + '">\n\t\t\t<div class="preferences-content">\n\t\t\t\t<div class="wrap">\n\t\t\t\t\t<div class="row">\n\t\t\t\t\t\t<!--googleoff: all-->\n\t\t\t\t\t\t<div id="preferences-banner__desc">\n\t\t\t\t\t\t\t<div class="preferences-banner__heading">This website uses cookies.</div>\n\t\t\t\t\t\t\t<p class="preferences-banner__text">We use cookies to analyse our traffic and to provide social media features. You can choose which categories of cookies you consent to, or accept our recommended settings.\n\t\t\t\t\t\t\t<a class="preferences-banner__link" rel="noopener noreferrer nofollow" href="' + model.policyURL + '"> Find out more about the cookies we use.</a></p>\n\t\t\t\t\t\t\t<ul class="preferences-banner__list">\n\t\t\t\t\t\t\t\t' + Object.keys(model.types).map(function (type) {
			return '<li class="preferences-banner__list-item">\n\t\t\t\t\t\t\t\t\t<input id="preferences-banner__' + type.split(' ')[0].replace(' ', '-') + '" class="' + model.classNames.field + '" value="' + type + '" type="checkbox"' + (model.types[type].checked ? ' checked' : '') + (model.types[type].disabled ? ' disabled' : '') + '>\n\t\t\t\t\t\t\t\t\t<label class="preferences-banner__label" for="preferences-banner__' + type.split(' ')[0].replace(' ', '-') + '">\n\t\t\t\t\t\t\t\t\t\t' + type.substr(0, 1).toUpperCase() + type.substr(1) + ' cookies\n\t\t\t\t\t\t\t\t\t</label>  \n\t\t\t\t\t\t\t\t</li>';
		}).join('') + '\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<button class="' + model.classNames.btn + '">OK</button>\n\t\t\t\t\t\t<!--googleon: all-->\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</section>';
	}
};

},{"./utils":10}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('./utils');

var _ui = require('./ui');

var _consent = require('./consent');

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _reducers = require('./reducers');

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = function (settings) {
    if (!(0, _utils.cookiesEnabled)()) return;

    var Store = (0, _store2.default)();
    var cookies = (0, _utils.readCookie)(settings);
    Store.update(_reducers.initialState, {
        settings: settings,
        consent: cookies ? JSON.parse(cookies.value) : {}
    }, [(0, _consent.apply)(!cookies ? 'add' : 'remain'), cookies ? (0, _ui.initUpdateBtn)(Store) : (0, _ui.initBanner)(Store)]);
};

},{"./consent":3,"./reducers":7,"./store":8,"./ui":9,"./utils":10}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var initialState = exports.initialState = function initialState(state, data) {
  return Object.assign({}, state, data);
};
var setConsent = exports.setConsent = function setConsent(state, data) {
  return Object.assign({}, state, data);
};
var updateConsent = exports.updateConsent = function updateConsent(state, data) {
  return Object.assign({}, state, data);
};

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    return {
        state: {},
        update: function update(reducer, nextState) {
            var _this = this;

            var effects = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

            this.state = reducer(this.state, nextState);
            if (effects.length > 0) effects.forEach(function (effect) {
                effect(_this.state);
            });
        },
        getState: function getState() {
            return this.state;
        }
    };
};

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initUpdateBtn = exports.initBanner = undefined;

var _utils = require('./utils');

var _constants = require('./constants');

var _consent = require('./consent');

var _reducers = require('./reducers');

var initBanner = exports.initBanner = function initBanner(Store) {
    return function (state) {
        document.body.firstElementChild.insertAdjacentHTML('beforebegin', state.settings.bannerTemplate((0, _utils.composeUpdateUIModel)(state)));
        var fields = [].slice.call(document.querySelectorAll('.' + state.settings.classNames.field));
        var banner = document.querySelector('.' + state.settings.classNames.banner);
        var btn = document.querySelector('.' + state.settings.classNames.btn);

        _constants.TRIGGER_EVENTS.forEach(function (ev) {
            btn.addEventListener(ev, function (e) {
                if (!(0, _utils.shouldExecute)(e)) return;

                var consent = fields.reduce(function (acc, field) {
                    return acc[field.value] = field.checked, acc;
                }, {});
                Store.update(_reducers.setConsent, { consent: consent }, !consent.performance ? [_utils.deleteCookies, _utils.writeCookie, function () {
                    window.setTimeout(function () {
                        return location.reload();
                    }, 60);
                }] : [_utils.writeCookie, (0, _consent.apply)(state.consent.performance ? 'remain' : 'remove'), function () {
                    banner.parentNode.removeChild(banner);
                    initUpdateBtn(Store)(state);
                }]);
            });
        });
    };
};

var initUpdateBtn = exports.initUpdateBtn = function initUpdateBtn(Store) {
    return function (state) {
        var updateBtnContainer = document.querySelector('.' + state.settings.classNames.updateBtnContainer);
        if (!updateBtnContainer) return;
        var updateBtn = document.querySelector('.' + state.settings.classNames.updateBtn);
        if (updateBtn) updateBtn.removeAttribute('disabled');else updateBtnContainer.innerHTML = state.settings.updateBtnTemplate(state.settings);
        var handler = function handler(e) {
            if (!(0, _utils.shouldExecute)(e)) return;
            Store.update(_reducers.updateConsent, {}, [initBanner(Store), function () {
                e.target.setAttribute('disabled', 'disabled');
                _constants.TRIGGER_EVENTS.forEach(function (ev) {
                    e.target.removeEventListener(ev, handler);
                });
            }]);
        };

        _constants.TRIGGER_EVENTS.forEach(function (ev) {
            document.querySelector('.' + state.settings.classNames.updateBtn).addEventListener(ev, handler);
        });
    };
};

},{"./consent":3,"./constants":4,"./reducers":7,"./utils":10}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.shouldExecute = exports.composeUpdateUIModel = exports.deleteCookies = exports.readCookie = exports.writeCookie = exports.cookiesEnabled = undefined;

var _constants = require('./constants');

//Modernizr cookie test
var cookiesEnabled = exports.cookiesEnabled = function cookiesEnabled() {
    try {
        document.cookie = 'cookietest=1';
        var ret = document.cookie.indexOf('cookietest=') !== -1;
        document.cookie = 'cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT';
        return ret;
    } catch (e) {
        return false;
    }
};

var writeCookie = exports.writeCookie = function writeCookie(state) {
    return document.cookie = [state.settings.name + '=' + JSON.stringify(Object.assign({}, state.consent, { intent: state.intent })) + ';', 'expires=' + new Date(new Date().getTime() + state.settings.expiry * 24 * 60 * 60 * 1000).toGMTString() + ';', 'path=' + state.settings.path + ';', state.settings.domain ? 'domain=' + state.settings.domain : '', state.settings.secure ? 'secure' : ''].join('');
};

var readCookie = exports.readCookie = function readCookie(settings) {
    var cookie = document.cookie.split('; ').map(function (part) {
        return { name: part.split('=')[0], value: part.split('=')[1] };
    }).filter(function (part) {
        return part.name === settings.name;
    })[0];
    return cookie !== undefined ? cookie : false;
};

var updateCookie = function updateCookie(state) {
    return function (model) {
        return document.cookie = [model.name + '=' + model.value + ';', 'expires=' + model.expiry + ';', 'path=' + state.settings.path + ';', state.settings.domain ? 'domain=' + state.settings.domain + ';' : '', state.settings.secure ? 'secure' : ''].join('');
    };
};

var deleteCookies = exports.deleteCookies = function deleteCookies(state) {
    document.cookie.split('; ').map(function (part) {
        return {
            name: part.split('=')[0],
            value: part.split('=')[1],
            expiry: 'Thu, 01 Jan 1970 00:00:01 GMT'
        };
    }).map(updateCookie(state));
};

var composeUpdateUIModel = exports.composeUpdateUIModel = function composeUpdateUIModel(state) {
    return Object.assign({}, state.settings, {
        types: Object.keys(state.settings.types).reduce(function (acc, type) {
            if (state.consent[type] !== undefined) {
                acc[type] = Object.assign({}, state.settings.types[type], {
                    checked: state.consent[type] !== undefined ? state.consent[type] : state.settings.types[type].checked
                });
            } else acc[type] = state.settings.types[type];
            return acc;
        }, {})
    });
};

var shouldExecute = exports.shouldExecute = function shouldExecute(e) {
    return !!e.keyCode && !_constants.TRIGGER_KEYCODES.includes(e.keyCode) || !(e.which === 3 || e.button === 2);
};

},{"./constants":4}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL3NyYy9hcHAuanMiLCJzcmMvaW5kZXguanMiLCJzcmMvbGliL2NvbnNlbnQuanMiLCJzcmMvbGliL2NvbnN0YW50cy5qcyIsInNyYy9saWIvZGVmYXVsdHMuanMiLCJzcmMvbGliL2luZGV4LmpzIiwic3JjL2xpYi9yZWR1Y2Vycy5qcyIsInNyYy9saWIvc3RvcmUuanMiLCJzcmMvbGliL3VpLmpzIiwic3JjL2xpYi91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBQSxPQUFBLFFBQUEsV0FBQSxDQUFBOzs7Ozs7OztBQUVBLE9BQUEsZ0JBQUEsQ0FBQSxrQkFBQSxFQUE0QyxZQUFNO0FBQzlDLFVBQUEsT0FBQSxDQUFBLElBQUEsQ0FBa0I7QUFDZCxlQUFPO0FBQ0gseUJBQWE7QUFDVCxxQkFBSyxDQUNELFlBQU07QUFBRSw0QkFBQSxHQUFBLENBQUEsY0FBQTtBQURQLGlCQUFBO0FBREksYUFEVjtBQU1ILDJCQUFlO0FBQ1gseUJBRFcsSUFBQTtBQUVYLHFCQUFLLENBQ0QsWUFBTTtBQUFFLDRCQUFBLEdBQUEsQ0FBQSxnQkFBQTtBQURQLGlCQUFBO0FBRk0sYUFOWjtBQVlILHlDQUE2QjtBQUN6Qix5QkFEeUIsS0FBQTtBQUV6QixxQkFBSyxDQUNELFlBQU07QUFBRSw0QkFBQSxHQUFBLENBQUEsOEJBQUE7QUFEUCxpQkFBQTtBQUZvQjtBQVoxQjtBQURPLEtBQWxCO0FBREosQ0FBQTs7Ozs7Ozs7O0FDRkEsSUFBQSxZQUFBLFFBQUEsZ0JBQUEsQ0FBQTs7OztBQUNBLElBQUEsT0FBQSxRQUFBLE9BQUEsQ0FBQTs7Ozs7Ozs7a0JBRWU7QUFDWCxVQUFNLFNBQUEsSUFBQSxDQUFBLElBQUEsRUFBQTtBQUFBLGVBQVEsQ0FBQSxHQUFBLE1BQUEsT0FBQSxFQUFRLE9BQUEsTUFBQSxDQUFBLEVBQUEsRUFBa0IsV0FBbEIsT0FBQSxF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TUFBQSxRQUFBLENBQUEsS0FBQSxDQUFBLElBQUEsRUFBMkI7QUFEeEMsaUJBQTlDLENBQVo7QUFESixhQUFBLE1BSU8sSUFBQSxJQUFBLElBQVksTUFBQSxRQUFBLENBQUEsS0FBQSxDQUFaLElBQVksQ0FBWjtBQUNQLG1CQUFBLEdBQUE7QUFORyxTQUFBLEVBQUEsRUFBQTtBQUQ4QixLQUFsQyxDQUFQO0FBREcsQ0FBQTs7QUFhQSxJQUFNLGdCQUFBLFFBQUEsYUFBQSxHQUFnQixTQUFoQixhQUFnQixDQUFBLENBQUEsRUFBQTtBQUFBLFdBQU0sQ0FBQyxDQUFDLEVBQUYsT0FBQSxJQUFlLENBQUMsV0FBQSxnQkFBQSxDQUFBLFFBQUEsQ0FBMEIsRUFBM0MsT0FBaUIsQ0FBaEIsSUFBeUQsRUFBRSxFQUFBLEtBQUEsS0FBQSxDQUFBLElBQWlCLEVBQUEsTUFBQSxLQUFsRixDQUErRCxDQUEvRDtBQUF0QixDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IENvb2tpZUJhbm5lciBmcm9tICcuLi8uLi9zcmMnO1xuICAgIFxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgQ29va2llQmFubmVyLmluaXQoe1xuICAgICAgICB0eXBlczoge1xuICAgICAgICAgICAgJ25lY2Vzc2FyeSc6IHtcbiAgICAgICAgICAgICAgICBmbnM6IFtcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4geyBjb25zb2xlLmxvZygnTmVjZXNzYXJ5IGZuJyk7IH0sXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdwZXJmb3JtYW5jZSc6IHtcbiAgICAgICAgICAgICAgICBjaGVja2VkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGZuczogW1xuICAgICAgICAgICAgICAgICAgICAoKSA9PiB7IGNvbnNvbGUubG9nKCdQZXJmb3JtYW5jZSBmbicpOyB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdhZHZlcnRpc2luZyBhbmQgbWFya2V0aW5nJzoge1xuICAgICAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGZuczogW1xuICAgICAgICAgICAgICAgICAgICAoKSA9PiB7IGNvbnNvbGUubG9nKCdBZHZlcnRpc2luZyBhbmQgbWFya2V0aW5nIGZuJyk7IH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn0pOyIsImltcG9ydCBkZWZhdWx0cyBmcm9tICcuL2xpYi9kZWZhdWx0cyc7XG5pbXBvcnQgZmFjdG9yeSBmcm9tICcuL2xpYic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBpbml0OiBvcHRzID0+IGZhY3RvcnkoT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIG9wdHMsIHtcbiAgICAgICAgdHlwZXM6IE9iamVjdC5rZXlzKG9wdHMudHlwZXMpLnJlZHVjZSgoYWNjLCBjdXJyKSA9PiB7XG4gICAgICAgICAgICBpZihhY2NbY3Vycl0pIHtcbiAgICAgICAgICAgICAgICBhY2NbY3Vycl0gPSBPYmplY3QuYXNzaWduKHt9LCBhY2NbY3Vycl0sIHtcbiAgICAgICAgICAgICAgICAgICAgZm5zOiBhY2NbY3Vycl0uZm5zLmNvbmNhdChvcHRzLnR5cGVzW2N1cnJdLmZucyksXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IG9wdHMudHlwZXNbY3Vycl0uY2hlY2tlZCAhPT0gdW5kZWZpbmVkID8gb3B0cy50eXBlc1tjdXJyXS5jaGVja2VkIDogZGVmYXVsdHMudHlwZXNbY3Vycl0uY2hlY2tlZCAhPT0gdW5kZWZpbmVkID8gZGVmYXVsdHMudHlwZXNbY3Vycl0uY2hlY2tlZCA6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ICBlbHNlIGFjY1tjdXJyXSA9IG9wdHMudHlwZXNbY3Vycl07XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9LCBkZWZhdWx0cy50eXBlcylcbiAgICB9KSlcbn07IiwiZXhwb3J0IGNvbnN0IGFwcGx5ID0gKHBlcmYgPSAnYWRkJykgPT4gc3RhdGUgPT4ge1xuICAgIC8vO187IG5lZWRzIHByb3BlciBlbnVtXG4gICAgY29uc3QgYXBwbGllZFN0YXRlID0gcGVyZiA9PT0gJ2FkZCcgXG4gICAgICAgICAgICAgICAgICAgICAgICA/IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IGNvbnNlbnQ6ICBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5jb25zZW50LCB7IHBlcmZvcm1hbmNlOiB0cnVlIH0pIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHBlcmYgPT09ICdyZW1vdmUnXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBjb25zZW50OiAgT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuY29uc2VudCwgeyBwZXJmb3JtYW5jZTogZmFsc2UgfSl9KVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBzdGF0ZTtcblxuICAgIE9iamVjdC5rZXlzKGFwcGxpZWRTdGF0ZS5jb25zZW50KS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIChhcHBsaWVkU3RhdGUuY29uc2VudFtrZXldICYmIGFwcGxpZWRTdGF0ZS5zZXR0aW5ncy50eXBlc1trZXldKSAmJiBhcHBsaWVkU3RhdGUuc2V0dGluZ3MudHlwZXNba2V5XS5mbnMuZm9yRWFjaChmbiA9PiBmbihhcHBsaWVkU3RhdGUpKTtcbiAgICB9KTtcbn07IiwiZXhwb3J0IGNvbnN0IFRSSUdHRVJfRVZFTlRTID0gd2luZG93LlBvaW50ZXJFdmVudCA/IFsncG9pbnRlcnVwJywgJ2tleWRvd24nXSA6IFsnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cgPyAndG91Y2hzdGFydCcgOiAnY2xpY2snLCAna2V5ZG93bicgXTtcblxuZXhwb3J0IGNvbnN0IFRSSUdHRVJfS0VZQ09ERVMgPSBbMTMsIDMyXTtcblxuZXhwb3J0IGNvbnN0IENMQVNTTkFNRSA9IHtcbiAgICBCQU5ORVI6ICdwcmVmZXJlbmNlcy1iYW5uZXInLFxuICAgIEZJRUxEOiAncHJlZmVyZW5jZXMtYmFubmVyX19maWVsZCcsXG4gICAgQlROOiAncHJlZmVyZW5jZXMtYmFubmVyX19idG4nXG59O1xuXG5leHBvcnQgY29uc3QgREFUQV9BVFRSSUJVVEUgPSB7XG4gICAgVFlQRTogJ2RhdGEtY29uc2VudC10eXBlJyxcbiAgICBJRDogJ2RhdGEtY29uc2VudC1pZCdcbn07IiwiaW1wb3J0IHsgd3JpdGVDb29raWUgfSBmcm9tICcuL3V0aWxzJzsgXG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0bmFtZTogJ0Nvb2tpZVByZWZlcmVuY2VzJyxcblx0cGF0aDogJy8nLFxuXHRkb21haW46ICcnLFxuXHRzZWN1cmU6IHRydWUsXG5cdGV4cGlyeTogMzY1LFxuXHR0eXBlczoge1xuXHRcdCduZWNlc3NhcnknOiB7XG5cdFx0XHRjaGVja2VkOiB0cnVlLFxuXHRcdFx0ZGlzYWJsZWQ6IHRydWUsXG5cdFx0XHRmbnM6IFtdXG5cdFx0fVxuXHR9LFxuXHRwb2xpY3lVUkw6ICcvY29va2llLXBvbGljeScsXG5cdGNsYXNzTmFtZXM6IHtcblx0XHRiYW5uZXI6ICdwcmVmZXJlbmNlcy1iYW5uZXInLFxuXHRcdGJ0bjogJ3ByZWZlcmVuY2VzLWJhbm5lcl9fYnRuJyxcblx0XHRmaWVsZDogJ3ByZWZlcmVuY2VzLWJhbm5lcl9fZmllbGQnLFxuXHRcdHVwZGF0ZUJ0bkNvbnRhaW5lcjogJ3ByZWZlcmVuY2VzLWJhbm5lcl9fdXBkYXRlJyxcblx0XHR1cGRhdGVCdG46ICdwcmVmZXJlbmNlcy1iYW5uZXJfX3VwZGF0ZS1idG4nXG5cdH0sXG5cdHVwZGF0ZUJ0blRlbXBsYXRlKG1vZGVsKXtcblx0XHRyZXR1cm4gYDxidXR0b24gY2xhc3M9XCIke21vZGVsLmNsYXNzTmFtZXMudXBkYXRlQnRufVwiPlVwZGF0ZSBjb29raWUgcHJlZmVyZW5jZXM8L2J1dHRvbj5gXG5cdH0sXG5cdGJhbm5lclRlbXBsYXRlKG1vZGVsKXtcblx0XHRyZXR1cm4gYDxzZWN0aW9uIHJvbGU9XCJkaWFsb2dcIiBhcmlhLWxpdmU9XCJwb2xpdGVcIiBhcmlhLWxhYmVsPVwiQ29va2llIGNvbnNlbnRcIiBhcmlhLWRlc2NyaWJlZGJ5PVwicHJlZmVyZW5jZXMtYmFubmVyX19kZXNjXCIgY2xhc3M9XCIke21vZGVsLmNsYXNzTmFtZXMuYmFubmVyfVwiPlxuXHRcdFx0PGRpdiBjbGFzcz1cInByZWZlcmVuY2VzLWNvbnRlbnRcIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cIndyYXBcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwicm93XCI+XG5cdFx0XHRcdFx0XHQ8IS0tZ29vZ2xlb2ZmOiBhbGwtLT5cblx0XHRcdFx0XHRcdDxkaXYgaWQ9XCJwcmVmZXJlbmNlcy1iYW5uZXJfX2Rlc2NcIj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInByZWZlcmVuY2VzLWJhbm5lcl9faGVhZGluZ1wiPlRoaXMgd2Vic2l0ZSB1c2VzIGNvb2tpZXMuPC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwicHJlZmVyZW5jZXMtYmFubmVyX190ZXh0XCI+V2UgdXNlIGNvb2tpZXMgdG8gYW5hbHlzZSBvdXIgdHJhZmZpYyBhbmQgdG8gcHJvdmlkZSBzb2NpYWwgbWVkaWEgZmVhdHVyZXMuIFlvdSBjYW4gY2hvb3NlIHdoaWNoIGNhdGVnb3JpZXMgb2YgY29va2llcyB5b3UgY29uc2VudCB0bywgb3IgYWNjZXB0IG91ciByZWNvbW1lbmRlZCBzZXR0aW5ncy5cblx0XHRcdFx0XHRcdFx0PGEgY2xhc3M9XCJwcmVmZXJlbmNlcy1iYW5uZXJfX2xpbmtcIiByZWw9XCJub29wZW5lciBub3JlZmVycmVyIG5vZm9sbG93XCIgaHJlZj1cIiR7bW9kZWwucG9saWN5VVJMfVwiPiBGaW5kIG91dCBtb3JlIGFib3V0IHRoZSBjb29raWVzIHdlIHVzZS48L2E+PC9wPlxuXHRcdFx0XHRcdFx0XHQ8dWwgY2xhc3M9XCJwcmVmZXJlbmNlcy1iYW5uZXJfX2xpc3RcIj5cblx0XHRcdFx0XHRcdFx0XHQke09iamVjdC5rZXlzKG1vZGVsLnR5cGVzKS5tYXAodHlwZSA9PiBgPGxpIGNsYXNzPVwicHJlZmVyZW5jZXMtYmFubmVyX19saXN0LWl0ZW1cIj5cblx0XHRcdFx0XHRcdFx0XHRcdDxpbnB1dCBpZD1cInByZWZlcmVuY2VzLWJhbm5lcl9fJHt0eXBlLnNwbGl0KCcgJylbMF0ucmVwbGFjZSgnICcsICctJyl9XCIgY2xhc3M9XCIke21vZGVsLmNsYXNzTmFtZXMuZmllbGR9XCIgdmFsdWU9XCIke3R5cGV9XCIgdHlwZT1cImNoZWNrYm94XCIke21vZGVsLnR5cGVzW3R5cGVdLmNoZWNrZWQgPyBgIGNoZWNrZWRgIDogJyd9JHttb2RlbC50eXBlc1t0eXBlXS5kaXNhYmxlZCA/IGAgZGlzYWJsZWRgIDogJyd9PlxuXHRcdFx0XHRcdFx0XHRcdFx0PGxhYmVsIGNsYXNzPVwicHJlZmVyZW5jZXMtYmFubmVyX19sYWJlbFwiIGZvcj1cInByZWZlcmVuY2VzLWJhbm5lcl9fJHt0eXBlLnNwbGl0KCcgJylbMF0ucmVwbGFjZSgnICcsICctJyl9XCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdCR7dHlwZS5zdWJzdHIoMCwgMSkudG9VcHBlckNhc2UoKX0ke3R5cGUuc3Vic3RyKDEpfSBjb29raWVzXG5cdFx0XHRcdFx0XHRcdFx0XHQ8L2xhYmVsPiAgXG5cdFx0XHRcdFx0XHRcdFx0PC9saT5gKS5qb2luKCcnKX1cblx0XHRcdFx0XHRcdFx0PC91bD5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PGJ1dHRvbiBjbGFzcz1cIiR7bW9kZWwuY2xhc3NOYW1lcy5idG59XCI+T0s8L2J1dHRvbj5cblx0XHRcdFx0XHRcdDwhLS1nb29nbGVvbjogYWxsLS0+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0PC9zZWN0aW9uPmA7XG5cdH1cbn07IiwiaW1wb3J0IHsgY29va2llc0VuYWJsZWQsIHJlYWRDb29raWUgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IGluaXRCYW5uZXIsIGluaXRVcGRhdGVCdG4gfSBmcm9tICcuL3VpJztcbmltcG9ydCB7IGFwcGx5IH0gZnJvbSAnLi9jb25zZW50JztcbmltcG9ydCBDcmVhdGVTdG9yZSBmcm9tICcuL3N0b3JlJztcbmltcG9ydCB7IGluaXRpYWxTdGF0ZSB9IGZyb20gJy4vcmVkdWNlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCBzZXR0aW5ncyA9PiB7XG4gICAgaWYoIWNvb2tpZXNFbmFibGVkKCkpIHJldHVybjtcbiAgICBcbiAgICBjb25zdCBTdG9yZSA9IENyZWF0ZVN0b3JlKCk7XG4gICAgY29uc3QgY29va2llcyA9IHJlYWRDb29raWUoc2V0dGluZ3MpO1xuICAgIFN0b3JlLnVwZGF0ZShcbiAgICAgICAgaW5pdGlhbFN0YXRlLFxuICAgICAgICB7IFxuICAgICAgICAgICAgc2V0dGluZ3MsXG4gICAgICAgICAgICBjb25zZW50OiBjb29raWVzID8gSlNPTi5wYXJzZShjb29raWVzLnZhbHVlKSA6IHt9IFxuICAgICAgICB9LFxuICAgICAgICBbYXBwbHkoIWNvb2tpZXMgPyAnYWRkJyA6ICdyZW1haW4nKSwgY29va2llcyA/IGluaXRVcGRhdGVCdG4oU3RvcmUpIDogaW5pdEJhbm5lcihTdG9yZSldXG4gICAgKTtcbn07IiwiZXhwb3J0IGNvbnN0IGluaXRpYWxTdGF0ZSA9IChzdGF0ZSwgZGF0YSkgPT4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIGRhdGEpO1xuZXhwb3J0IGNvbnN0IHNldENvbnNlbnQgPSAoc3RhdGUsIGRhdGEpID0+IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBkYXRhKTtcbmV4cG9ydCBjb25zdCB1cGRhdGVDb25zZW50ID0gKHN0YXRlLCBkYXRhKSA9PiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgZGF0YSk7IiwiZXhwb3J0IGRlZmF1bHQgKCkgPT4gKHtcbiAgICBzdGF0ZToge30sXG4gICAgdXBkYXRlKHJlZHVjZXIsIG5leHRTdGF0ZSwgZWZmZWN0cyA9IFtdKXsgXG4gICAgICAgIHRoaXMuc3RhdGUgPSByZWR1Y2VyKHRoaXMuc3RhdGUsIG5leHRTdGF0ZSk7XG4gICAgICAgIGlmKGVmZmVjdHMubGVuZ3RoID4gMCkgZWZmZWN0cy5mb3JFYWNoKGVmZmVjdCA9PiB7IGVmZmVjdCh0aGlzLnN0YXRlKSB9KTtcbiAgICB9LFxuICAgIGdldFN0YXRlKCkgeyByZXR1cm4gdGhpcy5zdGF0ZSB9XG59KTsiLCJpbXBvcnQgeyBjb21wb3NlVXBkYXRlVUlNb2RlbCwgc2hvdWxkRXhlY3V0ZSwgd3JpdGVDb29raWUsIGRlbGV0ZUNvb2tpZXMgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IFRSSUdHRVJfRVZFTlRTIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgYXBwbHkgfSBmcm9tICcuL2NvbnNlbnQnO1xuaW1wb3J0IHsgc2V0Q29uc2VudCwgdXBkYXRlQ29uc2VudCB9IGZyb20gJy4vcmVkdWNlcnMnO1xuXG5leHBvcnQgY29uc3QgaW5pdEJhbm5lciA9IFN0b3JlID0+IHN0YXRlID0+IHtcbiAgICBkb2N1bWVudC5ib2R5LmZpcnN0RWxlbWVudENoaWxkLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlYmVnaW4nLCBzdGF0ZS5zZXR0aW5ncy5iYW5uZXJUZW1wbGF0ZShjb21wb3NlVXBkYXRlVUlNb2RlbChzdGF0ZSkpKTtcbiAgICBjb25zdCBmaWVsZHMgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke3N0YXRlLnNldHRpbmdzLmNsYXNzTmFtZXMuZmllbGR9YCkpO1xuICAgIGNvbnN0IGJhbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3N0YXRlLnNldHRpbmdzLmNsYXNzTmFtZXMuYmFubmVyfWApO1xuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3N0YXRlLnNldHRpbmdzLmNsYXNzTmFtZXMuYnRufWApO1xuXG4gICAgVFJJR0dFUl9FVkVOVFMuZm9yRWFjaChldiA9PiB7XG4gICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKGV2LCBlID0+IHtcbiAgICAgICAgICAgIGlmKCFzaG91bGRFeGVjdXRlKGUpKSByZXR1cm47XG5cbiAgICAgICAgICAgIGNvbnN0IGNvbnNlbnQgPSBmaWVsZHMucmVkdWNlKChhY2MsIGZpZWxkKSA9PiB7IHJldHVybiBhY2NbZmllbGQudmFsdWVdID0gZmllbGQuY2hlY2tlZCwgYWNjIH0sIHt9KTtcbiAgICAgICAgICAgIFN0b3JlLnVwZGF0ZShcbiAgICAgICAgICAgICAgICBzZXRDb25zZW50LFxuICAgICAgICAgICAgICAgIHsgY29uc2VudCB9LFxuICAgICAgICAgICAgICAgICFjb25zZW50LnBlcmZvcm1hbmNlIFxuICAgICAgICAgICAgICAgID8gW1xuICAgICAgICAgICAgICAgICAgICBkZWxldGVDb29raWVzLFxuICAgICAgICAgICAgICAgICAgICB3cml0ZUNvb2tpZSxcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4gbG9jYXRpb24ucmVsb2FkKCksIDYwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICA6IFtcbiAgICAgICAgICAgICAgICAgICAgd3JpdGVDb29raWUsXG4gICAgICAgICAgICAgICAgICAgIGFwcGx5KHN0YXRlLmNvbnNlbnQucGVyZm9ybWFuY2UgPyAncmVtYWluJyA6ICdyZW1vdmUnKSxcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4geyBcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhbm5lci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGJhbm5lcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0VXBkYXRlQnRuKFN0b3JlKShzdGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGluaXRVcGRhdGVCdG4gPSBTdG9yZSA9PiBzdGF0ZSA9PiB7XG4gICAgY29uc3QgdXBkYXRlQnRuQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7c3RhdGUuc2V0dGluZ3MuY2xhc3NOYW1lcy51cGRhdGVCdG5Db250YWluZXJ9YCk7XG4gICAgaWYoIXVwZGF0ZUJ0bkNvbnRhaW5lcikgcmV0dXJuO1xuICAgIGNvbnN0IHVwZGF0ZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3N0YXRlLnNldHRpbmdzLmNsYXNzTmFtZXMudXBkYXRlQnRufWApO1xuICAgIGlmKHVwZGF0ZUJ0bikgdXBkYXRlQnRuLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgICBlbHNlIHVwZGF0ZUJ0bkNvbnRhaW5lci5pbm5lckhUTUwgPSBzdGF0ZS5zZXR0aW5ncy51cGRhdGVCdG5UZW1wbGF0ZShzdGF0ZS5zZXR0aW5ncyk7XG4gICAgY29uc3QgaGFuZGxlciA9IGUgPT4ge1xuICAgICAgICBpZighc2hvdWxkRXhlY3V0ZShlKSkgcmV0dXJuO1xuICAgICAgICBTdG9yZS51cGRhdGUodXBkYXRlQ29uc2VudCwge30sIFsgaW5pdEJhbm5lcihTdG9yZSksICgpID0+IHsgXG4gICAgICAgICAgICBlLnRhcmdldC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICBUUklHR0VSX0VWRU5UUy5mb3JFYWNoKGV2ID0+IHtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKGV2LCBoYW5kbGVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XSk7XG4gICAgfTtcblxuICAgIFRSSUdHRVJfRVZFTlRTLmZvckVhY2goZXYgPT4ge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtzdGF0ZS5zZXR0aW5ncy5jbGFzc05hbWVzLnVwZGF0ZUJ0bn1gKS5hZGRFdmVudExpc3RlbmVyKGV2LCBoYW5kbGVyKTtcbiAgICB9KTtcbn07IiwiaW1wb3J0IHsgVFJJR0dFUl9LRVlDT0RFUyB9IGZyb20gJy4vY29uc3RhbnRzJztcblxuLy9Nb2Rlcm5penIgY29va2llIHRlc3RcbmV4cG9ydCBjb25zdCBjb29raWVzRW5hYmxlZCA9ICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgICBkb2N1bWVudC5jb29raWUgPSAnY29va2lldGVzdD0xJztcbiAgICAgICAgY29uc3QgcmV0ID0gZG9jdW1lbnQuY29va2llLmluZGV4T2YoJ2Nvb2tpZXRlc3Q9JykgIT09IC0xO1xuICAgICAgICBkb2N1bWVudC5jb29raWUgPSAnY29va2lldGVzdD0xOyBleHBpcmVzPVRodSwgMDEtSmFuLTE5NzAgMDA6MDA6MDEgR01UJztcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH1cbiAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbn07XG5cbmV4cG9ydCBjb25zdCB3cml0ZUNvb2tpZSA9IHN0YXRlID0+IGRvY3VtZW50LmNvb2tpZSA9IFtcbiAgICBgJHtzdGF0ZS5zZXR0aW5ncy5uYW1lfT0ke0pTT04uc3RyaW5naWZ5KE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmNvbnNlbnQsIHsgaW50ZW50OiBzdGF0ZS5pbnRlbnQgfSkpfTtgLFxuICAgIGBleHBpcmVzPSR7KG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgKHN0YXRlLnNldHRpbmdzLmV4cGlyeSoyNCo2MCo2MCoxMDAwKSkpLnRvR01UU3RyaW5nKCl9O2AsXG4gICAgYHBhdGg9JHtzdGF0ZS5zZXR0aW5ncy5wYXRofTtgLFxuICAgIHN0YXRlLnNldHRpbmdzLmRvbWFpbiA/IGBkb21haW49JHtzdGF0ZS5zZXR0aW5ncy5kb21haW59YCA6ICcnLFxuICAgIHN0YXRlLnNldHRpbmdzLnNlY3VyZSA/IGBzZWN1cmVgIDogJydcbl0uam9pbignJyk7XG5cbmV4cG9ydCBjb25zdCByZWFkQ29va2llID0gc2V0dGluZ3MgPT4ge1xuICAgIGNvbnN0IGNvb2tpZSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOyAnKS5tYXAocGFydCA9PiAoeyBuYW1lOiBwYXJ0LnNwbGl0KCc9JylbMF0sIHZhbHVlOiBwYXJ0LnNwbGl0KCc9JylbMV0gfSkpLmZpbHRlcihwYXJ0ID0+IHBhcnQubmFtZSA9PT0gc2V0dGluZ3MubmFtZSlbMF07XG4gICAgcmV0dXJuIGNvb2tpZSAhPT0gdW5kZWZpbmVkID8gY29va2llIDogZmFsc2U7XG59O1xuXG5jb25zdCB1cGRhdGVDb29raWUgPSBzdGF0ZSA9PiBtb2RlbCA9PiBkb2N1bWVudC5jb29raWUgPSBbXG4gICAgYCR7bW9kZWwubmFtZX09JHttb2RlbC52YWx1ZX07YCxcbiAgICBgZXhwaXJlcz0ke21vZGVsLmV4cGlyeX07YCxcbiAgICBgcGF0aD0ke3N0YXRlLnNldHRpbmdzLnBhdGh9O2AsXG4gICAgc3RhdGUuc2V0dGluZ3MuZG9tYWluID8gYGRvbWFpbj0ke3N0YXRlLnNldHRpbmdzLmRvbWFpbn07YCA6ICcnLFxuICAgIHN0YXRlLnNldHRpbmdzLnNlY3VyZSA/IGBzZWN1cmVgIDogJydcbl0uam9pbignJyk7XG5cbmV4cG9ydCBjb25zdCBkZWxldGVDb29raWVzID0gc3RhdGUgPT4ge1xuICAgIGRvY3VtZW50LmNvb2tpZVxuICAgICAgICAuc3BsaXQoJzsgJylcbiAgICAgICAgLm1hcChwYXJ0ID0+ICh7IFxuICAgICAgICAgICAgbmFtZTogcGFydC5zcGxpdCgnPScpWzBdLFxuICAgICAgICAgICAgdmFsdWU6IHBhcnQuc3BsaXQoJz0nKVsxXSxcbiAgICAgICAgICAgIGV4cGlyeTogJ1RodSwgMDEgSmFuIDE5NzAgMDA6MDA6MDEgR01UJ1xuICAgICAgICB9KSlcbiAgICAgICAgLm1hcCh1cGRhdGVDb29raWUoc3RhdGUpKTtcbn07XG5cbmV4cG9ydCBjb25zdCBjb21wb3NlVXBkYXRlVUlNb2RlbCA9IHN0YXRlID0+IHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuc2V0dGluZ3MsIHtcbiAgICAgICAgdHlwZXM6IE9iamVjdC5rZXlzKHN0YXRlLnNldHRpbmdzLnR5cGVzKS5yZWR1Y2UoKGFjYywgdHlwZSkgPT4ge1xuICAgICAgICAgICAgaWYoc3RhdGUuY29uc2VudFt0eXBlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgYWNjW3R5cGVdID0gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUuc2V0dGluZ3MudHlwZXNbdHlwZV0sIHtcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogc3RhdGUuY29uc2VudFt0eXBlXSAhPT0gdW5kZWZpbmVkID8gc3RhdGUuY29uc2VudFt0eXBlXSA6IHN0YXRlLnNldHRpbmdzLnR5cGVzW3R5cGVdLmNoZWNrZWRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBhY2NbdHlwZV0gPSBzdGF0ZS5zZXR0aW5ncy50eXBlc1t0eXBlXTtcbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sIHt9KVxuICAgIH0pXG59O1xuXG5leHBvcnQgY29uc3Qgc2hvdWxkRXhlY3V0ZSA9IGUgPT4gKCEhZS5rZXlDb2RlICYmICFUUklHR0VSX0tFWUNPREVTLmluY2x1ZGVzKGUua2V5Q29kZSkpIHx8ICEoZS53aGljaCA9PT0gMyB8fCBlLmJ1dHRvbiA9PT0gMik7Il19
