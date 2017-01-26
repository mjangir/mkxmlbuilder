var Utils = require('./utils');

(function () {
    
    'use strict';
    
    function classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
        }
    }
    
    function AttributeModal(options) {
        this.nodeItem = null;
        
        this.options = (typeof options === 'object') ? Utils.extend(this.options, options) : this.options;
        
        createElement.call(this);
    }
    
    function createElement() {
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

        modalWrapper        = document.createElement('div');
        modalDialog         = document.createElement('div');
        modalContent        = document.createElement('div');
        modalHeader         = document.createElement('div');
        headerTitle         = document.createElement('h4');
        headerCloseBtn      = document.createElement('button');
        headerCloseIcon     = document.createElement('span');
        modalBody           = document.createElement('div');
        modalFooter         = document.createElement('div');
        footerSaveBtn       = document.createElement('button');
        footerCloseBtn      = document.createElement('button');
        
        modalWrapper.className      = (this.options.bsStyle === true) ? 'modal' : 'mkxmlbuilder-modal';
        modalDialog.className       = (this.options.bsStyle === true) ? 'modal-dialog' : 'mkxmlbuilder-modal-dialog';
        modalContent.className      = (this.options.bsStyle === true) ? 'modal-content' : 'mkxmlbuilder-modal-content';
        modalHeader.className       = (this.options.bsStyle === true) ? 'modal-header' : 'mkxmlbuilder-modal-header';
        headerTitle.className       = (this.options.bsStyle === true) ? 'modal-title' : 'mkxmlbuilder-modal-title';
        headerCloseBtn.className    = (this.options.bsStyle === true) ? 'close' : 'mkxmlbuilder-modal-close-icon';
        modalBody.className         = (this.options.bsStyle === true) ? 'modal-body' : 'mkxmlbuilder-modal-body';
        modalFooter.className       = (this.options.bsStyle === true) ? 'modal-footer' : 'mkxmlbuilder-modal-footer';
        footerSaveBtn.className     = (this.options.bsStyle === true) ? 'btn btn-' + this.options.bsSaveButtonColor : 'mkxmlbuilder-modal-save-btn';
        footerCloseBtn.className    = (this.options.bsStyle === true) ? 'btn btn-' + this.options.bsCloseButtonColor : 'mkxmlbuilder-modal-close-btn';
        
        
        headerTitle.innerHTML       = this.options.headerTitle;
        headerCloseIcon.innerHTML   = this.options.headerCloseIcon;
        footerSaveBtn.innerHTML     = this.options.saveButtonText;
        footerCloseBtn.innerHTML    = this.options.closeButtonText;
        
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
        
        this.modalWrapper   = modalWrapper;
        this.modalBody      = modalBody;
        this.saveBtn        = footerSaveBtn;
        this.closeBtn       = footerCloseBtn;
        this.closeIcon      = headerCloseIcon;

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

        attributes = attributes || [{name: '', value: ''}];

        for (k = 0; k < attributes.length; k = k + 1) {
            
            attrObj = attributes[k];

            row         = document.createElement('div');
            attrName    = document.createElement('input');
            attrValue   = document.createElement('input');
            addBtn      = document.createElement('span');
            removeBtn   = document.createElement('span');
            
            row.className       = 'attr-row';
            attrName.className  = 'attr-name ' + (context.options.bsStyle ? 'form-control' : '');
            attrValue.className = 'attr-value ' + (context.options.bsStyle ? 'form-control' : '');
            addBtn.className    = 'attr-add-button';
            removeBtn.className = 'attr-remove-button';
            
            addBtn.innerHTML    = this.options.addRowIconHtml;
            removeBtn.innerHTML = this.options.removeRowIconHtml;
            
            attrName.value      = attrObj.name;
            attrValue.value     = attrObj.value;

            row.appendChild(attrName);
            row.appendChild(attrValue);

            this.modalBody.appendChild(row);

            if (this.modalBody.querySelectorAll('.attr-row').length > 1) {
                row.appendChild(removeBtn);
            } else {
                row.appendChild(addBtn);
            }
            
            addBtn.onclick      = addRowClickHandler(context);
            removeBtn.onclick   = removeRowClickHandler(row);
        }
    };

    AttributeModal.prototype.show = function () {
        var attributes = (
                this.nodeItem !== 'undefined'
                && typeof this.nodeItem.mkxmlAttributes === 'object'
                && Object.keys(this.nodeItem.mkxmlAttributes).length > 0
            )
                ? this.nodeItem.mkxmlAttributes
                : [{name: '', value: ''}];

        this.setModalAttributes(attributes);
        this.modalWrapper.classList.add('in');
        this.modalWrapper.style.display = 'block';
        document.body.classList.add((this.options.bsStyle ? 'modal-open' : 'mkxmlbuilder-modal'));
    };

    AttributeModal.prototype.hide = function () {
        this.modalWrapper.classList.remove('in');
        this.modalWrapper.style.display = 'none';
        document.body.style             = '';
        document.body.classList.remove((this.options.bsStyle ? 'modal-open' : 'mkxmlbuilder-modal'));
    };

    AttributeModal.prototype.save = function () {
        var context     = this,
            nodeItem    = this.nodeItem,
            attributes  = [],
            rows,
            attrName,
            attrValue,
            i;
        
        if (typeof this.nodeItem !== 'undefined' && this.nodeItem !== null) {
            
            rows = this.modalBody.querySelectorAll('.attr-row');
            
            if (rows && rows.length > 0) {
                
                for (i = 0; i < rows.length; i = i + 1) {
                    
                    attrName    = (rows[i].querySelector('.attr-name') !== null) ? rows[i].querySelector('.attr-name').value : null;
                    attrValue   = (rows[i].querySelector('.attr-value') !== null) ? rows[i].querySelector('.attr-value').value : null;
                    
                    if (attrName !== null && attrValue !== null) {
                        attributes.push({name: attrName, value: attrValue});
                    }
                }
                this.nodeItem.mkxmlAttributes = attributes;
            }
        }
        
        this.hide();
    };

      module.exports = AttributeModal;
}());

