import{a as m,S as g,i as a}from"./assets/vendor-67BWzQEt.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const h="https://pixabay.com/api/",y="51298841-cc5bd03add2d04ff440a90847";function L(s){const r={key:y,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:99};return m.get(h,{params:r}).then(o=>o.data)}const l=document.querySelector(".gallery"),u=document.querySelector(".loader"),b=new g(".gallery a",{captionsData:"alt",captionDelay:250});function v(s){const r=s.map(({webformatURL:o,largeImageURL:n,tags:e,likes:t,views:i,comments:f,downloads:d})=>`
        <li class="gallery-item">
          <a href="${n}" class="gallery-link">
            <img src="${o}" alt="${e}" class="gallery-image"/>
          
          <div class="info">
            <p><span>Likes</span> ${t}</p>
            <p><span>Views</span> ${i}</p>
            <p><span>Comments</span> ${f}</p>
            <p><span>Downloads</span> ${d}</p>
          </div>
          </a>
        </li>`).join("");l.insertAdjacentHTML("beforeend",r),b.refresh()}function S(){l.innerHTML=""}function q(){u.classList.add("is-visible")}function c(){u.classList.remove("is-visible")}const p=document.querySelector(".form"),w=p.querySelector('input[name="search-text"]');p.addEventListener("submit",function(s){s.preventDefault();const r=w.value.trim();if(!r){a.error({title:"Error",message:"Please enter a search query!",position:"topRight"});return}q(),S(),setTimeout(()=>{L(r).then(o=>{if(c(),o.hits.length===0){a.error({title:"Oops",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}v(o.hits)}).catch(o=>{c(),a.error({title:"Error",message:"Something went wrong while fetching images.",position:"topRight"})})},2500)});
//# sourceMappingURL=index.js.map
