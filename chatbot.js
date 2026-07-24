(() => {
  if (!document.querySelector('link[href*="enhancements.css"]')) {
    const stylesheet=document.createElement("link");stylesheet.rel="stylesheet";stylesheet.href="./enhancements.css?v=7";document.head.appendChild(stylesheet);
  }
  if (!document.querySelector('script[src*="enhancements.js"]')) {
    const enhancementScript=document.createElement("script");enhancementScript.src="./enhancements.js?v=3";enhancementScript.async=false;document.head.appendChild(enhancementScript);
  }
  if (!document.querySelector('script[src$="site-config.js"]')) {
    const configScript=document.createElement("script");
    configScript.src="./site-config.js";
    document.head.appendChild(configScript);
  }
  const CONTACT_PHONE_DISPLAY = "022-26528671 / 72";
  const CONTACT_PHONE_LINK = "02226528671";
  const CONTACT_EMAIL = "support@supermatrix.in";
  const DISCLAIMER = "General information only. Mutual Fund investments are subject to market risks.";
  const NO_SEPARATE_FEE = "SuperMatrix does not charge investors a separate fee for mutual fund distribution. For Regular Plan schemes, SuperMatrix receives commission from Asset Management Companies (AMCs). Scheme-level costs such as the Total Expense Ratio and any applicable exit load may still apply.";

  const knowledge = [
    { id:"greeting", keys:["hello","hi","hey","good morning","good evening","help","what can you do"], answer:"Hello! I can answer approved questions about SuperMatrix, getting started, mutual funds, SIP, SWP, STP, ELSS, Fund of Funds, PMS, goal planning, costs, risks, taxation, offices, and account support.", suggestions:["How do I start investing?","Explore investment products","About SuperMatrix","Contact support"] },
    { id:"faq", keys:["browse all faqs","all faqs","faq page","frequently asked questions"], answer:"The SuperMatrix FAQ page covers getting started, products, charges and plans, NAV, returns, risk, taxation, account management, and support.", link:["Browse all FAQs","faq.html"] },
    { id:"about", keys:["what is supermatrix","about supermatrix","who are you","company"], answer:"SuperMatrix is the technology-driven wealth management platform of the Sarthi Group, operated by Sarthi Financial Services Private Limited (CIN: U67190DL2009PTC187401), an AMFI-Registered Mutual Fund Distributor. We help you invest in mutual funds, PMS, and other financial solutions through a simple, technology-driven, goal-based experience.", link:["Learn about SuperMatrix","about.html"] },
    { id:"regulated", keys:["regulated","regulation","amfi","sebi registered","is supermatrix safe"], answer:"SuperMatrix is the wealth management platform of Sarthi Financial Services Private Limited, an AMFI-Registered Mutual Fund Distributor. Mutual fund distribution is undertaken in accordance with applicable SEBI and AMFI regulations.", link:["Read more about us","about.html"] },
    { id:"founder", keys:["founder","deepak sharma","leadership","managing director","sarthi group"], answer:"Sarthi Group was founded in 2009 by Mr. Deepak Sharma, B.Com (H), CWA. He has almost 30 years of financial-services experience across capital markets, corporate finance, investment banking, private equity raising, business modelling, and investment management.", link:["View company information","about.html"] },
    { id:"start", keys:["start investing","how to invest","getting started","onboarding","register","registration"], answer:"Register on our website or app, complete your KYC, link your bank account, and choose a fund or goal to invest in. Once your KYC is verified, you can start investing within minutes.", link:["Contact the team","index.html#contact"], suggestions:["What documents do I need?","What is KYC?","Direct vs Regular Plans","Use financial calculators"] },
    { id:"kyc", keys:["kyc","know your customer","identity verification"], answer:"KYC (Know Your Customer) is a mandatory SEBI requirement that verifies your identity before you invest in mutual funds. It typically involves your PAN, address proof, and a photo or video verification, and needs to be completed only once across the industry." },
    { id:"documents", keys:["documents","pan card","address proof","cancelled cheque","bank statement"], answer:"Your PAN card, an address proof (such as Aadhaar or passport), a cancelled cheque or bank statement for your bank details, and a passport-size photograph. Most of this can be completed digitally during onboarding." },
    { id:"age", keys:["minimum age","age to invest","minor invest","under 18"], answer:"You must be 18 or older to invest independently. A parent or legal guardian may invest on behalf of a minor." },
    { id:"nri", keys:["nri","nre","nro","non resident"], answer:"NRIs can generally invest in Indian mutual funds through NRE or NRO bank accounts, subject to FEMA and fund-specific requirements." },
    { id:"products", keys:["investment products","all products","products and services","what products","investment solutions"], answer:"SuperMatrix provides access to information about Mutual Funds, SIP, SWP, Fund of Funds, ELSS, Equity PMS, Debt PMS, and Goal Based Planning.", link:["Explore all products","products.html"], suggestions:["What is SIP?","What is ELSS?","What is PMS?","What is Goal Based Planning?"] },
    { id:"calculators", keys:["financial calculators","calculator","calculators","planning tools"], answer:"SuperMatrix provides six illustrative tools: SIP Calculator for the future value of monthly investments, Lumpsum Calculator for one-time investment growth, Retirement Calculator for retirement corpus planning, Goal Calculator for target amount planning, Child Education Planner for higher-education funding, and Dream Home Planner for a home-purchase goal. Results are estimates based on your inputs and are not guaranteed returns.", link:["Open financial calculators","calculators.html"], suggestions:["SIP Calculator","Retirement Calculator","Child Education Planner","Dream Home Planner"] },
    { id:"sip-calculator", keys:["sip calculator","calculate sip","monthly investment calculator"], answer:"The SIP Calculator estimates the future value of monthly investments using your monthly amount, investment period, and expected annual return. The result is an illustration, not a guaranteed return.", link:["Open SIP Calculator","calculators.html?calculator=sip"] },
    { id:"lumpsum-calculator", keys:["lumpsum calculator","lump sum calculator","one time investment calculator"], answer:"The Lumpsum Calculator illustrates how a one-time investment may grow using the amount, investment period, and expected annual return you enter.", link:["Open Lumpsum Calculator","calculators.html?calculator=lumpsum"] },
    { id:"retirement-calculator", keys:["retirement calculator","retirement corpus calculator"], answer:"The Retirement Calculator estimates the corpus required to maintain your desired lifestyle using current monthly expenses, years until retirement, inflation, retirement duration, and expected return assumptions.", link:["Open Retirement Calculator","calculators.html?calculator=retirement"] },
    { id:"goal-calculator", keys:["goal calculator","target amount calculator"], answer:"The Goal Calculator estimates the monthly investment needed for a target amount using the goal value, time available, and expected return assumptions.", link:["Open Goal Calculator","calculators.html?calculator=goal"] },
    { id:"education-calculator", keys:["child education planner","education calculator","education planner"], answer:"The Child Education Planner estimates the future education cost and the monthly investment required using today's education cost, years until education, inflation, and expected return assumptions.", link:["Open Child Education Planner","calculators.html?calculator=education"] },
    { id:"home-calculator", keys:["dream home planner","home calculator","house calculator","home planner"], answer:"The Dream Home Planner estimates the future home cost and monthly investment required for the down payment using today's home price, target down payment, years until purchase, property-price inflation, and expected return assumptions.", link:["Open Dream Home Planner","calculators.html?calculator=home"] },
    { id:"mutual-funds", keys:["mutual fund","mutual funds","equity fund","debt fund","hybrid fund"], answer:"A mutual fund pools money from many investors and is managed by a professional fund manager who invests in stocks, bonds, or a mix based on the fund's stated objective. Investors own units, and the NAV reflects the value of the fund's holdings. Key benefits include professional management, diversification, choice, liquidity, affordability, and SEBI regulation. Returns are market-linked and not guaranteed.", link:["Mutual Fund details","product.html?product=mutual-funds"] },
    { id:"fund-list", keys:["rated mutual funds","fund names","listed funds","which funds are listed"], answer:"The Mutual Funds page lists Quant Multi Asset Fund – Direct Growth, Edelweiss Mid Cap – Direct Plan Growth, Canara Robeco Infrastructure – Direct Growth, and Invesco India Mid Cap Fund – Direct Growth. Category and rating fields are not currently provided on the website.", link:["View the listed funds","product.html?product=mutual-funds"] },
    { id:"mf-vs-fd", keys:["mutual fund vs fixed deposit","mutual fund and fixed deposit","mf vs fd","fund or fd","fixed deposit"], answer:"A fixed deposit offers a fixed return set upfront. Mutual fund returns are market-linked and not guaranteed. Equity funds carry greater risk but have historically offered higher long-term growth potential than fixed deposits." },
    { id:"sip", keys:["systematic investment plan","monthly investment","what is sip","sip"], answer:"A Systematic Investment Plan invests a fixed amount in a mutual fund at regular intervals, usually monthly. It supports disciplined investing, rupee-cost averaging, long-term compounding potential, a low entry barrier, and the flexibility to pause, increase, decrease, or stop the SIP.", link:["SIP details","product.html?product=sip"], suggestions:["Can I pause my SIP?","SIP vs lumpsum","Are returns guaranteed?"] },
    { id:"sip-vs-lumpsum", keys:["sip vs lumpsum","sip and lumpsum","lumpsum investing","lump sum"], answer:"A SIP invests a fixed amount regularly, while a lumpsum is a one-time investment. SIPs may average entry costs across market levels and suit regular savers; a lumpsum may suit someone with capital ready to deploy." },
    { id:"pause-sip", keys:["pause sip","stop sip","modify sip","change sip","cancel sip"], answer:"Yes. SIPs can be paused, modified, or stopped at any time with no penalty, though staying invested for the long term generally helps you get the full benefit of compounding." },
    { id:"swp", keys:["systematic withdrawal plan","what is swp","swp","regular withdrawal"], answer:"An SWP lets you withdraw a fixed amount from a mutual fund at regular intervals while the remaining investment stays invested. It can provide regular income, redeem only enough units for each payment, keep the remaining capital invested, and allow changes to the amount, frequency, and duration.", link:["SWP details","product.html?product=swp"] },
    { id:"stp", keys:["systematic transfer plan","what is stp","stp"], answer:"An STP transfers a fixed amount at regular intervals from one scheme to another within the same AMC, often from a liquid or debt fund into an equity fund. It can move a lumpsum into the market gradually." },
    { id:"fof", keys:["fund of funds","fund of fund","what is fof","fof","international fund"], answer:"A Fund of Fund invests in units of other domestic or international mutual funds rather than buying stocks or bonds directly. It can provide diversification across funds, asset classes, or geographies, access to specialised strategies, professional selection, and one folio and NAV to track.", link:["Fund of Fund details","product.html?product=fof"] },
    { id:"elss", keys:["equity linked savings scheme","tax saving fund","section 80c","80c","what is elss","elss"], answer:"ELSS is an equity mutual fund that offers a tax deduction under Section 80C up to ₹1.5 lakh per financial year, subject to prevailing tax law, with market-linked growth potential. It has a mandatory three-year lock-in, and each SIP instalment has its own three-year lock-in.", link:["ELSS details","product.html?product=elss"] },
    { id:"pms-equity", keys:["equity pms","pms equity"], answer:"Equity PMS is a professionally managed portfolio of equity stocks held directly in your demat account. SEBI mandates a minimum investment of ₹50 lakh. Discretionary PMS lets the manager take decisions within the mandate; Non-Discretionary PMS requires your approval for each transaction.", link:["Equity PMS details","product.html?product=pms-equity"] },
    { id:"pms-debt", keys:["debt pms","pms debt"], answer:"Debt PMS is a professionally managed portfolio of government securities, corporate bonds, and money-market instruments held directly in your name. It focuses on balancing safety, liquidity, and returns, may be Discretionary or Non-Discretionary, and has the SEBI-mandated ₹50 lakh minimum.", link:["Debt PMS details","product.html?product=pms-debt"] },
    { id:"pms", keys:["portfolio management service","what is pms","pms"], answer:"PMS holds securities directly in the investor's account under a professional portfolio manager. It may be Discretionary or Non-Discretionary, and SEBI mandates a minimum investment of ₹50 lakh.", link:["Explore PMS information","products.html"], suggestions:["Equity PMS","Debt PMS"] },
    { id:"goal", keys:["goal based planning","goal planning","dream home","child education","education planning","retirement planning","marriage goal"], answer:"Goal Based Planning links investments to specific, time-bound goals such as buying a home, funding education, planning a wedding, or building a retirement corpus. It defines the target, timeframe, expected cost, product mix, savings plan, and separate progress tracking for each goal.", link:["Goal planning details","product.html?product=goal-planning"] },
    { id:"nav", keys:["net asset value","what is nav","nav"], answer:"NAV is a mutual fund scheme’s per-unit market value on a given day. It is calculated after deducting expenses and liabilities from scheme assets and dividing by the number of outstanding units." },
    { id:"direct-regular", keys:["direct vs regular","direct plan","regular plan","difference between direct and regular"], answer:"Both plans invest in the same underlying portfolio. A Regular Plan is purchased through a distributor and includes distribution commission in its expense ratio. A Direct Plan is purchased from the AMC and generally has a lower expense ratio. SuperMatrix facilitates Regular Plans, not Direct Plans." },
    { id:"charges", keys:["charges","charge","commission","fees","fee","cost to invest","does supermatrix charge","do you charge money","is supermatrix free","any payment"], answer:NO_SEPARATE_FEE },
    { id:"ter", keys:["total expense ratio","expense ratio","ter"], answer:"Total Expense Ratio (TER) is the annual cost charged by an AMC to manage and operate a scheme. It is deducted before NAV is published, and applicable maximum limits are regulated by SEBI." },
    { id:"exit-load", keys:["exit load","redemption fee"], answer:"Exit load is a fee that some schemes apply if units are redeemed before a specified holding period. Terms vary by scheme and are stated in the offer documents." },
    { id:"returns", keys:["guaranteed returns","return guaranteed","returns guaranteed","guarantee","profit guaranteed","expected return","interest rate","returns"], answer:"Mutual fund and PMS returns are market-linked and are not guaranteed. Calculator outputs are illustrations based on assumptions, not promises of future performance." },
    { id:"risk", keys:["can i lose money","mutual fund safe","investment safe","riskometer","market risk","risk"], answer:"Mutual funds are regulated by SEBI and scheme assets are held by independent custodians, but their values can rise or fall. Equity and debt funds both carry risks. The SEBI-mandated riskometer classifies schemes from Low to Very High risk." },
    { id:"tax", keys:["taxation","tax on returns","capital gains tax","mutual fund tax","tax"], answer:"Tax treatment depends on the fund type, holding period, and prevailing law, which may change. Please check current rules or seek guidance from a qualified tax professional before filing or acting on tax information." },
    { id:"track", keys:["track investments","portfolio status","sip status","download statement","statements","portfolio login"], answer:"Log in to the SuperMatrix portal or app anytime to view your portfolio, SIP status, returns, and download statements.", link:["Open Support Centre","support.html"] },
    { id:"folio", keys:["folio number","what is folio","folio"], answer:"A folio number is the AMC’s unique account number for recording your purchases, SIPs, and redemptions within that fund house." },
    { id:"nominee", keys:["nominee","nomination","joint holder","joint account"], answer:"You may add nominees, subject to applicable limits and processes, and can hold investments jointly under the selected mode of holding. Contact support for account-specific assistance.", contact:true },
    { id:"redeem", keys:["redeem","redemption","withdraw investment","withdraw money"], answer:"You can place a redemption request online through your portfolio dashboard. Funds are typically credited to your registered bank account within 1–3 business days, depending on the fund type.", link:["Get service assistance","support.html"] },
    { id:"complaint", keys:["complaint","grievance","escalation","scores","not resolved"], answer:"You can raise it through our Grievance Redressal process listed in the website footer, or escalate it as per our Complaint Escalation Matrix if it remains unresolved. If your complaint isn't resolved to your satisfaction, or there's no response within 30 days, you can escalate it to SEBI through the SCORES portal at scores.sebi.gov.in, or the SCORES mobile app.", link:["View grievance process","grievance.html"] },
    { id:"privacy", keys:["privacy","data protection","personal data","messages stored","chat stored"], answer:"The fixed FAQ chatbot processes questions in your browser and does not transmit or store chat messages. Read the website privacy notice for contact-form and local-storage information.", link:["Read privacy notice","privacy.html"] },
    { id:"disclosures", keys:["disclosure","commission disclosure","legal information","investor charter","terms"], answer:"The website provides dedicated pages covering Regular Plan commission, calculator limitations, risk information, website terms, investor resources, and grievances.", link:["Read important disclosures","disclosures.html"], suggestions:["Direct vs Regular Plans","Are returns guaranteed?","How do I raise a complaint?"] },
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
    const queryWords=query.split(" ");
    for (const item of knowledge) {
      let score=0;
      for (const key of item.keys) {
        const clean=normalise(key);
        if (query === clean) score+=12;
        else if(clean.length<=3 ? queryWords.includes(clean) : query.includes(clean)) score+=clean.split(" ").length*3;
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
