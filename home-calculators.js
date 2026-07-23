(() => {
  const limits={monthly:[500,200000,500],amount:[10000,10000000,10000],expense:[5000,500000,5000],cost:[100000,100000000,100000],years:[1,40,1],retirementYears:[1,40,1],rate:[1,20,.5],postRate:[1,15,.5],inflation:[1,15,.5],downPayment:[5,100,5]};
  const labels={sip:"SIP",lumpsum:"Lumpsum",retirement:"Retirement",goal:"Goal",education:"Child Education",home:"Dream Home"};
  function start(){
    const engine=window.SuperMatrixCalculatorEngine,section=document.getElementById("tools");if(!engine||!section)return false;
    if(section.querySelector(".sm-tools-inner"))return true;
    const {configs,money}=engine;section.classList.add("sm-tools");section.innerHTML=`<div class="sm-tools-inner"><div class="sm-tools-head"><span class="eyebrow">Financial Calculators</span><h2>Plan your numbers before you invest</h2></div><div class="sm-calc-tabs" role="tablist"></div><section class="sm-home-calc"><div class="sm-home-inputs"><span class="sm-home-pill"></span><h3></h3><div class="sm-home-fields"></div></div><aside class="sm-home-result"><div class="sm-donut"><div class="sm-donut-copy"><span></span><strong></strong></div></div><div class="sm-result-list"></div><p class="sm-result-disclaimer">Illustrative estimate only. Actual returns and outcomes may vary. Mutual Fund investments are subject to market risks.</p></aside></section></div>`;
    const tabs=section.querySelector(".sm-calc-tabs"),panel=section.querySelector(".sm-home-calc"),fields=section.querySelector(".sm-home-fields");let active="sip";
    Object.keys(configs).forEach(type=>{const b=document.createElement("button");b.type="button";b.className="sm-calc-tab";b.dataset.type=type;b.textContent=labels[type];b.addEventListener("click",()=>switchTo(type));tabs.appendChild(b)});
    function formatField(id,value){if(["years","retirementYears"].includes(id))return `${value} yrs`;if(["rate","postRate","inflation","downPayment"].includes(id))return `${value}%`;return money(value)}
    function calculate(){const c=configs[active],values={};fields.querySelectorAll("input").forEach(input=>values[input.name]=+input.value);const [primaryLabel,primary,rows]=c.calculate(values);panel.querySelector(".sm-donut-copy span").textContent=primaryLabel;panel.querySelector(".sm-donut-copy strong").textContent=money(primary);const monetary=rows.filter(row=>typeof row[1]==="number"),base=monetary[0]?.[1]||primary,pct=Math.max(8,Math.min(92,primary?base/primary*100:50));panel.querySelector(".sm-donut").style.setProperty("--fill",pct+"%");panel.querySelector(".sm-result-list").innerHTML=rows.map(([name,value])=>`<div class="sm-result-line"><span>${name}</span><strong>${typeof value==="number"?money(value):value}</strong></div>`).join("")+`<div class="sm-result-line total"><span>${primaryLabel}</span><strong>${money(primary)}</strong></div>`}
    function switchTo(type){active=type;const c=configs[type];tabs.querySelectorAll("button").forEach(b=>{const selected=b.dataset.type===type;b.classList.toggle("active",selected);b.setAttribute("aria-selected",String(selected))});panel.querySelector(".sm-home-pill").textContent=c.title;panel.querySelector("h3").textContent=type==="sip"?"See your monthly SIP grow":c.description;fields.innerHTML=c.fields.map(([id,label,value])=>{const [min,max,step]=limits[id]||[0,100,1];return `<div class="sm-range-field"><div class="sm-range-top"><label for="home-${id}">${label}</label><strong class="sm-range-value">${formatField(id,value)}</strong></div><input id="home-${id}" name="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${value}"></div>`}).join("");fields.querySelectorAll("input").forEach(input=>input.addEventListener("input",()=>{input.closest(".sm-range-field").querySelector(".sm-range-value").textContent=formatField(input.name,+input.value);calculate()}));panel.classList.remove("is-switching");void panel.offsetWidth;panel.classList.add("is-switching");window.setTimeout(()=>panel.classList.remove("is-switching"),360);calculate()}
    switchTo("sip");return true;
  }
  function boot(){
    start();
    const observer=new MutationObserver(start);
    observer.observe(document.documentElement,{childList:true,subtree:true});
    const interval=window.setInterval(start,250);
    window.setTimeout(()=>{observer.disconnect();window.clearInterval(interval);start()},5000);
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot);else boot();
})();
