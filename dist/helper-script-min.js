// Halper.js Common ES/JS utility library
// https://github.com/ahabra/js-helper
// Copyright 2021 (C) Abdul Habra. Version 0.1.2.
// Apache License Version 2.0


var jshelper=(()=>{var C=Object.defineProperty;var f=(e,t)=>{for(var n in t)C(e,n,{get:t[n],enumerable:!0})};var ne={};f(ne,{Domer:()=>c,Objecter:()=>s,Stringer:()=>l});var c={};f(c,{add:()=>K,all:()=>O,classPresentIf:()=>V,createElement:()=>I,createElements:()=>E,first:()=>P,getAttributes:()=>B,id:()=>F,removeElements:()=>U,setContent:()=>Q,tag:()=>S});var s={};f(s,{equals:()=>h,forEachEntry:()=>u,has:()=>R,isDate:()=>p,isFunction:()=>q,isNil:()=>A,isString:()=>o});function A(e){return e==null}function o(e){return a(e,"String")}function q(e){return a(e,"Function")}function p(e){return a(e,"Date")}function a(e,t){return Object.prototype.toString.call(e)===`[object ${t}]`}function u(e,t){if(!(!e||!t)){if(Array.isArray(e)){e.forEach((n,r)=>{t(r,n)});return}Object.entries(e).forEach(n=>t(n[0],n[1]))}}function R(e,t){return!e||!t?!1:Object.prototype.hasOwnProperty.call(e,t)}function h(e,t){return e===t?!0:e===void 0||t===void 0?!1:$(e,t)}function $(e,t){return x(e)||x(t)?e===t:v(e,t)}var W=new Set(["boolean","number","bigint","string","symbol"]);function x(e){return W.has(typeof e)}function v(e,t){return D(e,t)?M(e,t)?!0:N(e,t):!1}function D(e,t){return y(e)===y(t)}function y(e){return Object.prototype.toString.call(e)}function M(e,t){return p(e)&&p(t)?e.getTime()===t.getTime():!1}function N(e,t){let n=Object.keys(e);return n.length!==Object.keys(t).length?!1:n.every(r=>h(e[r],t[r]))}function F(e,t=document){return d(t)&&(t=t.shadowRoot),t.getElementById(e)}function O(e,t=document){return d(t)&&(t=t.shadowRoot),Array.from(t.querySelectorAll(e))}function P(e,t=document){if(d(t)&&(t=t.shadowRoot),!e.includes("/"))return t.querySelector(e);let n=e.split("/").map(r=>r.trim()).filter(r=>r.length>0);for(let r of n)if(t=H(r,t),t===null)break;return t}function H(e,t){return e==="shadowRoot"||e==="shadow-root"?t.shadowRoot:t.querySelector(e)}function d(e){return e&&e.shadowRoot&&e.tagName.includes("-")}function B(e){let t={},n=e.attributes;if(!n||n.length===0)return t;for(let r=0;r<n.length;r++){let i=n[r];t[i.name]=i.value}return t}function E(e=""){if(e=e.trim(),!e)return[];let t=document.createElement("template");return t.innerHTML=e,Array.from(t.content.childNodes)}function I(e,t={},n=""){let r=S(e,t,n),i=E(r);return i.length===0?null:i[0]}function S(e,t={},n=""){if(!e)return"";let r=z(t);return`<${e}${r}>${n}</${e}>`}function z(e){let t=[];return u(e,(r,i)=>{t.push(`${r}="${i}"`)}),(t.length>0?" ":"")+t.join(" ")}var G=new Set(["beforebegin","afterbegin","beforeend","afterend"]);function K(e,t,n="beforeend"){return n=n.toLowerCase(),G.has(n)?(o(t)?e.insertAdjacentHTML(n,t):J(e,t,n),!0):!1}function J(e,t,n){Array.isArray(t)?t.forEach(r=>e.insertAdjacentElement(n,r)):e.insertAdjacentElement(n,t)}function Q(e,...t){e.innerHTML="",e.append(...t)}function U(e,t=document){O(e,t).forEach(r=>{r.parentNode.removeChild(r)})}function V(e,t,n){if(!e)return;let r=n?"add":"remove";e.classList[r](t)}var l={};f(l,{endsWith:()=>w,indexOf:()=>m,indexOfFirstMatch:()=>X,indexOfLastMatch:()=>Y,isEmpty:()=>L,removePrefix:()=>j,removeSuffix:()=>T,removeSurrounding:()=>Z,replaceTemplate:()=>te,startsWith:()=>b,substringAfter:()=>_,substringBefore:()=>k,trim:()=>ee});function m(e,t,n=0,r=!1){return e?r?e.toLowerCase().indexOf(t.toLowerCase(),n):e.indexOf(t,n):-1}function X(e,t){return!t||!e?-1:e.split("").findIndex(t)}function Y(e,t){if(!t||!e)return-1;let n=e.split("");for(let r=n.length;r>=0;--r)if(t(n[r],r))return r;return-1}function b(e="",t=void 0,n=!1){if(n){let r=e.substring(0,t.length).toLowerCase();return t.toLowerCase()===r}return e.startsWith(t)}function w(e,t,n=!1){return n?e.toLowerCase().endsWith(t.toLowerCase()):e.endsWith(t)}function j(e,t,n=!1){return b(e,t,n)&&(e=e.substring(t.length)),e}function T(e,t,n=!1){return w(e,t,n)&&(e=e.substring(0,e.length-t.length)),e}function Z(e,t,n,r=!1){return T(j(e,t,r),n,r)}function _(e,t,n=!1){if(!t)return e;let r=m(e,t,0,n);return r<0?"":e.substring(r+t.length)}function k(e,t,n=!1){if(!t)return"";let r=m(e,t,0,n);return r<0?e:e.substring(0,r)}function ee(e){return L(e)?"":(o(e)||(e=String(e)),e.trim(e))}function L(e){return e==null||e===""}function te(e="",t={},n="${",r="}"){return u(t,(i,g)=>{g!==void 0&&(i=n+i+r,e=e.replaceAll(i,g))}),e}return ne;})();
