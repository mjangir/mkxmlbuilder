var Utils = require('./utils');

(function () {
    
    'use strict';
    
    function classCallCheck(instance, Constructor) {
        if (!instance instanceof Constructor) {
            throw new TypeError('Cannot call a class as a function');
        }
    }
    
    function createElement() {
        var panelWrapper,
            panelHeader,
            headerTitle,
            panelBody,
            panelFooter,
            copyButton;
        
        panelWrapper    = document.createElement('div');
        panelHeader     = document.createElement('div');
        panelBody       = document.createElement('div');
        panelFooter     = document.createElement('div');
        headerTitle     = document.createElement('span');
        copyButton      = document.createElement('button');
        
        panelWrapper.className      = (this.options.bsStyle ? 'panel panel-' + this.options.bsPanelColor : '') + ' mkxmlbuilder-editor-panel';
        panelHeader.className       = (this.options.bsStyle ? 'panel-heading' : '') + ' mkxmlbuilder-editor-panel-header';
        panelBody.className         = (this.options.bsStyle ? 'panel-body' : '') + ' mkxmlbuilder-editor-panel-body';
        panelFooter.className       = (this.options.bsStyle ? 'panel-footer' : '') + ' mkxmlbuilder-editor-panel-footer';
        copyButton.className     = (this.options.bsStyle ? 'btn btn-' + this.options.bsCopyButtonColor : '') + ' mkxmlbuilder-editor-preview-btn';
        
        panelHeader.appendChild(headerTitle);
        
        this.panelWrapper   = panelWrapper;
        this.panelHeader    = panelHeader;
        this.panelBody      = panelBody;
        this.panelFooter    = panelFooter;
        this.headerTitle    = headerTitle;
        this.copyButton     = copyButton;
        
        if (this.options.showHeader) {
            this.panelWrapper.appendChild(this.panelHeader);
        }
        
        this.panelWrapper.appendChild(this.panelBody);
        
        if (this.options.showFooter) {
            this.panelWrapper.appendChild(this.panelFooter);
        }
        
        if (this.options.showCopyButton) {
            this.panelFooter.appendChild(this.copyButton);
        }
        
        headerTitle.innerHTML   = this.options.headerTitle;
        copyButton.innerHTML    = this.options.copyButtonText;
        
        return this;
    }
    
    function Preview(options) {
        
        classCallCheck(this, Preview);
        
        this.options = (typeof options === 'object') ? Utils.extend(this.options, options) : this.options;
        
        return createElement.call(this);
    }

    module.exports = Preview;
     
}());

