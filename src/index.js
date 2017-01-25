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
    
    var _addClickHandler = function(event, parent, nodeNameInput, nodeValueInput) {
        var howMany     = prompt('Please enter number of nodes you want') || 1;
        var inputStyle  = window.getComputedStyle(nodeNameInput, null);
        var width       = parseInt(inputStyle.getPropertyValue('width'),10);
        nodeNameInput.style.width = (width*2 + (width*2 * 1/100)) + 'px';
        nodeValueInput.style.display = 'none';
        _renderFresh.call(this, parent, howMany);
    };
    
     var _removeClickHandler = function(event, parent, removableNode) {
         var nodeNameInput = parent.querySelector('.'+this.options.inputBoxWrapperClass+' .node-name');
         var nodeValueInput = parent.querySelector('.'+this.options.inputBoxWrapperClass+' .node-value');
         var numberOfNodes = parent.querySelectorAll('.node-item');
        if(numberOfNodes.length < 1)
        {
            var nodeNameInputStyle  = window.getComputedStyle(nodeNameInput, null);
            var width       = parseInt(nodeNameInputStyle.getPropertyValue('width'),10);
            nodeNameInput.style.width = (width/2 - (width/2 * 1/100)) + 'px';
            nodeValueInput.style.display = 'inline-block';
        }
       
        removableNode.remove();
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
                addBtn              = document.createElement('i'),
                removeBtnWrapper    = document.createElement('span'),
                removeBtn           = document.createElement('i');

            nodeItem.className              = 'node-item';
            inputBoxWrapper.className       = this.options.inputBoxWrapperClass;
            nodeNameInput.className         = this.options.nodeNameInputClass;
            nodeValueInput.className        = this.options.nodeValueInputClass;
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
            inputBoxWrapper.appendChild(collapseBtnWrapper);
            inputBoxWrapper.appendChild(attrBtnWrapper);
            inputBoxWrapper.appendChild(addBtnWrapper);
            inputBoxWrapper.appendChild(removeBtnWrapper);

            nodeItem.appendChild(inputBoxWrapper);
            

            collapseBtnWrapper.onclick = _collapseClickHandler;

            attrBtnWrapper.onclick = _attrClickHandler;

            addBtnWrapper.onclick = (function(_this, parent, nodeNameInput, nodeValueInput) {
                return function(event) {
                    _addClickHandler.call(_this, event, parent, nodeNameInput, nodeValueInput);
                }
            }(this, nodeItem, nodeNameInput, nodeValueInput));

            removeBtnWrapper.onclick = (function(_this, parent, nodeNameInput, nodeValueInput) {
                return function(event) {
                    _removeClickHandler.call(_this, event, parent, nodeNameInput, nodeValueInput);
                }
            }(this, parent, nodeItem));
            
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
        removeIconClass: 'fa fa-trash text-danger'
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
