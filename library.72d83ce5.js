var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},a=e.parcelRequired7c6;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in n){var a=n[e];delete n[e];var i={id:e,exports:{}};return t[e]=i,a.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){n[e]=t},e.parcelRequired7c6=a);var i=a("2shzp"),r=a("d2gfz"),o=a("aBKb3");const l=document.querySelector(".my-library-list"),c=document.querySelector("button.btn-watched"),s=document.querySelector("button.btn-queue"),d=document.querySelector(".nav-library"),u=document.querySelector(".btn-watched"),p=document.querySelector(".btn-queue");c.addEventListener("click",(function(){m?(u.classList.add("btn-library-current"),p.classList.remove("btn-library-current"),b(o.allMoviesWatched,m,"watched")):(0,r.onToggleModal)()})),s.addEventListener("click",(function(){m?(u.classList.remove("btn-library-current"),p.classList.add("btn-library-current"),b(o.allMoviesQueue,m,"queque")):(0,r.onToggleModal)()}));const m=JSON.parse(localStorage.getItem("user-id"));if(m)u.classList.add("btn-library-current"),b(o.allMoviesWatched,m,"watched");else{let e=document.createElement("p");e.className="notification-update-movie",e.innerHTML="To create your collections of movies you have to log in on Home page",d.append(e),setTimeout((()=>e.remove()),6e3),l.innerHTML="";const t='<li class="library-photo-item"><div class="library-photo"></div></li>';l.insertAdjacentHTML("beforeend",t)}async function b(e,t,n){const a=(await e(t).then((e=>e)).catch((e=>console.log(e)))).slice(1);if(l.innerHTML="",0===a.length){l.innerHTML="";const e=`<li class="library-photo-item"><div class="library-${n}-photo"></div></li>`;l.insertAdjacentHTML("beforeend",e)}a.map((async e=>{const t=await i.default.get(`https://api.themoviedb.org/3/movie/${e}?api_key=1234dced32e7dcd076b4111d81f37c06`);var n;n=t.data,l.insertAdjacentHTML("beforeend",function({original_title:e,poster_path:t,vote_average:n,id:a,release_date:i,genres:r}){const o=[];return r.forEach((e=>{o.push(e.name)})),`\n    <li class="card-item" >\n      <div class="card-item__img">\n      <img src="${t?`https://image.tmdb.org/t/p/w500${t}`:"./images/no_image.jpg"}"  alt="${e}" data-id="${a}" loading="lazy">\n      </div>\n      <h3 class="card-item__title">${e}</h3>\n      <p class="card-item__info">\n        <span>${o.slice(0,2).map((e=>e)).join(", ")}${o.length?o.length>2?", Other":"":"No genre"} </span> <span>${i.slice(0,4)}</span>\n        <span class="card-item__vote"> ${n?n.toFixed(1):"0"}</span>\n      </p>\n    </li>`}(n))}))}a("fQE3M"),a("9IiBV"),a("7bYU0"),a("d2gfz"),a("f6r1C"),a("2UdcX"),a("5QuUA"),a("8UPEU"),a("2nhTy");
//# sourceMappingURL=library.72d83ce5.js.map