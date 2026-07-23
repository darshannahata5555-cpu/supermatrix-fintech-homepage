(() => {
  const layoutStyle=document.createElement("style");
  layoutStyle.textContent=`
    .calc-workbench{margin-top:0}
    .calc-grid{margin-top:42px}
    @media(max-width:560px){
      .calc-page{padding-top:22px}
      .calc-workbench{margin-top:0;border-radius:18px}
      .calc-form-panel{padding:24px 20px 20px}
      .calc-form-panel h2{font-size:27px;line-height:1.08;margin:8px 0 10px}
      .calc-form-panel>p{font-size:14px;line-height:1.5;margin-bottom:20px}
      .calc-fields{display:grid;grid-template-columns:1fr;gap:0;border-top:1px solid #e6edf6}
      .calc-field:first-child{grid-column:auto}
      .calc-field{display:grid;grid-template-columns:minmax(0,1fr) minmax(138px,160px);align-items:center;gap:12px;padding:11px 0;border-bottom:1px solid #e6edf6}
      .calc-field label{font-size:12px;line-height:1.3;color:#303a60}
      .input-wrap{height:42px;border-color:#d6e1ef;background:#f6f9fd}
      .calc-input{width:0;flex:1 1 0;padding:10px 8px;font-size:14px}
      .input-affix{padding-left:10px;font-size:12px}
      .input-affix.suffix{padding-right:10px;font-size:11px;line-height:1;white-space:nowrap;text-align:right}
      .calc-submit{margin-top:18px}
      .calc-result{min-height:0;padding:25px 20px}
      .result-primary{font-size:34px;margin-bottom:20px}
      .result-note{margin:18px 0 14px}
      .calc-grid{margin-top:28px}
    }
    @media(max-width:360px){
      .calc-form-panel{padding-left:16px;padding-right:16px}
      .calc-field{grid-template-columns:minmax(0,1fr) 130px;gap:8px}
    }`;
  document.head.appendChild(layoutStyle);
  const configs = {
    sip:{title:"SIP Calculator",description:"Estimate the potential future value of regular monthly investments.",fields:[["monthly","Monthly investment",10000,"₹",""],["years","Investment period",15,"","years"],["rate","Expected return",12,"","% p.a."]],calculate:v=>{const n=v.years*12,r=v.rate/1200,invested=v.monthly*n,total=r?v.monthly*((Math.pow(1+r,n)-1)/r)*(1+r):invested;return["Estimated future value",total,[["Total invested",invested],["Estimated returns",total-invested]]]}},
    lumpsum:{title:"Lumpsum Calculator",description:"Estimate how a one-time investment could grow over a selected period.",fields:[["amount","One-time investment",500000,"₹",""],["years","Investment period",10,"","years"],["rate","Expected return",12,"","% p.a."]],calculate:v=>{const total=v.amount*Math.pow(1+v.rate/100,v.years);return["Estimated future value",total,[["Amount invested",v.amount],["Estimated returns",total-v.amount]]]}},
    retirement:{title:"Retirement Calculator",description:"Estimate a retirement corpus based on future living expenses and retirement duration.",fields:[["expense","Current monthly expenses",60000,"₹",""],["years","Years until retirement",20,"","years"],["inflation","Expected inflation",6,"","% p.a."],["retirementYears","Years in retirement",25,"","years"],["postRate","Return during retirement",7,"","% p.a."]],calculate:v=>{const futureMonthly=v.expense*Math.pow(1+v.inflation/100,v.years),r=v.postRate/1200,n=v.retirementYears*12,corpus=r?futureMonthly*(1-Math.pow(1+r,-n))/r:futureMonthly*n;return["Estimated retirement corpus",corpus,[["First-year monthly expense",futureMonthly],["Retirement duration",v.retirementYears+" years"]]]}},
    goal:{title:"Goal Calculator",description:"Estimate the future cost of a goal and the monthly investment required.",fields:[["cost","Goal cost today",2500000,"₹",""],["years","Years to goal",10,"","years"],["inflation","Expected inflation",6,"","% p.a."],["rate","Expected return",12,"","% p.a."]],calculate:goalResult},
    education:{title:"Child Education Planner",description:"Plan for the inflation-adjusted cost of your child's higher education.",fields:[["cost","Education cost today",2000000,"₹",""],["years","Years until education",12,"","years"],["inflation","Education inflation",8,"","% p.a."],["rate","Expected return",12,"","% p.a."]],calculate:goalResult},
    home:{title:"Dream Home Planner",description:"Estimate the future home cost and monthly investment required for the down payment.",fields:[["cost","Home price today",10000000,"₹",""],["downPayment","Target down payment",20,"","%"],["years","Years until purchase",8,"","years"],["inflation","Property price inflation",5,"","% p.a."],["rate","Expected return",12,"","% p.a."]],calculate:v=>{const futureCost=v.cost*Math.pow(1+v.inflation/100,v.years),target=futureCost*v.downPayment/100,monthly=monthlyForTarget(target,v.years,v.rate);return["Required monthly investment",monthly,[["Estimated future home price",futureCost],["Target down payment",target]]]}},
  };
  try {
    const saved=JSON.parse(localStorage.getItem("supermatrix_admin_settings_v1")||"null");
    const defaults=saved?.calculators;
    if(defaults) configs.sip.fields.forEach(field=>{
      if(field[0]==="monthly" && Number(defaults.sipAmount)>0) field[2]=Number(defaults.sipAmount);
      if(field[0]==="years" && Number(defaults.sipYears)>0) field[2]=Number(defaults.sipYears);
      if(field[0]==="rate" && Number(defaults.sipRate)>0) field[2]=Number(defaults.sipRate);
    });
  } catch {}
  function monthlyForTarget(target,years,rate){const n=years*12,r=rate/1200,factor=r?((Math.pow(1+r,n)-1)/r)*(1+r):n;return factor?target/factor:0}
  function goalResult(v){const target=v.cost*Math.pow(1+v.inflation/100,v.years),monthly=monthlyForTarget(target,v.years,v.rate);return["Required monthly investment",monthly,[["Inflation-adjusted target",target],["Goal timeline",v.years+" years"]]]}
  function money(value){return new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(Math.max(0,value||0))}
  const cards=[...document.querySelectorAll(".calc-card")],form=document.getElementById("calcForm"),fields=document.getElementById("calcFields"),title=document.getElementById("calcTitle"),description=document.getElementById("calcDescription"),primaryLabel=document.getElementById("primaryLabel"),primaryValue=document.getElementById("primaryValue"),resultList=document.getElementById("resultList");
  let active="sip";
  function render(type,scroll=false){active=configs[type]?type:"sip";const c=configs[active];cards.forEach(card=>card.classList.toggle("active",card.dataset.calculator===active));title.textContent=c.title;description.textContent=c.description;fields.innerHTML=c.fields.map(([id,label,value,prefix,suffix])=>`<div class="calc-field"><label for="calc-${id}">${label}</label><span class="input-wrap">${prefix?`<span class="input-affix">${prefix}</span>`:""}<input class="calc-input" id="calc-${id}" name="${id}" type="number" min="0" step="any" value="${value}" required>${suffix?`<span class="input-affix suffix">${suffix}</span>`:""}</span></div>`).join("");calculate();history.replaceState(null,"",`?calculator=${active}`);if(scroll)document.getElementById("calculator").scrollIntoView({behavior:"smooth",block:"start"})}
  function calculate(){const c=configs[active],data={};new FormData(form).forEach((value,key)=>data[key]=Math.max(0,Number(value)));const [label,primary,rows]=c.calculate(data);primaryLabel.textContent=label;primaryValue.textContent=money(primary);resultList.innerHTML=rows.map(([name,value])=>`<div class="result-row"><span>${name}</span><strong>${typeof value==="number"?money(value):value}</strong></div>`).join("")}
  cards.forEach(card=>card.addEventListener("click",()=>render(card.dataset.calculator,true)));form.addEventListener("submit",event=>{event.preventDefault();calculate()});form.addEventListener("input",calculate);render(new URLSearchParams(location.search).get("calculator")||"sip");
})();
