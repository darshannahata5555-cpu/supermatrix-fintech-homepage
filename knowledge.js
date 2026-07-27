(() => {
  const input=document.getElementById("knowledge-search");
  const cards=[...document.querySelectorAll(".knowledge-card")];
  const empty=document.querySelector(".knowledge-no-results");
  input?.addEventListener("input",()=>{
    const query=input.value.trim().toLowerCase();
    let visible=0;
    cards.forEach(card=>{const show=!query||card.textContent.toLowerCase().includes(query);card.hidden=!show;if(show)visible++});
    if(empty)empty.hidden=visible!==0;
  });
  const reader=document.querySelector(".knowledge-reader");
  const articles=[...document.querySelectorAll(".knowledge-article")];
  const references=document.querySelector(".knowledge-references");
  const sidebarNav=document.querySelector(".knowledge-reader aside nav");
  sidebarNav?.insertAdjacentHTML("beforeend",'<a href="#sources-references"><span>+</span>Sources &amp; Disclaimer</a>');
  articles.forEach((article,index)=>{
    const previous=articles[index-1],next=articles[index+1];
    const previousLink=previous?`<a href="#${previous.id}"><small>Previous article</small>${previous.querySelector("h2").textContent}</a>`:'<span class="is-empty"></span>';
    const nextLink=next?`<a href="#${next.id}"><small>Next article</small>${next.querySelector("h2").textContent}</a>`:'<a href="#sources-references"><small>Next</small>Sources &amp; Disclaimer</a>';
    article.insertAdjacentHTML("beforeend",`<nav class="knowledge-pagination" aria-label="Article navigation">${previousLink}${nextLink}</nav>`);
  });
  function showSelected(scroll=false){
    const id=decodeURIComponent(location.hash.slice(1));
    const target=articles.find(article=>article.id===id)||(references?.id===id?references:null);
    articles.forEach(article=>article.classList.toggle("active",article===target));
    references?.classList.toggle("active",references===target);
    if(reader)reader.hidden=!target;
    document.querySelectorAll(".knowledge-reader aside nav a").forEach(link=>link.classList.toggle("active",link.getAttribute("href")===location.hash));
    if(target&&scroll)requestAnimationFrame(()=>target.scrollIntoView({behavior:"smooth",block:"start"}));
  }
  window.addEventListener("hashchange",()=>showSelected(true));
  showSelected(false);
})();
