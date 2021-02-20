// Halper.js Common ES/JS utility library
// https://github.com/ahabra/js-helper
// Copyright 2021 (C) Abdul Habra. Version 0.0.1.
// Apache License Version 2.0


var jshelper=(()=>{var A=Object.defineProperty;var f=(e,t)=>{for(var n in t)A(e,n,{get:t[n],enumerable:!0})};var re={};f(re,{default:()=>C});var a={};f(a,{add:()=>Q,all:()=>O,classPresentIf:()=>X,createElement:()=>z,createElements:()=>E,first:()=>B,getAttributes:()=>I,id:()=>H,removeElements:()=>V,setContent:()=>U,tag:()=>S});var s={};f(s,{equals:()=>h,forEachEntry:()=>u,has:()=>$,isDate:()=>l,isFunction:()=>R,isNil:()=>q,isString:()=>o});function q(e){return e==null}function o(e){return c(e,"String")}function R(e){return c(e,"Function")}function l(e){return c(e,"Date")}function c(e,t){return Object.prototype.toString.call(e)===`[object ${t}]`}function u(e,t){if(!(!e||!t)){if(Array.isArray(e)){e.forEach((n,r)=>{t(r,n)});return}Object.entries(e).forEach(n=>t(n[0],n[1]))}}function $(e,t){return!e||!t?!1:Object.prototype.hasOwnProperty.call(e,t)}function h(e,t){return e===t?!0:e===void 0||t===void 0?!1:v(e,t)}function v(e,t){return x(e)||x(t)?e===t:W(e,t)}var D=new Set(["boolean","number","bigint","string","symbol"]);function x(e){return D.has(typeof e)}function W(e,t){return M(e,t)?N(e,t)?!0:F(e,t):!1}function M(e,t){return y(e)===y(t)}function y(e){return Object.prototype.toString.call(e)}function N(e,t){return l(e)&&l(t)?e.getTime()===t.getTime():!1}function F(e,t){let n=Object.keys(e);return n.length!==Object.keys(t).length?!1:n.every(r=>h(e[r],t[r]))}function H(e,t=document){return p(t)&&(t=t.shadowRoot),t.getElementById(e)}function O(e,t=document){return p(t)&&(t=t.shadowRoot),Array.from(t.querySelectorAll(e))}function B(e,t=document){if(p(t)&&(t=t.shadowRoot),!e.includes("/"))return t.querySelector(e);let n=e.split("/").map(r=>r.trim()).filter(r=>r.length>0);for(let r of n)if(t=P(r,t),t===null)break;return t}function P(e,t){return e==="shadowRoot"||e==="shadow-root"?t.shadowRoot:t.querySelector(e)}function p(e){return e&&e.shadowRoot&&e.tagName.includes("-")}function I(e){let t={},n=e.attributes;if(!n||n.length===0)return t;for(let r=0;r<n.length;r++){let i=n[r];t[i.name]=i.value}return t}function E(e=""){if(e=e.trim(),!e)return[];let t=document.createElement("template");return t.innerHTML=e,Array.from(t.content.childNodes)}function z({name:e,attributes:t={},content:n=""}={}){let r=S({name:e,attributes:t,content:n}),i=E(r);return i.length===0?null:i[0]}function S({name:e,attributes:t={},content:n=""}={}){if(!e)return"";let r=G(t);return`<${e}${r}>${n}</${e}>`}function G(e){let t=[];return u(e,(r,i)=>{t.push(`${r}="${i}"`)}),(t.length>0?" ":"")+t.join(" ")}var J=new Set(["beforebegin","afterbegin","beforeend","afterend"]);function Q(e,t,n="beforeend"){return n=n.toLowerCase(),J.has(n)?(o(t)?e.insertAdjacentHTML(n,t):K(e,t,n),!0):!1}function K(e,t,n){Array.isArray(t)?t.forEach(r=>e.insertAdjacentElement(n,r)):e.insertAdjacentElement(n,t)}function U(e,t){e.innerHTML="",e.append(t)}function V(e,t=document){O(e,t).forEach(r=>{r.parentNode.removeChild(r)})}function X(e,t,n){let r=n?"add":"remove";e.classList[r](t)}var d={};f(d,{endsWith:()=>w,indexOf:()=>m,indexOfFirstMatch:()=>Y,indexOfLastMatch:()=>Z,isEmpty:()=>L,removePrefix:()=>j,removeSuffix:()=>T,removeSurrounding:()=>_,replaceTemplate:()=>ne,startsWith:()=>b,substringAfter:()=>k,substringBefore:()=>ee,trim:()=>te});function m(e,t,n=0,r=!1){return e?r?e.toLowerCase().indexOf(t.toLowerCase(),n):e.indexOf(t,n):-1}function Y(e,t){return!t||!e?-1:e.split("").findIndex(t)}function Z(e,t){if(!t||!e)return-1;let n=e.split("");for(let r=n.length;r>=0;--r)if(t(n[r],r))return r;return-1}function b(e="",t=void 0,n=!1){if(n){let r=e.substring(0,t.length).toLowerCase();return t.toLowerCase()===r}return e.startsWith(t)}function w(e,t,n=!1){return n?e.toLowerCase().endsWith(t.toLowerCase()):e.endsWith(t)}function j(e,t,n=!1){return b(e,t,n)&&(e=e.substring(t.length)),e}function T(e,t,n=!1){return w(e,t,n)&&(e=e.substring(0,e.length-t.length)),e}function _(e,t,n,r=!1){return T(j(e,t,r),n,r)}function k(e,t,n=!1){if(!t)return e;let r=m(e,t,0,n);return r<0?"":e.substring(r+t.length)}function ee(e,t,n=!1){if(!t)return"";let r=m(e,t,0,n);return r<0?e:e.substring(0,r)}function te(e){return L(e)?"":(o(e)||(e=String(e)),e.trim(e))}function L(e){return e==null||e===""}function ne(e="",t={},n="${",r="}"){return u(t,(i,g)=>{g!==void 0&&(i=n+i+r,e=e.replaceAll(i,g))}),e}var C={Domer:a,Objecter:s,Stringer:d};return re;})();
