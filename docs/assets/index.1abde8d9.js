var S=Object.defineProperty,T=Object.defineProperties;var k=Object.getOwnPropertyDescriptors;var d=Object.getOwnPropertySymbols;var g=Object.prototype.hasOwnProperty,y=Object.prototype.propertyIsEnumerable;var x=(e,t,r)=>t in e?S(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,f=(e,t)=>{for(var r in t||(t={}))g.call(t,r)&&x(e,r,t[r]);if(d)for(var r of d(t))y.call(t,r)&&x(e,r,t[r]);return e},v=(e,t)=>T(e,k(t));var N=(e,t)=>{var r={};for(var a in e)g.call(e,a)&&t.indexOf(a)<0&&(r[a]=e[a]);if(e!=null&&d)for(var a of d(e))t.indexOf(a)<0&&y.call(e,a)&&(r[a]=e[a]);return r};import{j as m,v as b,r as i,u as H,a as L,R,S as $,d as C,b as w,H as A,c as E,e as O}from"./vendor.b2c50f6f.js";const F=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function r(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerpolicy&&(s.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?s.credentials="include":n.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(n){if(n.ep)return;n.ep=!0;const s=r(n);fetch(n.href,s)}};F();const o=m.exports.jsx,u=m.exports.jsxs,M=m.exports.Fragment,D={file:"fas fa-file",dir:"fas fa-folder"},j=({data:e=[],root:t=null})=>o("div",{className:"treeContainer",children:o("ul",{className:`treeList ${t!==null&&"root"}`,children:e.map(r=>o(P,{node:r},b()))})}),P=({node:e})=>{const[t,r]=i.exports.useState(!1),a=!!e.children,n=H(),s=c=>{e.type==="file"&&n(e.path)};return o("li",{className:"treeNode",children:u("div",{children:[u("div",{className:"toggle",onClick:c=>r(l=>!l),children:[a&&o("div",{className:`nodesToggle ${t?"active":""}`,children:o("i",{className:"fas fa-caret-right"})}),u("div",{className:`treeHead ${e.type}`,onClick:s,children:[o("i",{className:`${D[e.type]}`}),e.label]})]}),a&&t&&o(j,{data:e.children})]})},b())},_=()=>{const[e,t]=i.exports.useState([]);return i.exports.useEffect(async()=>{const r=await fetch("/this_is_it/structure.json").then(a=>a.json());r&&t(r)},[]),o("div",{className:"menuHolder",children:o("div",{className:"treeHolder",children:o(j,{data:e,root:!0})})})};function q(){const[e,t]=i.exports.useState(""),r=L().pathname;return i.exports.useEffect(async()=>{const a=await fetch(`/docs/${r}.md`).then(s=>s.text());if(!a){t("# Not Found :/");return}t(a),document.querySelectorAll("a").forEach(s=>{s.href.includes(".md")||s.setAttribute("target","_blank"),s.href=s.href.replace(".md","")})},[]),u(M,{children:[o(_,{}),o(R,{className:"mdContent",children:e,components:{code(I){var h=I,{node:a,inline:n,className:s,children:c}=h,l=N(h,["node","inline","className","children"]);const p=/language-(\w+)/.exec(s||"");return!n&&p?o($,f({children:String(c).replace(/\n$/,""),style:C,language:p[1],PreTag:"div",customStyle:{padding:"0",background:"#0a0a0a66 !important"}},l)):o("code",v(f({className:s},l),{children:c}))}}})]})}w.render(o(A,{children:o(E,{children:o(O,{path:"/*",element:o(q,{})})})}),document.getElementById("root"));
