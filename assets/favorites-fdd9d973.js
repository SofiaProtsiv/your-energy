import"./index-c69cab50.js";import{d as c,s as i}from"./store-ce78867f.js";const s=document.querySelector(".header__nav-authorized"),t=document.querySelector(".header__nav__item.auth"),e=document.querySelector(".header__logout_btn"),o=async()=>{await c.auth().onAuthStateChanged(a=>{a?(console.log("check"),t.classList.add("hidden"),s.classList.add("visible"),e.classList.add("visible")):(console.log("check"),t.classList.remove("hidden"),e.classList.remove("visible"),s.classList.remove("visible"))})},n=async()=>{await i(),e.classList.add("hidden"),window.location.replace("/")};e.addEventListener("click",n);o();
