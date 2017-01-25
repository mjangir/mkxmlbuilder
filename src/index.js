(function (root, factory) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = factory(
        require('./utils'),
        require('jquery'),
        require('./index.css'),
        global || root);
  } else {
    root.Mkxmlbuilder = factory(utils, root.jQuery, root.bootstrap, root.toastr, root.alert, root);
  }
}(typeof window !== 'undefined' ? window : this, function (jQuery, styles, root) {

  var _classCallCheck = function (instance, Constructor)
  {
    if (!(instance instanceof Constructor))
    {
      throw new TypeError('Cannot call a class as a function');
    }
  };
    
    var _collapseClickHandler = function (event) {
        console.log(event.target);
    };
    
    var _attrClickHandler = function(event) {
        console.log(event.target);
    };
    
    var _addClickHandler = function(event, nodeItem) {
        _renderFresh.call(this, nodeItem)
    };
    
     var _removeClickHandler = function(event) {
         console.log(event.target);
     };
    
    var _renderFresh = function(parent, data)
    {
        var nodeItem            = document.createElement('div'),
            inputBoxWrapper     = document.createElement('div'),
            inputBox            = document.createElement('input'),
            collapseBtnWrapper  = document.createElement('span'),
            collapseBtn         = document.createElement('i'),
            attrBtnWrapper      = document.createElement('span'),
            attrBtn             = document.createElement('i'),
            addBtnWrapper       = document.createElement('span'),
            addBtn              = document.createElement('i'),
            removeBtnWrapper    = document.createElement('span'),
            removeBtn           = document.createElement('i');
        
        nodeItem.className              = 'node-item';
        inputBoxWrapper.className       = this.options.inputBoxWrapperClass;
        inputBox.className              = this.options.inputBoxClass;
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
        
        inputBoxWrapper.appendChild(inputBox);
        inputBoxWrapper.appendChild(collapseBtnWrapper);
        inputBoxWrapper.appendChild(attrBtnWrapper);
        inputBoxWrapper.appendChild(addBtnWrapper);
        inputBoxWrapper.appendChild(removeBtnWrapper);
        
        nodeItem.appendChild(inputBoxWrapper);
        parent.appendChild(nodeItem);
        
        collapseBtnWrapper.onclick = _collapseClickHandler;
        
        attrBtnWrapper.onclick = _attrClickHandler;
        
        addBtnWrapper.onclick = (function(_this) {
            return function(event) {
                _addClickHandler.call(_this, event, nodeItem);
            }
        }(this));
        
        removeBtnWrapper.onclick = _removeClickHandler;
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
        inputBoxClass: 'form-control',
        collapseIconClass: 'fa fa-plus',
        attrIconClass: 'fa fa-tag',
        addIconClass: 'fa fa-plus-circle',
        removeIconClass: 'fa fa-trash'
    };
      this.data = null;
    
    if (arguments.length <= 0) 
    {
        throw new TypeError('You must have to provide element in the constructor');
    } 
    else 
    {
        this.element = arguments[0];
        
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
       if(this.data !== null)
           {
               _renderWithData.call(this, this.element, this.data);
           }
       else
           {
               _renderFresh.call(this, this.element);
           }
   };
    
    Mkxmlbuilder.prototype.generateJsonOutput = function()
    {
        
    };
    
    Mkxmlbuilder.prototype.generateXmlOutput = function()
    {
        
    };
    

  
  return Mkxmlbuilder;

}));
