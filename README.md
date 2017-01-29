# MKXMLBUILDER

MKXMLBUILDER is a small javascript library to quickly embed a XML builder UI in your existing form. It lets you to define your XML templates and provides the JSON object to save it into database.

## Getting Started

Getting started with the library is extremely easy. You just need to create an empty div and pass it to the constructor's first argument.

### Prerequisites

If you have bootstrap css integrated into your project, then you don't have to do anything except creating the instance. Otherwise the plugin puts certain classes on each HTML element it creates and you can override those classes as your own.

```
Give examples
```

### Usage

Create an empty div element you want to attach the plugin to and pass it to the constructor.

```
var instance1 = new Mkxmlbuilder('#div1'); // Or you can pass as HTMLElement also
var instance2 = new Mkxmlbuilder(document.getElementById('div2'));
```

## Options

The library provides a variaty of options you can pass as a JSON object in the second argument of the constructor. They let you control the overall functionality of the builder. Here is the list of options it supports:

## Authors

* **Manish Jangir** - [mjangir](https://github.com/mjangir)
