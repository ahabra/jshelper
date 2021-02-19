// Halper.js Common ES/JS utility library
// https://github.com/ahabra/js-helper
// Copyright 2021 (C) Abdul Habra. Version 0.0.1.
// Apache License Version 2.0


var jshelper=(()=>{function e(n,t){return t=t||document,Array.from(t.querySelectorAll(":scope "+n))}var r=new Date().toLocaleString();e("#content")[0].innerHTML=`The time now is ${r}`;})();
