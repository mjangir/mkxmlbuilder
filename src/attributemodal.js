var utils = require('./utils');

(function(){
        var _classCallCheck = function (instance, Constructor)
      {
        if (!(instance instanceof Constructor))
        {
          throw new TypeError('Cannot call a class as a function');
        }
      };

      var _addEventHandlers = function ()
      {
        var context = this;

        this.closeIcon.onclick = function() {
            context.hide();
        }
        this.closeBtn.onclick = function() {
            context.hide();
        }
        this.saveBtn.onclick = function() {
            context.save();
        }
      }

       var AttributeModal = function () {

        _classCallCheck(this, AttributeModal);

        this.options = {
            headerTitle: 'Set Node Attributes',
            saveBtnClass: 'btn btn-success',
            closeBtnClass: 'btn btn-danger'
        }
        this.nodeItem = null;
        this.init();
        };

        AttributeModal.prototype.init = function()
        {
            var modalWrapper,
                modalDialog,
                modalContent,
                modalHeader,
                headerTitle,
                headerCloseBtn,
                headerCloseIcon,
                modalBody,
                modalFooter,
                footerSaveBtn,
                footerCloseBtn;

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
            this.modalBody   = modalBody;
            this.saveBtn        = footerSaveBtn;
            this.closeBtn       = footerCloseBtn;
            this.closeIcon      = headerCloseIcon;

            document.querySelector('body').appendChild(modalWrapper);

            _addEventHandlers.call(this);

            return this;
        };

    AttributeModal.prototype.setNode = function(nodeItem)
    {
        this.nodeItem = nodeItem;
    };

    AttributeModal.prototype.setModalAttributes = function(attributes)
    {
        var context = this,
            row,
            attrName,
            attrValue,
            addBtn,
            removeBtn,
            attrObj;

        if(typeof attributes !== 'undefined')
        {
            while (this.modalBody.firstChild) {
                this.modalBody.removeChild(this.modalBody.firstChild);
            }
        }

        attributes = attributes || [{name: '', value: ''}];

        for(var k = 0; k < attributes.length; k++)
        {
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

            addBtn.onclick = function ()
            {
                context.setModalAttributes();
            }
            removeBtn.onclick = function ()
            {
                row.remove();
            }

            row.appendChild(attrName);
            row.appendChild(attrValue);

            this.modalBody.appendChild(row);

            if(this.modalBody.querySelectorAll('.attr-row').length > 1)
            {
                row.appendChild(removeBtn);
            }
            else
            {
                row.appendChild(addBtn);
            }
        }
    };

    AttributeModal.prototype.show = function()
    {
        var attributes = (
                this.nodeItem != 'undefined'
                && typeof this.nodeItem.mkxmlAttributes == 'object'
                && Object.keys(this.nodeItem.mkxmlAttributes).length > 0)
            ? this.nodeItem.mkxmlAttributes
            : [{name: '', value: ''}];

        this.setModalAttributes(attributes);
        this.modalWrapper.classList.add('in');
        this.modalWrapper.style.display = 'block';
        document.body.classList.add('modal-open');
    };

    AttributeModal.prototype.hide = function()
    {
        this.modalWrapper.classList.remove('in');
        this.modalWrapper.style.display = 'none';
        document.body.style = '';
        document.body.classList.remove('modal-open');
    }

    AttributeModal.prototype.save = function()
    {
        var context  = this,
            nodeItem = this.nodeItem,
            attributes = [];
        if(typeof this.nodeItem != 'undefined' && this.nodeItem !== null)
        {
            var rows = this.modalBody.querySelectorAll('.attr-row');
            if(rows && rows.length > 0)
            {
                for(var i = 0; i < rows.length; i++)
                {
                    var attrName = (rows[i].querySelector('.attr-name') !== null) ? rows[i].querySelector('.attr-name').value : null,
                        attrValue = (rows[i].querySelector('.attr-value') !== null) ? rows[i].querySelector('.attr-value').value: null;
                    if(attrName !== null && attrValue !== null)
                    {
                        attributes.push({name: attrName, value: attrValue});
                    }
                }
                this.nodeItem.mkxmlAttributes = attributes;
            }
        }
        this.hide();
    }


      module.exports = AttributeModal;
}());

