import{i as a,A as n}from"./index-84035929.js";const o=document.querySelector(".scrollup__btn"),i=function(){window.scrollY<300?o.classList.add("visually-hidden"):o.classList.remove("visually-hidden")};window.addEventListener("scroll",i);o.addEventListener("click",l);function l(){window.scrollTo({top:0,behavior:"smooth"})}const e={form:document.querySelector(".footer__form"),emailInput:document.querySelector(".footer__form__input"),message:document.querySelector(".footer__form__message"),btn:document.querySelector(".footer__form__btn")};e.form.addEventListener("submit",m);async function m(s){s.preventDefault();const r=s.target.elements.email.value.trim().toLowerCase();if(a(r))try{const t=new n;t.email=r,await t.subscribe(),e.message.textContent="✅ Thank you for you subscription",e.message.classList.remove("full_hidden","footer__form__message_waring"),e.message.classList.add("footer__form__message_ok"),console.log("ok"),s.target.reset()}catch{e.message.textContent="⚠️ This email address was previously added",e.message.classList.remove("full_hidden","footer__form__message_ok"),e.message.classList.add("footer__form__message_warning")}else e.message.textContent="⚠️ Your email has wrong format",e.message.classList.remove("full_hidden","footer__form__message_ok"),e.message.classList.add("footer__form__message_warning")}e.emailInput.addEventListener("input",d);function d(s){s.target.value.trim()?e.btn.disabled=!1:e.btn.disabled=!0}e.emailInput.addEventListener("focus",c);function c(){e.message.classList.add("full_hidden")}
