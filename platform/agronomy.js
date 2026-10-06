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
  const name = value => en() ? value : names[value] || value;
  const key = () => [selection.id,selection.soil,selection.crop,selection.stage].join('|');
  const reference = () => {
    const soil=data.soils.find(s=>s.id===selection.soil), stage=data.stages.find(s=>s.crop===selection.crop && s.stage===selection.stage);
    return soil && stage ? {fc:soil.fc,wp:soil.wp,mad:stage.mad} : null;
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
    const context=document.querySelector('.context-bar');
    if(context){context.setAttribute('data-i18n-ignore','');context.textContent=[name(selection.id),name(selection.soil),name(selection.crop),name(selection.stage),t('إعادة تشغيل بيانات محاكاة ثابتة · أغسطس 2026','Fixed simulation replay · August 2026')].join(' · ');}
    document.querySelector('#main').hidden=!active;
  }
  function render() {
    const stages=[...new Set(data.stages.filter(s=>s.crop===selection.crop).map(s=>s.stage).concat(selection.stage,'Custom'))];
    const ref=reference(), p=active || ref;
    panel.innerHTML=`<div class="ag-heading"><div><p class="eyebrow">FIELD PROFILE / DEMO</p><h2>${t('ابدأ من مزرعتك','Start with your farm')}</h2></div><span class="ag-badge">${t('قيم تجريبية تحتاج معايرة','Demo values · calibration required')}</span></div>
      <div class="ag-selects">${select('id','01 المزرعة','01 Farm',data.farms.map(f=>f.id))}${select('soil','02 نوع التربة','02 Soil',data.soils.map(s=>s.id))}${select('crop','03 المحصول','03 Crop',[...new Set(data.stages.map(s=>s.crop))])}${select('stage','04 مرحلة النمو','04 Growth stage',stages)}</div>
      <div class="ag-values"><span>FC <b>${p ? p.fc.toFixed(3):'—'}</b> m³/m³</span><span>WP <b>${p ? p.wp.toFixed(3):'—'}</b> m³/m³</span><span>MAD <b>${p ? (p.mad*100).toFixed(1)+'%':'—'}</b></span><span class="ag-trigger">${t('عتبة الري','Irrigation threshold')} <b>${p ? (p.fc-p.mad*(p.fc-p.wp)).toFixed(3):'—'}</b> m³/m³</span></div>
      <p class="ag-status" role="status">${active ? (saved[key()] ? t('مطبّق: تعديلات المختص لهذا الاختيار.','Applied: specialist edits for this selection.') : t('مطبّق: القيم المرجعية التجريبية من الملف.','Applied: illustrative workbook reference values.')) : t('توقفت النتائج: لا توجد قيمة MAD لهذه المرحلة. اختر مرحلة متوفرة أو أدخل قيم المختص أدناه.','Results paused: no MAD reference for this stage. Choose an available stage or enter specialist values below.')}</p>
      <details ${!active?'open':''}><summary>${t('إعدادات المختص الزراعي','Agricultural specialist settings')}</summary><form id="ag-form" novalidate><p>${t('عدّل قيم هذا الموقع والمحصول بعد مراجعة المعايرة والعوامل الزراعية. التعديلات تحفظ في هذا المتصفح فقط؛ هذه واجهة تجريبية بلا حسابات أو صلاحيات مستخدمين.','Edit this site and crop profile after reviewing calibration and agronomic factors. Changes are saved only in this browser; this demo has no user accounts or role enforcement.')}</p><div class="ag-edit">${['fc','wp','mad'].map(k=>`<label for="ag-edit-${k}">${k.toUpperCase()} ${k==='mad'?'(0–1)':'(m³/m³)'}<input id="ag-edit-${k}" name="${k}" type="number" step="any" min="0" max="${k==='mad'?1:.6}" required value="${p?p[k]:k==='mad'?'':data.soils.find(s=>s.id===selection.soil)[k]}"></label>`).join('')}<button class="btn" type="submit">${t('تطبيق وحفظ القيم','Apply and save')}</button><button class="btn" id="ag-restore" type="button">${t('استعادة قيم الملف','Restore reference')}</button></div><p id="ag-error" role="alert"></p></form></details>
      <p class="ag-note">${t('السلسلة المعروضة هي 336 ساعة من المحاكاة الأصلية، وليست قياسات المزارع المختارة. الاختيارات تغيّر عتبة الري ونتائج المحاكاة. يلزم اعتماد معايرة الموقع والقيم الزراعية قبل أي قرار ري ميداني.','The displayed series replays 336 hours from the original simulation, not measurements from the selected farms. Selections change the irrigation threshold and simulated decisions. Site calibration and agronomic values require approval before field irrigation.')}</p>
      <p class="ag-note">${t('قيم الدليل FC = 0.18 وWP = 0.07 وMAD = 0.5 مثال توضيحي فقط، وليست ثوابت لجميع المزارع.','The guide values FC = 0.18, WP = 0.07 and MAD = 0.5 are an illustrative example, not constants for all farms.')}</p>
      <small class="ag-source">${t('المصدر','Source')}: ${data.source} · ${data.range}</small>`;
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
