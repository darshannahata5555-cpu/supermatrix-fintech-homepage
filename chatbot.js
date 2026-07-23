(() => {
  if (!document.querySelector('script[src$="site-config.js"]')) {
    const configScript=document.createElement("script");
    configScript.src="./site-config.js";
    document.head.appendChild(configScript);
  }
  const CONTACT_PHONE_DISPLAY = "022-26528671 / 72";
  const CONTACT_PHONE_LINK = "02226528671";
  const CONTACT_EMAIL = "support@supermatrix.in";
  const DISCLAIMER = "General information only. Mutual Fund investments are subject to market risks.";

  const knowledge = [
    { id:"greeting", keys:["hello","hi","hey","good morning","good evening","help","what can you do"], answer:"Hello! I can answer approved questions about SuperMatrix, getting started, mutual funds, SIP, SWP, STP, ELSS, Fund of Funds, PMS, goal planning, costs, risks, taxation, offices, and account support.", suggestions:["How do I start investing?","Explore investment products","About SuperMatrix","Contact support"] },
    { id:"faq", keys:["browse all faqs","all faqs","faq page","frequently asked questions"], answer:"The SuperMatrix FAQ page covers getting started, products, charges and plans, NAV, returns, risk, taxation, account management, and support.", link:["Browse all FAQs","faq.html"] },
    { id:"about", keys:["what is supermatrix","about supermatrix","who are you","company"], answer:"SuperMatrix is the technology-driven wealth management platform of Sarthi Group, operated by Sarthi Financial Services Private Limited (CIN: U67190DL2009PTC187401), an AMFI-Registered Mutual Fund Distributor.", link:["Learn about SuperMatrix","about.html"] },
    { id:"regulated", keys:["regulated","regulation","amfi","sebi registered","is supermatrix safe"], answer:"SuperMatrix is the wealth management platform of Sarthi Financial Services Private Limited, an AMFI-Registered Mutual Fund Distributor. Mutual fund distribution is undertaken in accordance with applicable SEBI and AMFI regulations.", link:["Read more about us","about.html"] },
    { id:"founder", keys:["founder","deepak sharma","leadership","managing director","sarthi group"], answer:"Sarthi Group was founded in 2009 by Mr. Deepak Sharma, B.Com (H), CWA. He has almost 30 years of financial-services experience across capital markets, corporate finance, investment banking, private equity raising, business modelling, and investment management.", link:["View company information","about.html"] },
    { id:"start", keys:["start investing","how to invest","getting started","onboarding","register","registration"], answer:"To start, register on the website or app, complete KYC, link your bank account, and choose a fund or financial goal. Once KYC is verified, you can begin investing.", suggestions:["What documents do I need?","What is KYC?","Is there a minimum age?","Can NRIs invest?"] },
    { id:"kyc", keys:["kyc","know your customer","identity verification"], answer:"KYC is the mandatory identity-verification process used before investing. It typically requires PAN, address proof, and photo or video verification and generally needs to be completed only once across the mutual fund industry." },
    { id:"documents", keys:["documents","pan card","address proof","cancelled cheque","bank statement"], answer:"You generally need a PAN card, address proof such as Aadhaar or passport, a cancelled cheque or bank statement, and a passport-size photograph. Most onboarding steps can be completed digitally." },
    { id:"age", keys:["minimum age","age to invest","minor invest","under 18"], answer:"You must be 18 or older to invest independently. A parent or legal guardian may invest on behalf of a minor." },
    { id:"nri", keys:["nri","nre","nro","non resident"], answer:"NRIs can generally invest in Indian mutual funds through NRE or NRO bank accounts, subject to FEMA and fund-specific requirements." },
    { id:"products", keys:["investment products","all products","products and services","what products","investment solutions"], answer:"SuperMatrix provides access to information about Mutual Funds, SIP, SWP, Fund of Funds, ELSS, Equity PMS, Debt PMS, and Goal Based Planning.", link:["Explore all products","products.html"], suggestions:["What is SIP?","What is ELSS?","What is PMS?","What is Goal Based Planning?"] },
    { id:"calculators", keys:["financial calculators","calculator","sip calculator","lumpsum calculator","retirement calculator","goal calculator","education planner","home planner"], answer:"SuperMatrix provides six illustrative tools: SIP, Lumpsum, Retirement, Goal, Child Education, and Dream Home calculators. Results are estimates based on your inputs and are not guaranteed returns.", link:["Open financial calculators","calculators.html"] },
    { id:"mutual-funds", keys:["mutual fund","mutual funds","equity fund","debt fund","hybrid fund"], answer:"A mutual fund pools money from many investors. A professional fund manager invests it in stocks, bonds, or a mix according to the scheme objective. Investors own units whose NAV reflects the value of the holdings. Returns are market-linked and not guaranteed.", link:["Mutual Fund details","product.html?product=mutual-funds"] },
    { id:"mf-vs-fd", keys:["mutual fund vs fixed deposit","mutual fund and fixed deposit","mf vs fd","fund or fd","fixed deposit"], answer:"A fixed deposit offers a fixed return set upfront. Mutual fund returns are market-linked and not guaranteed. Equity funds carry greater risk but have historically offered higher long-term growth potential than fixed deposits." },
    { id:"sip", keys:["systematic investment plan","monthly investment","what is sip","sip"], answer:"A Systematic Investment Plan invests a fixed amount in a mutual fund at regular intervals, usually monthly. It encourages discipline and uses rupee-cost averaging by buying more units when prices are lower and fewer when prices are higher.", link:["SIP details","product.html?product=sip"], suggestions:["Can I pause my SIP?","SIP vs lumpsum","Are returns guaranteed?"] },
    { id:"sip-vs-lumpsum", keys:["sip vs lumpsum","sip and lumpsum","lumpsum investing","lump sum"], answer:"A SIP invests a fixed amount regularly, while a lumpsum is a one-time investment. SIPs may average entry costs across market levels and suit regular savers; a lumpsum may suit someone with capital ready to deploy." },
    { id:"pause-sip", keys:["pause sip","stop sip","modify sip","change sip","cancel sip"], answer:"SIPs can generally be paused, modified, or stopped. Processing requirements can vary, so use your portfolio account or contact SuperMatrix support for transaction assistance.", contact:true },
    { id:"swp", keys:["systematic withdrawal plan","what is swp","swp","regular withdrawal"], answer:"An SWP withdraws a fixed amount from a mutual fund at regular intervals while the remaining units stay invested. Each payment redeems enough units to fund the withdrawal, so withdrawals reduce the corpus and may have tax implications.", link:["SWP details","product.html?product=swp"] },
    { id:"stp", keys:["systematic transfer plan","what is stp","stp"], answer:"An STP transfers a fixed amount at regular intervals from one scheme to another within the same AMC, often from a liquid or debt fund into an equity fund. It can move a lumpsum into the market gradually." },
    { id:"fof", keys:["fund of funds","what is fof","fof","international fund"], answer:"A Fund of Funds invests in units of other domestic or international funds. It can diversify across funds, asset classes, strategies, or geographies through one investment, although layered costs may apply.", link:["Fund of Funds details","product.html?product=fof"] },
    { id:"elss", keys:["equity linked savings scheme","tax saving fund","section 80c","80c","what is elss","elss"], answer:"ELSS is an equity mutual fund that may qualify for a deduction under Section 80C, subject to prevailing tax law. It has a mandatory three-year lock-in, and each SIP instalment has its own three-year lock-in.", link:["ELSS details","product.html?product=elss"] },
    { id:"pms", keys:["portfolio management service","equity pms","debt pms","what is pms","pms"], answer:"PMS holds securities directly in the investor’s account under a professional manager. It may be Discretionary or Non-Discretionary. SEBI mandates a minimum PMS investment of ₹50 lakh, and market, concentration, credit, liquidity, and fee risks may apply.", link:["Explore PMS information","products.html"] },
    { id:"goal", keys:["goal based planning","goal planning","dream home","child education","education planning","retirement planning","marriage goal"], answer:"Goal Based Planning connects investments to a defined amount and timeframe, such as a home, education, marriage, or retirement. The savings path and product mix are reviewed against progress, but projections depend on assumptions and are not guaranteed.", link:["Goal planning details","product.html?product=goal-planning"] },
    { id:"nav", keys:["net asset value","what is nav","nav"], answer:"NAV is a mutual fund scheme’s per-unit market value on a given day. It is calculated after deducting expenses and liabilities from scheme assets and dividing by the number of outstanding units." },
    { id:"direct-regular", keys:["direct vs regular","direct plan","regular plan","difference between direct and regular"], answer:"Both plans invest in the same underlying portfolio. A Regular Plan is purchased through a distributor and includes distribution commission in its expense ratio. A Direct Plan is purchased from the AMC and generally has a lower expense ratio. SuperMatrix facilitates Regular Plans, not Direct Plans." },
    { id:"charges", keys:["charges","charge","commission","fees","fee","cost to invest","does supermatrix charge"], answer:"SuperMatrix does not charge investors separately for mutual fund distribution. It receives commission from AMCs on Regular Plan schemes. Scheme costs such as TER and any exit load still apply as disclosed in scheme documents." },
    { id:"ter", keys:["total expense ratio","expense ratio","ter"], answer:"Total Expense Ratio (TER) is the annual cost charged by an AMC to manage and operate a scheme. It is deducted before NAV is published, and applicable maximum limits are regulated by SEBI." },
    { id:"exit-load", keys:["exit load","redemption fee"], answer:"Exit load is a fee that some schemes apply if units are redeemed before a specified holding period. Terms vary by scheme and are stated in the offer documents." },
    { id:"returns", keys:["guaranteed returns","return guaranteed","returns guaranteed","guarantee","profit guaranteed","expected return","interest rate","returns"], answer:"Mutual fund and PMS returns are market-linked and are not guaranteed. Calculator outputs are illustrations based on assumptions, not promises of future performance." },
    { id:"risk", keys:["can i lose money","mutual fund safe","investment safe","riskometer","market risk","risk"], answer:"Mutual funds are regulated by SEBI and scheme assets are held by independent custodians, but their values can rise or fall. Equity and debt funds both carry risks. The SEBI-mandated riskometer classifies schemes from Low to Very High risk." },
    { id:"tax", keys:["taxation","tax on returns","capital gains tax","mutual fund tax","tax"], answer:"Tax treatment depends on the fund type, holding period, and prevailing law, which may change. Please check current rules or consult a qualified tax professional before filing or acting on tax information." },
    { id:"track", keys:["track investments","portfolio status","sip status","download statement","statements","portfolio login"], answer:"Use the SuperMatrix portal or app to review your portfolio, SIP status, and returns and to download available statements. If you cannot access your account, contact support.", contact:true },
    { id:"folio", keys:["folio number","what is folio","folio"], answer:"A folio number is the AMC’s unique account number for recording your purchases, SIPs, and redemptions within that fund house." },
    { id:"nominee", keys:["nominee","nomination","joint holder","joint account"], answer:"You may add nominees, subject to applicable limits and processes, and can hold investments jointly under the selected mode of holding. Contact support for account-specific assistance.", contact:true },
    { id:"redeem", keys:["redeem","redemption","withdraw investment","withdraw money"], answer:"You can place a redemption request through your portfolio dashboard. Proceeds are generally credited to the registered bank account within 1–3 business days, depending on fund type. Scheme exit load and tax may apply." },
    { id:"complaint", keys:["complaint","grievance","escalation","scores","not resolved"], answer:"Use SuperMatrix’s Grievance Redressal process or Complaint Escalation Matrix first. If a complaint remains unresolved or unanswered within 30 days, it may be escalated through SEBI SCORES at scores.sebi.gov.in.", link:["Open SEBI SCORES","https://scores.sebi.gov.in"] },
    { id:"office", keys:["office address","mumbai office","delhi office","registered office","location","address"], answer:"Mumbai: 401, 4th Floor, Manek Plaza, 167, Vidya Nagari Marg, Kalina, Santacruz (East), Mumbai – 400098. Registered Office: 411, Pratap Bhawan, 5, Bahadurshah Zafar Marg, New Delhi – 110002.", link:["View office details","about.html"] },
    { id:"contact", keys:["contact support","customer care","contact","support","phone number","email address","book a call","advisor"], answer:`Contact SuperMatrix at ${CONTACT_PHONE_DISPLAY} or ${CONTACT_EMAIL}, or use the website’s Ask a Query form.`, contact:true }
  ];

  const adviceTerms = ["which fund should","best fund","best investment","should i invest","where should i invest","recommend a fund","recommend investment","portfolio for me","how much should i invest","buy now","sell now"];

  const normalise = value => value.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu," ").replace(/\s+/g," ").trim();

  function findAnswer(question) {
    const query = normalise(question);
    if (!query) return null;
    if (adviceTerms.some(term => query.includes(term))) return {
      answer:"I can explain approved product information, but I cannot recommend a specific investment, assess suitability, or promise returns. Please speak with the SuperMatrix team for assistance based on your circumstances.",
      contact:true
    };
    let winner=null, best=0;
    for (const item of knowledge) {
      let score=0;
      for (const key of item.keys) {
        const clean=normalise(key);
        if (query === clean) score+=12;
        else if (query.includes(clean)) score+=clean.split(" ").length*3;
      }
      if (score>best) { best=score; winner=item; }
    }
    return winner && best>0 ? winner : {
      answer:"I don’t have verified information about that in the approved SuperMatrix website data. Please contact customer care and the team will help you.",
      contact:true,
      suggestions:["Contact support","Browse all FAQs","Explore investment products"]
    };
  }

  function buildChatbot() {
    if (document.querySelector(".sm-chatbot")) return;
    let adminGreeting="";
    try { adminGreeting=JSON.parse(localStorage.getItem("supermatrix_admin_settings_v1")||"null")?.chatbot?.chatbotGreeting||""; } catch {}
    const root=document.createElement("div");
    root.className="sm-chatbot";
    root.innerHTML=`
      <section class="sm-chat-window" role="dialog" aria-modal="false" aria-label="SuperMatrix FAQ assistant">
        <header class="sm-chat-header">
          <span class="sm-chat-avatar"><img src="./assets/supermatrix-logo.svg" alt=""></span>
          <span><span class="sm-chat-title">SuperMatrix Assistant</span><span class="sm-chat-status"><i></i> Approved FAQ information</span></span>
          <button class="sm-chat-close" type="button" aria-label="Close chat">&times;</button>
        </header>
        <div class="sm-chat-messages" aria-live="polite"></div>
        <div class="sm-chat-footer">
          <form class="sm-chat-form">
            <input class="sm-chat-input" type="text" maxlength="240" autocomplete="off" placeholder="Ask about SIP, KYC, charges…" aria-label="Ask a question">
            <button class="sm-chat-send" type="submit" aria-label="Send question"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 4 17 8-17 8 3-8-3-8Zm3 8h14"/></svg></button>
          </form>
          <span class="sm-chat-privacy">Fixed FAQ assistant · Messages are not stored</span>
        </div>
      </section>
      <button class="sm-chat-toggle" type="button" aria-label="Open FAQ assistant" aria-expanded="false">
        <span class="sm-chat-label">Need help?</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.8 9.8 0 0 1-3.8-.8L3 21l1.7-4.6A8.3 8.3 0 1 1 21 11.5Z"/><path d="M8 10h8M8 14h5"/></svg>
      </button>`;
    document.body.appendChild(root);
    const toggle=root.querySelector(".sm-chat-toggle"), close=root.querySelector(".sm-chat-close"), form=root.querySelector(".sm-chat-form"), input=root.querySelector(".sm-chat-input"), messages=root.querySelector(".sm-chat-messages");

    function addContact(bubble) {
      const actions=document.createElement("span"); actions.className="sm-chat-actions";
      actions.innerHTML=`<a href="tel:${CONTACT_PHONE_LINK}">Call support</a><a href="mailto:${CONTACT_EMAIL}">Email us</a>`;
      bubble.appendChild(actions);
    }
    function addLink(bubble, link) {
      if (!link) return;
      const a=document.createElement("a"); a.className="sm-chat-link"; a.href=link[1]; a.textContent=link[0]+" →";
      if (/^https?:/.test(link[1])) { a.target="_blank"; a.rel="noopener"; }
      bubble.appendChild(a);
    }
    function addMessage(text,type,options={}) {
      const row=document.createElement("div"); row.className=`sm-chat-row ${type}`;
      const bubble=document.createElement("div"); bubble.className="sm-chat-bubble"; bubble.textContent=text;
      if(type==="bot") {
        addLink(bubble,options.link);
        if(options.contact) addContact(bubble);
        const note=document.createElement("span"); note.className="sm-chat-note"; note.textContent=DISCLAIMER; bubble.appendChild(note);
      }
      row.appendChild(bubble); messages.appendChild(row); messages.scrollTop=messages.scrollHeight;
    }
    function addSuggestions(labels) {
      if(!labels?.length) return;
      const wrap=document.createElement("div"); wrap.className="sm-chat-suggestions";
      labels.forEach(label=>{
        const button=document.createElement("button"); button.type="button"; button.className="sm-chat-suggestion"; button.textContent=label;
        button.addEventListener("click",()=>{wrap.remove(); ask(label);}); wrap.appendChild(button);
      });
      messages.appendChild(wrap); messages.scrollTop=messages.scrollHeight;
    }
    function showTyping() {
      const row=document.createElement("div"); row.className="sm-chat-row bot sm-chat-typing"; row.innerHTML='<div class="sm-chat-bubble"><i></i><i></i><i></i></div>';
      messages.appendChild(row); messages.scrollTop=messages.scrollHeight; return row;
    }
    function ask(question) {
      addMessage(question,"user");
      const response=findAnswer(question), typing=showTyping();
      window.setTimeout(()=>{typing.remove(); addMessage(response.answer,"bot",response); addSuggestions(response.suggestions);},320);
    }
    function setOpen(open) {
      root.classList.toggle("is-open",open); toggle.setAttribute("aria-expanded",String(open)); toggle.setAttribute("aria-label",open?"Close FAQ assistant":"Open FAQ assistant");
      if(open) {
        if(!messages.children.length) {
          addMessage(adminGreeting||"Hi! I’m the SuperMatrix FAQ assistant. What would you like to understand?","bot");
          addSuggestions(["How do I start investing?","Explore investment products","Charges & Regular Plans","Contact support"]);
        }
        window.setTimeout(()=>input.focus(),50);
      }
    }
    toggle.addEventListener("click",()=>setOpen(!root.classList.contains("is-open")));
    close.addEventListener("click",()=>setOpen(false));
    form.addEventListener("submit",event=>{event.preventDefault();const question=input.value.trim();if(!question)return;input.value="";ask(question);});
    document.addEventListener("keydown",event=>{if(event.key==="Escape"&&root.classList.contains("is-open"))setOpen(false);});
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",buildChatbot); else buildChatbot();
})();
