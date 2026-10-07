/* Workbook reference values are illustrative; specialist edits are browser-local. */
(() => {
  'use strict';
  const data = window.AERO_AGRONOMY, storageKey = 'aerocrns-agronomy-v1';
  let saved = {}, selection = {...data.farms[0]}, active = null, message = '';
  try { saved = JSON.parse(localStorage.getItem(storageKey)) || {}; } catch {}
  if (!saved || typeof saved !== 'object' || Array.isArray(saved)) saved = {};
  const names = {'Farm A':'المزرعة A','Farm B':'المزرعة B','Farm C':'المزرعة C',Sandy:'رملية','Loamy Sand':'رملية طميية',Loam:'طميية','Date Palm':'نخيل',Tomato:'طماطم',Wheat:'قمح',Establishment:'التأسيس',Vegetative:'النمو الخضري',Mature:'النضج','Flowering/Fruiting':'الإزهار والإثمار','Grain Filling':'امتلاء الحبوب',Custom:'مرحلة مخصصة'};
  const en = () => document.documentElement.lang === 'en';
  const t = (ar,english) => en() ? english : ar;
  Object.assign(names,{'Sandy Loam':'طميية رملية',Barley:'شعير',Olive:'زيتون',Potato:'بطاطس',Maize:'ذرة',Mango:'مانجو',Onion:'بصل','Mid-season':'منتصف الموسم','Bearing trees':'أشجار مثمرة',Fruiting:'إثمار','Bulb formation':'تكوين الأبصال'});
  const name = value => {
    const farm=data.farms.find(f=>f.id===value && f.dataset==='ten-farms');
    if(farm)return en()?`Test ${value.slice(-2)} · ${farm.crop} · ${farm.city}`:`${farm.label} · ${names[farm.crop]||farm.crop} · ${farm.city}`;
    return en() ? value : names[value] || value;
  };
  const selectedFarm = () => data.farms.find(f=>f.id===selection.id);
  const key = () => [selection.id,selection.soil,selection.crop,selection.stage].join('|');
  const reference = () => {
    const farm=selectedFarm();
    if(farm.dataset==='ten-farms')return ['soil','crop','stage'].every(k=>farm[k]===selection[k])?{fc:farm.fc,wp:farm.wp,mad:farm.mad}:null;
    const soil=data.soils.find(s=>s.id===selection.soil), stage=data.stages.find(s=>s.crop===selection.crop && s.stage===selection.stage);
    return soil && stage && [soil.fc,soil.wp,stage.mad].every(Number.isFinite) ? {fc:soil.fc,wp:soil.wp,mad:stage.mad} : null;
  };
  const valid = p => { try { AeroModel.validate({...params,...p}); return ['fc','wp','mad'].every(k=>Number.isFinite(p[k])); } catch { return false; } };
  const persist = () => { try { localStorage.setItem(storageKey,JSON.stringify(saved)); return true; } catch { return false; } };
  const panel=document.createElement('section'); panel.id='agronomy'; panel.className='agronomy'; panel.setAttribute('data-i18n-ignore','');
  document.querySelector('#main').before(panel);
  const option=(v,current)=>`<option value="${v}" ${v===current?'selected':''}>${name(v)}</option>`;
  function select(field,ar,english,values) {
    return `<label for="ag-${field}"><span>${t(ar,english)}</span><select id="ag-${field}">${values.map(v=>option(v,selection[field])).join('')}</select></label>`;
  }
  function updateContext() {
    const references=document.querySelector(".sources-card");
    if(references) references.outerHTML=scientificReferences();
    const context=document.querySelector('.context-bar');
    if(context){context.setAttribute('data-i18n-ignore','');context.textContent=[name(selection.id),name(selection.soil),name(selection.crop),name(selection.stage),t('إعادة تشغيل بيانات محاكاة ثابتة · أغسطس 2026','Fixed simulation replay · August 2026')].join(' · ');}
    document.querySelector('#main').hidden=!active;
  }
  function render() {
    const stages=[...new Set(data.stages.filter(s=>s.crop===selection.crop).map(s=>s.stage).concat(selection.stage,'Custom'))];
    const ref=reference(), p=active || ref, farm=selectedFarm();
    panel.innerHTML=`<div class="ag-heading"><div><p class="eyebrow">FIELD PROFILE / DEMO</p><h2>${t('ابدأ من مزرعتك','Start with your farm')}</h2></div><span class="ag-badge">${t('قيم تجريبية تحتاج معايرة','Demo values · calibration required')}</span></div>
      <div class="ag-selects">${select('id','01 المزرعة','01 Farm',data.farms.map(f=>f.id))}${select('soil','02 نوع التربة','02 Soil',data.soils.map(s=>s.id))}${select('crop','03 المحصول','03 Crop',[...new Set(data.stages.map(s=>s.crop))])}${select('stage','04 مرحلة النمو','04 Growth stage',stages)}</div>
      <div class="ag-values"><span>FC <b>${p ? p.fc.toFixed(3):'—'}</b> m³/m³</span><span>WP <b>${p ? p.wp.toFixed(3):'—'}</b> m³/m³</span><span>MAD <b>${p ? (p.mad*100).toFixed(1)+'%':'—'}</b></span><span class="ag-trigger">${t('عتبة الري','Irrigation threshold')} <b>${p ? (p.fc-p.mad*(p.fc-p.wp)).toFixed(3):'—'}</b> m³/m³</span></div>
      <p class="ag-status" role="status">${active ? (saved[key()] ? t('مطبّق: تعديلات المختص لهذا الاختيار.','Applied: specialist edits for this selection.') : t('مطبّق: قيم اختبار من الملف؛ تحتاج معايرة واعتمادًا موقعيًا.','Applied: workbook test values; site calibration and approval required.')) : t('توقفت النتائج: لا توجد قيم مطابقة لهذا الاختيار في الحالة الأصلية. استعد اختيارات الحالة أو أدخل قيم المختص أدناه.','Results paused: no matching values for this combination in the original case. Restore the case selections or enter specialist values below.')}</p>
      ${farm.dataset==='ten-farms'?`<details class="ag-case"><summary>${t('بيانات الحالة ومصدرها','Case data and source')}</summary><p class="ag-note">${t('بيانات الحالة الأصلية في الملف، وقد تختلف عن اختياراتك المعدّلة. حقول العمق والملوحة والاحتياج المائي معروضة للتوثيق ولا تدخل في معادلة العتبة الحالية.','Original workbook case data may differ from your edited selections. Depth, salinity and water needs are shown for reference and do not enter the current threshold formula.')}</p><dl class="ag-case-grid" lang="ar" dir="rtl">${[['المنطقة / المحافظة',farm.region+' / '+farm.city],['الصنف',farm.variety],['نظام الري',farm.irrigation],['المرحلة الأصلية',names[farm.stage]||farm.stage],['عمق الجذور الاختباري',farm.rootDepth+' سم'],['EC اختباري، ليس قياسًا',farm.ec+' '+farm.ecUnit],['الاحتياج المائي',farm.waterNeed+' ('+farm.waterUnit+')'],['الشهر / الموسم',farm.season],['حالة البيانات',farm.status]].map(([k,v])=>`<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl><p lang="ar" dir="rtl" class="ag-note">${farm.note}</p><a href="${farm.sourceUrl}" target="_blank" rel="noopener noreferrer" lang="ar">${farm.sourceTitle} ↗</a><button type="button" id="ag-reset-case" class="btn">${t('استعادة اختيارات الحالة الأصلية','Restore original case selections')}</button></details>`:''}
      <details ${!active?'open':''}><summary>${t('إعدادات المختص الزراعي','Agricultural specialist settings')}</summary><form id="ag-form" novalidate><p>${t('عدّل قيم هذا الموقع والمحصول بعد مراجعة المعايرة والعوامل الزراعية. التعديلات تحفظ في هذا المتصفح فقط؛ هذه واجهة تجريبية بلا حسابات أو صلاحيات مستخدمين.','Edit this site and crop profile after reviewing calibration and agronomic factors. Changes are saved only in this browser; this demo has no user accounts or role enforcement.')}</p><div class="ag-edit">${['fc','wp','mad'].map(k=>`<label for="ag-edit-${k}">${k.toUpperCase()} ${k==='mad'?'(0–1)':'(m³/m³)'}<input id="ag-edit-${k}" name="${k}" type="number" step="any" min="0" max="${k==='mad'?1:.6}" required value="${p?p[k]:''}"></label>`).join('')}<button class="btn" type="submit">${t('تطبيق وحفظ القيم','Apply and save')}</button><button class="btn" id="ag-restore" type="button">${t('استعادة قيم الملف','Restore reference')}</button></div><p id="ag-error" role="alert"></p></form></details>
      <p class="ag-note">${t('السلسلة المعروضة هي 336 ساعة من المحاكاة الأصلية، وليست قياسات المزارع المختارة. الاختيارات تغيّر عتبة الري ونتائج المحاكاة. يلزم اعتماد معايرة الموقع والقيم الزراعية قبل أي قرار ري ميداني.','The displayed series replays 336 hours from the original simulation, not measurements from the selected farms. Selections change the irrigation threshold and simulated decisions. Site calibration and agronomic values require approval before field irrigation.')}</p>
      <p class="ag-note">${t('قيم الدليل FC = 0.18 وWP = 0.07 وMAD = 0.5 مثال توضيحي فقط، وليست ثوابت لجميع المزارع.','The guide values FC = 0.18, WP = 0.07 and MAD = 0.5 are an illustrative example, not constants for all farms.')}</p>
      <small class="ag-source">${t('المصدر','Source')}: ${farm.dataset==='ten-farms'?data.tenFarmsSource+' · '+farm.label:data.source+' · '+data.range}</small>
      <details class="ag-references"><summary>${t('المصادر والمنهجية','Sources and methodology')}</summary><p class="ag-note">${t('الحالات العشر تمثيلية وليست سجلات مزارع خاصة. المصادر الوزارية توثق السياق الزراعي؛ القيم الرقمية للاختبار وليست توصيات وزارية ثابتة.','The ten cases are representative tests, not private farm records. Ministry sources document agricultural context; numerical test values are not fixed ministry recommendations.')}</p><a href="references/irrigation-threshold.pdf" target="_blank" rel="noopener">${t('حساب عتبة الريّ في منصّة AeroCRNS — عزة عزيز الشهري (PDF)','Irrigation threshold methodology — Azzah Aziz AlShehri (PDF)')} ↗</a><p class="ag-note">${t('ورقة عتبة الري مرفق مرجعي فقط. لم تُطبّق تصحيحات ETc أو نموذج الجذور أو تكامل المجس الواردة فيها.','The threshold paper is a reference only. Its ETc corrections, root model and probe integration have not been implemented.')}</p><ul>${(data.sources||[]).map(s=>`<li lang="ar" dir="rtl"><a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.id} · ${s.title} ↗</a><small>${s.supports}</small></li>`).join('')}</ul></details>`;
    panel.querySelector('#ag-reset-case')?.addEventListener('click',()=>{selection={...farm};message='';applySelection();});
    panel.querySelector('#ag-error').textContent=message;
    ['id','soil','crop','stage'].forEach(field=>panel.querySelector('#ag-'+field).onchange=e=>{
      if(field==='id') selection={...data.farms.find(f=>f.id===e.target.value)};
      else {selection[field]=e.target.value;if(field==='crop')selection.stage=data.stages.find(s=>s.crop===selection.crop).stage;}
      message='';applySelection();panel.querySelector('#ag-'+field).focus();
    });
    panel.querySelector('#ag-form').onsubmit=e=>{
      e.preventDefault();const p={};
      for(const k of ['fc','wp','mad']) {const v=panel.querySelector('#ag-edit-'+k).value;p[k]=v.trim()===''?NaN:Number(v);}
      if(!valid(p)){panel.querySelector('#ag-error').textContent=t('أدخل أرقامًا صالحة: 0 ≤ WP < FC ≤ 0.6، وMAD بين 0 و1.','Enter valid numbers: 0 ≤ WP < FC ≤ 0.6, and MAD between 0 and 1.');return;}
      saved[key()]={...p};message=persist()?t('تم حفظ القيم محليًا.','Values saved locally.'):t('تم التطبيق لهذه الجلسة؛ تخزين المتصفح غير متاح.','Applied for this session; browser storage is unavailable.');applySelection();
    };
    panel.querySelector('#ag-restore').onclick=()=>{delete saved[key()];persist();message='';applySelection();};
    updateContext();
  }
  function applySelection() {
    stopPlay();const override=saved[key()];
    if(override && !valid(override))delete saved[key()];
    active=override && valid(override) ? {...override} : reference();
    if(active)applyParams({...params,...active});
    route();render();
  }
  window.AeroAgronomy={get values(){return active ? {...active}:{};},get profile(){return {...selection,source:saved[key()]?'specialist-local':'workbook-demo'};}};
  const originalRoute=route;
  window.removeEventListener('hashchange',route);
  route=function(){originalRoute();updateContext();};
  window.addEventListener('hashchange',route);
  new MutationObserver(()=>render()).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  applySelection();
})();
