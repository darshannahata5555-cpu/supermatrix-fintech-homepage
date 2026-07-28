(() => {
  const path=(location.pathname.split("/").pop()||"index.html").toLowerCase();
  const isHome=path===""||path==="index.html"||path==="supermatrix home.dc.html";
  const whatsappNumber="918097147744";
  const whatsappIcon='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.1 1.6 5.9L0 24l6.5-1.7a11.8 11.8 0 0 0 5.6 1.4h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.2-6.1-3.5-8.4ZM12.2 21.7h-.1c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.9 1 1-3.8-.2-.4a9.8 9.8 0 1 1 8.6 4.8Zm5.4-7.3c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.2-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.5-1.6a9.2 9.2 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.6l.5-.5.3-.5c.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4Z"/></svg>';
  const whatsappUrl=message=>`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  function addMeta(name,content,property=false){
    if(document.head.querySelector(`meta[${property?"property":"name"}="${name}"]`))return;
    const meta=document.createElement("meta");meta.setAttribute(property?"property":"name",name);meta.content=content;document.head.appendChild(meta);
  }
  addMeta("theme-color","#2c3263");
  addMeta("robots",path==="admin.html"?"noindex, nofollow":"index, follow, max-image-preview:large");
  addMeta("og:site_name","SuperMatrix",true);
  addMeta("og:title",document.title,true);
  addMeta("og:description",document.querySelector('meta[name="description"]')?.content||"Explore mutual fund solutions, start your SIPs, and build wealth through disciplined investing.",true);
  const canonicalPath=isHome?"/":`/${path}`;
  const canonicalUrl=`https://supermatrix.in${canonicalPath}`;
  if(!document.head.querySelector('link[rel="canonical"]')){
    const canonical=document.createElement("link");canonical.rel="canonical";canonical.href=canonicalUrl;document.head.appendChild(canonical);
  }
  addMeta("og:url",canonicalUrl,true);
  addMeta("og:type","website",true);
  addMeta("og:image","https://supermatrix.in/assets/knowledge-centre-hero.png",true);
  addMeta("twitter:card","summary_large_image");
  if(isHome&&!document.head.querySelector('script[data-sm-structured-data]')){
    const structuredData=document.createElement("script");structuredData.type="application/ld+json";structuredData.dataset.smStructuredData="true";
    structuredData.textContent=JSON.stringify({"@context":"https://schema.org","@graph":[{"@type":"FinancialService","@id":"https://supermatrix.in/#organization","name":"SuperMatrix","alternateName":"SuperMatrix by Sarthi Group","url":"https://supermatrix.in/","logo":"https://supermatrix.in/assets/supermatrix-logo.svg","description":"AMFI-registered Mutual Fund Distributor offering mutual fund and goal-based investment solutions.","telephone":"+91-22-2652-8671","email":"support@supermatrix.in","identifier":{"@type":"PropertyValue","propertyID":"AMFI ARN","value":"ARN-72348"},"address":{"@type":"PostalAddress","streetAddress":"401, 4th Floor, Manek Plaza, 167 Vidya Nagari Marg, Kalina, Santacruz East","addressLocality":"Mumbai","postalCode":"400098","addressRegion":"Maharashtra","addressCountry":"IN"}},{"@type":"WebSite","@id":"https://supermatrix.in/#website","url":"https://supermatrix.in/","name":"SuperMatrix","publisher":{"@id":"https://supermatrix.in/#organization"},"inLanguage":"en-IN"}]});
    document.head.appendChild(structuredData);
  }

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

  function setupKnowledgeMenu(){
    const navLinks=document.querySelector(".site-nav .nav-links")||document.querySelector(".home-nav .home-links")||document.querySelector("header nav");
    if(!navLinks||navLinks.querySelector(".sm-knowledge-menu"))return;
    const toolsLink=[...navLinks.querySelectorAll(":scope > a")].find(a=>a.textContent.trim()==="Tools");
    if(toolsLink)toolsLink.classList.add("sm-tools-link");
    const faqLink=[...navLinks.querySelectorAll(":scope > a")].find(a=>a.textContent.trim()==="FAQs");
    if(!faqLink)return;
    const menu=document.createElement("details");
    menu.className="sm-knowledge-menu";
    menu.innerHTML='<summary>Knowledge Centre</summary><div class="sm-nav-dropdown"><a href="knowledge.html">Investor Education</a></div>';
    faqLink.replaceWith(menu);
    menu.addEventListener("toggle",()=>{
      if(!menu.open)return;
      document.querySelectorAll(".sm-knowledge-menu[open]").forEach(other=>{if(other!==menu)other.open=false});
    });
    document.addEventListener("click",event=>{if(menu.open&&!menu.contains(event.target))menu.open=false});
    menu.addEventListener("keydown",event=>{if(event.key==="Escape"){menu.open=false;menu.querySelector("summary")?.focus()}});
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
    const destinations=["knowledge.html","knowledge.html#elss-ppf-nps-understanding-your-tax-saving-investment-options","knowledge.html#how-to-build-a-goal-based-investment-plan-for-your-home-education-retirement","faq.html"];
    knowledgeLinks.forEach((a,i)=>a.href=destinations[i]||"faq.html");
    document.querySelectorAll("footer a").forEach(a=>{
      const label=a.textContent.trim();
      const map={"Privacy Policy":"privacy.html","Terms":"terms.html","Disclaimer":"disclosures.html","Investor Charter":"investor-charter.html","KYC Information":"kyc.html","Download Forms":"support.html","Portfolio Login":"support.html","Grievance Redressal":"grievance.html"};
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
    button.classList.add("sm-whatsapp-cta");button.innerHTML=whatsappIcon+"Chat on WhatsApp";
    const status=document.createElement("p");status.className="sm-form-status";status.setAttribute("role","status");wrap.insertBefore(status,button.nextSibling);
    button.addEventListener("click",()=>{
      const [name,email,phone]=[...inputs].map(i=>i.value.trim()),query=textarea.value.trim();
      if(!name||!email||!phone||!query){status.textContent="Please enter your name, email, phone number, and query. Email and phone number are both required.";return}
      if(!inputs[1].checkValidity()){status.textContent="Please enter a valid email address.";inputs[1].focus();return}
      if(!inputs[2].checkValidity()){status.textContent="Please enter a valid phone number.";inputs[2].focus();return}
      const message=`Hello SuperMatrix, I would like assistance.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nQuery:\n${query}`;
      status.textContent="Opening WhatsApp with your request.";
      window.open(whatsappUrl(message),"_blank","noopener");
    });
    const consent=wrap.querySelector("p:not(.sm-form-status)");
    if(consent)consent.innerHTML='By continuing, you agree to be contacted about your query and acknowledge the <a href="privacy.html" style="color:#b9d2f1;text-decoration:underline">privacy notice</a>.';
  }

  function standardizeFooter(){
    const footer=document.querySelector("footer");
    if(!footer||footer.dataset.smCanonical)return;
    footer.dataset.smCanonical="true";footer.className="site-footer sm-canonical-footer";
    footer.innerHTML=`<div class="sm-footer-inner"><div class="sm-footer-grid">
      <section class="sm-footer-brand-column"><a class="sm-footer-brand" href="index.html" aria-label="SuperMatrix home"><span class="sm-footer-logo-mark"><img src="./assets/supermatrix-logo.svg" alt=""></span><span class="sm-footer-logo-copy"><strong>SuperMatrix</strong><small>An initiative by Sarthi Group</small></span></a><p>AMFI Registered Mutual Fund Distributor.</p><address><strong>Mumbai Office</strong><span>401, 4th Floor, Manek Plaza, 167 Vidya Nagari Marg,<br>Kalina, Santacruz (East), Mumbai – 400098</span><span><a href="tel:02226528671">022-2652-8671 / 72</a> · <a href="mailto:support@supermatrix.in">support@supermatrix.in</a></span></address><div class="sm-footer-icons"><a href="${whatsappUrl("Hello SuperMatrix, I would like assistance.")}" target="_blank" rel="noopener" aria-label="Chat with SuperMatrix on WhatsApp">${whatsappIcon}</a><a href="https://www.google.com/maps/search/?api=1&amp;query=Manek+Plaza+Kalina+Santacruz+East+Mumbai" target="_blank" rel="noopener" aria-label="View Mumbai office on map"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0Z"/><circle cx="12" cy="10" r="3"/></svg></a></div></section>
      <section><h3>Solutions</h3><nav><a href="product.html?product=mutual-funds">Mutual Funds</a><a href="product.html?product=sip">SIP Investments</a><a href="product.html?product=elss">ELSS (Tax Saving)</a><a href="product.html?product=swp">Lumpsum &amp; SWP</a><a href="product.html?product=goal-planning">Goal-Based Investing</a><a href="product.html?product=pms-equity">PMS Portfolios</a></nav></section>
      <section><h3>Tools &amp; Learning</h3><nav><a href="calculators.html?calculator=sip">SIP Calculator</a><a href="calculators.html?calculator=lumpsum">Lumpsum Calculator</a><a href="calculators.html?calculator=retirement">Retirement Planner</a><a href="calculators.html?calculator=goal">Dream Home Planner</a><a href="knowledge.html">Investor Education</a><a href="faq.html">FAQs</a></nav></section>
      <section><h3>Company &amp; Support</h3><nav><a href="about.html">About Us &amp; Leadership</a><a href="faq.html">Frequently Asked Questions</a><a href="kyc.html">KYC Information</a><a href="./assets/documents/SuperMatrix-AMFI-Registration-Certificate.pdf" download="SuperMatrix-AMFI-Registration-Certificate.pdf">Download Documents</a><a href="grievance.html">Grievance Redressal</a></nav></section>
    </div><div class="sm-footer-regulatory"><p><strong>Mutual Fund investments are subject to market risks.</strong> Please read all Scheme Information Documents (SID), Key Information Memorandum (KIM), Statement of Additional Information (SAI) and other scheme-related documents carefully before investing. Past performance does not guarantee future returns; the value of investments may go up or down depending on market conditions. Evaluate suitability, risk factors, exit load, Total Expense Ratio (TER) and applicable charges before investing. We distribute Regular Plan Mutual Fund Schemes and receive commission from Asset Management Companies (AMCs) in accordance with SEBI and AMFI regulations. Direct Plans, which generally have a lower expense ratio, are available directly through the respective AMCs; we do not facilitate investments in Direct Plans.</p><div><span>AMFI Registered Mutual Fund Distributor · ARN-72348 · Valid 23 Feb 2026–22 Feb 2029.</span><nav><a href="privacy.html">Privacy Policy</a><a href="terms.html">Terms</a><a href="disclosures.html">Disclosures</a><a href="investor-charter.html">Investor Charter</a></nav></div></div></div>`;
  }

  function updatePrivacyNotice(){
    if(path!=="privacy.html")return;
    document.querySelectorAll("p").forEach(p=>{if(p.textContent.includes("prepares an email in your email application"))p.textContent=p.textContent.replace("prepares an email in your email application","prepares a message in WhatsApp")});
  }

  function enhanceWhatsAppContacts(){
    const contactLabels=/contact|start investing|start this sip|book a free call|talk to|ask a query|discuss your plan|send a query|request assistance|email support|ask for assistance|register|login/i;
    document.querySelectorAll('a[href="#contact"],a[href="index.html#contact"],a[href$="/index.html#contact"],a.nav-cta[href^="mailto:"],a.button[href^="mailto:"]').forEach(link=>{
      if(!contactLabels.test(link.textContent.trim()))return;
      const originalLabel=link.textContent.trim();
      const label=/^email support$/i.test(originalLabel)?"WhatsApp support":originalLabel;
      if(label!==originalLabel)link.textContent=label;
      link.href=whatsappUrl(`Hello SuperMatrix, I am contacting you from the website regarding: ${label}.`);
      link.target="_blank";link.rel="noopener";link.setAttribute("aria-label",`${label} on WhatsApp`);
      if(link.matches('.nav-cta,.button,.primary-cta')&&!link.classList.contains("sm-whatsapp-cta")){link.classList.add("sm-whatsapp-cta");link.insertAdjacentHTML("afterbegin",whatsappIcon)}
    });
  }

  function addWhatsAppButton(){
    if(document.querySelector(".sm-whatsapp-float"))return;
    document.body.insertAdjacentHTML("beforeend",`<a class="sm-whatsapp-float" href="${whatsappUrl("Hello SuperMatrix, I would like assistance.")}" target="_blank" rel="noopener" aria-label="Chat with SuperMatrix on WhatsApp">${whatsappIcon}<span>WhatsApp</span></a>`);
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
    document.body.insertAdjacentHTML("beforeend",`<div class="sm-mobile-cta"><a href="calculators.html">Use calculators</a><a class="sm-whatsapp-cta" href="${whatsappUrl("Hello SuperMatrix, I would like to talk to the team.")}" target="_blank" rel="noopener">${whatsappIcon}Talk to the team</a></div>`);
  }

  function addStructuredData(){
    if(document.querySelector('script[data-sm-schema]'))return;
    const script=document.createElement("script");script.type="application/ld+json";script.dataset.smSchema="";
    script.textContent=JSON.stringify({"@context":"https://schema.org","@type":"Organization","name":"SuperMatrix","description":"The technology-driven wealth management platform of the Sarthi Group, operated by Sarthi Financial Services Private Limited, an AMFI-Registered Mutual Fund Distributor.","url":location.origin+location.pathname.replace(/[^/]*$/,""),"logo":new URL("./assets/supermatrix-logo.svg",location.href).href,"email":"support@supermatrix.in","telephone":"+91-22-26528671"});
    document.head.appendChild(script);
  }

  function applyPageEnhancements(){
    setupNavigation();setupKnowledgeMenu();fixHomepageClaimsAndLinks();enhanceEnquiry();standardizeFooter();addCalculatorGuidance();enhanceWhatsAppContacts();updatePrivacyNotice();
  }
  applyPageEnhancements();addMobileCta();addWhatsAppButton();addStructuredData();
  if(isHome){
    setTimeout(applyPageEnhancements,350);
    setTimeout(applyPageEnhancements,1200);
    setTimeout(applyPageEnhancements,2600);
  }
})();
