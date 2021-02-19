// Halper.js Common ES/JS utility library
// https://github.com/ahabra/js-helper
// Copyright 2021 (C) Abdul Habra. Version 0.0.1.
// Apache License Version 2.0


var jshelper = (() => {
  // src/utils/DomUtils.js
  function select(selector, root) {
    root = root || document;
    return Array.from(root.querySelectorAll(":scope " + selector));
  }

  // src/helper.js
  var time = new Date().toLocaleString();
  select("#content")[0].innerHTML = `The time now is ${time}`;
})();
