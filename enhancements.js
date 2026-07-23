(() => {
  const path=(location.pathname.split("/").pop()||"index.html").toLowerCase();
  const isHome=path===""||path==="index.html"||path==="supermatrix home.dc.html";

  function addMeta(name,content,property=false){
    if(document.head.querySelector(`meta[${property?"property":"name"}="${name}"]`))return;
    const meta=document.createElement("meta");meta.setAttribute(property?"property":"name",name);meta.content=content;document.head.appendChild(meta);
  }
  addMeta("theme-color","#2c3263");
  addMeta("og:site_name","SuperMatrix",true);
  addMeta("og:title",document.title,true);
  addMeta("og:description",document.querySelector('meta[name="description"]')?.content||"Explore mutual fund solutions, start your SIPs, and build wealth through disciplined investing.",true);

  function setupNavigation(){
    const standard=document.querySelector(".site-nav");
    if(standard&&!standard.querySelector(".sm-menu-button")){
      const button=document.createElement("button");button.className="sm-menu-button";button.type="button";button.setAttribute("aria-label","Open navigation");button.setAttribute("aria-expanded","false");button.innerHTML="&#9776;";
      const links=standard.querySelector(".nav-links");standard.insertBefore(button,links);
      button.addEventListener("click",()=>{const open=links.classList.toggle("sm-open");button.setAttribute("aria-expanded",String(open));button.setAttribute("aria-label",open?"Close navigation":"Open navigation")});
    }
    if(isHome){
      const nav=document.querySelector("header>div");
      const links=nav?.querySelector("nav");
      if(nav&&links&&!nav.querySelector(".sm-menu-button")){
        nav.classList.add("home-nav");links.classList.add("home-links");links.nextElementSibling?.classList.add("home-actions");
        const button=document.createElement("button");button.className="sm-menu-button";button.type="button";button.setAttribute("aria-label","Open navigation");button.setAttribute("aria-expanded","false");button.innerHTML="&#9776;";
        nav.insertBefore(button,links);
        button.addEventListener("click",()=>{const open=links.classList.toggle("sm-open");button.setAttribute("aria-expanded",String(open));button.setAttribute("aria-label",open?"Close navigation":"Open navigation")});
      }
    }
  }

  function addJourney(){
    if(!isHome||document.querySelector(".sm-journey"))return;
    const target=document.getElementById("why");
    if(!target)return;
    target.insertAdjacentHTML("beforebegin",`<section class="sm-journey"><div class="sm-journey-inner"><span class="sm-section-kicker">How SuperMatrix supports you</span><h2>A clear journey from financial goal to ongoing support</h2><p class="sm-journey-intro">Use the tools to understand your numbers, discuss your needs with the team, and receive assistance through the investment journey. Product suitability and risk should be considered before investing.</p><div class="sm-step-grid"><article class="sm-step"><b>1</b><h3>Define the goal</h3><p>Start with the purpose, target amount, investment period, and your comfort with market fluctuations.</p></article><article class="sm-step"><b>2</b><h3>Understand the approach</h3><p>Review suitable product categories, risks, costs, and the difference between Regular and Direct Plans.</p></article><article class="sm-step"><b>3</b><h3>Invest and stay on track</h3><p>Complete the applicable process, monitor progress, and contact the team for service or transaction assistance.</p></article></div></div></section>`);
  }

  function addOngoingSupport(){
    if(!isHome||document.querySelector(".sm-care"))return;
    const target=document.getElementById("knowledge");
    if(!target)return;
    target.insertAdjacentHTML("beforebegin",`<section class="sm-care"><div class="sm-care-inner"><div><span class="sm-section-kicker">Beyond the first investment</span><h2>Support throughout your investment journey</h2><p class="sm-care-intro">SuperMatrix is designed to combine digital convenience with access to human assistance when you need help understanding or completing an investment-related process.</p><a href="#contact" style="display:inline-flex;background:#0e4fa1;color:#fff;padding:13px 20px;border-radius:10px;font-weight:700">Talk to the team</a></div><div class="sm-care-grid"><article class="sm-care-card"><strong>Goal-progress conversations</strong><span>Revisit important goals and changing financial circumstances.</span></article><article class="sm-care-card"><strong>SIP service support</strong><span>Ask for help understanding applicable modification, pause, or cancellation processes.</span></article><article class="sm-care-card"><strong>Statements and reports</strong><span>Get assistance locating available account and transaction documents.</span></article><article class="sm-care-card"><strong>Nomination and account support</strong><span>Understand the applicable documentation and service process.</span></article><article class="sm-care-card"><strong>Market-volatility support</strong><span>Access educational guidance without return promises or market-timing claims.</span></article><article class="sm-care-card"><strong>Redemption assistance</strong><span>Understand timelines, applicable loads, taxation considerations, and next steps.</span></article></div></div></section>`);
  }

  function fixHomepageClaimsAndLinks(){
    if(!isHome)return;
    const badge=document.querySelector("#top h1")?.previousElementSibling;
    if(badge)badge.lastChild.textContent=" AMFI Registered Mutual Fund Distributor";
    const stats=document.querySelector("#top sc-if");if(stats)stats.style.display="none";
    const statsLabel=[...document.querySelectorAll("#top div")].find(el=>el.children.length===0&&el.textContent.trim()==="Assets under advice");
    if(statsLabel?.parentElement?.parentElement)statsLabel.parentElement.parentElement.style.display="none";
    let verifiedArn="";
    try{verifiedArn=JSON.parse(localStorage.getItem("supermatrix_admin_settings_v1")||"null")?.compliance?.arn||""}catch{}
    if(!verifiedArn){
      const arnText=[...document.querySelectorAll("span")].find(el=>el.textContent.includes("ARN: To be updated"));
      if(arnText?.parentElement?.parentElement)arnText.parentElement.parentElement.style.display="none";
    }
    const title=document.querySelector("#top h1");if(title)title.innerHTML='Making Mutual Fund Investing <span style="color:#0E4FA1">Simple</span>';
    const intro=document.querySelector("#top h1 + p");if(intro)intro.textContent="Explore mutual fund solutions, start your SIPs, and build wealth through disciplined investing.";
    const primary=document.querySelector("#top .primary-cta");if(primary){primary.href="#contact";const text=[...primary.childNodes].find(n=>n.nodeType===3&&n.textContent.trim());if(text)text.textContent="Start Investing "}
    const knowledge=document.getElementById("knowledge");
    const knowledgeLinks=knowledge?[...knowledge.querySelectorAll('a[href="#"]')]:[];
    const destinations=["faq.html","product.html?product=elss","calculators.html?calculator=retirement","faq.html"];
    knowledgeLinks.forEach((a,i)=>a.href=destinations[i]||"faq.html");
    document.querySelectorAll("footer a").forEach(a=>{
      const label=a.textContent.trim();
      const map={"Privacy Policy":"privacy.html","Terms":"terms.html","Disclaimer":"disclosures.html","Investor Charter":"investor-charter.html","KYC Information":"kyc.html","Download Forms":"support.html","Capital Gain Statement":"support.html","Portfolio Login":"support.html","Grievance Redressal":"grievance.html"};
      if(map[label])a.href=map[label];
    });
    document.querySelectorAll('footer a[href="#"]').forEach(a=>{if(!a.textContent.trim())a.style.display="none"});
  }

  function enhanceEnquiry(){
    if(!isHome)return;
    const section=document.getElementById("contact"),button=section?.querySelector("textarea")?.parentElement?.querySelector("button");
    if(!button||button.dataset.smEnhanced)return;
    button.dataset.smEnhanced="true";
    const wrap=button.parentElement,inputs=wrap.querySelectorAll("input"),textarea=wrap.querySelector("textarea");
    button.type="button";
    const status=document.createElement("p");status.className="sm-form-status";status.setAttribute("role","status");wrap.insertBefore(status,button.nextSibling);
    button.addEventListener("click",()=>{
      const [name,email,phone]=[...inputs].map(i=>i.value.trim()),query=textarea.value.trim();
      if(!name||(!email&&!phone)||!query){status.textContent="Please enter your name, either email or phone, and your query.";return}
      const subject=encodeURIComponent(`Website consultation request — ${name}`);
      const body=encodeURIComponent(`Name: ${name}\nEmail: ${email||"Not provided"}\nPhone: ${phone||"Not provided"}\n\nQuery:\n${query}`);
      status.textContent="Opening your email app. Please send the prepared message to complete your request.";
      location.href=`mailto:support@supermatrix.in?subject=${subject}&body=${body}`;
    });
    const consent=wrap.querySelector("p:not(.sm-form-status)");
    if(consent)consent.innerHTML='By continuing, you agree to be contacted about your query and acknowledge the <a href="privacy.html" style="color:#b9d2f1;text-decoration:underline">privacy notice</a>.';
  }

  function addLegalLinks(){
    document.querySelectorAll(".site-footer .footer-inner").forEach(footer=>{
      if(footer.querySelector(".sm-legal-links"))return;
      const disclosure=footer.querySelector(".disclosure");
      disclosure?.insertAdjacentHTML("beforebegin",'<nav class="sm-legal-links" aria-label="Legal and support"><a href="privacy.html">Privacy</a><a href="terms.html">Terms</a><a href="disclosures.html">Disclosures</a><a href="grievance.html">Grievance Redressal</a><a href="investor-charter.html">Investor Charter</a></nav>');
    });
  }

  function addProductGuide(){
    if(path!=="products.html"||document.querySelector(".sm-product-guide"))return;
    const grid=document.querySelector(".solutions .grid");
    if(!grid)return;
    grid.insertAdjacentHTML("beforebegin",'<aside class="sm-product-guide" style="margin:0 0 28px;padding:22px;border:1px solid rgba(255,255,255,.14);border-radius:16px;background:rgba(255,255,255,.05);color:#fff"><strong style="display:block;font-size:18px;margin-bottom:8px">Not sure where to begin?</strong><p style="color:#bec8de;line-height:1.6;margin:0 0 16px">Start with the purpose of the money, when it will be needed, and how much fluctuation you can tolerate. Use the calculators for an illustration, then discuss suitability and current product information with the team.</p><div style="display:flex;gap:10px;flex-wrap:wrap"><a class="button" href="calculators.html">Plan with calculators</a><a class="button secondary" href="index.html#contact">Talk to the team</a></div></aside>');
  }

  function addCalculatorGuidance(){
    if(path!=="calculators.html"||document.querySelector(".sm-calculator-guide"))return;
    const disclosure=document.querySelector(".calc-disclosure");
    disclosure?.insertAdjacentHTML("afterend",'<section class="sm-calculator-guide" style="margin-top:24px"><div class="grid grid-3"><article class="card"><h3>1. Adjust assumptions</h3><p>Use realistic amounts, time periods, inflation, and expected-return assumptions.</p></article><article class="card"><h3>2. Compare scenarios</h3><p>Change one assumption at a time to understand its effect rather than treating one result as a prediction.</p></article><article class="card"><h3>3. Discuss suitability</h3><p>Use the estimate as a planning conversation, then consider risk, product costs, taxation, and scheme documents.</p></article></div><p class="prose" style="font-size:13px;margin-top:18px"><strong>Methodology:</strong> SIP projections use a monthly compounding illustration; lumpsum projections use annual compounding. Goal tools estimate future costs using the selected inflation assumption and solve for an illustrative monthly investment. Actual outcomes will vary.</p></section>');
  }

  function sanitiseUnverifiedRoutes(){
    if(path!=="faq.html")return;
    document.querySelectorAll(".faq-item").forEach(item=>{
      const question=item.querySelector("summary")?.textContent||"",answer=item.querySelector("p");
      if(!answer)return;
      if(question.includes("redeem my investment"))answer.innerHTML='Contact support or use the confirmed authorised transaction route. Processing time varies by scheme and request type; exit load and tax may apply.';
      if(question.includes("have a complaint"))answer.innerHTML='Start with SuperMatrix support and retain your correspondence. Review the <a href="grievance.html">grievance redressal process</a> for internal and external escalation routes, including SEBI SCORES where applicable.';
    });
  }

  function addMobileCta(){
    if(document.querySelector(".sm-mobile-cta")||path==="admin.html")return;
    document.body.insertAdjacentHTML("beforeend",'<div class="sm-mobile-cta"><a href="calculators.html">Use calculators</a><a href="index.html#contact">Talk to the team</a></div>');
  }

  function addStructuredData(){
    if(document.querySelector('script[data-sm-schema]'))return;
    const script=document.createElement("script");script.type="application/ld+json";script.dataset.smSchema="";
    script.textContent=JSON.stringify({"@context":"https://schema.org","@type":"Organization","name":"SuperMatrix","description":"The technology-driven wealth management platform of the Sarthi Group, operated by Sarthi Financial Services Private Limited, an AMFI-Registered Mutual Fund Distributor.","url":location.origin+location.pathname.replace(/[^/]*$/,""),"logo":new URL("./assets/supermatrix-logo.svg",location.href).href,"email":"support@supermatrix.in","telephone":"+91-22-26528671"});
    document.head.appendChild(script);
  }

  function applyPageEnhancements(){
    setupNavigation();fixHomepageClaimsAndLinks();enhanceEnquiry();addLegalLinks();addCalculatorGuidance();
  }
  applyPageEnhancements();addMobileCta();addStructuredData();
  if(isHome){
    setTimeout(applyPageEnhancements,350);
    setTimeout(applyPageEnhancements,1200);
  }
})();
