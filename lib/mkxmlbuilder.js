(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Mkxmlbuilder", [], factory);
	else if(typeof exports === 'object')
		exports["Mkxmlbuilder"] = factory();
	else
		root["Mkxmlbuilder"] = factory();
})(this, function() {
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
	
	    'use strict';
	
	    if (( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined') {
	        module.exports = factory(__webpack_require__(1), __webpack_require__(2).pd, __webpack_require__(3), __webpack_require__(4), __webpack_require__(5), __webpack_require__(6), global || root);
	    } else {
	        root.Mkxmlbuilder = factory(utils, attributeModal, previewObj, root.jQuery, root.bootstrap, root.toastr, root.alert, root);
	    }
	})(typeof window !== 'undefined' ? window : undefined, function (Utils, PD, Editor, Preview, AttributeModal, Style, root) {
	
	    'use strict';
	
	    function classCallCheck(instance, Constructor) {
	        if (!(instance instanceof Constructor)) {
	            throw new TypeError('Cannot call a class as a function');
	        }
	    }
	
	    function findNodeRecursively(search, obj) {
	        var i;
	        for (i = 0; i < obj.length; i = i + 1) {
	            if (obj[i][search]) {
	                return obj[i];
	            } else {
	                if (obj[i]['subNodes'].length > 0) {
	                    var result = findNodeRecursively(search, obj[i]['subNodes']);
	                    if (result) {
	                        return result;
	                    }
	                }
	            }
	        }
	    }
	
	    function removeNodeRecursively(search, obj) {
	        var i;
	        for (i = 0; i < obj.length; i = i + 1) {
	            if (obj[i][search]) {
	                return obj[i].splice(i, 1);
	            } else {
	                if (obj[i]['subNodes'].length > 0) {
	                    return removeNodeRecursively(search, obj[i]['subNodes']);
	                }
	            }
	        }
	    }
	
	    function prepareXmlOutput(appendTo, obj) {
	        var i,
	            k,
	            attributeString = '';
	
	        for (i in obj) {
	            if (obj[i].attributes.length > 0) {
	                for (k in obj[i].attributes) {
	                    attributeString += ' ' + (obj[i].attributes[k].name != '' ? obj[i].attributes[k].name + '="' + obj[i].attributes[k].value + '"' : '') + ' ';
	                }
	                attributeString = attributeString.replace(/((\s*\S+)*)\s*/, "$1");
	            }
	            if (obj[i].subNodes.length < 1) {
	                if (obj[i].value == '') {
	                    appendTo += '<' + obj[i].name + attributeString + '/>';
	                } else {
	                    appendTo += '<' + obj[i].name + attributeString + '>' + obj[i].value + '</' + obj[i].name + '>';
	                }
	            } else {
	                appendTo += '<' + obj[i].name + attributeString + '>';
	
	                appendTo += prepareXmlOutput('', obj[i].subNodes);
	
	                appendTo += '</' + obj[i].name + '>';
	            }
	
	            attributeString = '';
	        }
	        return appendTo;
	    }
	
	    function prepareJsonOutput(insertTo, obj) {
	        var i, newObj, id, node, name, value, attrs, subNodes;
	
	        for (i in obj) {
	            newObj = {};
	            id = Object.keys(obj[i])[1];
	            node = obj[i][id];
	            name = node.mkxmlNodeName ? node.mkxmlNodeName : "Empty";
	            value = node.mkxmlNodeValue ? node.mkxmlNodeValue : "";
	            attrs = node.mkxmlAttributes ? node.mkxmlAttributes : [];
	            subNodes = obj[i]['subNodes'].length > 0;
	
	            newObj.id = id;
	            newObj.name = name;
	            newObj.value = value;
	            newObj.attributes = attrs;
	            newObj.subNodes = [];
	
	            insertTo.push(newObj);
	
	            if (subNodes) {
	                prepareJsonOutput(newObj.subNodes, obj[i]['subNodes']);
	            }
	        }
	
	        return insertTo;
	    }
	
	    function resolveBootstrapElement(element) {
	
	        if (typeof element !== 'string' && (typeof element === 'undefined' ? 'undefined' : _typeof(element)) !== 'object') {
	            throw new Error('Element must be a valid selector, jQuery object or HTMLDom Node');
	        }
	
	        if (typeof element === 'string') {
	            return document.querySelector(element);
	        } else if (element instanceof HTMLElement) {
	            return element;
	        } else {
	            throw new Error('Element must be a valid selector, jQuery object or HTMLDom Node');
	        }
	
	        return element;
	    }
	
	    function generateUID() {
	        function s4() {
	            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	        }
	        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	    }
	
	    function handlePreviewEvents() {
	        var context = this,
	            xmlPreviewButton = this.editor.xmlPreviewButton,
	            jsonPreviewButton = this.editor.jsonPreviewButton;
	
	        xmlPreviewButton.onclick = function (context) {
	            return function () {
	                context.showXmlPreview();
	            };
	        }(this);
	
	        jsonPreviewButton.onclick = function (context) {
	            return function () {
	                context.showJsonPreview();
	            };
	        }(this);
	    }
	
	    function prepareDomInstances() {
	        var outerWrapper, editorWrapper, previewWrapper;
	
	        outerWrapper = document.createElement('div');
	        editorWrapper = document.createElement('div');
	        previewWrapper = document.createElement('div');
	
	        outerWrapper.className = 'mkxmlbuilder-outer';
	        editorWrapper.className = 'mkxmlbuilder-editor';
	        previewWrapper.className = 'mkxmlbuilder-preview';
	
	        editorWrapper.appendChild(this.editor.panelWrapper);
	        previewWrapper.appendChild(this.preview.panelWrapper);
	
	        outerWrapper.appendChild(editorWrapper);
	
	        if (this.options.showPreviewPanel) {
	            outerWrapper.appendChild(previewWrapper);
	        } else {
	            editorWrapper.style.width = '100%';
	        }
	        this.outerWrapper = outerWrapper;
	        this.editorWrapper = editorWrapper;
	        this.editorBody = this.editor.panelBody;
	        this.previewWrapper = previewWrapper;
	        this.previewBody = this.preview.panelBody;
	        this.element.appendChild(outerWrapper);
	    }
	
	    function renderFresh(parent, howMany, data) {
	        var i, nodeItem, inputBoxWrapper, nodeNameInput, nodeValueInput, collapseBtnWrapper, collapseBtn, attrBtnWrapper, attrBtn, addBtnWrapper, addBtn, removeBtnWrapper, removeBtn, parentNodeInHierarchy, pushableHierarchyObj;
	
	        howMany = howMany || 1;
	
	        for (i = 1; i <= howMany; i = i + 1) {
	            nodeItem = document.createElement('div');
	            inputBoxWrapper = document.createElement('div');
	            nodeNameInput = document.createElement('input');
	            nodeValueInput = document.createElement('input');
	            collapseBtnWrapper = document.createElement('span');
	            collapseBtn = document.createElement('i');
	            attrBtnWrapper = document.createElement('span');
	            attrBtn = document.createElement('i');
	            addBtnWrapper = document.createElement('span');
	            addBtn = document.createElement('i');
	            removeBtnWrapper = document.createElement('span');
	            removeBtn = document.createElement('i');
	
	            nodeItem.className = 'mkxmlbuilder-node-item';
	            inputBoxWrapper.className = 'mkxmlbuilder-inputbox';
	            nodeNameInput.className = 'node-item-name ' + (this.options.bootstrapStyle ? 'form-control' : '');
	            nodeValueInput.className = 'node-item-value ' + (this.options.bootstrapStyle ? 'form-control' : '');
	            collapseBtnWrapper.className = 'node-icon collapse-btn';
	            attrBtnWrapper.className = 'node-icon attr-btn';
	            addBtnWrapper.className = 'node-icon add-btn';
	            removeBtnWrapper.className = 'node-icon remove-btn';
	
	            collapseBtn.className = this.options.collapseIconClass;
	            attrBtn.className = this.options.attrIconClass;
	            addBtn.className = this.options.addIconClass;
	            removeBtn.className = this.options.removeIconClass;
	
	            collapseBtnWrapper.appendChild(collapseBtn);
	            attrBtnWrapper.appendChild(attrBtn);
	            addBtnWrapper.appendChild(addBtn);
	            removeBtnWrapper.appendChild(removeBtn);
	
	            collapseBtnWrapper.style.display = 'none';
	
	            inputBoxWrapper.appendChild(nodeNameInput);
	            inputBoxWrapper.appendChild(nodeValueInput);
	
	            if (this.options.showCollapseButton) {
	                inputBoxWrapper.appendChild(collapseBtnWrapper);
	            }
	            if (this.options.showAttrButton) {
	                inputBoxWrapper.appendChild(attrBtnWrapper);
	            }
	            if (this.options.showAddButton) {
	                inputBoxWrapper.appendChild(addBtnWrapper);
	            }
	            if (this.options.showRemoveNodeButton && parent !== this.editorBody) {
	                inputBoxWrapper.appendChild(removeBtnWrapper);
	            }
	
	            nodeNameInput.setAttribute('placeholder', this.options.nodeNamePlaceholder);
	            nodeValueInput.setAttribute('placeholder', this.options.nodeValuePlaceholder);
	            nodeItem.mkxmlAttributes = {};
	
	            // Finally Add To Element
	            nodeItem.appendChild(inputBoxWrapper);
	            parent.appendChild(nodeItem);
	
	            // Event Handling
	            nodeNameInput.onkeyup = function (instance, nodeItem) {
	                return function (event) {
	                    changeNodeNameHandler.call(instance, event, nodeItem);
	                };
	            }(this, nodeItem);
	
	            nodeNameInput.onchange = function (instance, nodeItem) {
	                return function (event) {
	                    changeNodeNameHandler.call(instance, event, nodeItem);
	                };
	            }(this, nodeItem);
	
	            nodeValueInput.onkeyup = function (instance, nodeItem) {
	                return function (event) {
	                    changeNodeValueHandler.call(instance, event, nodeItem);
	                };
	            }(this, nodeItem);
	
	            nodeValueInput.onchange = function (instance, nodeItem) {
	                return function (event) {
	                    changeNodeValueHandler.call(instance, event, nodeItem);
	                };
	            }(this, nodeItem);
	
	            collapseBtnWrapper.onclick = function (instance, nodeItem) {
	                return function (event) {
	                    collapseClickHandler.call(instance, event, nodeItem);
	                };
	            }(this, nodeItem);
	
	            attrBtnWrapper.onclick = function (instance, nodeItem) {
	                return function (event) {
	                    attrClickHandler.call(instance, event, nodeItem);
	                };
	            }(this, nodeItem);
	
	            addBtnWrapper.onclick = function (instance, parent, nodeNameInput, nodeValueInput) {
	                return function (event) {
	                    addClickHandler.call(instance, event, parent, nodeNameInput, nodeValueInput);
	                };
	            }(this, nodeItem, nodeNameInput, nodeValueInput);
	
	            if (this.options.showRemoveNodeButton && parent !== this.editorBody) {
	                removeBtnWrapper.onclick = function (instance, parent, nodeItem) {
	                    return function (event) {
	                        removeClickHandler.call(instance, event, parent, nodeItem);
	                    };
	                }(this, parent, nodeItem);
	            }
	
	            // Add To Hierarchy
	            nodeItem.mkxmlUniqueId = generateUID();
	            pushableHierarchyObj = { subNodes: [] };
	            pushableHierarchyObj[nodeItem.mkxmlUniqueId] = nodeItem;
	
	            parentNodeInHierarchy = findNodeRecursively(parent.mkxmlUniqueId, this.nodeHierarchy);
	
	            if (parentNodeInHierarchy && parentNodeInHierarchy['subNodes']) {
	                parentNodeInHierarchy['subNodes'].push(pushableHierarchyObj);
	            } else {
	                this.nodeHierarchy.push(pushableHierarchyObj);
	            }
	        }
	    }
	
	    function attrClickHandler(event, nodeItem) {
	        this.attributeModal.setNode(nodeItem);
	        this.attributeModal.show();
	    }
	
	    function determineCollapseBtn(nodeItem) {
	        var numberOfNodes = nodeItem.querySelectorAll('.mkxmlbuilder-node-item'),
	            collapseBtn = nodeItem.querySelector('.collapse-btn');
	
	        collapseBtn.style.display = numberOfNodes.length > 0 ? 'inline-block' : 'none';
	    }
	
	    function toggleCollapseBtn(icon, addClass, removeClass) {
	        addClass = addClass.indexOf(' ') > -1 ? addClass.split(' ') : [addClass];
	        removeClass = removeClass.indexOf(' ') > -1 ? removeClass.split(' ') : [removeClass];
	
	        console.log(addClass, removeClass);
	
	        for (var i in removeClass) {
	            icon.classList.remove(removeClass[i]);
	        }
	
	        for (var i in addClass) {
	            icon.classList.add(addClass[i]);
	        }
	    }
	
	    function collapseClickHandler(event, nodeItem) {
	        var innerItems = nodeItem.querySelectorAll('.mkxmlbuilder-node-item'),
	            icon = nodeItem.querySelector('.node-icon.collapse-btn > i'),
	            minusClass = this.options.collapseIconClass,
	            plusClass = this.options.collapseIconToggleClass;
	
	        if (innerItems.length > 0) {
	            for (var i = 0; i < innerItems.length; i++) {
	                if (innerItems[i].style.display === 'none') {
	                    innerItems[i].style.display = 'block';
	                    toggleCollapseBtn(icon, minusClass, plusClass);
	                } else {
	                    innerItems[i].style.display = 'none';
	                    toggleCollapseBtn(icon, plusClass, minusClass);
	                }
	            }
	        }
	    }
	
	    function addClickHandler(event, parent, nodeNameInput, nodeValueInput) {
	        var howMany = prompt('Please enter number of nodes you want') || 0,
	            inputStyle = window.getComputedStyle(nodeNameInput, null),
	            width = parseInt(inputStyle.getPropertyValue('width'), 10);
	
	        if (howMany > 0) {
	
	            if (nodeValueInput.style.display != 'none') {
	                nodeNameInput.style.width = width * 2 + width * 2 * 1 / 100 + 'px';
	                nodeValueInput.style.display = 'none';
	            }
	            renderFresh.call(this, parent, howMany);
	        }
	
	        determineCollapseBtn(parent);
	    }
	
	    function removeClickHandler(event, parent, removableNode) {
	
	        if (this.options.showRemoveConfirmation === true && confirm('Are you sure, you want to remove this node completely?') || this.options.showRemoveConfirmation !== true) {
	
	            removableNode.remove();
	
	            removeNodeRecursively(removableNode.mkxmlUniqueId, this.nodeHierarchy);
	
	            var nodeNameInput = parent.querySelector('.node-item-name'),
	                nodeValueInput = parent.querySelector('.node-item-value'),
	                numberOfNodes = parent.querySelectorAll('.mkxmlbuilder-node-item'),
	                nodeNameInputStyle,
	                width;
	
	            if (numberOfNodes.length < 1) {
	                nodeNameInputStyle = window.getComputedStyle(nodeNameInput, null);
	                width = parseInt(nodeNameInputStyle.getPropertyValue('width'), 10);
	                nodeNameInput.style.width = width / 2 - width / 2 * 1 / 100 + 'px';
	                nodeValueInput.style.display = 'inline-block';
	            }
	
	            determineCollapseBtn(parent);
	        }
	    }
	
	    function changeNodeNameHandler(event, nodeItem) {
	        nodeItem.mkxmlNodeName = event.target.value;
	    }
	
	    function changeNodeValueHandler(event, nodeItem) {
	        nodeItem.mkxmlNodeValue = event.target.value;
	    }
	
	    function Mkxmlbuilder(element, options, data) {
	
	        if (arguments.length <= 0) {
	            throw new TypeError('You must have to provide element in the constructor');
	        }
	
	        this.options = {
	            showAddButton: true,
	            showCollapseButton: true,
	            showAttrButton: true,
	            showRemoveNodeButton: true,
	            showRemoveConfirmation: true,
	            showPreviewPanel: true,
	            collapseIconClass: 'fa fa-minus text-info',
	            collapseIconToggleClass: 'fa fa-plus text-info',
	            attrIconClass: 'fa fa-tag text-primary',
	            addIconClass: 'fa fa-plus-circle text-success',
	            removeIconClass: 'fa fa-trash text-danger',
	            nodeNamePlaceholder: 'Node Name...',
	            nodeValuePlaceholder: 'Node Value...',
	            bootstrapStyle: true,
	            editor: {
	                showHeader: true,
	                showFooter: true,
	                showXmlPreviewButton: true,
	                showJsonPreviewButton: true,
	                headerTitle: 'Editor',
	                xmlPreviewButtonText: 'Show XML Preview',
	                jsonPreviewButtonText: 'Show JSON Preview',
	                bsStyle: true,
	                bsPanelColor: 'primary',
	                bsXmlPreviewButtonColor: 'primary',
	                bsJsonPreviewButtonColor: 'primary'
	            },
	            preview: {
	                showHeader: true,
	                showFooter: true,
	                showCopyButton: true,
	                headerTitle: 'Preview',
	                copyButtonText: 'Copy To Clipboard',
	                bsStyle: true,
	                bsPanelColor: 'primary',
	                bsCopyButtonColor: 'primary'
	            },
	            attributeModal: {
	                headerTitle: 'Set Node Attributes',
	                headerCloseIcon: '&times;',
	                closeButtonText: 'Close',
	                saveButtonText: 'Save',
	                addRowIconHtml: '<i class="fa fa-plus-circle text-primary"></i>',
	                removeRowIconHtml: '<i class="fa fa-minus-circle text-danger"></i>',
	                bsStyle: true,
	                bsSaveButtonColor: 'primary',
	                bsCloseButtonColor: 'danger',
	                maxAttributes: 10
	            }
	        };
	        this.nodeHierarchy = [];
	        this.element = resolveBootstrapElement(element);
	        this.options = (typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' ? Utils.extend(this.options, options) : this.options;
	        this.data = data || null;
	        this.editor = new Editor(this.options.editor);
	        this.preview = new Preview(this.options.preview);
	        this.attributeModal = new AttributeModal(this.options.attributeModal);
	
	        handlePreviewEvents.call(this);
	
	        prepareDomInstances.call(this);
	
	        this.init();
	    }
	
	    Mkxmlbuilder.prototype.init = function () {
	
	        if (this.data !== null) {
	            renderWithData.call(this, this.editorBody, this.data);
	        } else {
	            renderFresh.call(this, this.editorBody);
	        }
	    };
	
	    Mkxmlbuilder.prototype.generateJsonOutput = function () {
	        return prepareJsonOutput([], this.nodeHierarchy);
	    };
	
	    Mkxmlbuilder.prototype.generateXmlOutput = function () {
	        return prepareXmlOutput('', this.generateJsonOutput());
	    };
	
	    Mkxmlbuilder.prototype.showXmlPreview = function () {
	        this.preview.panelBodyPre.innerHTML = Utils.escapeHtmlEntities(PD.xml(this.generateXmlOutput()));
	    };
	
	    Mkxmlbuilder.prototype.showJsonPreview = function () {
	        this.preview.panelBodyPre.innerHTML = JSON.stringify(this.generateJsonOutput(), null, 2);
	    };
	
	    Mkxmlbuilder.prototype.getAllXmlNodes = function () {
	        return this.nodeHierarchy;
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
	
	    escapeHtmlEntities: function escapeHtmlEntities(text) {
	        var entityTable = {
	            34: 'quot',
	            38: 'amp',
	            39: 'apos',
	            60: 'lt',
	            62: 'gt',
	            160: 'nbsp',
	            161: 'iexcl',
	            162: 'cent',
	            163: 'pound',
	            164: 'curren',
	            165: 'yen',
	            166: 'brvbar',
	            167: 'sect',
	            168: 'uml',
	            169: 'copy',
	            170: 'ordf',
	            171: 'laquo',
	            172: 'not',
	            173: 'shy',
	            174: 'reg',
	            175: 'macr',
	            176: 'deg',
	            177: 'plusmn',
	            178: 'sup2',
	            179: 'sup3',
	            180: 'acute',
	            181: 'micro',
	            182: 'para',
	            183: 'middot',
	            184: 'cedil',
	            185: 'sup1',
	            186: 'ordm',
	            187: 'raquo',
	            188: 'frac14',
	            189: 'frac12',
	            190: 'frac34',
	            191: 'iquest',
	            192: 'Agrave',
	            193: 'Aacute',
	            194: 'Acirc',
	            195: 'Atilde',
	            196: 'Auml',
	            197: 'Aring',
	            198: 'AElig',
	            199: 'Ccedil',
	            200: 'Egrave',
	            201: 'Eacute',
	            202: 'Ecirc',
	            203: 'Euml',
	            204: 'Igrave',
	            205: 'Iacute',
	            206: 'Icirc',
	            207: 'Iuml',
	            208: 'ETH',
	            209: 'Ntilde',
	            210: 'Ograve',
	            211: 'Oacute',
	            212: 'Ocirc',
	            213: 'Otilde',
	            214: 'Ouml',
	            215: 'times',
	            216: 'Oslash',
	            217: 'Ugrave',
	            218: 'Uacute',
	            219: 'Ucirc',
	            220: 'Uuml',
	            221: 'Yacute',
	            222: 'THORN',
	            223: 'szlig',
	            224: 'agrave',
	            225: 'aacute',
	            226: 'acirc',
	            227: 'atilde',
	            228: 'auml',
	            229: 'aring',
	            230: 'aelig',
	            231: 'ccedil',
	            232: 'egrave',
	            233: 'eacute',
	            234: 'ecirc',
	            235: 'euml',
	            236: 'igrave',
	            237: 'iacute',
	            238: 'icirc',
	            239: 'iuml',
	            240: 'eth',
	            241: 'ntilde',
	            242: 'ograve',
	            243: 'oacute',
	            244: 'ocirc',
	            245: 'otilde',
	            246: 'ouml',
	            247: 'divide',
	            248: 'oslash',
	            249: 'ugrave',
	            250: 'uacute',
	            251: 'ucirc',
	            252: 'uuml',
	            253: 'yacute',
	            254: 'thorn',
	            255: 'yuml',
	            402: 'fnof',
	            913: 'Alpha',
	            914: 'Beta',
	            915: 'Gamma',
	            916: 'Delta',
	            917: 'Epsilon',
	            918: 'Zeta',
	            919: 'Eta',
	            920: 'Theta',
	            921: 'Iota',
	            922: 'Kappa',
	            923: 'Lambda',
	            924: 'Mu',
	            925: 'Nu',
	            926: 'Xi',
	            927: 'Omicron',
	            928: 'Pi',
	            929: 'Rho',
	            931: 'Sigma',
	            932: 'Tau',
	            933: 'Upsilon',
	            934: 'Phi',
	            935: 'Chi',
	            936: 'Psi',
	            937: 'Omega',
	            945: 'alpha',
	            946: 'beta',
	            947: 'gamma',
	            948: 'delta',
	            949: 'epsilon',
	            950: 'zeta',
	            951: 'eta',
	            952: 'theta',
	            953: 'iota',
	            954: 'kappa',
	            955: 'lambda',
	            956: 'mu',
	            957: 'nu',
	            958: 'xi',
	            959: 'omicron',
	            960: 'pi',
	            961: 'rho',
	            962: 'sigmaf',
	            963: 'sigma',
	            964: 'tau',
	            965: 'upsilon',
	            966: 'phi',
	            967: 'chi',
	            968: 'psi',
	            969: 'omega',
	            977: 'thetasym',
	            978: 'upsih',
	            982: 'piv',
	            8226: 'bull',
	            8230: 'hellip',
	            8242: 'prime',
	            8243: 'Prime',
	            8254: 'oline',
	            8260: 'frasl',
	            8472: 'weierp',
	            8465: 'image',
	            8476: 'real',
	            8482: 'trade',
	            8501: 'alefsym',
	            8592: 'larr',
	            8593: 'uarr',
	            8594: 'rarr',
	            8595: 'darr',
	            8596: 'harr',
	            8629: 'crarr',
	            8656: 'lArr',
	            8657: 'uArr',
	            8658: 'rArr',
	            8659: 'dArr',
	            8660: 'hArr',
	            8704: 'forall',
	            8706: 'part',
	            8707: 'exist',
	            8709: 'empty',
	            8711: 'nabla',
	            8712: 'isin',
	            8713: 'notin',
	            8715: 'ni',
	            8719: 'prod',
	            8721: 'sum',
	            8722: 'minus',
	            8727: 'lowast',
	            8730: 'radic',
	            8733: 'prop',
	            8734: 'infin',
	            8736: 'ang',
	            8743: 'and',
	            8744: 'or',
	            8745: 'cap',
	            8746: 'cup',
	            8747: 'int',
	            8756: 'there4',
	            8764: 'sim',
	            8773: 'cong',
	            8776: 'asymp',
	            8800: 'ne',
	            8801: 'equiv',
	            8804: 'le',
	            8805: 'ge',
	            8834: 'sub',
	            8835: 'sup',
	            8836: 'nsub',
	            8838: 'sube',
	            8839: 'supe',
	            8853: 'oplus',
	            8855: 'otimes',
	            8869: 'perp',
	            8901: 'sdot',
	            8968: 'lceil',
	            8969: 'rceil',
	            8970: 'lfloor',
	            8971: 'rfloor',
	            9001: 'lang',
	            9002: 'rang',
	            9674: 'loz',
	            9824: 'spades',
	            9827: 'clubs',
	            9829: 'hearts',
	            9830: 'diams',
	            338: 'OElig',
	            339: 'oelig',
	            352: 'Scaron',
	            353: 'scaron',
	            376: 'Yuml',
	            710: 'circ',
	            732: 'tilde',
	            8194: 'ensp',
	            8195: 'emsp',
	            8201: 'thinsp',
	            8204: 'zwnj',
	            8205: 'zwj',
	            8206: 'lrm',
	            8207: 'rlm',
	            8211: 'ndash',
	            8212: 'mdash',
	            8216: 'lsquo',
	            8217: 'rsquo',
	            8218: 'sbquo',
	            8220: 'ldquo',
	            8221: 'rdquo',
	            8222: 'bdquo',
	            8224: 'dagger',
	            8225: 'Dagger',
	            8240: 'permil',
	            8249: 'lsaquo',
	            8250: 'rsaquo',
	            8364: 'euro'
	        };
	        return text.replace(/[\u00A0-\u2666<>\&]/g, function (c) {
	            return '&' + (entityTable[c.charCodeAt(0)] || '#' + c.charCodeAt(0)) + ';';
	        });
	    }
	};
	
	module.exports = utils;

/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	* pretty-data - nodejs plugin to pretty-print or minify data in XML, JSON and CSS formats.
	*  
	* Version - 0.40.0
	* Copyright (c) 2012 Vadim Kiryukhin
	* vkiryukhin @ gmail.com
	* http://www.eslinstructor.net/pretty-data/
	* 
	* Dual licensed under the MIT and GPL licenses:
	*   http://www.opensource.org/licenses/mit-license.php
	*   http://www.gnu.org/licenses/gpl.html
	*
	*	pd.xml(data ) - pretty print XML;
	*	pd.json(data) - pretty print JSON;
	*	pd.css(data ) - pretty print CSS;
	*	pd.sql(data)  - pretty print SQL;
	*
	*	pd.xmlmin(data [, preserveComments] ) - minify XML; 
	*	pd.jsonmin(data)                      - minify JSON; 
	*	pd.cssmin(data [, preserveComments] ) - minify CSS; 
	*	pd.sqlmin(data)                       - minify SQL; 
	*
	* PARAMETERS:
	*
	*	@data  			- String; XML, JSON, CSS or SQL text to beautify;
	* 	@preserveComments	- Bool (optional, used in minxml and mincss only); 
	*				  Set this flag to true to prevent removing comments from @text; 
	*	@Return 		- String;
	*	
	* USAGE:
	*	
	*	var pd  = require('pretty-data').pd;
	*
	*	var xml_pp   = pd.xml(xml_text);
	*	var xml_min  = pd.xmlmin(xml_text [,true]);
	*	var json_pp  = pd.json(json_text);
	*	var json_min = pd.jsonmin(json_text);
	*	var css_pp   = pd.css(css_text);
	*	var css_min  = pd.cssmin(css_text [, true]);
	*	var sql_pp   = pd.sql(sql_text);
	*	var sql_min  = pd.sqlmin(sql_text);
	*
	* TEST:
	*	comp-name:pretty-data$ node ./test/test_xml
	*	comp-name:pretty-data$ node ./test/test_json
	*	comp-name:pretty-data$ node ./test/test_css
	*	comp-name:pretty-data$ node ./test/test_sql
	*/
	
	
	function pp() {
		this.shift = ['\n']; // array of shifts
		this.step = '  ', // 2 spaces
			maxdeep = 100, // nesting level
			ix = 0;
	
		// initialize array with shifts //
		for(ix=0;ix<maxdeep;ix++){
			this.shift.push(this.shift[ix]+this.step); 
		}
	
	};	
		
	// ----------------------- XML section ----------------------------------------------------
	
	pp.prototype.xml = function(text) {
	
		var ar = text.replace(/>\s{0,}</g,"><")
					 .replace(/</g,"~::~<")
					 .replace(/xmlns\:/g,"~::~xmlns:")
					 .replace(/xmlns\=/g,"~::~xmlns=")
					 .split('~::~'),
			len = ar.length,
			inComment = false,
			deep = 0,
			str = '',
			ix = 0;
	
			for(ix=0;ix<len;ix++) {
				// start comment or <![CDATA[...]]> or <!DOCTYPE //
				if(ar[ix].search(/<!/) > -1) { 
					str += this.shift[deep]+ar[ix];
					inComment = true; 
					// end comment  or <![CDATA[...]]> //
					if(ar[ix].search(/-->/) > -1 || ar[ix].search(/\]>/) > -1 || ar[ix].search(/!DOCTYPE/) > -1 ) { 
						inComment = false; 
					}
				} else 
				// end comment  or <![CDATA[...]]> //
				if(ar[ix].search(/-->/) > -1 || ar[ix].search(/\]>/) > -1) { 
					str += ar[ix];
					inComment = false; 
				} else 
				// <elm></elm> //
				if( /^<\w/.exec(ar[ix-1]) && /^<\/\w/.exec(ar[ix]) &&
					/^<[\w:\-\.\,]+/.exec(ar[ix-1]) == /^<\/[\w:\-\.\,]+/.exec(ar[ix])[0].replace('/','')) { 
					str += ar[ix];
					if(!inComment) deep--;
				} else
				 // <elm> //
				if(ar[ix].search(/<\w/) > -1 && ar[ix].search(/<\//) == -1 && ar[ix].search(/\/>/) == -1 ) {
					str = !inComment ? str += this.shift[deep++]+ar[ix] : str += ar[ix];
				} else 
				 // <elm>...</elm> //
				if(ar[ix].search(/<\w/) > -1 && ar[ix].search(/<\//) > -1) {
					str = !inComment ? str += this.shift[deep]+ar[ix] : str += ar[ix];
				} else 
				// </elm> //
				if(ar[ix].search(/<\//) > -1) { 
					str = !inComment ? str += this.shift[--deep]+ar[ix] : str += ar[ix];
				} else 
				// <elm/> //
				if(ar[ix].search(/\/>/) > -1 ) { 
					str = !inComment ? str += this.shift[deep]+ar[ix] : str += ar[ix];
				} else 
				// <? xml ... ?> //
				if(ar[ix].search(/<\?/) > -1) { 
					str += this.shift[deep]+ar[ix];
				} else 
				// xmlns //
				if( ar[ix].search(/xmlns\:/) > -1  || ar[ix].search(/xmlns\=/) > -1) { 
					str += this.shift[deep]+ar[ix];
				} 
				
				else {
					str += ar[ix];
				}
			}
			
		return  (str[0] == '\n') ? str.slice(1) : str;
	}
	
	// ----------------------- JSON section ----------------------------------------------------
	
	pp.prototype.json = function(text) {
	
		if ( typeof text === "string" ) {
			return JSON.stringify(JSON.parse(text), null, this.step);
		}
		if ( typeof text === "object" ) {
			return JSON.stringify(text, null, this.step);
		}
		return null;
	}
	
	// ----------------------- CSS section ----------------------------------------------------
	
	pp.prototype.css = function(text) {
	
		var ar = text.replace(/\s{1,}/g,' ')
					.replace(/\{/g,"{~::~")
					.replace(/\}/g,"~::~}~::~")
					.replace(/\;/g,";~::~")
					.replace(/\/\*/g,"~::~/*")
					.replace(/\*\//g,"*/~::~")
					.replace(/~::~\s{0,}~::~/g,"~::~")
					.split('~::~'),
			len = ar.length,
			deep = 0,
			str = '',
			ix = 0;
			
			for(ix=0;ix<len;ix++) {
	
				if( /\{/.exec(ar[ix]))  { 
					str += this.shift[deep++]+ar[ix];
				} else 
				if( /\}/.exec(ar[ix]))  { 
					str += this.shift[--deep]+ar[ix];
				} else
				if( /\*\\/.exec(ar[ix]))  { 
					str += this.shift[deep]+ar[ix];
				}
				else {
					str += this.shift[deep]+ar[ix];
				}
			}
			return str.replace(/^\n{1,}/,'');
	}
	
	// ----------------------- SQL section ----------------------------------------------------
	
	function isSubquery(str, parenthesisLevel) {
	  return  parenthesisLevel - (str.replace(/\(/g,'').length - str.replace(/\)/g,'').length )
	}
	
	function split_sql(str, tab) {
	
	    return str.replace(/\s{1,}/g," ")
	
	        .replace(/ AND /ig,"~::~"+tab+tab+"AND ")
	        .replace(/ BETWEEN /ig,"~::~"+tab+"BETWEEN ")
	        .replace(/ CASE /ig,"~::~"+tab+"CASE ")
	        .replace(/ ELSE /ig,"~::~"+tab+"ELSE ")
	        .replace(/ END /ig,"~::~"+tab+"END ")
	        .replace(/ FROM /ig,"~::~FROM ")
	        .replace(/ GROUP\s{1,}BY/ig,"~::~GROUP BY ")
	        .replace(/ HAVING /ig,"~::~HAVING ")
	        //.replace(/ IN /ig,"~::~"+tab+"IN ")
	        .replace(/ IN /ig," IN ")
	        .replace(/ JOIN /ig,"~::~JOIN ")
	        .replace(/ CROSS~::~{1,}JOIN /ig,"~::~CROSS JOIN ")
	        .replace(/ INNER~::~{1,}JOIN /ig,"~::~INNER JOIN ")
	        .replace(/ LEFT~::~{1,}JOIN /ig,"~::~LEFT JOIN ")
	        .replace(/ RIGHT~::~{1,}JOIN /ig,"~::~RIGHT JOIN ")
	        .replace(/ ON /ig,"~::~"+tab+"ON ")
	        .replace(/ OR /ig,"~::~"+tab+tab+"OR ")
	        .replace(/ ORDER\s{1,}BY/ig,"~::~ORDER BY ")
	        .replace(/ OVER /ig,"~::~"+tab+"OVER ")
	        .replace(/\(\s{0,}SELECT /ig,"~::~(SELECT ")
	        .replace(/\)\s{0,}SELECT /ig,")~::~SELECT ")
	        .replace(/ THEN /ig," THEN~::~"+tab+"")
	        .replace(/ UNION /ig,"~::~UNION~::~")
	        .replace(/ USING /ig,"~::~USING ")
	        .replace(/ WHEN /ig,"~::~"+tab+"WHEN ")
	        .replace(/ WHERE /ig,"~::~WHERE ")
	        .replace(/ WITH /ig,"~::~WITH ")
	        //.replace(/\,\s{0,}\(/ig,",~::~( ")
	        //.replace(/\,/ig,",~::~"+tab+tab+"")
	        .replace(/ ALL /ig," ALL ")
	        .replace(/ AS /ig," AS ")
	        .replace(/ ASC /ig," ASC ") 
	        .replace(/ DESC /ig," DESC ") 
	        .replace(/ DISTINCT /ig," DISTINCT ")
	        .replace(/ EXISTS /ig," EXISTS ")
	        .replace(/ NOT /ig," NOT ")
	        .replace(/ NULL /ig," NULL ")
	        .replace(/ LIKE /ig," LIKE ")
	        .replace(/\s{0,}SELECT /ig,"SELECT ")
	        .replace(/~::~{1,}/g,"~::~")
	        .split('~::~');
	}
	
	pp.prototype.sql = function(text) {
	
	    var ar_by_quote = text.replace(/\s{1,}/g," ")
	                        .replace(/\'/ig,"~::~\'")
	                        .split('~::~'),
	        len = ar_by_quote.length,
	        ar = [],
	        deep = 0,
	        tab = this.step,//+this.step,
	        inComment = true,
	        inQuote = false,
	        parenthesisLevel = 0,
	        str = '',
	        ix = 0;
	
	    for(ix=0;ix<len;ix++) {
	
	        if(ix%2) {
	            ar = ar.concat(ar_by_quote[ix]);
	        } else {
	            ar = ar.concat(split_sql(ar_by_quote[ix], tab) );
	        }
	    }
	
	    len = ar.length;
	    for(ix=0;ix<len;ix++) {
	
	        parenthesisLevel = isSubquery(ar[ix], parenthesisLevel);
	
	        if( /\s{0,}\s{0,}SELECT\s{0,}/.exec(ar[ix]))  { 
	            ar[ix] = ar[ix].replace(/\,/g,",\n"+tab+tab+"")
	        } 
	
	        if( /\s{0,}\(\s{0,}SELECT\s{0,}/.exec(ar[ix]))  { 
	            deep++;
	            str += this.shift[deep]+ar[ix];
	        } else 
	        if( /\'/.exec(ar[ix]) )  { 
	            if(parenthesisLevel<1 && deep) {
	                deep--;
	            }
	            str += ar[ix];
	        }
	        else  { 
	            str += this.shift[deep]+ar[ix];
	            if(parenthesisLevel<1 && deep) {
	                deep--;
	            }
	        } 
	    }
	
	    str = str.replace(/^\n{1,}/,'').replace(/\n{1,}/g,"\n");
	    return str;
	}
	
	// ----------------------- min section ----------------------------------------------------
	
	pp.prototype.xmlmin = function(text, preserveComments) {
	
		var str = preserveComments ? text
					   : text.replace(/\<![ \r\n\t]*(--([^\-]|[\r\n]|-[^\-])*--[ \r\n\t]*)\>/g,"");
		return  str.replace(/>\s{0,}</g,"><"); 
	}
	
	pp.prototype.jsonmin = function(text) {
									  
	    return  text.replace(/\s{0,}\{\s{0,}/g,"{")
	                .replace(/\s{0,}\[$/g,"[")
	                .replace(/\[\s{0,}/g,"[")
	                .replace(/:\s{0,}\[/g,':[')
	                .replace(/\s{0,}\}\s{0,}/g,"}")
	                .replace(/\s{0,}\]\s{0,}/g,"]")
	                .replace(/\"\s{0,}\,/g,'",')
	                .replace(/\,\s{0,}\"/g,',"')
	                .replace(/\"\s{0,}:/g,'":')
	                .replace(/:\s{0,}\"/g,':"')
	                .replace(/:\s{0,}\[/g,':[')
	                .replace(/\,\s{0,}\[/g,',[')
	                .replace(/\,\s{2,}/g,', ')
	                .replace(/\]\s{0,},\s{0,}\[/g,'],[');   
	}
	
	pp.prototype.cssmin = function(text, preserveComments) {
		
		var str = preserveComments ? text
					   : text.replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\//g,"") ;
		return str.replace(/\s{1,}/g,' ')
				  .replace(/\{\s{1,}/g,"{")
				  .replace(/\}\s{1,}/g,"}")
				  .replace(/\;\s{1,}/g,";")
				  .replace(/\/\*\s{1,}/g,"/*")
				  .replace(/\*\/\s{1,}/g,"*/");
	}	
	
	pp.prototype.sqlmin = function(text) {
	    return text.replace(/\s{1,}/g," ").replace(/\s{1,}\(/,"(").replace(/\s{1,}\)/,")");
	}
	
	// --------------------------------------------------------------------------------------------
	
	exports.pd= new pp;	
	
	
	
	
	
	
	
	
	
	


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var Utils = __webpack_require__(1);
	
	(function () {
	
	    'use strict';
	
	    function classCallCheck(instance, Constructor) {
	        if (!instance instanceof Constructor) {
	            throw new TypeError('Cannot call a class as a function');
	        }
	    }
	
	    function createElement() {
	        var panelWrapper, panelHeader, headerTitle, panelBody, panelFooter, xmlPreviewButton, jsonPreviewButton;
	
	        panelWrapper = document.createElement('div');
	        panelHeader = document.createElement('div');
	        panelBody = document.createElement('div');
	        panelFooter = document.createElement('div');
	        headerTitle = document.createElement('span');
	        xmlPreviewButton = document.createElement('button');
	        jsonPreviewButton = document.createElement('button');
	
	        panelWrapper.className = (this.options.bsStyle ? 'panel panel-' + this.options.bsPanelColor : '') + ' mkxmlbuilder-editor-panel';
	        panelHeader.className = (this.options.bsStyle ? 'panel-heading' : '') + ' mkxmlbuilder-editor-panel-header';
	        panelBody.className = (this.options.bsStyle ? 'panel-body' : '') + ' mkxmlbuilder-editor-panel-body';
	        panelFooter.className = (this.options.bsStyle ? 'panel-footer' : '') + ' mkxmlbuilder-editor-panel-footer';
	        xmlPreviewButton.className = (this.options.bsStyle ? 'btn btn-' + this.options.bsXmlPreviewButtonColor : '') + ' mkxmlbuilder-editor-xml-preview-btn';
	        jsonPreviewButton.className = (this.options.bsStyle ? 'btn btn-' + this.options.bsJsonPreviewButtonColor : '') + ' mkxmlbuilder-editor-json-preview-btn';
	
	        panelHeader.appendChild(headerTitle);
	
	        this.panelWrapper = panelWrapper;
	        this.panelHeader = panelHeader;
	        this.panelBody = panelBody;
	        this.panelFooter = panelFooter;
	        this.headerTitle = headerTitle;
	        this.xmlPreviewButton = xmlPreviewButton;
	        this.jsonPreviewButton = jsonPreviewButton;
	
	        if (this.options.showHeader) {
	            this.panelWrapper.appendChild(this.panelHeader);
	        }
	
	        this.panelWrapper.appendChild(this.panelBody);
	
	        if (this.options.showFooter) {
	            this.panelWrapper.appendChild(this.panelFooter);
	        }
	
	        if (this.options.showXmlPreviewButton) {
	            this.panelFooter.appendChild(this.xmlPreviewButton);
	        }
	
	        if (this.options.showJsonPreviewButton) {
	            this.jsonPreviewButton.style.marginLeft = '10px';
	            this.panelFooter.appendChild(this.jsonPreviewButton);
	        }
	
	        headerTitle.innerHTML = this.options.headerTitle;
	        xmlPreviewButton.innerHTML = this.options.xmlPreviewButtonText;
	        jsonPreviewButton.innerHTML = this.options.jsonPreviewButtonText;
	
	        return this;
	    }
	
	    function Editor(options) {
	
	        classCallCheck(this, Editor);
	
	        this.options = (typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' ? Utils.extend(this.options, options) : this.options;
	
	        return createElement.call(this);
	    }
	
	    module.exports = Editor;
	})();

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var Utils = __webpack_require__(1);
	
	(function () {
	
	    'use strict';
	
	    function classCallCheck(instance, Constructor) {
	        if (!instance instanceof Constructor) {
	            throw new TypeError('Cannot call a class as a function');
	        }
	    }
	
	    function createElement() {
	        var panelWrapper, panelHeader, headerTitle, panelBody, panelBodyPre, panelFooter, copyButton;
	
	        panelWrapper = document.createElement('div');
	        panelHeader = document.createElement('div');
	        panelBody = document.createElement('div');
	        panelBodyPre = document.createElement('pre');
	        panelFooter = document.createElement('div');
	        headerTitle = document.createElement('span');
	        copyButton = document.createElement('button');
	
	        panelWrapper.className = (this.options.bsStyle ? 'panel panel-' + this.options.bsPanelColor : '') + ' mkxmlbuilder-preview-panel';
	        panelHeader.className = (this.options.bsStyle ? 'panel-heading' : '') + ' mkxmlbuilder-preview-panel-header';
	        panelBody.className = (this.options.bsStyle ? 'panel-body' : '') + ' mkxmlbuilder-preview-panel-body';
	        panelFooter.className = (this.options.bsStyle ? 'panel-footer' : '') + ' mkxmlbuilder-preview-panel-footer';
	        copyButton.className = (this.options.bsStyle ? 'btn btn-' + this.options.bsCopyButtonColor : '') + ' mkxmlbuilder-editor-preview-btn';
	
	        panelHeader.appendChild(headerTitle);
	
	        this.panelWrapper = panelWrapper;
	        this.panelHeader = panelHeader;
	        this.panelBody = panelBody;
	        this.panelBodyPre = panelBodyPre;
	        this.panelFooter = panelFooter;
	        this.headerTitle = headerTitle;
	        this.copyButton = copyButton;
	
	        if (this.options.showHeader) {
	            this.panelWrapper.appendChild(this.panelHeader);
	        }
	        this.panelBody.appendChild(panelBodyPre);
	        this.panelWrapper.appendChild(this.panelBody);
	
	        if (this.options.showFooter) {
	            this.panelWrapper.appendChild(this.panelFooter);
	        }
	
	        if (this.options.showCopyButton) {
	            this.panelFooter.appendChild(this.copyButton);
	        }
	
	        headerTitle.innerHTML = this.options.headerTitle;
	        copyButton.innerHTML = this.options.copyButtonText;
	
	        return this;
	    }
	
	    function Preview(options) {
	
	        classCallCheck(this, Preview);
	
	        this.options = (typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' ? Utils.extend(this.options, options) : this.options;
	
	        return createElement.call(this);
	    }
	
	    module.exports = Preview;
	})();

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var Utils = __webpack_require__(1);
	
	(function () {
	
	    'use strict';
	
	    function classCallCheck(instance, Constructor) {
	        if (!(instance instanceof Constructor)) {
	            throw new TypeError('Cannot call a class as a function');
	        }
	    }
	
	    function AttributeModal(options) {
	        this.nodeItem = null;
	
	        this.options = (typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' ? Utils.extend(this.options, options) : this.options;
	
	        createElement.call(this);
	    }
	
	    function createElement() {
	        var modalWrapper, modalDialog, modalContent, modalHeader, headerTitle, headerCloseBtn, headerCloseIcon, modalBody, modalFooter, footerSaveBtn, footerCloseBtn;
	
	        modalWrapper = document.createElement('div');
	        modalDialog = document.createElement('div');
	        modalContent = document.createElement('div');
	        modalHeader = document.createElement('div');
	        headerTitle = document.createElement('h4');
	        headerCloseBtn = document.createElement('button');
	        headerCloseIcon = document.createElement('span');
	        modalBody = document.createElement('div');
	        modalFooter = document.createElement('div');
	        footerSaveBtn = document.createElement('button');
	        footerCloseBtn = document.createElement('button');
	
	        modalWrapper.className = this.options.bsStyle === true ? 'modal' : 'mkxmlbuilder-modal';
	        modalDialog.className = this.options.bsStyle === true ? 'modal-dialog' : 'mkxmlbuilder-modal-dialog';
	        modalContent.className = this.options.bsStyle === true ? 'modal-content' : 'mkxmlbuilder-modal-content';
	        modalHeader.className = this.options.bsStyle === true ? 'modal-header' : 'mkxmlbuilder-modal-header';
	        headerTitle.className = this.options.bsStyle === true ? 'modal-title' : 'mkxmlbuilder-modal-title';
	        headerCloseBtn.className = this.options.bsStyle === true ? 'close' : 'mkxmlbuilder-modal-close-icon';
	        modalBody.className = this.options.bsStyle === true ? 'modal-body' : 'mkxmlbuilder-modal-body';
	        modalFooter.className = this.options.bsStyle === true ? 'modal-footer' : 'mkxmlbuilder-modal-footer';
	        footerSaveBtn.className = this.options.bsStyle === true ? 'btn btn-' + this.options.bsSaveButtonColor : 'mkxmlbuilder-modal-save-btn';
	        footerCloseBtn.className = this.options.bsStyle === true ? 'btn btn-' + this.options.bsCloseButtonColor : 'mkxmlbuilder-modal-close-btn';
	
	        headerTitle.innerHTML = this.options.headerTitle;
	        headerCloseIcon.innerHTML = this.options.headerCloseIcon;
	        footerSaveBtn.innerHTML = this.options.saveButtonText;
	        footerCloseBtn.innerHTML = this.options.closeButtonText;
	
	        headerCloseBtn.appendChild(headerCloseIcon);
	        modalHeader.appendChild(headerCloseBtn);
	        modalHeader.appendChild(headerTitle);
	
	        modalFooter.appendChild(footerCloseBtn);
	        modalFooter.appendChild(footerSaveBtn);
	
	        modalWrapper.appendChild(modalDialog);
	        modalDialog.appendChild(modalContent);
	        modalContent.appendChild(modalHeader);
	        modalContent.appendChild(modalBody);
	        modalContent.appendChild(modalFooter);
	
	        modalWrapper.style.display = 'none';
	
	        this.modalWrapper = modalWrapper;
	        this.modalBody = modalBody;
	        this.saveBtn = footerSaveBtn;
	        this.closeBtn = footerCloseBtn;
	        this.closeIcon = headerCloseIcon;
	
	        document.querySelector('body').appendChild(modalWrapper);
	
	        addEventHandlers.call(this);
	
	        return this;
	    }
	
	    function addEventHandlers() {
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
	    }
	
	    function addRowClickHandler(context) {
	        return function () {
	            context.setModalAttributes();
	        };
	    }
	
	    function removeRowClickHandler(row) {
	        return function () {
	            row.remove();
	        };
	    }
	
	    AttributeModal.prototype.setNode = function (nodeItem) {
	        this.nodeItem = nodeItem;
	    };
	
	    AttributeModal.prototype.setModalAttributes = function (attributes) {
	
	        if (this.options.maxAttributes && this.modalWrapper.querySelectorAll('.attr-row').length >= this.options.maxAttributes) {
	            alert("You cannot add more than " + this.options.maxAttributes + "attributes");
	            return false;
	        }
	
	        var context = this,
	            row,
	            attrName,
	            attrValue,
	            addBtn,
	            removeBtn,
	            attrObj,
	            k;
	
	        if (typeof attributes !== 'undefined') {
	            while (this.modalBody.firstChild) {
	                this.modalBody.removeChild(this.modalBody.firstChild);
	            }
	        }
	
	        attributes = attributes || [{ name: '', value: '' }];
	
	        for (k = 0; k < attributes.length; k = k + 1) {
	
	            attrObj = attributes[k];
	
	            row = document.createElement('div');
	            attrName = document.createElement('input');
	            attrValue = document.createElement('input');
	            addBtn = document.createElement('span');
	            removeBtn = document.createElement('span');
	
	            row.className = 'attr-row';
	            attrName.className = 'attr-name ' + (context.options.bsStyle ? 'form-control' : '');
	            attrValue.className = 'attr-value ' + (context.options.bsStyle ? 'form-control' : '');
	            addBtn.className = 'attr-add-button';
	            removeBtn.className = 'attr-remove-button';
	
	            addBtn.innerHTML = this.options.addRowIconHtml;
	            removeBtn.innerHTML = this.options.removeRowIconHtml;
	
	            attrName.value = attrObj.name;
	            attrValue.value = attrObj.value;
	
	            row.appendChild(attrName);
	            row.appendChild(attrValue);
	
	            this.modalBody.appendChild(row);
	
	            if (this.modalBody.querySelectorAll('.attr-row').length > 1) {
	                row.appendChild(removeBtn);
	            } else {
	                row.appendChild(addBtn);
	            }
	
	            addBtn.onclick = addRowClickHandler(context);
	            removeBtn.onclick = removeRowClickHandler(row);
	        }
	    };
	
	    AttributeModal.prototype.show = function () {
	        var attributes = this.nodeItem !== 'undefined' && _typeof(this.nodeItem.mkxmlAttributes) === 'object' && Object.keys(this.nodeItem.mkxmlAttributes).length > 0 ? this.nodeItem.mkxmlAttributes : [{ name: '', value: '' }];
	
	        this.setModalAttributes(attributes);
	        this.modalWrapper.classList.add('in');
	        this.modalWrapper.style.display = 'block';
	        document.body.classList.add(this.options.bsStyle ? 'modal-open' : 'mkxmlbuilder-modal');
	    };
	
	    AttributeModal.prototype.hide = function () {
	        this.modalWrapper.classList.remove('in');
	        this.modalWrapper.style.display = 'none';
	        document.body.style = '';
	        document.body.classList.remove(this.options.bsStyle ? 'modal-open' : 'mkxmlbuilder-modal');
	    };
	
	    AttributeModal.prototype.save = function () {
	        var context = this,
	            nodeItem = this.nodeItem,
	            attributes = [],
	            rows,
	            attrName,
	            attrValue,
	            i;
	
	        if (typeof this.nodeItem !== 'undefined' && this.nodeItem !== null) {
	
	            rows = this.modalBody.querySelectorAll('.attr-row');
	
	            if (rows && rows.length > 0) {
	
	                for (i = 0; i < rows.length; i = i + 1) {
	
	                    attrName = rows[i].querySelector('.attr-name') !== null ? rows[i].querySelector('.attr-name').value : null;
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
/* 6 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ])
});
;
//# sourceMappingURL=mkxmlbuilder.js.map