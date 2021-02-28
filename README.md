# JS Helper Library
A set of light-weight functions that help in everyday's JS programming.

The size of this library, minified and zipped is about 2KB.

## Introduction
There is a set of functions that I used to recreate on most JS web programming projects. This library organizses these functions and provide better test coverage. These functions can be groups into these categories:
* Object functions: like check data type, travers object/array content, or deep equality check.
* String functions: like indexOf, startsWith, endsWith, all with case sensitivity control. Also there is a quick template replace function.
* Dom functions: find element by id or selector, simple attribute access, create and add element, and removeelements.

## Install
You can use this library as either an EcmaScript module, or the old way as a script which you include in your html file.

### Install as NPM EcmaScript Module
If you plan to use this package as an NPM module:

```bash
    npm install @techexp/jshelper
```

### Install as a Script
If you plan to use this package as a JS script library

```html
    <script src="https://raw.githubusercontent.com/ahabra/jshelper/master/dist/helper-script-min.js"></script>
```

Alternatively, you can download the file `https://raw.githubusercontent.com/ahabra/jshelper/master/dist/helper-script-min.js` and use directly. Note that there is a non-minified version at the same location.


## Usage
If you installed as an EcmaScript module
```js
import * as Helper from '@techexp/jshelper'
```

or you can import specific modules of the library:
```js
import {Domer, Objecter, Stringer} from '@techexp/jshelper'
```

If you installed as a Script, the library is available at `window.jshelper`

### Quick Code Demo
This example shows how to use some of the library's features:

```js
import {Domer, Objecter, Stringer} from '@techexp/jshelper'
// or use window.jshelper which will have properties Domer, Objecter, Stringer

const obj1 = {a: 1}
const obj2 = {a: 1}
console.log(obj1 == obj2)  // false
console.log(obj1 === obj2)  // false
console.log(Objecter.equals(obj1, obj2))   // true

const index = Stringer.indexOfFirstMatch('ab7cd', c => c >= '0' && c <= '9')
console.log(index)  // 2 index of first digit

const element = Domer.id('price') // find DOM element with id = price
console.log(element.tagName)
```

## API
The library consists of several modules, each with related functionality.

### Objecter
Provides functions related to object manipulation.

#### `isNil(x)`
Check if given argument is null or undefined

#### `isString(s)`
Check if given argument is of String type

#### `isFunction(f)`
Check if given argument is of Function type

#### `isDate(d)`
Check if given argument is of Date type

#### `forEachEntry(object, func)`
Traverse the given object/array and call `func` for each element.
`func` will be called with (key, value) arguments. For arrays, key is the index.

#### `has(object, propName)`
Check if the given object has a property with given name

#### `equals(a, b)`
Deep equality test between given arguments

### Stringer
Provide String handling functions

#### `indexOf(st, search, fromIndex = 0, ignoreCase = false)`
Find the index of a given string inside another. It takes these arguments:
* `st` The string to search
* `search` The string to look for
* `fromIndex` Optional, default = 0. Starting index in st.
* `ignoreCase` Optional, default = false. Case sensitivity
Returns the index of the found search string, -1 if not found.

#### `indexOfFirstMatch(st, callback)`
Index of first charcter matching the given criterion. It takes these arguments:
* `st` The string to search
* `callback` A callback function which takes two arguments (char, index). This callback function should return true if the charcter matches.

Returns the index of the found character, -1 if not found.

#### `indexOfLastMatch(st, callback)`
Index of last charcter matching the given criterion. It takes these arguments:
* `st` The string to search
* `callback` A callback function which takes two arguments (char, index). This callback function should return true if the charcter matches.

Returns the index of the found character, -1 if not found.

#### `startsWith(st, search, ignoreCase = false)`
Check if a given string starts with a given search string. It takes up to three arguments:
* `st` The String to search
* `search` The desired start
* `ignoreCase` case sensitivity
Returns true if matches, false if not.

#### `endsWith(st, search, ignoreCase = false)`
Check if a given string ends with a given search string. It takes these arguments:
* `st` The String to search
* `search` The desired start
* `ignoreCase` case sensitivity
Returns true if matches, false if not.

#### `removePrefix(st, prefix, ignoreCase = false)`
Remove a given prefix from a string, if found. It takes these arguments:
* `st` The string to search
* `prefix` The prefix string to remove
* `ignoreCase` case sensitivity

#### `removeSuffix(st, suffix, ignoreCase = false)`
Remove a given suffix from a string, if found. It takes these arguments:
* `st` The string to search
* `suffix` The suffix string to remove
* `ignoreCase` case sensitivity

#### `removeSurrounding(st, prefix, suffix, ignoreCase = false)`
Remove a given prefix and suffix from a string. It takes these arguments:
* `st` The string to search
* `prefix` The prefix string to remove
* `suffix` The suffix string to remove
* `ignoreCase` case sensitivity

#### `substringAfter(st, search, ignoreCase = false)`
Find the substring after the first occurance of a search string. It takes these arguments:
* `st` The string to search
* search The string to look for
* `ignoreCase` case sensitivity
Returns the substring after search. Returns empty string if not found

#### `substringBefore(st, search, ignoreCase = false)`
Find the substring before the first occurance of a search string. It takes these arguments:
* `st` The string to search
* `search` The string to look for
* `ignoreCase` case sensitivity
Returns the substring before search. Returns whole string if not found.

#### `trim(s)`
Trim given string. If string is null or undefined, returns empty string.

#### `isEmpty(s)`
Check if given string is undefined, null, or zero length.

#### `replaceTemplate(text = '', values = {}, preTag = '${', postTag = '}')`
Search text for keys in values, and replace them. It takes these arguments:
* `text` The template text
* `values` An object with keys/values to replace in the template
* `preTag` Optional, default `${`. The tag prefix
* `postTag` Optional, default `}`. The tag suffix


### Domer
Functions to inspect and manipulate the DOM.

#### `id(elementId, root = document)`
Select element with a given id

#### `all(selector, root = document)`
Select all elements matching given selector. Returns an array of matched elements.

#### `first(selector, root = document)`
Select first element matching selector. Selector can be a path with its parts separated by slash `/`. Returns null if not found.

#### `getAttributes(el)`
Get attributes of an element as an object with key/value

#### `createElements(html = '')`
Create an __array__ of DOM elements from given html.

#### `createElement(name, attributes = {}, content = '')`
Create a single DOM element.

#### `tag(name, attributes = {}, content = '')`
Create the html for a given tag.

#### `add(target, tobeAdded, location = 'beforeend')`
Add html or elements to given target element. It takes these arguments:
* target The element to add to
* tobeAdded Can be an html string, a DOM element, or an array of DOM elements
* location String. Where to add in the target. One of: `(beforebegin, afterbegin, beforeend, afterend)`. The default is `beforeend`.

#### `setContent(element, ...content)`
Set the content of an element. It takes these arguments:
* `element` The DOM element to change its content
* `content` The new content. A set of Strings or DOM Elements to insert.

#### `removeElements(selector, root = document)`
Remove elements matching given selector

#### `classPresentIf(el, cssClass, condition)`
Add/remove a given class if condition is true/false


