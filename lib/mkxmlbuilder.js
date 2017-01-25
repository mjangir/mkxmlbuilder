(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jQuery"));
	else if(typeof define === 'function' && define.amd)
		define("Mkxmlbuilder", ["jQuery"], factory);
	else if(typeof exports === 'object')
		exports["Mkxmlbuilder"] = factory(require("jQuery"));
	else
		root["Mkxmlbuilder"] = factory(root["jQuery"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	(function (root, factory) {
	    if (( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined') {
	        module.exports = factory(__webpack_require__(1), __webpack_require__(2), __webpack_require__(3), global || root);
	    } else {
	        root.Mkxmlbuilder = factory(utils, root.jQuery, root.bootstrap, root.toastr, root.alert, root);
	    }
	})(typeof window !== 'undefined' ? window : undefined, function (jQuery, styles, root) {
	
	    var _classCallCheck = function _classCallCheck(instance, Constructor) {
	        if (!(instance instanceof Constructor)) {
	            throw new TypeError('Cannot call a class as a function');
	        }
	    };
	
	    var _collapseClickHandler = function _collapseClickHandler(event) {
	        console.log(event.target);
	    };
	
	    var _attrClickHandler = function _attrClickHandler(event) {
	        console.log(event.target);
	    };
	
	    var _addClickHandler = function _addClickHandler(event, parent, nodeValueInput) {
	        var howMany = prompt('Please enter number of nodes you want') || 1;
	        var inputStyle = window.getComputedStyle(nodeValueInput, null);
	        var width = inputStyle.getPropertyValue('width');
	        console.log(width);
	        _renderFresh.call(this, parent, howMany);
	    };
	
	    var _removeClickHandler = function _removeClickHandler(event) {
	        console.log(event.target);
	    };
	
	    var _renderFresh = function _renderFresh(parent, howMany, data) {
	        var numberOfItems = howMany || 1;
	        for (var i = 1; i <= numberOfItems; i++) {
	            var nodeItem = document.createElement('div'),
	                inputBoxWrapper = document.createElement('div'),
	                nodeNameInput = document.createElement('input'),
	                nodeValueInput = document.createElement('input'),
	                inputBox = document.createElement('input'),
	                collapseBtnWrapper = document.createElement('span'),
	                collapseBtn = document.createElement('i'),
	                attrBtnWrapper = document.createElement('span'),
	                attrBtn = document.createElement('i'),
	                addBtnWrapper = document.createElement('span'),
	                addBtn = document.createElement('i'),
	                removeBtnWrapper = document.createElement('span'),
	                removeBtn = document.createElement('i');
	
	            nodeItem.className = 'node-item';
	            inputBoxWrapper.className = this.options.inputBoxWrapperClass;
	            nodeNameInput.className = this.options.nodeNameInputClass;
	            nodeValueInput.className = this.options.nodeValueInputClass;
	            collapseBtnWrapper.className = 'node-icon';
	            attrBtnWrapper.className = 'node-icon';
	            addBtnWrapper.className = 'node-icon';
	            removeBtnWrapper.className = 'node-icon';
	
	            collapseBtn.className = this.options.collapseIconClass;
	            attrBtn.className = this.options.attrIconClass;
	            addBtn.className = this.options.addIconClass;
	            removeBtn.className = this.options.removeIconClass;
	
	            collapseBtnWrapper.appendChild(collapseBtn);
	            attrBtnWrapper.appendChild(attrBtn);
	            addBtnWrapper.appendChild(addBtn);
	            removeBtnWrapper.appendChild(removeBtn);
	
	            inputBoxWrapper.appendChild(nodeNameInput);
	            inputBoxWrapper.appendChild(nodeValueInput);
	            inputBoxWrapper.appendChild(collapseBtnWrapper);
	            inputBoxWrapper.appendChild(attrBtnWrapper);
	            inputBoxWrapper.appendChild(addBtnWrapper);
	            inputBoxWrapper.appendChild(removeBtnWrapper);
	
	            nodeItem.appendChild(inputBoxWrapper);
	
	            collapseBtnWrapper.onclick = _collapseClickHandler;
	
	            attrBtnWrapper.onclick = _attrClickHandler;
	
	            addBtnWrapper.onclick = function (_this, parent) {
	                return function (event) {
	                    _addClickHandler.call(_this, event, parent, nodeNameInput);
	                };
	            }(this, nodeItem);
	
	            removeBtnWrapper.onclick = _removeClickHandler;
	
	            parent.appendChild(nodeItem);
	        }
	    };
	
	    var _renderWithData = function _renderWithData(parent, data) {};
	
	    var Mkxmlbuilder = function Mkxmlbuilder(element, options, data) {
	
	        _classCallCheck(this, Mkxmlbuilder);
	
	        this.options = {
	            collapsable: true,
	            allowAttributes: true,
	            showRemoveConfirmation: true,
	            showRemoveButton: true,
	            collapseButtonClass: 'text-primary',
	            addButtonClass: 'text-success',
	            removeButtonClass: 'text-danger',
	            attrButtonClass: 'text-info',
	            showXmlPreview: true,
	            inputBoxWrapperClass: 'input-box',
	            nodeNameInputClass: 'form-control node-name',
	            nodeValueInputClass: 'form-control node-value',
	            collapseIconClass: 'fa fa-plus text-primary',
	            attrIconClass: 'fa fa-tag text-succss',
	            addIconClass: 'fa fa-plus-circle text-info',
	            removeIconClass: 'fa fa-trash text-danger'
	        };
	        this.data = null;
	
	        if (arguments.length <= 0) {
	            throw new TypeError('You must have to provide element in the constructor');
	        } else {
	            this.element = arguments[0];
	
	            if (arguments.length === 2) {
	                this.options = utils.extend(this.options, arguments[1]);
	            }
	            if (arguments.length === 3) {
	                this.data = arguments[2];
	            }
	        }
	
	        this.init();
	    };
	
	    Mkxmlbuilder.prototype.init = function () {
	        if (this.data !== null) {
	            _renderWithData.call(this, this.element, this.data);
	        } else {
	            _renderFresh.call(this, this.element);
	        }
	    };
	
	    Mkxmlbuilder.prototype.generateJsonOutput = function () {};
	
	    Mkxmlbuilder.prototype.generateXmlOutput = function () {};
	
	    return Mkxmlbuilder;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	var utils = {
	
	    addClass: function addClass(element, classes) {
	        if (typeof classes === 'undefined' || classes === null || classes === '' || !classes) {
	            return;
	        }
	        var classList = classes.indexOf(' ') > -1 ? classes.split(' ') : classes;
	        if (Array.isArray(classList)) {
	            for (var i = 0; i < classList.length; i++) {
	                element.classList.add(classList[i]);
	            }
	        } else {
	            element.classList.add(classList);
	        }
	        return element;
	    },
	    escapeHtml: function escapeHtml(source) {
	        if (source == null) {
	            source = '';
	        }
	
	        return source.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	    },
	    stringToHtmlElement: function stringToHtmlElement(html) {
	        var frame = document.createElement('iframe');
	        frame.style.display = 'none';
	        document.body.appendChild(frame);
	        frame.contentDocument.open();
	        frame.contentDocument.write(html);
	        frame.contentDocument.close();
	        var el = frame.contentDocument.body.firstChild;
	        document.body.removeChild(frame);
	        return el;
	    },
	    extend: function extend(defaults, options) {
	        var extended = {};
	        var prop;
	        for (prop in defaults) {
	            if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
	                extended[prop] = defaults[prop];
	            }
	        }
	        for (prop in options) {
	            if (Object.prototype.hasOwnProperty.call(options, prop)) {
	                extended[prop] = options[prop];
	            }
	        }
	        return extended;
	    },
	
	    isElementVisible: function isElementVisible(el) {
	        var style = window.getComputedStyle(el);
	        return style.display === 'none' || style.visibility == 'hidden';
	    },
	
	    design: {
	        easing: {
	            linear: function linear(progress) {
	                return progress;
	            },
	            quadratic: function quadratic(progress) {
	                return Math.pow(progress, 2);
	            },
	            swing: function swing(progress) {
	                return 0.5 - Math.cos(progress * Math.PI) / 2;
	            },
	            circ: function circ(progress) {
	                return 1 - Math.sin(Math.acos(progress));
	            },
	            back: function back(progress, x) {
	                return Math.pow(progress, 2) * ((x + 1) * progress - x);
	            },
	            bounce: function bounce(progress) {
	                for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
	                    if (progress >= (7 - 4 * a) / 11) {
	                        return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
	                    }
	                }
	            },
	            elastic: function elastic(progress, x) {
	                return Math.pow(2, 10 * (progress - 1)) * Math.cos(20 * Math.PI * x / 3 * progress);
	            }
	        },
	        animate: function animate(options) {
	            var start = new Date();
	            var id = setInterval(function () {
	                var timePassed = new Date() - start;
	                var progress = timePassed / options.duration;
	                if (progress > 1) {
	                    progress = 1;
	                }
	                options.progress = progress;
	                var delta = options.delta(progress);
	                options.step(delta);
	                if (progress == 1) {
	                    clearInterval(id);
	                    if (typeof options.complete === 'function') {
	                        options.complete();
	                    }
	                }
	            }, options.delay || 10);
	            return id;
	        },
	        fadeOut: function fadeOut(element, options) {
	            var to = 1;
	            var easing = options.easing || 'swing';
	            return this.animate({
	                duration: options.duration,
	                delta: function delta(progress) {
	                    progress = this.progress;
	                    return utils.design.easing[easing](progress);
	                },
	                complete: options.complete,
	                step: function step(delta) {
	                    element.style.opacity = to - delta;
	                }
	            });
	        },
	        fadeIn: function fadeIn(element, options) {
	            var to = 0;
	            var easing = options.easing || 'swing';
	            return this.animate({
	                duration: options.duration,
	                delta: function delta(progress) {
	                    progress = this.progress;
	                    return utils.design.easing[easing](progress);
	                },
	                complete: options.complete,
	                step: function step(delta) {
	                    element.style.opacity = to + delta;
	                }
	            });
	        }
	    }
	};
	
	module.exports = utils;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ])
});
;
//# sourceMappingURL=mkxmlbuilder.js.map