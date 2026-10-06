/* Local, reversible UI translations. Simulation state and numerical inputs are untouched. */
(() => {
  'use strict';
  const entries = {
    'AeroCRNS — غرفة التحكم':'AeroCRNS — Control Room',
    'AeroCRNS · مشهد الحساس':'AeroCRNS · Sensor Viewer',
    'AeroCRNS الرئيسية':'AeroCRNS home',
    'مساحة العمل':'Workspace', 'القائمة الرئيسية':'Main navigation',
    'نظرة عامة':'Overview', 'مختبر CTS':'CTS Lab', 'تجريبي':'Experimental',
    'الحماية الحرارية':'Thermal Protection', 'سجل القياسات':'Measurement Log',
    'الحساس ثلاثي الأبعاد':'3D Sensor', 'كيف يعمل النظام':'How It Works',
    'محطة AeroCRNS':'AeroCRNS Station', 'نموذج محاكاة':'Simulation model',
    'قياس أوسع.':'Wider sensing.', 'قرار ري أدق.':'Smarter irrigation.',
    'بيئة محاكاة':'Simulation', 'كل قطرة، بقرار مدروس.':'Every drop. An informed decision.',
    'صورة أوضح للتربة. تحكّم أذكى في الري.':'Clearer soil insights. Smarter irrigation control.',
    'تصدير القياسات':'Export readings', 'تصدير CSV':'Export CSV',
    'الحقل التجريبي 01':'Experimental Field 01', 'تربة رملية طميية · برسيم':'Sandy loam · Alfalfa',
    'نظرة على الحقل':'Field overview', 'متوسط حقلي':'Field average',
    'نطاق استشعار توضيحي':'Illustrative sensing footprint', 'CRNS · محطة واحدة':'CRNS · One station',
    'الرطوبة تقود القرار':'Moisture drives the decision', 'بعد CTS':'After CTS', 'قبل CTS':'Before CTS',
    'عتبة الري':'Irrigation threshold', 'استشعار حقلي. إدارة واعية للمياه.':'Field-scale sensing. Informed water management.',
    'CTS عامل بحثي مقترح يحتاج إلى تحقق ميداني.':'CTS is a proposed research factor requiring field validation.',
    'رطوبة التربة بعد CTS':'Soil moisture after CTS', 'تحتاج إلى ري':'Irrigation needed',
    'أعلى من العتبة':'Above threshold', 'العدّ النيوتروني الخام':'Raw neutron count',
    'عدّة/ساعة':'counts/hour', 'المتوسط المصحح':'Corrected average',
    'درجة حرارة التربة':'Soil temperature', 'معامل CTS':'CTS coefficient',
    'حرارة داخلية قصوى':'Peak internal temperature', 'ضمن حد التشغيل':'Within operating limit',
    'أعلى من الحد':'Above limit', 'رسم تخطيطي لحقل زراعي ونطاق الاستشعار؛ ليس خريطة موقع حقيقي':'Illustrative agricultural field and sensing footprint; not an actual site map',
    'حقل توضيحي':'Illustrative field', 'CTS غير مفعّل':'CTS disabled', 'CTS مفعّل':'CTS enabled',
    'الري قيد التشغيل':'Irrigation active', 'الصمام مغلق':'Valve closed',
    'الرطوبة المصححة عند عتبة الري أو دونها. أصدر محرك القرار أمر فتح الصمام.':'Corrected moisture is at or below the irrigation threshold. The decision engine has issued an OPEN command.',
    'الرطوبة المصححة أعلى من عتبة الري. لا حاجة لإضافة المياه في هذه الساعة.':'Corrected moisture is above the irrigation threshold. No water is needed during this hour.',
    'الرطوبة / العتبة':'Moisture / Threshold', 'أمر الصمام':'Valve command', 'معدل الري':'Irrigation rate',
    'الرطوبة قبل وبعد CTS ومقارنتها بعتبة الري خلال فترة المحاكاة':'Soil moisture before and after CTS compared with the irrigation threshold over the simulation period',
    'ساعة المحاكاة':'Simulation hour', 'كل ثانية = ساعة محاكاة':'1 second = 1 simulated hour',
    'العودة إلى بداية المحاكاة':'Return to the start of the simulation',
    'إيقاف المحاكاة':'Pause simulation', 'تشغيل المحاكاة':'Play simulation', 'نافذة جزئية':'Partial window',
    'تم تصدير 336 قراءة وفق إعدادات المحاكاة الحالية.':'Exported 336 readings using the current simulation settings.',
    'من درجة الحرارة إلى قرار الري.':'From temperature to irrigation decisions.',
    'عدّل الافتراضات، وشاهد أثرها على القراءات نفسها.':'Adjust the assumptions and explore their effect on the same readings.',
    'استعادة النموذج':'Reset model', 'طبقة تحكم بحثية':'Experimental control layer',
    'CTS عامل مقترح، ومعاملاته افتراضية. التغييرات هنا تحاكي القرار ولا تتحكم بجهاز فعلي.':'CTS is a proposed factor with assumed parameters. Changes simulate decisions and do not control physical equipment.',
    'إعدادات التجربة':'Experiment settings', 'تفعيل CTS':'Enable CTS', 'التصحيح الحراري':'Thermal correction',
    'إزاحة حرارة التربة':'Soil temperature offset', 'معامل αCTS':'αCTS coefficient',
    'تُضاف الإزاحة لكل قراءات التربة في الفترة. الحرارة المرجعية 25°C، والعامل مقيد بين 0.97 و1.03.':'The offset applies to all soil temperature readings. The reference is 25°C, and the factor is limited to 0.97–1.03.',
    'نافذة المتوسط':'Averaging window', 'خصائص التربة والمحصول':'Soil and crop properties',
    'السعة الحقلية FC':'Field capacity FC', 'نقطة الذبول WP':'Wilting point WP',
    'الاستنزاف المسموح MAD':'Allowable depletion MAD',
    'قيم الرطوبة بوحدة m³/m³. لا يمكن أن تتجاوز نقطة الذبول السعة الحقلية.':'Moisture is expressed in m³/m³. The wilting point must be below field capacity.',
    'الرطوبة قبل التصحيح وبعده':'Moisture before and after correction',
    'مسار معالجة القراءة':'Reading processing pipeline', 'تمت استعادة معاملات نموذج Excel.':'Excel model parameters restored.',
    'فرق صغير في القراءة. أثر في القرار.':'A small change in moisture. A different decision.',
    'الرطوبة قبل CTS':'Moisture before CTS', 'الرطوبة بعد CTS':'Moisture after CTS',
    'OPEN · فتح':'OPEN', 'CLOSED · إغلاق':'CLOSED',
    'ساعة تغيّر فيها القرار بسبب CTS':'hours with decisions changed by CTS',
    'حرارة التربة':'Soil temperature', 'عند الساعة المختارة':'At the selected hour',
    'عامل التصحيح':'Correction factor', 'مفعّل · تجريبي':'Enabled · Experimental',
    'معطّل · العامل = 1':'Disabled · Factor = 1', 'عدم يقين إحصائي':'Statistical uncertainty',
    'عتبة الري المحسوبة':'Calculated irrigation threshold',
    'مصمّم لمواجهة الحرارة.':'Designed for the heat.',
    'مقارنة نتائج المحاكاة الحرارية الواردة في نموذج المشروع.':'Compare thermal simulation results supplied in the project model.',
    'طبقة تحمي استمرارية القياس':'Insulation for continuous sensing',
    'قمة الحرارة الداخلية':'Peak internal temperature', 'كاشف النيوترونات':'Neutron detector',
    'اختر سماكة العزل':'Select insulation thickness', 'سماكة الأيروجيل':'Aerogel thickness',
    'تجاوز حد التشغيل':'Operating limit exceeded', 'حد التشغيل 45°C':'45°C operating limit',
    'المقارنة الحرارية':'Thermal comparison', 'العزل':'Insulation', 'القمة °C':'Peak °C',
    'الحالة':'Status', 'ضمن الحد':'Within limit', 'الانخفاض مع عزل 20 مم':'Reduction with 20 mm insulation',
    'من 53.8°C إلى 42.7°C وفق النموذج.':'From 53.8°C to 42.7°C in the model.',
    'استهلاك الطاقة في النموذج':'Model power consumption',
    'قيمة افتراضية للكاشف؛ ليست قراءة طاقة حية.':'Assumed detector value; not a live power reading.',
    'مصدر نتائج الحرارة':'Thermal results source',
    'قيم الجدول المرفق؛ لا تُشتق من حرارة التربة ولا تمثل اختبارًا ميدانيًا.':'Values from the supplied table; not derived from soil temperature or a field test.',
    'كل قراءة، قابلة للتتبّع.':'Every reading, traceable.',
    'بيانات نموذج Excel بعد إعادة حسابها بإعداداتك الحالية.':'Excel model data recalculated with your current settings.',
    'إجمالي القراءات':'Total readings', 'من 1 إلى 14 أغسطس 2026':'August 1–14, 2026',
    'ساعات فتح الصمام':'Valve-open hours', 'ضمن كامل فترة المحاكاة':'Over the full simulation period',
    'مدة الري المتصلة':'Continuous irrigation duration', 'عمق المياه التراكمي':'Cumulative water depth',
    'حتى الساعة المختارة':'Up to the selected hour',
    'عمق المياه هو مجموع أوامر الري الافتراضية، وليس استهلاكًا ميدانيًا مقاسًا. السجل ثابت المدخلات؛ الري لا يعيد توليد رطوبة الساعات اللاحقة.':'Water depth is the sum of simulated irrigation commands, not measured field consumption. Inputs are fixed; irrigation does not regenerate moisture for subsequent hours.',
    'سجل القياسات وأوامر الصمام':'Readings and valve commands', 'تصفية سجل القياسات':'Filter measurement log',
    'كل القراءات':'All readings', 'الصمام مفتوح':'Valve open', 'تغيّر القرار بسبب CTS':'Decision changed by CTS',
    'التاريخ والساعة':'Date and time', 'VWC قبل':'VWC before', 'VWC بعد':'VWC after',
    'العتبة':'Threshold', 'الصمام':'Valve', 'الأمر':'Command',
    'لا توجد قراءات مطابقة لهذه التصفية.':'No readings match this filter.', 'السابق':'Previous', 'التالي':'Next',
    'النيوترونات الكونية':'Cosmic-ray neutrons',
    'الكاشف Boron-10 يسجل معدل العدّ النيوتروني المتأثر بمياه التربة.':'The Boron-10 detector records neutron counts affected by soil water.',
    'التصحيحات البيئية':'Environmental corrections',
    'معاملات الضغط والرطوبة الجوية وشدة الأشعة الكونية من صفوف Excel.':'Pressure, atmospheric humidity and cosmic-ray intensity factors from the Excel rows.',
    'تصحيح CTS التجريبي':'Experimental CTS correction',
    'عامل حراري مقترح مقيد بين 0.97 و1.03، ويصبح 1 عند تعطيله.':'A proposed thermal factor limited to 0.97–1.03; it equals 1 when disabled.',
    'المتوسط والمعايرة':'Averaging and calibration',
    'متوسط متحرك 12 ساعة افتراضيًا، مع إمكانية اختبار 24 ساعة.':'A 12-hour moving average by default, with a 24-hour option.',
    'قرار الري المباشر':'Direct irrigation decision',
    'فتح عند الرطوبة ≤ العتبة، وإغلاق عند تجاوزها.':'Open when moisture ≤ threshold; close when moisture exceeds it.',
    'المعادلة وراء كل قرار.':'The equation behind every decision.',
    'منطق واضح يربط القياس بالري، مع حدود النموذج ومصادره.':'A transparent link between sensing and irrigation, with model limitations and sources.',
    'مرجع القرار':'Decision reference', 'مطابق لمنطق Excel':'Matches the Excel logic',
    '336 قراءة ساعية في ورقة Hourly_Simulation. المعايرة هنا خطية ومبسّطة، وليست معايرة ميدانية معتمدة.':'336 hourly readings from Hourly_Simulation. Calibration is linear and simplified, not a validated field calibration.',
    'في الساعات الأولى يُحسب المتوسط من العينات المتاحة، كما في الملف، وتُعلّم النافذة بأنها جزئية.':'During the first hours, the average uses available samples, as in the workbook, and the window is marked as partial.',
    'حدود التحكم':'Control limitations', 'عتبة واحدة، بوضوح':'One clear threshold',
    'الإغلاق عند تجاوز عتبة الري. إعدادا «الإيقاف عند FC» و«مدة تشغيل دنيا ساعتان» موجودان في الملف لكنهما لا يدخلان معادلة أمر الصمام الفعلية، لذلك لم نفعّلهما ضمن هذا الوضع.':'The valve closes above the irrigation threshold. The workbook includes “stop at FC” and “minimum runtime of two hours” settings, but they are not used in its valve-command formula and are not enabled in this mode.',
    'المياه المضافة لا تغذي السلسلة التالية؛ هذا إعادة تشغيل لمحاكاة مسجلة، وليس نموذج توازن مائي مغلق الحلقة.':'Applied water does not feed subsequent readings. This replays a recorded simulation, not a closed-loop water balance model.',
    'التحقق العلمي':'Scientific validation', 'CTS يحتاج إلى تحقق ميداني':'CTS requires field validation',
    'نتائج CTS والحرارة المعروضة مستندة إلى افتراضات ونتائج المشروع المرفقة. لا يوجد اتصال بحساس أو صمام فعلي.':'Displayed CTS and thermal results use the supplied project assumptions and results. No physical sensor or valve is connected.',
    'المراجع المستخدمة داخل المنصة':'Platform sources',
    'البيانات الساعية، معاملات CTS، منطق الصمام، ومقارنة العزل.':'Hourly data, CTS coefficients, valve logic and insulation comparison.',
    'مستند المحاكاة':'Simulation document',
    'وصف الطبقات، نافذة التكامل، والتمييز بين عتبة المحصول وخصائص الكاشف.':'Layer descriptions, integration window and the distinction between crop thresholds and detector properties.',
    'مرجع المشهد التوضيحي. دالة Desilets في العرض الأصلي مختلفة عن معايرة Excel؛ لم نخلط بينهما في محرك التحكم.':'Reference for the explanatory scene. The original demo’s Desilets function differs from the Excel calibration; the control engine keeps them separate.',
    'استكشف الحساس، طبقة بطبقة.':'Explore the sensor, layer by layer.',
    'عرض تفسيري مستمد من النموذج المرفق، وليس محاكاة نقل نيوتروني.':'An explanatory view based on the supplied model, not a neutron transport simulation.',
    'من التربة إلى كاشف Boron-10':'From soil to the Boron-10 detector',
    'اسحب للتدوير':'Drag to rotate', 'مشهد الحساس ثلاثي الأبعاد':'3D sensor scene',
    'العجلة للتقريب · مفاتيح الأسهم للتدوير':'Scroll to zoom · Arrow keys to rotate',
    'رسم توضيحي، الأبعاد غير قياسية':'Illustrative model · Not to scale',
    'طبقات الحساس':'Sensor layers', '07 طبقات':'07 layers',
    'اختر طبقة لتسليط الضوء عليها في المشهد.':'Select a layer to highlight it in the scene.',
    'الأيروجيل الكاره للماء':'Hydrophobic aerogel', 'عباءة Gd₂O₃':'Gd₂O₃ lining',
    'جدار HDPE':'HDPE wall', 'التجويف الهوائي':'Air cavity', 'جدار أنبوب الكاشف':'Detector tube wall',
    'جدار الأنبوب':'Tube wall', 'طلاء ¹⁰B₄C':'¹⁰B₄C coating', 'غاز Ar:CO₂':'Ar:CO₂ gas',
    'حجم العدّ':'Counting volume', 'عرض كل الطبقات':'Show all layers',
    'المشهد يشرح الفكرة؛ محرك القرار يحسب النتائج.':'The scene explains the concept; the decision engine calculates the results.',
    'الجسيمات وحجم نطاق الاستشعار توضيحيان. معاملات CTS وقرارات الري تُحسب في مختبر CTS من بيانات Excel؛ لا تُستنتج من اصطدام الجسيمات المرئية.':'Particles and sensing footprint are illustrative. CTS factors and irrigation decisions are calculated from Excel data in the CTS Lab, not from visible particle collisions.',
    'مجسم الحساس. اسحب أو استخدم الأسهم للتدوير، وعلامتي الجمع والطرح للتقريب.':'3D sensor. Drag or use arrow keys to rotate; use plus and minus to zoom.',
    'وضع عرض الحساس':'Sensor view mode', 'الجهاز كاملًا':'Full assembly',
    'المقطع الداخلي':'Cross-section', 'تفكيك الطبقات':'Exploded layers',
    'النظام المجمّع':'Assembled system', 'مقطع داخلي · الطبقات متداخلة':'Cross-section · Nested layers',
    'تفكيك توضيحي · الطبقات متباعدة':'Exploded view · Separated layers',
    'التحكم بالتقريب':'Zoom controls', 'تكبير':'Zoom in', 'تصغير':'Zoom out',
    'نيوترونات واردة · توضيحية':'Incoming neutrons · Illustrative',
    'نيوترونات عائدة · توضيحية':'Returning neutrons · Illustrative',
    'إعادة المنظور':'Reset view', 'مسارات النيوترونات':'Neutron paths',
    'إيقاف الحركة':'Pause motion', 'تشغيل الحركة':'Play motion',
    'جارٍ تجهيز النموذج…':'Loading model…', 'اسحب للتدوير · العجلة للتقريب':'Drag to rotate · Scroll to zoom',
    'توقف العرض الرسومي. أعد تحميل الصفحة لاستعادته.':'Graphics paused. Reload the page to restore the viewer.',
    'تعذّر تشغيل العرض ثلاثي الأبعاد.':'The 3D viewer could not start.',
    'أعد تحميل الصفحة أو استخدم متصفحًا يدعم WebGL. مواصفات الطبقات متاحة في اللوحة المجاورة.':'Reload the page or use a browser that supports WebGL. Layer specifications are available in the adjacent panel.',
    'الغلاف المعدني':'Metal housing', 'الأيروجيل':'Aerogel', 'أيروجيل':'Aerogel', 'الغلاف':'Housing',
    'يجب أن تكون السعة الحقلية أكبر من نقطة الذبول.':'Field capacity must exceed the wilting point.',
    'MAD بين 0 و1.':'MAD must be between 0 and 1.', 'نافذة المتوسط 12 أو 24 ساعة.':'The averaging window must be 12 or 24 hours.',
    'قيمة CTS خارج النطاق المسموح.':'CTS value is outside the allowed range.',
    'محاكاة':'Simulation', 'أغسطس':'Aug', 'حتى':'Up to', 'ساعة':'hours', 'مم':'mm'
  };
  const escape = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(Object.keys(entries).sort((a,b)=>b.length-a.length).map(escape).join('|'),'g');
  function english(text) {
    return text
      .replace(/نافذة جزئية: (\d+) من (\d+) ساعة/g,'Partial window: $1 of $2 hours')
      .replace(/نافذة مكتملة: (\d+) ساعة/g,'Complete window: $1 hours')
      .replace(/(\d+) قراءة · صفحة (\d+) من (\d+)/g,'$1 readings · Page $2 of $3')
      .replace(/هامش ([\d.]+)°C أسفل الحد المذكور للجهاز\./g,'$1°C below the stated device limit.')
      .replace(/تتجاوز القمة الحد المذكور بمقدار ([\d.]+)°C\./g,'The peak exceeds the stated limit by $1°C.')
      .replace(pattern, match=>entries[match]);
  }
  const originals=new WeakMap(), attributes=new WeakMap();
  let language='ar', observer;
  try { language=localStorage.getItem('aerocrns.language')==='en'?'en':'ar'; } catch {}
  try { const requested=new URLSearchParams(location.search).get('lang'); if(requested==='ar'||requested==='en')language=requested; } catch {}
  try { if(parent!==window) language=parent.document.documentElement.lang==='en'?'en':'ar'; } catch {}
  const ignored = element => element?.closest('script,style,textarea,[data-i18n-ignore]');
  function translateText(node) {
    if(ignored(node.parentElement))return;
    let saved=originals.get(node);
    if(!saved||node.nodeValue!==saved.last)saved={source:node.nodeValue,last:node.nodeValue};
    const translated=language==='en'?english(saved.source):saved.source;
    if(node.nodeValue!==translated)node.nodeValue=translated;
    saved.last=translated;originals.set(node,saved);
  }
  function translateElement(el) {
    if(ignored(el))return;
    let saved=attributes.get(el);if(!saved){saved={};attributes.set(el,saved);}
    for(const name of ['aria-label','title','placeholder']){
      const current=el.getAttribute(name);if(current===null)continue;
      if(!saved[name]||current!==saved[name].last)saved[name]={source:current,last:current};
      const translated=language==='en'?english(saved[name].source):saved[name].source;
      if(current!==translated)el.setAttribute(name,translated);
      saved[name].last=translated;
    }
  }
  function translate(root) {
    if(root.nodeType===Node.TEXT_NODE){translateText(root);return;}
    if(root.nodeType!==Node.ELEMENT_NODE||ignored(root))return;
    translateElement(root);
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT);
    while(walker.nextNode()){
      if(walker.currentNode.nodeType===Node.TEXT_NODE)translateText(walker.currentNode);
      else translateElement(walker.currentNode);
    }
  }
  const settings={subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','title','placeholder']};
  function observe(){observer.observe(document.body,settings);}
  function setLanguage(next,persist=true) {
    language=next==='en'?'en':'ar';
    observer.disconnect();
    document.documentElement.lang=language;
    document.documentElement.dir=language==='en'?'ltr':'rtl';
    document.title=parent===window?(language==='en'?'AeroCRNS — Control Room':'AeroCRNS — غرفة التحكم'):(language==='en'?'AeroCRNS · Sensor Viewer':'AeroCRNS · مشهد الحساس');
    translate(document.body);
    const button=document.getElementById('language-toggle');
    if(button){button.textContent=language==='en'?'العربية':'English';button.setAttribute('aria-label',language==='en'?'Switch to Arabic':'التبديل إلى الإنجليزية');button.lang=language==='en'?'ar':'en';}
    if(persist)try{localStorage.setItem('aerocrns.language',language);}catch{}
    document.querySelectorAll('iframe').forEach(frame=>frame.contentWindow?.postMessage({type:'aerocrns-language',language},location.origin));
    observe();
  }
  observer=new MutationObserver(records=>{
    observer.disconnect();
    for(const record of records){
      if(record.type==='childList')record.addedNodes.forEach(translate);
      else if(record.type==='characterData')translateText(record.target);
      else translateElement(record.target);
    }
    observe();
  });
  const toggle=document.getElementById('language-toggle');
  if(toggle)toggle.addEventListener('click',()=>setLanguage(language==='en'?'ar':'en'));
  addEventListener('message',event=>{
    if(parent===window||event.source!==parent||event.origin!==location.origin||event.data?.type!=='aerocrns-language')return;
    if(['ar','en'].includes(event.data.language))setLanguage(event.data.language,false);
  });
  addEventListener('storage',event=>{if(event.key==='aerocrns.language')setLanguage(event.newValue,false);});
  setLanguage(language,false);
})();
