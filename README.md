# MKXMLBUILDER

MKXMLBUILDER is a small javascript library to quickly embed a XML builder UI in your existing form. It lets you to define your XML templates and provides the JSON object to save it into database.

<a href="https://mjangir.github.io/mkxmlbuilde" target="_blank">**SEE THE DEMO**</a>

## Getting Started

Getting started with the library is extremely easy. You just need to create an empty div and pass it to the constructor's first argument.

### Prerequisites

If you have bootstrap css integrated into your project, then you don't have to do anything except creating the instance. Otherwise the plugin puts certain classes on each HTML element it creates and you can override those classes as your own.

```
Give examples
```

### Usage

Create an empty div element you want to attach the plugin to and pass it to the constructor.

```javascript
var instance1 = new Mkxmlbuilder('#div1'); // Or you can pass as HTMLElement also
var instance2 = new Mkxmlbuilder(document.getElementById('div2'));
```

## Options

The library provides a variaty of options you can pass as a JSON object in the second argument of the constructor. They let you control the overall functionality of the builder. Here is the list of options it supports:

```json
{
  "showAddButton"               : true,
  "showCollapseButton"          : true,
  "showAttrButton"              : true,
  "showRemoveNodeButton"        : true,
  "showRemoveConfirmation"      : false,
  "showPreviewPanel"            : true,
  "collapseIconClass"           : "fa fa-minus text-info",
  "collapseIconToggleClass"     : "fa fa-plus text-info",
  "attrIconClass"               : "fa fa-tag text-primary",
  "addIconClass"                : "fa fa-plus-circle text-success",
  "removeIconClass"             : "fa fa-trash text-danger",
  "nodeNamePlaceholder"         : "Node Name...",
  "nodeValuePlaceholder"        : "Node Value...",
  "bootstrapStyle"              : true,
  "editor": {
    "showHeader"                : true,
    "showFooter"                : true,
    "showXmlPreviewButton"      : true,
    "showJsonPreviewButton"     : true,
    "headerTitle"               : "Editor",
    "xmlPreviewButtonText"      : "Show XML Preview",
    "jsonPreviewButtonText"     : "Show JSON Preview",
    "bsStyle"                   : true,
    "bsPanelColor"              : "primary",
    "bsXmlPreviewButtonColor"   : "primary",
    "bsJsonPreviewButtonColor"  : "primary"
  },
  "preview": {
    "showHeader"                : true,
    "showFooter"                : true,
    "showCopyButton"            : true,
    "headerTitle"               : "Preview",
    "copyButtonText"            : "Copy To Clipboard",
    "bsStyle"                   : true,
    "bsPanelColor"              : "primary",
    "bsCopyButtonColor"         : "primary"
  },
  "attributeModal": {
    "headerTitle"               : "Set Node Attributes",
    "headerCloseIcon"           : "&times;",
    "closeButtonText"           : "Close",
    "saveButtonText"            : "Save",
    "addRowIconHtml"            : "<i class=\"fa fa-plus-circle text-primary\"><\/i>",
    "removeRowIconHtml"         : "<i class=\"fa fa-minus-circle text-danger\"><\/i>",
    "bsStyle"                   : true,
    "bsSaveButtonColor"         : "primary",
    "bsCloseButtonColor"        : "danger",
    "maxAttributes"             : 5
  }
}
```

## Prototype Exposed Methods:

The plugin provides the access to two following functions to generate the JSON and XML output of the builder to pass them in the request with your existing form data:

```javascript
var jsonOutput  = instance1.generateJsonOutput();
var xmlOutput   = instance1.generateXmlOutput();
```

## Authors

* **Manish Jangir** - [mjangir](https://github.com/mjangir)
