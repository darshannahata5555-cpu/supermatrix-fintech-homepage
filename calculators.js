(() => {
  const configs = {
    sip:{title:"SIP Calculator",description:"Estimate the potential future value of regular monthly investments.",fields:[["monthly","Monthly investment",10000,"₹",""],["years","Investment period",15,"","years"],["rate","Expected return",12,"","% p.a."]],calculate:v=>{const n=v.years*12,r=v.rate/1200,invested=v.monthly*n,total=r?v.monthly*((Math.pow(1+r,n)-1)/r)*(1+r):invested;return["Estimated future value",total,[["Total invested",invested],["Estimated returns",total-invested]]]}},
    lumpsum:{title:"Lumpsum Calculator",description:"Estimate how a one-time investment could grow over a selected period.",fields:[["amount","One-time investment",500000,"₹",""],["years","Investment period",10,"","years"],["rate","Expected return",12,"","% p.a."]],calculate:v=>{const total=v.amount*Math.pow(1+v.rate/100,v.years);return["Estimated future value",total,[["Amount invested",v.amount],["Estimated returns",total-v.amount]]]}},
    retirement:{title:"Retirement Calculator",description:"Estimate a retirement corpus based on future living expenses and retirement duration.",fields:[["expense","Current monthly expenses",60000,"₹",""],["years","Years until retirement",20,"","years"],["inflation","Expected inflation",6,"","% p.a."],["retirementYears","Years in retirement",25,"","years"],["postRate","Return during retirement",7,"","% p.a."]],calculate:retirementResult},
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
  function retirementResult(v){
    const futureMonthly=v.expense*Math.pow(1+v.inflation/100,v.years);
    const r=v.postRate/1200,g=v.inflation/1200,n=v.retirementYears*12;
    const corpus=Math.abs(r-g)<1e-10
      ? futureMonthly*n/(1+r)
      : futureMonthly/(r-g)*(1-Math.pow((1+g)/(1+r),n));
    return["Estimated retirement corpus",corpus,[["First-year monthly expense",futureMonthly],["Retirement duration",v.retirementYears+" years"],["Inflation during retirement",v.inflation+"% p.a."]]]
  }
  function goalResult(v){const target=v.cost*Math.pow(1+v.inflation/100,v.years),monthly=monthlyForTarget(target,v.years,v.rate);return["Required monthly investment",monthly,[["Inflation-adjusted target",target],["Goal timeline",v.years+" years"]]]}
  function money(value){return new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(Math.max(0,value||0))}
  function rangeFor(id,value){
    const presets={
      monthly:[500,200000,500],amount:[10000,10000000,10000],expense:[5000,500000,5000],
      cost:[100000,50000000,100000],years:[1,40,1],retirementYears:[1,40,1],
      rate:[0,20,.5],postRate:[0,15,.5],inflation:[0,15,.5],downPayment:[5,100,5]
    };
    const [min,max,step]=presets[id]||[0,Math.max(Number(value)*3,100),1];
    return {min,max:Math.max(max,Number(value)),step};
  }
  const cards=[...document.querySelectorAll(".calc-card")],form=document.getElementById("calcForm"),fields=document.getElementById("calcFields"),title=document.getElementById("calcTitle"),description=document.getElementById("calcDescription"),primaryLabel=document.getElementById("primaryLabel"),primaryValue=document.getElementById("primaryValue"),resultList=document.getElementById("resultList");
  let active="sip";
  function render(type,scroll=false){active=configs[type]?type:"sip";const c=configs[active];cards.forEach(card=>card.classList.toggle("active",card.dataset.calculator===active));title.textContent=c.title;description.textContent=c.description;fields.innerHTML=c.fields.map(([id,label,value,prefix,suffix])=>{const range=rangeFor(id,value),progress=((value-range.min)/(range.max-range.min))*100;return `<div class="calc-field"><label for="calc-${id}">${label}</label><span class="input-wrap">${prefix?`<span class="input-affix">${prefix}</span>`:""}<input class="calc-input" id="calc-${id}" name="${id}" type="number" min="${range.min}" max="${range.max}" step="${range.step}" value="${value}" required>${suffix?`<span class="input-affix suffix">${suffix}</span>`:""}</span><input class="calc-range" type="range" min="${range.min}" max="${range.max}" step="${range.step}" value="${value}" data-field="${id}" aria-label="${label} slider" style="--range-progress:${progress}%"></div>`}).join("");bindRanges();calculate();history.replaceState(null,"",`?calculator=${active}`);if(scroll)document.getElementById("calculator").scrollIntoView({behavior:"smooth",block:"start"})}
  function setRangeProgress(range){const min=Number(range.min),max=Number(range.max),value=Number(range.value);range.style.setProperty("--range-progress",`${((value-min)/(max-min))*100}%`)}
  function bindRanges(){
    fields.querySelectorAll(".calc-range").forEach(range=>{
      const number=form.elements[range.dataset.field];
      range.addEventListener("input",()=>{number.value=range.value;setRangeProgress(range);calculate()});
      number.addEventListener("input",()=>{range.value=Math.min(Number(range.max),Math.max(Number(range.min),Number(number.value)||0));setRangeProgress(range)});
      number.addEventListener("change",()=>{number.value=Math.min(Number(number.max),Math.max(Number(number.min),Number(number.value)||Number(number.min)));range.value=number.value;setRangeProgress(range);calculate()});
    });
  }
  function calculate(){
    const invalid=[...form.querySelectorAll(".calc-input")].find(input=>!input.checkValidity()||!Number.isFinite(Number(input.value)));
    if(invalid){
      primaryLabel.textContent="Check your inputs";primaryValue.textContent="—";
      const fieldLabel=invalid.closest(".calc-field")?.querySelector("label")?.textContent||invalid.name;
      resultList.innerHTML=`<div class="result-row"><span>${fieldLabel}</span><strong>Enter ${invalid.min} to ${invalid.max}</strong></div>`;
      return
    }
    const c=configs[active],data={};new FormData(form).forEach((value,key)=>data[key]=Number(value));
    const [label,primary,rows]=c.calculate(data);
    if(!Number.isFinite(primary)){primaryLabel.textContent="Unable to calculate";primaryValue.textContent="—";resultList.innerHTML="";return}
    primaryLabel.textContent=label;primaryValue.textContent=money(primary);resultList.innerHTML=rows.map(([name,value])=>`<div class="result-row"><span>${name}</span><strong>${typeof value==="number"?money(value):value}</strong></div>`).join("")
  }
  cards.forEach(card=>card.addEventListener("click",()=>render(card.dataset.calculator,true)));form.addEventListener("submit",event=>{event.preventDefault();calculate()});form.addEventListener("input",calculate);render(new URLSearchParams(location.search).get("calculator")||"sip");
})();
