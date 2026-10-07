(() => {
'use strict';
const profiles=new Map(),systems=new Map();
let current=null, currentInputs=null;
const t=(ar,en)=>document.documentElement.lang==='en'?en:ar;
const f=(v,n=3)=>v===null||v===undefined?'—':Number(v).toFixed(n);
const id=s=>[s.id,s.crop,s.stage].join('|');
const sysid=s=>[s.id,s.irrigation].join('|');
function state(s){
 if(!profiles.has(id(s))){const c=AeroFAO.crops[s.crop],cropCase=window.AERO_AGRONOMY?.farms.find(f=>f.crop===s.crop),max=c?(c.z[0]+c.z[1])/2:(cropCase?.rootDepth||100)/100;
 profiles.set(id(s),{etc:5,texture:0,zmin:.17,zmax:max,day:30,fullDay:90,root:max,mode:c?.perennial||!c?'direct':'growth'});}
 if(!systems.has(sysid(s)))systems.set(sysid(s),{efficiency:null,rate:null,area:null});
 return {...profiles.get(id(s)),...systems.get(sysid(s))};
}
function calculate(base,s){
 if(!base){current=null;currentInputs=null;return null;}
 currentInputs={...state(s),...base,p0:base.mad};current=AeroFAO.calculate(currentInputs);return current;
}
function field(k,label,value,extra='') {return `<label for="fao-${k}">${label}<input id="fao-${k}" name="${k}" type="number" step="any" value="${value??''}" ${extra}></label>`;}
function markup(base,s){
 const a=state(s),c=AeroFAO.crops[s.crop];
 return `<section class="fao-planner"><div class="ag-heading"><h3>${t('حساب الري وفق FAO-56','FAO-56 irrigation calculation')}</h3><span class="ag-badge">${t('سيناريو قابل للتعديل','Editable scenario')}</span></div>
 <p class="ag-note">${t('ETc = 5 مم/يوم افتراض تجريبي قابل للتعديل، وليس طقسًا مباشرًا للمنطقة. أدخل البخر-نتح اليومي للمحصول بعد مراعاة مرحلة النمو. القيم محفوظة أثناء الجلسة لكل موقع ومحصول ومرحلة.','ETc = 5 mm/day is an editable demo assumption, not live local weather. Enter daily crop evapotranspiration appropriate to the growth stage. Inputs are retained for each location/crop/stage during this session.')}</p>
 <form id="fao-form"><div class="ag-selects fao-inputs">
 ${field('etc',t('ETc · مم/يوم','ETc · mm/day'),a.etc,'min="0" required')}
 <label for="fao-texture">${t('تصحيح القوام النسبي','Relative texture correction')}<select id="fao-texture">${[[0,t('بدون تصحيح','No correction')],[.05,t('خشنة +5%','Coarse +5%')],[.1,t('خشنة +10%','Coarse +10%')],[-.05,t('ناعمة −5%','Fine −5%')],[-.1,t('ناعمة −10%','Fine −10%')]].map(([v,n])=>`<option value="${v}" ${v===a.texture?'selected':''}>${n}</option>`).join('')}</select></label>
 <label for="fao-mode">${t('تحديد عمق الجذور','Root depth method')}<select id="fao-mode"><option value="growth" ${a.mode==='growth'?'selected':''}>${t('نمو خطي للمحاصيل الحولية','Annual crop linear growth')}</option><option value="direct" ${a.mode==='direct'?'selected':''}>${t('عمق يحدده المختص / الأشجار','Specialist depth / trees')}</option></select></label>
 ${field('root',t('العمق المحدد · م','Specified depth · m'),a.root,'min="0.01" required')}
 ${field('zmin',t('العمق الابتدائي · م','Initial depth · m'),a.zmin,'min="0.01" required')}
 ${field('zmax',t('العمق الأقصى · م','Maximum depth · m'),a.zmax,'min="0.01" required')}
 ${field('day',t('أيام منذ الزراعة','Days since planting'),a.day,'min="0" required')}
 ${field('fullDay',t('أيام بلوغ العمق الأقصى','Days to maximum depth'),a.fullDay,'min="1" required')}
 ${field('efficiency',t('كفاءة نظام الري · %','Irrigation efficiency · %'),a.efficiency===null?null:a.efficiency*100,'min="0.1" max="100"')}
 ${field('rate',t('معدل تطبيق الماء · مم/ساعة','Application rate · mm/h'),a.rate,'min="0.001"')}
 ${field('area',t('المساحة المروية · م²','Irrigated area · m²'),a.area,'min="0.001"')}
 </div><button class="btn" type="submit">${t('إعادة الحساب','Recalculate')}</button><p id="fao-error" role="alert"></p></form>
 <p class="ag-note">${c?t('p الأساسي ومدى الجذور من جدول 2 في الورقة. العمق الأقصى الابتدائي هو منتصف المدى: ','Base p and root range come from paper Table 2. Initial maximum depth is the range midpoint: ')+c.z.join('–')+' m.':t('المانجو غير مدرج في جدول 2؛ p وعمق الجذور الابتدائيان من الحالة التجريبية ويجب اعتمادهما من المختص.','Mango is absent from Table 2; initial p and root depth use the test case and require specialist approval.')} ${t('30 و90 يومًا مثالان للتجربة، وليسا مدة نمو موصى بها. اسم المرحلة لا يحدد عمر النبات رقميًا؛ عدّل الأيام وETc وفق حالته. للنخيل والزيتون استخدم العمق المحدد بدل نموذج الحوليات. معاملات القمح تخص القمح الربيعي، والذرة تخص ذرة الحبوب.','30 and 90 days are demo inputs, not recommended crop durations. A stage name does not define plant age; edit days and ETc to match. Use specified depth for palms and olives. Wheat uses spring wheat parameters; maize uses grain maize.')}</p>
 <div id="fao-results" aria-live="polite"></div>
 <p class="ag-note">${t('كفاءة الري ومعدل التطبيق والمساحة تُدخل لكل نظام؛ لا نفترض كفاءة من اسمه. لا يوجد ربط بمسبار جذور أو محطة طقس. كمية الري تقدير مشروط بتمثيل قراءة الرطوبة لمنطقة الجذور، ويحتاج تحققًا عمقيًا خاصة للأشجار.','Efficiency, application rate and area are entered for each system; its name does not determine efficiency. No root probe or weather station is connected. Irrigation depth assumes moisture represents the root zone and requires depth validation, especially for trees.')}</p>
 <details><summary>${t('المعادلات والمصدر','Equations and source')}</summary><p dir="ltr">pET = clamp(p₀ + 0.04 × (5 − ETc), 0.1, 0.8)<br>p = clamp(pET × (1 + texture), 0.1, 0.8)<br>θthr = FC − p × (FC − WP)<br>Zr = Zmin + (Zmax − Zmin) × clamp(day / fullDay, 0, 1)<br>TAW = 1000 × (FC − WP) × Zr; RAW = p × TAW<br>net = max(0, 1000 × (FC − θ) × Zr) if θ ≤ θthr; otherwise 0<br>gross = net / efficiency; hours = gross / rate; volume = gross × area / 1000</p><p class="ag-note">${t('المعادلات الأساسية من الورقة؛ تحويل العمق إلى كمية إجمالية ومدة تشغيل امتداد حسابي بوحدات النظام المدخلة، وليس قياسًا ميدانيًا.','Core equations follow the paper; gross depth, volume and runtime are dimensional extensions using entered system parameters, not field measurements.')}</p><a href="references/irrigation-threshold.pdf" target="_blank" rel="noopener">${t('ورقة عتبة الري','Threshold paper')}</a> · <a href="https://www.fao.org/4/x0490e/x0490e0e.htm" target="_blank" rel="noopener">FAO-56 · Chapter 8</a></details></section>`;
}
function refresh(){
 const el=document.querySelector('#fao-results');if(!el)return;
 if(!current){el.textContent=t('أكمل قيم التربة والمحصول.','Complete soil and crop parameters.');return;}
 const r=results[cursor],water=AeroFAO.irrigation(currentInputs,current,r.after);
 const items=[[t('p بعد تصحيح ETc','p after ETc'),f(current.climateP)],[t('p النهائي','Final p'),f(current.adjustedP)],[t('العتبة الأساسية','Base threshold'),f(current.baseThreshold)+' m³/m³'],[t('العتبة المصححة','Adjusted threshold'),f(current.threshold)+' m³/m³'],['Zr',f(current.z)+' m'],['TAW',f(current.taw,2)+' mm'],['RAW',f(current.raw,2)+' mm'],[t('صافي الري عند الساعة المختارة','Net irrigation at selected hour'),f(water.net,2)+' mm'],[t('عمق الري الإجمالي','Gross irrigation depth'),f(water.gross,2)+' mm'],[t('حجم الماء','Water volume'),f(water.volume,2)+' m³'],[t('مدة التشغيل','Runtime'),f(water.hours,2)+' h']];
 el.innerHTML=`<div class="fao-output-grid">${items.map(([k,v])=>`<div><small>${k}</small><strong dir="ltr">${v}</strong></div>`).join('')}</div><p class="ag-note">${t('النتائج تخص الساعة المختارة من المحاكاة. عند العتبة يكون صافي الري مساويًا لـRAW؛ تحتها يُحسب العجز حتى FC. لا تُجمع تقديرات الساعات كاستهلاك فعلي. علامة — تعني أن كفاءة الري أو معدل التطبيق أو المساحة لم تُدخل.','Results use the selected simulation hour. At the threshold, net depth equals RAW; below it, the deficit to FC is calculated. Hourly estimates are not summed as actual consumption. — indicates missing efficiency, rate or area.')}</p>`;
}
function bind(base,s,onApply){
 const form=document.querySelector('#fao-form');if(!form)return;
 const toggle=()=>{const direct=form.querySelector('#fao-mode').value==='direct';for(const k of ['zmin','zmax','day','fullDay'])form.querySelector('#fao-'+k).disabled=direct;form.querySelector('#fao-root').disabled=!direct;};
 form.querySelector('#fao-mode').onchange=toggle;toggle();
 form.onsubmit=e=>{e.preventDefault();const next={};for(const k of ['etc','texture','zmin','zmax','day','fullDay','root','efficiency','rate','area']){const v=form.querySelector('#fao-'+k).value;next[k]=v.trim()===''?null:Number(v);}next.mode=form.querySelector('#fao-mode').value;if(next.efficiency!==null)next.efficiency/=100;
 try{if(!base)throw Error();AeroFAO.calculate({...next,...base,p0:base.mad});profiles.set(id(s),next);systems.set(sysid(s),{efficiency:next.efficiency,rate:next.rate,area:next.area});onApply();}catch{form.querySelector('#fao-error').textContent=t('راجع المدخلات: FC أكبر من WP؛ العمق الأقصى لا يقل عن الابتدائي؛ الأيام موجبة والكفاءة بين 0 و100%.','Check inputs: FC > WP; maximum depth ≥ initial depth; positive duration and efficiency within 0–100%.');}};
 refresh();
}
window.FaoPlanner={calculate,markup,bind,refresh,get current(){return current;},get inputs(){return currentInputs;}};
})();
