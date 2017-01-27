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
            xmlPreviewButton,
            jsonPreviewButton;
        
        panelWrapper        = document.createElement('div');
        panelHeader         = document.createElement('div');
        panelBody           = document.createElement('div');
        panelFooter         = document.createElement('div');
        headerTitle         = document.createElement('span');
        xmlPreviewButton    = document.createElement('button');
        jsonPreviewButton   = document.createElement('button');
        
        panelWrapper.className          = (this.options.bsStyle ? 'panel panel-' + this.options.bsPanelColor : '') + ' mkxmlbuilder-editor-panel';
        panelHeader.className           = (this.options.bsStyle ? 'panel-heading' : '') + ' mkxmlbuilder-editor-panel-header';
        panelBody.className             = (this.options.bsStyle ? 'panel-body' : '') + ' mkxmlbuilder-editor-panel-body';
        panelFooter.className           = (this.options.bsStyle ? 'panel-footer' : '') + ' mkxmlbuilder-editor-panel-footer';
        xmlPreviewButton.className      = (this.options.bsStyle ? 'btn btn-' + this.options.bsXmlPreviewButtonColor : '') + ' mkxmlbuilder-editor-xml-preview-btn';
        jsonPreviewButton.className     = (this.options.bsStyle ? 'btn btn-' + this.options.bsJsonPreviewButtonColor : '') + ' mkxmlbuilder-editor-json-preview-btn';
        
        panelHeader.appendChild(headerTitle);
        
        this.panelWrapper       = panelWrapper;
        this.panelHeader        = panelHeader;
        this.panelBody          = panelBody;
        this.panelFooter        = panelFooter;
        this.headerTitle        = headerTitle;
        this.xmlPreviewButton   = xmlPreviewButton;
        this.jsonPreviewButton  = jsonPreviewButton;
        
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
        
        headerTitle.innerHTML       = this.options.headerTitle;
        xmlPreviewButton.innerHTML  = this.options.xmlPreviewButtonText;
        jsonPreviewButton.innerHTML = this.options.jsonPreviewButtonText;
        
        return this;
    }
    
    function Editor(options) {
        
        classCallCheck(this, Editor);
        
        this.options = (typeof options === 'object') ? Utils.extend(this.options, options) : this.options;
        
        return createElement.call(this);
    }

    module.exports = Editor;
     
}());

