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
  const links=[...document.querySelectorAll(".knowledge-reader aside nav a")];
  const sections=links.map(link=>document.querySelector(link.getAttribute("href"))).filter(Boolean);
  if("IntersectionObserver" in window){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      links.forEach(link=>link.classList.toggle("active",link.getAttribute("href")==="#"+entry.target.id));
    }),{rootMargin:"-18% 0px -70%",threshold:0});
    sections.forEach(section=>observer.observe(section));
  }
})();
