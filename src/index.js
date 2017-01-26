(function (root, factory) {
    
    'use strict';
    
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        module.exports = factory(
            require('./utils'),
            require('./editor'),
            require('./preview'),
            require('./attributemodal'),
            require('./index.css'),
            global || root
        );
    } else {
        root.Mkxmlbuilder = factory(utils, attributeModal, previewObj, root.jQuery, root.bootstrap, root.toastr, root.alert, root);
    }
}(typeof window !== 'undefined' ? window : this, function (Utils, Editor, Preview, AttributeModal, Style, root) {
    
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
                    return findNodeRecursively(search, obj[i]['subNodes']);
                }
            }
        }
    }
    
    function resolveBootstrapElement(element) {
        
        if (typeof element !== 'string' && typeof element !== 'object') {
            throw new Error('Element must be a valid selector, jQuery object or HTMLDom Node');
        }
        
        if (typeof element === 'string') {
            element = document.querySelector(element);
        } else if (element instanceof jQuery) {
            element = element.get(0);
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
    
    function prepareDomInstances() {
        var outerWrapper,
            editorWrapper,
            previewWrapper;
        
        outerWrapper    = document.createElement('div');
        editorWrapper   = document.createElement('div');
        previewWrapper  = document.createElement('div');
        
        outerWrapper.className      = 'mkxmlbuilder-outer';
        editorWrapper.className     = 'mkxmlbuilder-editor';
        previewWrapper.className    = 'mkxmlbuilder-preview';
        
        editorWrapper.appendChild(this.editor.panelWrapper);
        previewWrapper.appendChild(this.preview.panelWrapper);
        
        outerWrapper.appendChild(editorWrapper);
        
        if (this.options.showPreviewPanel) {
            outerWrapper.appendChild(previewWrapper);
        } else {
            editorWrapper.style.width = '100%';
        }
        this.outerWrapper   = outerWrapper;
        this.editorWrapper  = editorWrapper;
        this.editorBody     = this.editor.panelBody;
        this.previewWrapper = previewWrapper;
        this.previewBody    = this.preview.panelBody;
        this.element.appendChild(outerWrapper);
    }
    
    function renderFresh(parent, howMany, data) {
        var i,
            nodeItem,
            inputBoxWrapper,
            nodeNameInput,
            nodeValueInput,
            collapseBtnWrapper,
            collapseBtn,
            attrBtnWrapper,
            attrBtn,
            addBtnWrapper,
            addBtn,
            removeBtnWrapper,
            removeBtn,
            parentNodeInHierarchy,
            pushableHierarchyObj;
        
        howMany = howMany || 1;
        
        for (i = 1; i <= howMany; i = i + 1) {
            nodeItem            = document.createElement('div');
            inputBoxWrapper     = document.createElement('div');
            nodeNameInput       = document.createElement('input');
            nodeValueInput      = document.createElement('input');
            collapseBtnWrapper  = document.createElement('span');
            collapseBtn         = document.createElement('i');
            attrBtnWrapper      = document.createElement('span');
            attrBtn             = document.createElement('i');
            addBtnWrapper       = document.createElement('span');
            addBtn              = document.createElement('i');
            removeBtnWrapper    = document.createElement('span');
            removeBtn           = document.createElement('i');
            
            nodeItem.className              = 'mkxmlbuilder-node-item';
            inputBoxWrapper.className       = 'mkxmlbuilder-inputbox';
            nodeNameInput.className         = 'node-item-name ' + (this.options.bootstrapStyle ? 'form-control' : '');
            nodeValueInput.className        = 'node-item-value ' + (this.options.bootstrapStyle ? 'form-control' : '');
            collapseBtnWrapper.className    = 'node-icon';
            attrBtnWrapper.className        = 'node-icon';
            addBtnWrapper.className         = 'node-icon';
            removeBtnWrapper.className      = 'node-icon';
            
            collapseBtn.className   = this.options.collapseIconClass;
            attrBtn.className       = this.options.attrIconClass;
            addBtn.className        = this.options.addIconClass;
            removeBtn.className     = this.options.removeIconClass;
            
            collapseBtnWrapper.appendChild(collapseBtn);
            attrBtnWrapper.appendChild(attrBtn);
            addBtnWrapper.appendChild(addBtn);
            removeBtnWrapper.appendChild(removeBtn);
            
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
            nodeNameInput.onkeyup = (function (instance, nodeItem) {
                return function (event) {
                    changeNodeNameHandler.call(instance, event, nodeItem);
                };
            }(this, nodeItem));

            nodeNameInput.onchange = (function (instance, nodeItem) {
                return function (event) {
                    changeNodeNameHandler.call(instance, event, nodeItem);
                };
            }(this, nodeItem));
            
            nodeValueInput.onkeyup = (function (instance, nodeItem) {
                return function (event) {
                    changeNodeValueHandler.call(instance, event, nodeItem);
                };
            }(this, nodeItem));

            nodeValueInput.onchange = (function (instance, nodeItem) {
                return function (event) {
                    changeNodeValueHandler.call(instance, event, nodeItem);
                };
            }(this, nodeItem));

            collapseBtnWrapper.onclick = (function (instance, nodeItem) {
                return function (event) {
                    collapseClickHandler.call(instance, event, nodeItem);
                };
            }(this, nodeItem));
            
            attrBtnWrapper.onclick = (function (instance, nodeItem) {
                return function (event) {
                    attrClickHandler.call(instance, event, nodeItem);
                };
            }(this, nodeItem));

            addBtnWrapper.onclick = (function (instance, parent, nodeNameInput, nodeValueInput) {
                return function (event) {
                    addClickHandler.call(instance, event, parent, nodeNameInput, nodeValueInput);
                };
            }(this, nodeItem, nodeNameInput, nodeValueInput));
            
            if (this.options.showRemoveNodeButton && parent !== this.editorBody) {
                removeBtnWrapper.onclick = (function (instance, parent, nodeItem) {
                    return function (event) {
                        removeClickHandler.call(instance, event, parent, nodeItem);
                    };
                }(this, parent, nodeItem));
            }
            
            // Add To Hierarchy
            nodeItem.mkxmlUniqueId                          = generateUID();
            pushableHierarchyObj                            = {subNodes: []};
            pushableHierarchyObj[nodeItem.mkxmlUniqueId]    = nodeItem;
            
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
    
    function collapseClickHandler(event, nodeItem) {
        
    }
    
    function addClickHandler(event, parent, nodeNameInput, nodeValueInput) {
        var howMany     = prompt('Please enter number of nodes you want') || 0,
            inputStyle  = window.getComputedStyle(nodeNameInput, null),
            width       = parseInt(inputStyle.getPropertyValue('width'),10);
        
        if (howMany > 0) {
            nodeNameInput.style.width       = (width*2 + (width*2 * 1/100)) + 'px';
            nodeValueInput.style.display    = 'none';
            renderFresh.call(this, parent, howMany);
        }
    }
    
    function removeClickHandler(event, parent, removableNode) {
        
        removableNode.remove();
        
        var nodeNameInput  = parent.querySelector('.node-item-name'),
            nodeValueInput = parent.querySelector('.node-item-value'),
            numberOfNodes  = parent.querySelectorAll('.mkxmlbuilder-node-item'),
            nodeNameInputStyle,
            width;
        
        if (numberOfNodes.length < 1) {
            nodeNameInputStyle              = window.getComputedStyle(nodeNameInput, null);
            width                           = parseInt(nodeNameInputStyle.getPropertyValue('width'),10);
            nodeNameInput.style.width       = (width/2 - (width/2 * 1/100)) + 'px';
            nodeValueInput.style.display    = 'inline-block';
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
        
        this.options    = {
            showAddButton           : true,
            showCollapseButton      : true,
            showAttrButton          : true,
            showRemoveNodeButton    : true,
            showRemoveConfirmation  : true,
            showPreviewPanel        : true,
            collapseIconClass       : 'fa fa-plus text-info',
            attrIconClass           : 'fa fa-tag text-primary',
            addIconClass            : 'fa fa-plus-circle text-success',
            removeIconClass         : 'fa fa-trash text-danger',
            nodeNamePlaceholder     : 'Node Name...',
            nodeValuePlaceholder    : 'Node Value...',
            bootstrapStyle          : true,
            editor : {
                showHeader          : true,
                showFooter          : true,
                showPreviewButton   : true,
                headerTitle         : 'Editor',
                previewButtonText   : 'Show XML Preview',
                bsStyle             : true,
                bsPanelColor        : 'primary',
                bsPreviewButtonColor: 'primary'
            },
            preview: {
                showHeader          : true,
                showFooter          : true,
                showCopyButton      : true,
                headerTitle         : 'XML Preview',
                copyButtonText      : 'Copy To Clipboard',
                bsStyle             : true,
                bsPanelColor        : 'primary',
                bsCopyButtonColor   : 'primary'
            },
            attributeModal : {
                headerTitle         : 'Set Node Attributes',
                headerCloseIcon     : '&times;',
                closeButtonText     : 'Close',
                saveButtonText      : 'Save',
                addRowIconHtml      : '<i class="fa fa-plus-circle text-primary"></i>',
                removeRowIconHtml   : '<i class="fa fa-minus-circle text-danger"></i>',
                bsStyle             : true,
                bsSaveButtonColor   : 'primary',
                bsCloseButtonColor  : 'danger'
            }
        };
        this.nodeHierarchy  = [];
        this.element        = resolveBootstrapElement(element);
        this.options        = (typeof options === 'object') ? Utils.extend(this.options, options) : this.options;
        this.data           = data || null;
        this.editor         = new Editor(this.options.editor);
        this.preview        = new Preview(this.options.preview);
        this.attributeModal = new AttributeModal(this.options.attributeModal);
        
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

    Mkxmlbuilder.prototype.generateJsonOutput = function()
    {
        var hierarchy   = this.nodeHierarchy,
            jsonOutput  = [];
        for (i in hierarchy) {
            
        }
    };

    Mkxmlbuilder.prototype.generateXmlOutput = function()
    {

    };

    Mkxmlbuilder.prototype.getAllXmlNodes = function()
    {
        return this.nodeHierarchy;
    };

    return Mkxmlbuilder;

}));
