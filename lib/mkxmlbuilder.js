(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jQuery"));
	else if(typeof define === 'function' && define.amd)
		define("Mkxmlbuilder", ["jQuery"], factory);
	else if(typeof exports === 'object')
		exports["Mkxmlbuilder"] = factory(require("jQuery"));
	else
		root["Mkxmlbuilder"] = factory(root["jQuery"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__) {
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
	        module.exports = factory(__webpack_require__(1), __webpack_require__(2), __webpack_require__(3), __webpack_require__(4), __webpack_require__(5), global || root);
	    } else {
	        root.Mkxmlbuilder = factory(utils, attributeModal, previewObj, root.jQuery, root.bootstrap, root.toastr, root.alert, root);
	    }
	})(typeof window !== 'undefined' ? window : undefined, function (utils, attributeModal, previewObject, jQuery, styles, root) {
	
	    var _classCallCheck = function _classCallCheck(instance, Constructor) {
	        if (!(instance instanceof Constructor)) {
	            throw new TypeError('Cannot call a class as a function');
	        }
	    };
	
	    var _createOuterWrapper = function _createOuterWrapper(masterElement) {
	        var resolvedElement;
	
	        if (typeof masterElement === 'string') {
	            resolvedElement = document.querySelector(masterElement);
	        } else if ((typeof masterElement === 'undefined' ? 'undefined' : _typeof(masterElement)) === 'object' && masterElement.tagName) {
	            resolvedElement = masterElement;
	        } else if (masterElement instanceof jQuery) {
	            resolvedElement = masterElement.get(0);
	        } else {
	            throw new Error('Element must be a valid selector, jQuery object or HTMLDom Node');
	        }
	
	        if (resolvedElement) {
	            this.outerWrapper = document.createElement('div');
	            this.outerWrapper.className = 'mkxmlbuilder-outer-wrapper';
	            this.editorWrapper = document.createElement('div');
	            this.previewWrapper = document.createElement('div');
	            this.editorWrapper.style.float = 'left';
	            this.previewWrapper.style.float = 'right';
	            if (this.options.showXmlPreview) {
	                this.editorWrapper.style.width = '58%';
	                this.previewWrapper.style.width = '40%';
	                this.xmlPreview = new previewObject(this.previewWrapper);
	            } else {
	                this.editorWrapper.style.width = '100%';
	            }
	            this.outerWrapper.appendChild(this.editorWrapper);
	            this.outerWrapper.appendChild(this.previewWrapper);
	        }
	        return resolvedElement;
	    };
	
	    var _generateUID = function guid() {
	        function s4() {
	            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	        }
	        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	    };
	
	    var _changeNodeNameHandler = function _changeNodeNameHandler(event, nodeItem) {
	        nodeItem.mkxmlNodeName = event.target.value;
	    };
	
	    var _changeNodeValueHandler = function _changeNodeValueHandler(event, nodeItem) {
	        nodeItem.mkxmlNodeValue = event.target.value;
	    };
	
	    var _collapseClickHandler = function _collapseClickHandler(event) {};
	
	    var _attrClickHandler = function _attrClickHandler(event, nodeItem) {
	        this.attributeModal.setNode(nodeItem);
	        this.attributeModal.show();
	    };
	
	    var _addClickHandler = function _addClickHandler(event, parent, nodeNameInput, nodeValueInput) {
	        var howMany = prompt('Please enter number of nodes you want') || 0;
	        var inputStyle = window.getComputedStyle(nodeNameInput, null);
	        var width = parseInt(inputStyle.getPropertyValue('width'), 10);
	        if (howMany > 0) {
	            nodeNameInput.style.width = width * 2 + width * 2 * 1 / 100 + 'px';
	            nodeValueInput.style.display = 'none';
	            _renderFresh.call(this, parent, howMany);
	        }
	    };
	
	    var _removeClickHandler = function _removeClickHandler(event, parent, removableNode) {
	        removableNode.remove();
	        var nodeNameInput = parent.querySelector('.' + this.options.inputBoxWrapperClass + ' .node-name');
	        var nodeValueInput = parent.querySelector('.' + this.options.inputBoxWrapperClass + ' .node-value');
	        var numberOfNodes = parent.querySelectorAll('.node-item');
	        removableNode.remove();
	        if (numberOfNodes.length < 1) {
	            var nodeNameInputStyle = window.getComputedStyle(nodeNameInput, null);
	            var width = parseInt(nodeNameInputStyle.getPropertyValue('width'), 10);
	            nodeNameInput.style.width = width / 2 - width / 2 * 1 / 100 + 'px';
	            nodeValueInput.style.display = 'inline-block';
	        }
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
	                addBtn = document.createElement('i');
	
	            nodeItem.mkxmlUniqueId = _generateUID();
	            nodeItem.className = 'node-item';
	            inputBoxWrapper.className = this.options.inputBoxWrapperClass;
	            nodeNameInput.className = this.options.nodeNameInputClass;
	            nodeValueInput.className = this.options.nodeValueInputClass;
	            nodeNameInput.setAttribute('placeholder', 'Node Name...');
	            nodeValueInput.setAttribute('placeholder', 'Node Value...');
	            collapseBtnWrapper.className = 'node-icon';
	            attrBtnWrapper.className = 'node-icon';
	            addBtnWrapper.className = 'node-icon';
	
	            collapseBtn.className = this.options.collapseIconClass;
	            attrBtn.className = this.options.attrIconClass;
	            addBtn.className = this.options.addIconClass;
	
	            collapseBtnWrapper.appendChild(collapseBtn);
	            attrBtnWrapper.appendChild(attrBtn);
	            addBtnWrapper.appendChild(addBtn);
	
	            inputBoxWrapper.appendChild(nodeNameInput);
	            inputBoxWrapper.appendChild(nodeValueInput);
	            inputBoxWrapper.appendChild(collapseBtnWrapper);
	            inputBoxWrapper.appendChild(attrBtnWrapper);
	            inputBoxWrapper.appendChild(addBtnWrapper);
	
	            nodeItem.appendChild(inputBoxWrapper);
	
	            nodeItem.mkxmlAttributes = {};
	
	            nodeNameInput.onkeyup = function (_this, nodeItem) {
	                return function (event) {
	                    _changeNodeNameHandler.call(_this, event, nodeItem);
	                };
	            }(this, nodeItem);
	
	            nodeNameInput.onchange = function (_this, nodeItem) {
	                return function (event) {
	                    _changeNodeNameHandler.call(_this, event, nodeItem);
	                };
	            }(this, nodeItem);
	
	            nodeValueInput.onkeyup = function (_this, nodeItem) {
	                return function (event) {
	                    _changeNodeValueHandler.call(_this, event, nodeItem);
	                };
	            }(this, nodeItem);
	
	            nodeValueInput.onchange = function (_this, nodeItem) {
	                return function (event) {
	                    _changeNodeValueHandler.call(_this, event, nodeItem);
	                };
	            }(this, nodeItem);
	
	            collapseBtnWrapper.onclick = _collapseClickHandler;
	
	            attrBtnWrapper.onclick = function (_this, nodeItem) {
	                return function (event) {
	                    _attrClickHandler.call(_this, event, nodeItem);
	                };
	            }(this, nodeItem);
	
	            addBtnWrapper.onclick = function (_this, parent, nodeNameInput, nodeValueInput) {
	                return function (event) {
	                    _addClickHandler.call(_this, event, parent, nodeNameInput, nodeValueInput);
	                };
	            }(this, nodeItem, nodeNameInput, nodeValueInput);
	
	            if (parent !== this.editorWrapper) {
	                var removeBtnWrapper = document.createElement('span'),
	                    removeBtn = document.createElement('i');
	                removeBtnWrapper.className = 'node-icon';
	                removeBtn.className = this.options.removeIconClass;
	                removeBtnWrapper.appendChild(removeBtn);
	                inputBoxWrapper.appendChild(removeBtnWrapper);
	                removeBtnWrapper.onclick = function (_this, parent, nodeNameInput, nodeValueInput) {
	                    return function (event) {
	                        _removeClickHandler.call(_this, event, parent, nodeNameInput, nodeValueInput);
	                    };
	                }(this, parent, nodeItem);
	            }
	
	            //this.xmlNodes[parent.mkxmlUniqueId] = (Array.isArray(this.xmlNodes[parent.mkxmlUniqueId])) ? this.xmlNodes[parent.mkxmlUniqueId].push(nodeItem) : [nodeItem];
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
	            removeIconClass: 'fa fa-trash text-danger',
	            editorTitle: 'Create Your XML',
	            previewTitle: 'XML Preivew'
	        };
	        this.data = null;
	        this.xmlNodes = {};
	
	        if (arguments.length <= 0) {
	            throw new TypeError('You must have to provide element in the constructor');
	        } else {
	            this.element = _createOuterWrapper.call(this, arguments[0]);
	
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
	        this.editorWrapper.mkxmlUniqueId = _generateUID();
	        if (this.data !== null) {
	            _renderWithData.call(this, this.editorWrapper, this.data);
	        } else {
	            _renderFresh.call(this, this.editorWrapper);
	        }
	
	        this.attributeModal = new attributeModal();
	    };
	
	    Mkxmlbuilder.prototype.generateJsonOutput = function () {};
	
	    Mkxmlbuilder.prototype.generateXmlOutput = function () {};
	
	    Mkxmlbuilder.prototype.getAllXmlNodes = function () {
	        return this.xmlNodes;
	    };
	
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var utils = __webpack_require__(1);
	
	(function () {
	    var _classCallCheck = function _classCallCheck(instance, Constructor) {
	        if (!(instance instanceof Constructor)) {
	            throw new TypeError('Cannot call a class as a function');
	        }
	    };
	
	    var _addEventHandlers = function _addEventHandlers() {
	        var context = this;
	
	        this.closeIcon.onclick = function () {
	            context.hide();
	        };
	        this.closeBtn.onclick = function () {
	            context.hide();
	        };
	        this.saveBtn.onclick = function () {
	            context.save();
	        };
	    };
	
	    var AttributeModal = function AttributeModal() {
	
	        _classCallCheck(this, AttributeModal);
	
	        this.options = {
	            headerTitle: 'Set Node Attributes',
	            saveBtnClass: 'btn btn-success',
	            closeBtnClass: 'btn btn-danger'
	        };
	        this.nodeItem = null;
	        this.init();
	    };
	
	    AttributeModal.prototype.init = function () {
	        var modalWrapper, modalDialog, modalContent, modalHeader, headerTitle, headerCloseBtn, headerCloseIcon, modalBody, modalFooter, footerSaveBtn, footerCloseBtn;
	
	        modalWrapper = document.createElement('div');
	        modalWrapper.className = 'modal fade mkxmlbuilder-attr-modal';
	        modalWrapper.style.display = 'none';
	
	        modalDialog = document.createElement('div');
	        modalDialog.className = 'modal-dialog';
	
	        modalContent = document.createElement('div');
	        modalContent.className = 'modal-content';
	
	        modalHeader = document.createElement('div');
	        modalHeader.className = 'modal-header';
	
	        headerTitle = document.createElement('h4');
	        headerTitle.className = 'modal-title';
	        headerTitle.innerHTML = this.options.headerTitle;
	
	        headerCloseBtn = document.createElement('button');
	        headerCloseBtn.className = 'close';
	        headerCloseIcon = document.createElement('span');
	        headerCloseIcon.innerHTML = '&times;';
	        headerCloseBtn.appendChild(headerCloseIcon);
	
	        modalHeader.appendChild(headerCloseBtn);
	        modalHeader.appendChild(headerTitle);
	
	        modalBody = document.createElement('div');
	        modalBody.className = 'modal-body';
	
	        modalFooter = document.createElement('div');
	        modalFooter.className = 'modal-footer';
	
	        footerSaveBtn = document.createElement('button');
	        footerSaveBtn.className = this.options.saveBtnClass;
	        footerSaveBtn.innerHTML = 'Save';
	
	        footerCloseBtn = document.createElement('button');
	        footerCloseBtn.className = this.options.closeBtnClass;
	        footerCloseBtn.innerHTML = 'Close';
	
	        modalFooter.appendChild(footerCloseBtn);
	        modalFooter.appendChild(footerSaveBtn);
	
	        modalWrapper.appendChild(modalDialog);
	        modalDialog.appendChild(modalContent);
	        modalContent.appendChild(modalHeader);
	        modalContent.appendChild(modalBody);
	        modalContent.appendChild(modalFooter);
	
	        this.modalWrapper = modalWrapper;
	        this.modalBody = modalBody;
	        this.saveBtn = footerSaveBtn;
	        this.closeBtn = footerCloseBtn;
	        this.closeIcon = headerCloseIcon;
	
	        document.querySelector('body').appendChild(modalWrapper);
	
	        _addEventHandlers.call(this);
	
	        return this;
	    };
	
	    AttributeModal.prototype.setNode = function (nodeItem) {
	        this.nodeItem = nodeItem;
	    };
	
	    AttributeModal.prototype.setModalAttributes = function (attributes) {
	        var context = this,
	            row,
	            attrName,
	            attrValue,
	            addBtn,
	            removeBtn,
	            attrObj;
	
	        if (typeof attributes !== 'undefined') {
	            while (this.modalBody.firstChild) {
	                this.modalBody.removeChild(this.modalBody.firstChild);
	            }
	        }
	
	        attributes = attributes || [{ name: '', value: '' }];
	
	        for (var k = 0; k < attributes.length; k++) {
	            attrObj = attributes[k];
	
	            row = document.createElement('div');
	            row.className = 'attr-row';
	
	            attrName = document.createElement('input');
	            attrName.className = 'attr-name form-control';
	            attrName.value = attrObj.name;
	
	            attrValue = document.createElement('input');
	            attrValue.className = 'attr-value form-control';
	            attrValue.value = attrObj.value;
	
	            addBtn = document.createElement('span');
	            addBtn.className = 'attr-add-button';
	            addBtn.innerHTML = '<i class="fa fa-plus-circle text-primary"></i>';
	
	            removeBtn = document.createElement('span');
	            removeBtn.className = 'attr-remove-button';
	            removeBtn.innerHTML = '<i class="fa fa-minus-circle text-danger"></i>';
	
	            addBtn.onclick = function () {
	                context.setModalAttributes();
	            };
	            removeBtn.onclick = function () {
	                row.remove();
	            };
	
	            row.appendChild(attrName);
	            row.appendChild(attrValue);
	
	            this.modalBody.appendChild(row);
	
	            if (this.modalBody.querySelectorAll('.attr-row').length > 1) {
	                row.appendChild(removeBtn);
	            } else {
	                row.appendChild(addBtn);
	            }
	        }
	    };
	
	    AttributeModal.prototype.show = function () {
	        var attributes = this.nodeItem != 'undefined' && _typeof(this.nodeItem.mkxmlAttributes) == 'object' && Object.keys(this.nodeItem.mkxmlAttributes).length > 0 ? this.nodeItem.mkxmlAttributes : [{ name: '', value: '' }];
	
	        this.setModalAttributes(attributes);
	        this.modalWrapper.classList.add('in');
	        this.modalWrapper.style.display = 'block';
	        document.body.classList.add('modal-open');
	    };
	
	    AttributeModal.prototype.hide = function () {
	        this.modalWrapper.classList.remove('in');
	        this.modalWrapper.style.display = 'none';
	        document.body.style = '';
	        document.body.classList.remove('modal-open');
	    };
	
	    AttributeModal.prototype.save = function () {
	        var context = this,
	            nodeItem = this.nodeItem,
	            attributes = [];
	        if (typeof this.nodeItem != 'undefined' && this.nodeItem !== null) {
	            var rows = this.modalBody.querySelectorAll('.attr-row');
	            if (rows && rows.length > 0) {
	                for (var i = 0; i < rows.length; i++) {
	                    var attrName = rows[i].querySelector('.attr-name') !== null ? rows[i].querySelector('.attr-name').value : null,
	                        attrValue = rows[i].querySelector('.attr-value') !== null ? rows[i].querySelector('.attr-value').value : null;
	                    if (attrName !== null && attrValue !== null) {
	                        attributes.push({ name: attrName, value: attrValue });
	                    }
	                }
	                this.nodeItem.mkxmlAttributes = attributes;
	            }
	        }
	        this.hide();
	    };
	
	    module.exports = AttributeModal;
	})();

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(1);
	
	(function () {
	            var _classCallCheck = function _classCallCheck(instance, Constructor) {
	                        if (!(instance instanceof Constructor)) {
	                                    throw new TypeError('Cannot call a class as a function');
	                        }
	            };
	
	            var XmlPreview = function XmlPreview(wrapper) {
	
	                        _classCallCheck(this, XmlPreview);
	
	                        this.wrapper = wrapper;
	
	                        this.options = {
	                                    title: 'XML Preview',
	                                    showHeader: true,
	                                    showFooter: true,
	                                    showCopyLink: true,
	                                    copyButtonText: 'Copy XML'
	                        };
	
	                        this.init();
	            };
	
	            XmlPreview.prototype.init = function () {
	                        var panelWrapper, panelHeader, headerTitle, panelBody, panelFooter, copyXmlBtn;
	
	                        panelWrapper = document.createElement('div');
	
	                        panelBody = document.createElement('div');
	
	                        panelWrapper.className = 'mkxmlbuilder-preview';
	
	                        panelBody.className = 'mkxmlbuilder-preview-body';
	
	                        this.panelWrapper = panelWrapper;
	
	                        if (this.options.showHeader) {
	                                    panelHeader = document.createElement('div');
	                                    panelHeader.className = 'mkxmlbuilder-preview-header';
	                                    headerTitle = document.createElement('span');
	                                    headerTitle.innerHTML = this.options.title;
	                                    panelHeader.appendChild(headerTitle);
	                                    this.panelHeader = panelHeader;
	                                    this.panelWrapper.appendChild(panelHeader);
	                        }
	
	                        this.panelBody = panelBody;
	                        this.panelWrapper.appendChild(panelBody);
	
	                        if (this.options.showFooter) {
	                                    panelFooter = document.createElement('div');
	
	                                    panelFooter.className = 'mkxmlbuilder-preview-footer';
	
	                                    if (this.options.showCopyLink) {
	                                                copyXmlBtn = document.createElement('button');
	                                                copyXmlBtn.className = 'mkxmlbuilder-preview-copy-button';
	                                                copyXmlBtn.innerHTML = this.options.copyButtonText;
	                                                panelFooter.appendChild(copyXmlBtn);
	                                    }
	                                    this.panelFooter = panelFooter;
	                                    this.panelWrapper.appendChild(panelFooter);
	                        }
	
	                        this.wrapper.appendChild(this.panelWrapper);
	
	                        return this;
	            };
	
	            XmlPreview.prototype.renderXml = function () {};
	
	            module.exports = XmlPreview;
	})();

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ])
});
;
//# sourceMappingURL=mkxmlbuilder.js.map