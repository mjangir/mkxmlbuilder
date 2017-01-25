var utils = require('./utils');

(function(){
        var _classCallCheck = function (instance, Constructor)
      {
        if (!(instance instanceof Constructor))
        {
          throw new TypeError('Cannot call a class as a function');
        }
      };

       var XmlPreview = function (wrapper) {

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

        XmlPreview.prototype.init = function()
        {
            var panelWrapper,
                panelHeader,
                headerTitle,
                panelBody,
                panelFooter,
                copyXmlBtn;

            panelWrapper= document.createElement('div');

            panelBody   = document.createElement('div');


            panelWrapper.className = 'mkxmlbuilder-preview';

            panelBody.className = 'mkxmlbuilder-preview-body';


            this.panelWrapper = panelWrapper;

            if(this.options.showHeader)
            {
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

            if(this.options.showFooter)
            {
                panelFooter = document.createElement('div');

                panelFooter.className = 'mkxmlbuilder-preview-footer';

                if(this.options.showCopyLink)
                {
                    copyXmlBtn              = document.createElement('button');
                    copyXmlBtn.className    = 'mkxmlbuilder-preview-copy-button';
                    copyXmlBtn.innerHTML    = this.options.copyButtonText;
                    panelFooter.appendChild(copyXmlBtn);
                }
                this.panelFooter = panelFooter;
                this.panelWrapper.appendChild(panelFooter);
            }

            this.wrapper.appendChild(this.panelWrapper);

            return this;
        };

        XmlPreview.prototype.renderXml = function()
        {

        };

      module.exports = XmlPreview;
}());

