import"./index-a55b2bd8.js";import{p as c,c as i,d as n,s as o}from"./card-holder-7f953333.js";c.endPoint=1;i();const s=document.querySelector(".header__nav-authorized"),t=document.querySelector(".header__nav__item.auth"),e=document.querySelector(".header__logout_btn"),d=async()=>{await n.auth().onAuthStateChanged(a=>{a?(console.log("check"),t.classList.add("hidden"),s.classList.add("visible"),e.classList.add("visible")):(console.log("check"),t.classList.remove("hidden"),e.classList.remove("visible"),s.classList.remove("visible"))})},l=async()=>{await o(),e.classList.add("hidden"),window.location.replace("/")};e.addEventListener("click",l);d();
