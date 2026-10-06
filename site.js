'use strict';
let language='ar';
const $=s=>document.querySelector(s);
const model=AeroModel.calculate(AERO_DATA,{...AeroModel.defaults});
function showReading(){
 const i=Number($('#hour').value),r=model[i];
 $('#vwc').textContent=r.after.toFixed(3);
 $('#hour-label').textContent=r.timestamp.slice(0,16);
 $('#valve-state').textContent=language==='ar'?(r.open?'الصمام مفتوح':'الصمام مغلق'):(r.open?'Valve open':'Valve closed');
 $('#valve-state').classList.toggle('open',r.open);
 $('#hour').setAttribute('aria-valuetext',r.timestamp+' · '+r.after.toFixed(3)+' m³/m³');
 const x=n=>10+n/335*620,y=v=>175-(v-.08)/.12*150;
 const path=model.map((v,n)=>(n?'L':'M')+x(n).toFixed(1)+','+y(v.after).toFixed(1)).join(' ');
 const thresholdY=y(r.threshold);
 $('#moisture-chart').innerHTML=`<title>${language==='ar'?'رطوبة التربة عبر 336 ساعة من المحاكاة':'Soil moisture across 336 simulation hours'}</title><defs><linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#76975d" stop-opacity=".22"/><stop offset="1" stop-color="#76975d" stop-opacity="0"/></linearGradient></defs>${[50,100,150].map(n=>`<line x1="10" x2="630" y1="${n}" y2="${n}" stroke="#dfe6d7" stroke-width="1"/>`).join('')}<path d="${path} L630,185 L10,185 Z" fill="url(#chart-fill)"/><path d="${path}" fill="none" stroke="#527747" stroke-width="2.5" stroke-linejoin="round"/><line x1="10" x2="630" y1="${thresholdY}" y2="${thresholdY}" stroke="#b99059" stroke-dasharray="6 5"/><text x="15" y="${thresholdY-7}" fill="#9b7746" font-size="11" font-family="Manrope">0.125</text><line x1="${x(i)}" x2="${x(i)}" y1="15" y2="185" stroke="#173e35" stroke-opacity=".35"/><circle cx="${x(i)}" cy="${y(r.after)}" r="5" fill="#173e35" stroke="#fff" stroke-width="2"/>`;
}
function setLanguage(next){language=next;document.documentElement.lang=next;document.documentElement.dir=next==='ar'?'rtl':'ltr';document.querySelectorAll('[data-ar][data-en]').forEach(el=>{el.innerHTML=el.dataset[next]});$('#language').textContent=next==='ar'?'EN':'عربي';$('#language').setAttribute('aria-label',next==='ar'?'Switch to English':'التبديل إلى العربية');document.title=next==='ar'?'AeroCRNS — نفهم الأرض. لنروي بذكاء.':'AeroCRNS — Understand the soil. Water wisely.';document.querySelectorAll('a[href*="platform/"]').forEach(a=>{const u=new URL(a.href);u.searchParams.set('lang',next);a.href=u.pathname+u.search+u.hash});showReading();}
$('#hour').addEventListener('input',showReading);$('#language').addEventListener('click',()=>setLanguage(language==='ar'?'en':'ar'));
$('#menu').addEventListener('click',()=>{const open=$('#navigation').classList.toggle('is-open');$('#menu').setAttribute('aria-expanded',String(open))});$('#navigation').addEventListener('click',e=>{if(e.target.closest('a')){$('#navigation').classList.remove('is-open');$('#menu').setAttribute('aria-expanded','false')}});
const video=$('#inline-film'),filmStatus=$('#film-status');
function showFilmMessage(){filmStatus.hidden=false;filmStatus.textContent=language==='ar'?'تعذّر التشغيل التلقائي. اضغط تشغيل في المشغل، أو افتح الفيديو مباشرة.':'Press play in the player, or use the direct video link.';}
document.querySelectorAll('[data-play]').forEach(button=>button.addEventListener('click',()=>{video.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});video.play().catch(showFilmMessage);}));
video.addEventListener('playing',()=>{filmStatus.hidden=true;});
video.addEventListener('error',showFilmMessage);
document.querySelectorAll('.tech-steps details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)document.querySelectorAll('.tech-steps details').forEach(other=>{if(other!==d)other.open=false;});}));
setLanguage(new URLSearchParams(location.search).get('lang')==='en'?'en':'ar');


