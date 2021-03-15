// Halper.js Common ES/JS utility library
// https://github.com/ahabra/js-helper
// Copyright 2021 (C) Abdul Habra. Version 0.3.0.
// Apache License Version 2.0


var jshelper=(()=>{var R=Object.defineProperty;var f=(e,r)=>{for(var t in r)R(e,t,{get:r[t],enumerable:!0})};var ce={};f(ce,{Domer:()=>l,LineCompare:()=>g,Objecter:()=>c,Stringer:()=>p});var l={};f(l,{add:()=>Z,all:()=>w,classPresentIf:()=>ee,createElement:()=>U,createElements:()=>L,first:()=>K,getAttributes:()=>Q,id:()=>G,removeElements:()=>k,setContent:()=>_,tag:()=>j});var c={};f(c,{equals:()=>S,forEachEntry:()=>s,has:()=>F,isDate:()=>d,isFunction:()=>W,isInteger:()=>D,isNil:()=>v,isNumber:()=>b,isString:()=>o});function v(e){return e==null}function o(e){return a(e,"String")}function W(e){return a(e,"Function")}function d(e){return a(e,"Date")}function b(e){return a(e,"Number")?Number.isNaN(e)?!1:Number.isFinite(e):!o(e)||(e=e.trim(),e==="")?!1:!isNaN(e)}function D(e){return b(e)?Number.isInteger(Number.parseFloat(e)):!1}function a(e,r){return Object.prototype.toString.call(e)===`[object ${r}]`}function s(e,r){if(!(!e||!r)){if(Array.isArray(e)){e.forEach((t,n)=>{r(n,t)});return}Object.entries(e).forEach(t=>r(t[0],t[1]))}}function F(e,r){return!e||!r?!1:Object.prototype.hasOwnProperty.call(e,r)}function S(e,r){return e===r?!0:e===void 0||r===void 0?!1:M(e,r)}function M(e,r){return O(e)||O(r)?e===r:H(e,r)}var I=new Set(["boolean","number","bigint","string","symbol"]);function O(e){return I.has(typeof e)}function H(e,r){return P(e,r)?B(e,r)?!0:z(e,r):!1}function P(e,r){return E(e)===E(r)}function E(e){return Object.prototype.toString.call(e)}function B(e,r){return d(e)&&d(r)?e.getTime()===r.getTime():!1}function z(e,r){let t=Object.keys(e);return t.length!==Object.keys(r).length?!1:t.every(n=>S(e[n],r[n]))}function G(e,r=document){return h(r)&&(r=r.shadowRoot),r.getElementById(e)}function w(e,r=document){return h(r)&&(r=r.shadowRoot),Array.from(r.querySelectorAll(e))}function K(e,r=document){if(h(r)&&(r=r.shadowRoot),!e.includes("/"))return r.querySelector(e);let t=e.split("/").map(n=>n.trim()).filter(n=>n.length>0);for(let n of t)if(r=J(n,r),r===null)break;return r}function J(e,r){return e==="shadowRoot"||e==="shadow-root"?r.shadowRoot:r.querySelector(e)}function h(e){return e&&e.shadowRoot&&e.tagName.includes("-")}function Q(e){let r={},t=e.attributes;if(!t||t.length===0)return r;for(let n=0;n<t.length;n++){let i=t[n];r[i.name]=i.value}return r}function L(e=""){if(e=e.trim(),!e)return[];let r=document.createElement("template");return r.innerHTML=e,Array.from(r.content.childNodes)}function U(e,r={},t=""){let n=j(e,r,t),i=L(n);return i.length===0?null:i[0]}function j(e,r={},t=""){if(!e)return"";let n=V(r);return`<${e}${n}>${t}</${e}>`}function V(e){let r=[];return s(e,(n,i)=>{r.push(`${n}="${i}"`)}),(r.length>0?" ":"")+r.join(" ")}var X=new Set(["beforebegin","afterbegin","beforeend","afterend"]);function Z(e,r,t="beforeend"){return t=t.toLowerCase(),X.has(t)?(o(r)?e.insertAdjacentHTML(t,r):Y(e,r,t),!0):!1}function Y(e,r,t){Array.isArray(r)?r.forEach(n=>e.insertAdjacentElement(t,n)):e.insertAdjacentElement(t,r)}function _(e,...r){e.innerHTML="",e.append(...r)}function k(e,r=document){w(e,r).forEach(n=>{n.parentNode.removeChild(n)})}function ee(e,r,t){if(!e)return;let n=t?"add":"remove";e.classList[n](r)}var p={};f(p,{endsWith:()=>T,indexOf:()=>x,indexOfFirstMatch:()=>re,indexOfLastMatch:()=>te,isEmpty:()=>A,removePrefix:()=>N,removeSuffix:()=>$,removeSurrounding:()=>ne,replaceTemplate:()=>oe,startsWith:()=>C,substringAfter:()=>ie,substringBefore:()=>ue,trim:()=>m});function x(e,r,t=0,n=!1){return e?n?e.toLowerCase().indexOf(r.toLowerCase(),t):e.indexOf(r,t):-1}function re(e,r){return!r||!e?-1:e.split("").findIndex(r)}function te(e,r){if(!r||!e)return-1;let t=e.split("");for(let n=t.length;n>=0;--n)if(r(t[n],n))return n;return-1}function C(e="",r=void 0,t=!1){if(t){let n=e.substring(0,r.length).toLowerCase();return r.toLowerCase()===n}return e.startsWith(r)}function T(e,r,t=!1){return t?e.toLowerCase().endsWith(r.toLowerCase()):e.endsWith(r)}function N(e,r,t=!1){return C(e,r,t)&&(e=e.substring(r.length)),e}function $(e,r,t=!1){return T(e,r,t)&&(e=e.substring(0,e.length-r.length)),e}function ne(e,r,t,n=!1){return $(N(e,r,n),t,n)}function ie(e,r,t=!1){if(!r)return e;let n=x(e,r,0,t);return n<0?"":e.substring(n+r.length)}function ue(e,r,t=!1){if(!r)return"";let n=x(e,r,0,t);return n<0?e:e.substring(0,n)}function m(e){return A(e)?"":(o(e)||(e=String(e)),e.trim(e))}function A(e){return e==null||e===""}function oe(e="",r={},t="${",n="}"){return s(r,(i,u)=>{u!==void 0&&(i=t+i+n,e=e.replaceAll(i,u))}),e}var g={};f(g,{compareLines:()=>se});function se(e,r,{trim:t=!0,skipEmpty:n=!0,caseSensitive:i=!0}={trim:!0,skipEmpty:!0,caseSensitive:!0}){if(e=q(e,{trim:t,skipEmpty:n}),r=q(r,{trim:t,skipEmpty:n}),e.length!==r.length)return`t1 has ${e.length} lines(s) while t2 has ${r.length} line(s).`;for(let u=0;u<e.length;u++){let y=fe(e[u],r[u],u,i);if(y.length>0)return y}return""}function fe(e,r,t,n){let i=n?e:e.toLowerCase(),u=n?r:r.toLowerCase();return i!==u?`Line #${t+1} mismatch.
${e}
${r}`:""}function q(e,{trim:r,skipEmpty:t}){return r&&(e=m(e)),e=e.split(`
`),r&&(e=e.map(n=>m(n))),t&&(e=e.filter(n=>!!n)),e}return ce;})();
