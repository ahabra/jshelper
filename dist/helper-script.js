// Halper.js Common ES/JS utility library
// https://github.com/ahabra/js-helper
// Copyright 2021 (C) Abdul Habra. Version 0.2.0.
// Apache License Version 2.0


var jshelper = (() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all2) => {
    for (var name in all2)
      __defProp(target, name, {get: all2[name], enumerable: true});
  };

  // src/Helper.js
  var Helper_exports = {};
  __export(Helper_exports, {
    Domer: () => Domer_exports,
    Objecter: () => Objecter_exports,
    Stringer: () => Stringer_exports
  });

  // src/utils/Domer.js
  var Domer_exports = {};
  __export(Domer_exports, {
    add: () => add,
    all: () => all,
    classPresentIf: () => classPresentIf,
    createElement: () => createElement,
    createElements: () => createElements,
    first: () => first,
    getAttributes: () => getAttributes,
    id: () => id,
    removeElements: () => removeElements,
    setContent: () => setContent,
    tag: () => tag
  });

  // src/utils/Objecter.js
  var Objecter_exports = {};
  __export(Objecter_exports, {
    equals: () => equals,
    forEachEntry: () => forEachEntry,
    has: () => has,
    isDate: () => isDate,
    isFunction: () => isFunction,
    isInteger: () => isInteger,
    isNil: () => isNil,
    isNumber: () => isNumber,
    isString: () => isString
  });
  function isNil(x) {
    return x === null || x === void 0;
  }
  function isString(s) {
    return isType(s, "String");
  }
  function isFunction(f) {
    return isType(f, "Function");
  }
  function isDate(d) {
    return isType(d, "Date");
  }
  function isNumber(n) {
    if (isType(n, "Number")) {
      if (Number.isNaN(n))
        return false;
      return Number.isFinite(n);
    }
    if (!isString(n))
      return false;
    n = n.trim();
    if (n === "")
      return false;
    return !isNaN(n);
  }
  function isInteger(n) {
    if (!isNumber(n))
      return false;
    return Number.isInteger(Number.parseFloat(n));
  }
  function isType(v, type) {
    return Object.prototype.toString.call(v) === `[object ${type}]`;
  }
  function forEachEntry(object, func) {
    if (!object || !func)
      return;
    if (Array.isArray(object)) {
      object.forEach((v, index) => {
        func(index, v);
      });
      return;
    }
    Object.entries(object).forEach((p) => func(p[0], p[1]));
  }
  function has(object, propName) {
    if (!object || !propName)
      return false;
    return Object.prototype.hasOwnProperty.call(object, propName);
  }
  function equals(a, b) {
    if (a === b)
      return true;
    if (a === void 0 || b === void 0)
      return false;
    return isEqual(a, b);
  }
  function isEqual(a, b) {
    if (isSimpleType(a) || isSimpleType(b))
      return a === b;
    return isEqualCompoundType(a, b);
  }
  var simpleTypes = new Set(["boolean", "number", "bigint", "string", "symbol"]);
  function isSimpleType(v) {
    return simpleTypes.has(typeof v);
  }
  function isEqualCompoundType(a, b) {
    if (!isEqualType(a, b))
      return false;
    if (isEqualDates(a, b))
      return true;
    return isEqualObjects(a, b);
  }
  function isEqualType(a, b) {
    return prototypeToString(a) === prototypeToString(b);
  }
  function prototypeToString(v) {
    return Object.prototype.toString.call(v);
  }
  function isEqualDates(a, b) {
    if (isDate(a) && isDate(b)) {
      return a.getTime() === b.getTime();
    }
    return false;
  }
  function isEqualObjects(a, b) {
    const akeys = Object.keys(a);
    if (akeys.length !== Object.keys(b).length)
      return false;
    return akeys.every((k) => equals(a[k], b[k]));
  }

  // src/utils/Domer.js
  function id(elementId, root = document) {
    if (isWebComponent(root)) {
      root = root.shadowRoot;
    }
    return root.getElementById(elementId);
  }
  function all(selector, root = document) {
    if (isWebComponent(root)) {
      root = root.shadowRoot;
    }
    return Array.from(root.querySelectorAll(selector));
  }
  function first(selector, root = document) {
    if (isWebComponent(root)) {
      root = root.shadowRoot;
    }
    if (!selector.includes("/")) {
      return root.querySelector(selector);
    }
    const path = selector.split("/").map((p) => p.trim()).filter((p) => p.length > 0);
    for (const p of path) {
      root = nextChild(p, root);
      if (root === null)
        break;
    }
    return root;
  }
  function nextChild(pathItem, root) {
    const isShadowRoot = pathItem === "shadowRoot" || pathItem === "shadow-root";
    return isShadowRoot ? root.shadowRoot : root.querySelector(pathItem);
  }
  function isWebComponent(el) {
    return el && el.shadowRoot && el.tagName.includes("-");
  }
  function getAttributes(el) {
    const result = {};
    const atts = el.attributes;
    if (!atts || atts.length === 0)
      return result;
    for (let i = 0; i < atts.length; i++) {
      const a = atts[i];
      result[a.name] = a.value;
    }
    return result;
  }
  function createElements(html = "") {
    html = html.trim();
    if (!html)
      return [];
    const temp = document.createElement("template");
    temp.innerHTML = html;
    return Array.from(temp.content.childNodes);
  }
  function createElement(name, attributes = {}, content = "") {
    const html = tag(name, attributes, content);
    const elements = createElements(html);
    if (elements.length === 0)
      return null;
    return elements[0];
  }
  function tag(name, attributes = {}, content = "") {
    if (!name)
      return "";
    const atts = attsToString(attributes);
    return `<${name}${atts}>${content}</${name}>`;
  }
  function attsToString(attributes) {
    const array = [];
    forEachEntry(attributes, (k, v) => {
      array.push(`${k}="${v}"`);
    });
    const sep = array.length > 0 ? " " : "";
    return sep + array.join(" ");
  }
  var LOCATIONS = new Set(["beforebegin", "afterbegin", "beforeend", "afterend"]);
  function add(target, tobeAdded, location = "beforeend") {
    location = location.toLowerCase();
    if (!LOCATIONS.has(location))
      return false;
    if (isString(tobeAdded)) {
      target.insertAdjacentHTML(location, tobeAdded);
    } else {
      addElements(target, tobeAdded, location);
    }
    return true;
  }
  function addElements(target, tobeAdded, location) {
    if (Array.isArray(tobeAdded)) {
      tobeAdded.forEach((el) => target.insertAdjacentElement(location, el));
    } else {
      target.insertAdjacentElement(location, tobeAdded);
    }
  }
  function setContent(element, ...content) {
    element.innerHTML = "";
    element.append(...content);
  }
  function removeElements(selector, root = document) {
    const elements = all(selector, root);
    elements.forEach((el) => {
      el.parentNode.removeChild(el);
    });
  }
  function classPresentIf(el, cssClass, condition) {
    if (!el)
      return;
    const func = condition ? "add" : "remove";
    el.classList[func](cssClass);
  }

  // src/utils/Stringer.js
  var Stringer_exports = {};
  __export(Stringer_exports, {
    endsWith: () => endsWith,
    indexOf: () => indexOf,
    indexOfFirstMatch: () => indexOfFirstMatch,
    indexOfLastMatch: () => indexOfLastMatch,
    isEmpty: () => isEmpty,
    removePrefix: () => removePrefix,
    removeSuffix: () => removeSuffix,
    removeSurrounding: () => removeSurrounding,
    replaceTemplate: () => replaceTemplate,
    startsWith: () => startsWith,
    substringAfter: () => substringAfter,
    substringBefore: () => substringBefore,
    trim: () => trim
  });
  function indexOf(st, search, fromIndex = 0, ignoreCase = false) {
    if (!st)
      return -1;
    if (ignoreCase) {
      return st.toLowerCase().indexOf(search.toLowerCase(), fromIndex);
    }
    return st.indexOf(search, fromIndex);
  }
  function indexOfFirstMatch(st, callback) {
    if (!callback || !st)
      return -1;
    return st.split("").findIndex(callback);
  }
  function indexOfLastMatch(st, callback) {
    if (!callback || !st)
      return -1;
    const chars = st.split("");
    for (let i = chars.length; i >= 0; --i) {
      if (callback(chars[i], i))
        return i;
    }
    return -1;
  }
  function startsWith(st = "", search = void 0, ignoreCase = false) {
    if (ignoreCase) {
      const start = st.substring(0, search.length).toLowerCase();
      return search.toLowerCase() === start;
    }
    return st.startsWith(search);
  }
  function endsWith(st, search, ignoreCase = false) {
    if (ignoreCase) {
      return st.toLowerCase().endsWith(search.toLowerCase());
    }
    return st.endsWith(search);
  }
  function removePrefix(st, prefix, ignoreCase = false) {
    if (startsWith(st, prefix, ignoreCase)) {
      st = st.substring(prefix.length);
    }
    return st;
  }
  function removeSuffix(st, suffix, ignoreCase = false) {
    if (endsWith(st, suffix, ignoreCase)) {
      st = st.substring(0, st.length - suffix.length);
    }
    return st;
  }
  function removeSurrounding(st, prefix, suffix, ignoreCase = false) {
    return removeSuffix(removePrefix(st, prefix, ignoreCase), suffix, ignoreCase);
  }
  function substringAfter(st, search, ignoreCase = false) {
    if (!search) {
      return st;
    }
    const i = indexOf(st, search, 0, ignoreCase);
    if (i < 0)
      return "";
    return st.substring(i + search.length);
  }
  function substringBefore(st, search, ignoreCase = false) {
    if (!search) {
      return "";
    }
    const i = indexOf(st, search, 0, ignoreCase);
    if (i < 0)
      return st;
    return st.substring(0, i);
  }
  function trim(s) {
    if (isEmpty(s))
      return "";
    if (!isString(s)) {
      s = String(s);
    }
    return s.trim(s);
  }
  function isEmpty(s) {
    return s === void 0 || s === null || s === "";
  }
  function replaceTemplate(text = "", values = {}, preTag = "${", postTag = "}") {
    forEachEntry(values, (k, v) => {
      if (v !== void 0) {
        k = preTag + k + postTag;
        text = text.replaceAll(k, v);
      }
    });
    return text;
  }
  return Helper_exports;
})();
