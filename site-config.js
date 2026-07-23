(() => {
  const KEY="supermatrix_admin_settings_v1";
  let cfg;
  try { cfg=JSON.parse(localStorage.getItem(KEY)||"null"); } catch {}
  if(!cfg) return;

  function apply() {
    const h=cfg.homepage||{},c=cfg.contact||{},bot=cfg.chatbot||{},compliance=cfg.compliance||{};
    const hero=document.querySelector("#top h1");
    if(hero&&h.heroTitle) hero.textContent=h.heroTitle;
    const heroP=document.querySelector("#top h1 + p");
    if(heroP&&h.heroDescription) heroP.textContent=h.heroDescription;
    const primary=document.querySelector("#top .primary-cta");
    if(primary&&h.primaryCta) {
      const node=[...primary.childNodes].find(n=>n.nodeType===Node.TEXT_NODE&&n.textContent.trim());
      if(node) node.textContent=h.primaryCta+" ";
    }
    const secondary=document.querySelector("#top .secondary-cta");
    if(secondary&&h.secondaryCta) secondary.textContent=h.secondaryCta;

    if(c.supportEmail) document.querySelectorAll('a[href^="mailto:"]').forEach(a=>{
      a.href="mailto:"+c.supportEmail;
      a.textContent=c.supportEmail;
    });
    if(c.supportPhoneLink) document.querySelectorAll('a[href="tel:02226528671"]').forEach(a=>{
      a.href="tel:"+c.supportPhoneLink;
      if(c.supportPhone) a.textContent=c.supportPhone;
    });
    document.querySelectorAll("h3").forEach(heading=>{
      const text=heading.textContent.trim().toLowerCase();
      const card=heading.closest("article,div");
      const paragraph=card?.querySelector("p");
      if(paragraph&&text==="mumbai"&&c.mumbaiAddress) paragraph.textContent=c.mumbaiAddress;
      if(paragraph&&text.includes("new delhi")&&c.delhiAddress) paragraph.textContent=c.delhiAddress;
    });

    if(compliance.arn) document.querySelectorAll("span").forEach(el=>{
      if(el.childElementCount===0&&el.textContent.includes("ARN: To be updated")) {
        el.textContent="AMFI Registered Mutual Fund Distributor · ARN: "+compliance.arn;
      }
    });
    if(compliance.disclosure) document.querySelectorAll(".disclosure").forEach(el=>{
      el.textContent=compliance.disclosure;
    });

    if(bot.chatbotEnabled===false) {
      const hide=()=>{const el=document.querySelector(".sm-chatbot");if(el)el.style.display="none";};
      hide();
      new MutationObserver(hide).observe(document.body,{childList:true,subtree:true});
    }
    if(bot.chatbotLabel===false) {
      const hideLabel=()=>{const el=document.querySelector(".sm-chat-label");if(el)el.style.display="none";};
      hideLabel();
      new MutationObserver(hideLabel).observe(document.body,{childList:true,subtree:true});
    }
  }

  if(document.readyState==="loading") {
    document.addEventListener("DOMContentLoaded",()=>{apply();setTimeout(apply,700);});
  } else {
    apply();
    setTimeout(apply,700);
  }
})();
