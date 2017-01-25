(function (root, factory) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = factory(
        require('./utils'),
        require('./attributemodal'),
        require('./preview'),
        require('jquery'),
        require('./index.css'),
        global || root);
  } else {
    root.Mkxmlbuilder = factory(utils, attributeModal, previewObj, root.jQuery, root.bootstrap, root.toastr, root.alert, root);
  }
}(typeof window !== 'undefined' ? window : this, function (utils, attributeModal, previewObject, jQuery, styles, root) {

  var _classCallCheck = function (instance, Constructor)
  {
    if (!(instance instanceof Constructor))
    {
      throw new TypeError('Cannot call a class as a function');
    }
  };

  var _createOuterWrapper = function (masterElement)
  {
    var resolvedElement;

    if(typeof masterElement === 'string')
    {
        resolvedElement = document.querySelector(masterElement);
    }
    else if(typeof masterElement === 'object' && masterElement.tagName)
    {
        resolvedElement = masterElement;
    }
    else if(masterElement instanceof jQuery)
    {
        resolvedElement = masterElement.get(0);
    }
    else
    {
        throw new Error('Element must be a valid selector, jQuery object or HTMLDom Node');
    }

    if(resolvedElement)
    {
        this.editorWrapper = document.createElement('div');
        this.previewWrapper = document.createElement('div');
        this.editorWrapper.style.float = 'left';
        this.previewWrapper.style.float = 'right';
        if(this.options.showXmlPreview)
        {
            this.editorWrapper.style.width = '58%';
            this.previewWrapper.style.width = '40%';
            this.xmlPreview = new previewObject(this.previewWrapper)
        }
        else
        {
            this.editorWrapper.style.width = '100%';
        }
        resolvedElement.appendChild(this.editorWrapper);
        resolvedElement.appendChild(this.previewWrapper);
    }
    return resolvedElement;
  }

    var _generateUID = function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    }

    var _changeNodeNameHandler = function (event, nodeItem)
    {
        nodeItem.mkxmlNodeName = event.target.value;
    };

    var _changeNodeValueHandler = function (event, nodeItem)
    {
        nodeItem.mkxmlNodeValue = event.target.value;
    };

    var _collapseClickHandler = function (event) {
    };

    var _attrClickHandler = function(event, nodeItem) {
        this.attributeModal.setNode(nodeItem);
        this.attributeModal.show();
    };

    var _addClickHandler = function(event, parent, nodeNameInput, nodeValueInput) {
        var howMany     = prompt('Please enter number of nodes you want') || 0;
        var inputStyle  = window.getComputedStyle(nodeNameInput, null);
        var width       = parseInt(inputStyle.getPropertyValue('width'),10);
        if(howMany > 0) {
            nodeNameInput.style.width = (width*2 + (width*2 * 1/100)) + 'px';
            nodeValueInput.style.display = 'none';
            _renderFresh.call(this, parent, howMany);
        }
    };

     var _removeClickHandler = function(event, parent, removableNode) {
        removableNode.remove();
         var nodeNameInput  = parent.querySelector('.'+this.options.inputBoxWrapperClass+' .node-name');
         var nodeValueInput = parent.querySelector('.'+this.options.inputBoxWrapperClass+' .node-value');
         var numberOfNodes  = parent.querySelectorAll('.node-item');
         removableNode.remove();
        if(numberOfNodes.length < 1)
        {
            var nodeNameInputStyle  = window.getComputedStyle(nodeNameInput, null);
            var width       = parseInt(nodeNameInputStyle.getPropertyValue('width'),10);
            nodeNameInput.style.width = (width/2 - (width/2 * 1/100)) + 'px';
            nodeValueInput.style.display = 'inline-block';
        }
     };

    var _renderFresh = function(parent, howMany, data)
    {
        var numberOfItems = howMany || 1;
        for(var i = 1; i <= numberOfItems; i++)
        {
            var nodeItem            = document.createElement('div'),
                inputBoxWrapper     = document.createElement('div'),
                nodeNameInput       = document.createElement('input'),
                nodeValueInput      = document.createElement('input'),
                inputBox            = document.createElement('input'),
                collapseBtnWrapper  = document.createElement('span'),
                collapseBtn         = document.createElement('i'),
                attrBtnWrapper      = document.createElement('span'),
                attrBtn             = document.createElement('i'),
                addBtnWrapper       = document.createElement('span'),
                addBtn              = document.createElement('i');

            nodeItem.mkxmlUniqueId          = _generateUID();
            nodeItem.className              = 'node-item';
            inputBoxWrapper.className       = this.options.inputBoxWrapperClass;
            nodeNameInput.className         = this.options.nodeNameInputClass;
            nodeValueInput.className        = this.options.nodeValueInputClass;
            nodeNameInput.setAttribute('placeholder', 'Node Name...');
            nodeValueInput.setAttribute('placeholder', 'Node Value...');
            collapseBtnWrapper.className    = 'node-icon';
            attrBtnWrapper.className        = 'node-icon';
            addBtnWrapper.className         = 'node-icon';

            collapseBtn.className   = this.options.collapseIconClass;
            attrBtn.className       = this.options.attrIconClass;
            addBtn.className        = this.options.addIconClass;

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


            nodeNameInput.onkeyup = (function(_this, nodeItem) {
                return function(event) {
                    _changeNodeNameHandler.call(_this, event, nodeItem);
                }
            }(this, nodeItem));

            nodeNameInput.onchange = (function(_this, nodeItem) {
                return function(event) {
                    _changeNodeNameHandler.call(_this, event, nodeItem);
                }
            }(this, nodeItem));

            nodeValueInput.onkeyup = (function(_this, nodeItem) {
                return function(event) {
                    _changeNodeValueHandler.call(_this, event, nodeItem);
                }
            }(this, nodeItem));

            nodeValueInput.onchange = (function(_this, nodeItem) {
                return function(event) {
                    _changeNodeValueHandler.call(_this, event, nodeItem);
                }
            }(this, nodeItem));

            collapseBtnWrapper.onclick = _collapseClickHandler;

            attrBtnWrapper.onclick = (function(_this, nodeItem) {
                return function(event) {
                    _attrClickHandler.call(_this, event, nodeItem);
                }
            }(this, nodeItem));

            addBtnWrapper.onclick = (function(_this, parent, nodeNameInput, nodeValueInput) {
                return function(event) {
                    _addClickHandler.call(_this, event, parent, nodeNameInput, nodeValueInput);
                }
            }(this, nodeItem, nodeNameInput, nodeValueInput));

            if(parent !== this.editorWrapper)
            {
                var removeBtnWrapper    = document.createElement('span'),
                    removeBtn           = document.createElement('i');
                removeBtnWrapper.className      = 'node-icon';
                removeBtn.className     = this.options.removeIconClass;
                removeBtnWrapper.appendChild(removeBtn);
                inputBoxWrapper.appendChild(removeBtnWrapper);
                removeBtnWrapper.onclick = (function(_this, parent, nodeNameInput, nodeValueInput) {
                    return function(event) {
                        _removeClickHandler.call(_this, event, parent, nodeNameInput, nodeValueInput);
                    }
                }(this, parent, nodeItem));
            }

            //this.xmlNodes[parent.mkxmlUniqueId] = (Array.isArray(this.xmlNodes[parent.mkxmlUniqueId])) ? this.xmlNodes[parent.mkxmlUniqueId].push(nodeItem) : [nodeItem];
            parent.appendChild(nodeItem);
        }

    };

    var _renderWithData = function(parent, data)
    {

    };

  var Mkxmlbuilder = function (element, options, data) {

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
        previewTitle:'XML Preivew'
    };
      this.data = null;
      this.xmlNodes = {};

    if (arguments.length <= 0)
    {
        throw new TypeError('You must have to provide element in the constructor');
    }
    else
    {
        this.element = _createOuterWrapper.call(this, arguments[0]);

        if(arguments.length === 2)
        {
            this.options = utils.extend(this.options, arguments[1]);
        }
        if(arguments.length === 3)
        {
            this.data = arguments[2];
        }
    }

    this.init();
  };

   Mkxmlbuilder.prototype.init = function ()
   {
    this.editorWrapper.mkxmlUniqueId = _generateUID();
       if(this.data !== null)
           {
               _renderWithData.call(this, this.editorWrapper, this.data);
           }
       else
           {
               _renderFresh.call(this, this.editorWrapper);
           }

        this.attributeModal = new attributeModal();
   };

    Mkxmlbuilder.prototype.generateJsonOutput = function()
    {

    };

    Mkxmlbuilder.prototype.generateXmlOutput = function()
    {

    };

    Mkxmlbuilder.prototype.getAllXmlNodes = function()
    {
        return this.xmlNodes;
    };



  return Mkxmlbuilder;

}));
