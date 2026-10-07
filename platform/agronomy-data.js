window.AERO_AGRONOMY = {
  "source": "AeroCRNS_Platform_Test_Data.xlsx",
  "range": "Reference Lists!A2:F10; H2:K4",
  "farms": [
    {
      "id": "MEWA-01",
      "label": "حالة اختبار 01",
      "region": "الرياض",
      "city": "الخرج",
      "crop": "Wheat",
      "variety": "غير محدد",
      "irrigation": "رش/محوري",
      "stage": "Mid-season",
      "soil": "Sandy Loam",
      "rootDepth": 60,
      "waterNeed": "يُحسب حسب ETo ومرحلة النمو",
      "waterUnit": "مم/فترة",
      "season": "شتاء",
      "ec": 1.4,
      "ecUnit": "dS/m",
      "fc": 0.2,
      "wp": 0.08,
      "mad": 0.5,
      "status": "اختباري؛ يحتاج تحقق موقعي",
      "sourceTitle": "وزارة البيئة والمياه والزراعة – ورشة الاحتياجات المائية",
      "sourceUrl": "https://www.mewa.gov.sa/ar/MediaCenter/News/Pages/News986.aspx",
      "note": "الوزارة تعتمد الرش للمحاصيل الحقلية؛ FC/WP/MAD والعمق قيم اختبار للمنصة وليست أرقامًا صادرة عن الوزارة.",
      "dataset": "ten-farms"
    },
    {
      "id": "MEWA-02",
      "label": "حالة اختبار 02",
      "region": "القصيم",
      "city": "بريدة",
      "crop": "Barley",
      "variety": "غير محدد",
      "irrigation": "رش/محوري",
      "stage": "Mid-season",
      "soil": "Loamy Sand",
      "rootDepth": 60,
      "waterNeed": "يُحسب حسب ETo ومرحلة النمو",
      "waterUnit": "مم/فترة",
      "season": "شتاء",
      "ec": 1.4,
      "ecUnit": "dS/m",
      "fc": 0.18,
      "wp": 0.07,
      "mad": 0.5,
      "status": "اختباري؛ يحتاج تحقق موقعي",
      "sourceTitle": "وزارة البيئة والمياه والزراعة – ورشة الاحتياجات المائية",
      "sourceUrl": "https://www.mewa.gov.sa/ar/MediaCenter/News/Pages/News986.aspx",
      "note": "قيم التربة والجذور للاختبار البرمجي فقط؛ تُستبدل بقياسات الحقل.",
      "dataset": "ten-farms"
    },
    {
      "id": "MEWA-03",
      "label": "حالة اختبار 03",
      "region": "الجوف",
      "city": "سكاكا",
      "crop": "Olive",
      "variety": "غير محدد",
      "irrigation": "تنقيط",
      "stage": "Bearing trees",
      "soil": "Sandy Loam",
      "rootDepth": 90,
      "waterNeed": "يُحسب حسب ETo وعمر الشجرة",
      "waterUnit": "لتر/شجرة/يوم",
      "season": "صيف",
      "ec": 1.4,
      "ecUnit": "dS/m",
      "fc": 0.22,
      "wp": 0.09,
      "mad": 0.45,
      "status": "اختباري؛ يحتاج تحقق موقعي",
      "sourceTitle": "وزارة البيئة والمياه والزراعة – ورشة الاحتياجات المائية",
      "sourceUrl": "https://www.mewa.gov.sa/ar/MediaCenter/News/Pages/News986.aspx",
      "note": "الوزارة تعتمد التنقيط للزيتون؛ عمق الجذور وFC/WP/MAD ليست قيمًا وزارية ثابتة.",
      "dataset": "ten-farms"
    },
    {
      "id": "MEWA-04",
      "label": "حالة اختبار 04",
      "region": "المدينة المنورة",
      "city": "المدينة المنورة",
      "crop": "Date Palm",
      "variety": "غير محدد",
      "irrigation": "تنقيط",
      "stage": "Bearing trees",
      "soil": "Loamy Sand",
      "rootDepth": 120,
      "waterNeed": "يتغير حسب الشهر والعمر والمناخ",
      "waterUnit": "لتر/نخلة/يوم",
      "season": "سنوي",
      "ec": 1.4,
      "ecUnit": "dS/m",
      "fc": 0.18,
      "wp": 0.07,
      "mad": 0.5,
      "status": "اختباري + مرجع رسمي للنخيل",
      "sourceTitle": "وزارة البيئة والمياه والزراعة – برنامج ري وتسميد أشجار النخيل",
      "sourceUrl": "https://www.mewa.gov.sa/ar/Ministry/Agencies/AgencyofAgriculture/Topics/SiteAssets/Pages/Agriculture%20%20newsletters/%D8%A8%D8%B1%D9%86%D8%A7%D9%85%D8%A9%20%D8%B1%D9%8A%20%D9%88%D8%AA%D8%B3%D9%85%D9%8A%D8%AF%20%D8%A7%D8%B4%D8%AC%D8%A7%D8%B1%D8%A7%D9%84%D9%86%D8%AE%D9%8A%D9%84.pdf",
      "note": "يُربط القرار بعمر النخلة والشهر وقياس AeroCRNS؛ لا تعتمد FC/WP/MAD قبل معايرة الموقع.",
      "dataset": "ten-farms"
    },
    {
      "id": "MEWA-05",
      "label": "حالة اختبار 05",
      "region": "المنطقة الشرقية",
      "city": "الأحساء",
      "crop": "Date Palm",
      "variety": "خلاص",
      "irrigation": "تنقيط",
      "stage": "Bearing trees",
      "soil": "Loamy Sand",
      "rootDepth": 120,
      "waterNeed": "40–120% معاملات بحثية من المتطلبات",
      "waterUnit": "% من المتطلبات",
      "season": "موسم التجربة",
      "ec": 1.4,
      "ecUnit": "dS/m",
      "fc": 0.18,
      "wp": 0.07,
      "mad": 0.5,
      "status": "معاملات بحثية رسمية + حقول اختبار",
      "sourceTitle": "وزارة البيئة والمياه والزراعة – دراسة النقص المسموح به لنخيل الخلاص",
      "sourceUrl": "https://www.mewa.gov.sa/ar/InformationCenter/OpenData/SiteAssets/Pages/OpenDataExamples/Perfect%20management%20in%20allowable%20deficit%20irrigation%20in%20date%20palm%20trees.pdf",
      "note": "40–120% معاملات تجريبية وليست توصية ثابتة. قيم FC/WP/MAD هنا لاختبار المنصة.",
      "dataset": "ten-farms"
    },
    {
      "id": "MEWA-06",
      "label": "حالة اختبار 06",
      "region": "تبوك",
      "city": "تبوك",
      "crop": "Potato",
      "variety": "غير محدد",
      "irrigation": "رش/محوري",
      "stage": "Mid-season",
      "soil": "Sandy",
      "rootDepth": 50,
      "waterNeed": "يُحسب حسب ETo ومرحلة النمو",
      "waterUnit": "مم/فترة",
      "season": "ربيع",
      "ec": 1.4,
      "ecUnit": "dS/m",
      "fc": 0.14,
      "wp": 0.05,
      "mad": 0.35,
      "status": "اختباري؛ يحتاج تحقق موقعي",
      "sourceTitle": "وزارة البيئة والمياه والزراعة – ورشة الاحتياجات المائية",
      "sourceUrl": "https://www.mewa.gov.sa/ar/MediaCenter/News/Pages/News986.aspx",
      "note": "المحصول مدرج في دليل التراخيص؛ بيانات التربة والعمق والمعاملات يجب قياسها/اعتمادها محليًا.",
      "dataset": "ten-farms"
    },
    {
      "id": "MEWA-07",
      "label": "حالة اختبار 07",
      "region": "حائل",
      "city": "حائل",
      "crop": "Maize",
      "variety": "غير محدد",
      "irrigation": "رش/محوري",
      "stage": "Mid-season",
      "soil": "Loamy Sand",
      "rootDepth": 90,
      "waterNeed": "يُحسب حسب ETo ومرحلة النمو",
      "waterUnit": "مم/فترة",
      "season": "صيف",
      "ec": 1.4,
      "ecUnit": "dS/m",
      "fc": 0.18,
      "wp": 0.07,
      "mad": 0.5,
      "status": "اختباري؛ يحتاج تحقق موقعي",
      "sourceTitle": "وزارة البيئة والمياه والزراعة – ورشة الاحتياجات المائية",
      "sourceUrl": "https://www.mewa.gov.sa/ar/MediaCenter/News/Pages/News986.aspx",
      "note": "مناسب لاختبار AeroCRNS في الحقول الواسعة؛ القيم الزراعية الموقعية ليست ثابتة.",
      "dataset": "ten-farms"
    },
    {
      "id": "MEWA-08",
      "label": "حالة اختبار 08",
      "region": "جازان",
      "city": "صبيا",
      "crop": "Mango",
      "variety": "غير محدد",
      "irrigation": "تنقيط",
      "stage": "Bearing trees",
      "soil": "Loam",
      "rootDepth": 100,
      "waterNeed": "يُحسب حسب ETo وعمر الشجرة",
      "waterUnit": "لتر/شجرة/يوم",
      "season": "صيف",
      "ec": 1.4,
      "ecUnit": "dS/m",
      "fc": 0.28,
      "wp": 0.13,
      "mad": 0.4,
      "status": "اختباري؛ يحتاج تحقق موقعي",
      "sourceTitle": "وزارة البيئة والمياه والزراعة – دليل التراخيص الزراعية + ورشة الاحتياجات",
      "sourceUrl": "https://www.mewa.gov.sa/ar/InformationCenter/DocsCenter/RulesLibrary/Documents/AgriculturalLicensingGuide.pdf",
      "note": "المانجو مدرج رسميًا كمحصول؛ القيم الرقمية الزراعية للاختبار وليست توصية وزارية.",
      "dataset": "ten-farms"
    },
    {
      "id": "MEWA-09",
      "label": "حالة اختبار 09",
      "region": "نجران",
      "city": "نجران",
      "crop": "Tomato",
      "variety": "غير محدد",
      "irrigation": "تنقيط",
      "stage": "Fruiting",
      "soil": "Sandy Loam",
      "rootDepth": 45,
      "waterNeed": "يُحسب حسب ETo ومرحلة النمو",
      "waterUnit": "مم/فترة",
      "season": "موسم الزراعة",
      "ec": 1.4,
      "ecUnit": "dS/m",
      "fc": 0.2,
      "wp": 0.08,
      "mad": 0.35,
      "status": "اختباري؛ يحتاج تحقق موقعي",
      "sourceTitle": "وزارة البيئة والمياه والزراعة – دليل التراخيص الزراعية + ورشة الاحتياجات",
      "sourceUrl": "https://www.mewa.gov.sa/ar/InformationCenter/DocsCenter/RulesLibrary/Documents/AgriculturalLicensingGuide.pdf",
      "note": "يمكن تعديل نظام الري حسب المزرعة؛ قيم FC/WP/MAD تُستبدل بقياسات التربة.",
      "dataset": "ten-farms"
    },
    {
      "id": "MEWA-10",
      "label": "حالة اختبار 10",
      "region": "مكة المكرمة",
      "city": "الطائف",
      "crop": "Onion",
      "variety": "غير محدد",
      "irrigation": "رش",
      "stage": "Bulb formation",
      "soil": "Loam",
      "rootDepth": 40,
      "waterNeed": "يُحسب حسب ETo ومرحلة النمو",
      "waterUnit": "مم/فترة",
      "season": "موسم الزراعة",
      "ec": 1.4,
      "ecUnit": "dS/m",
      "fc": 0.27,
      "wp": 0.12,
      "mad": 0.3,
      "status": "اختباري؛ يحتاج تحقق موقعي",
      "sourceTitle": "وزارة البيئة والمياه والزراعة – دليل التراخيص الزراعية + ورشة الاحتياجات",
      "sourceUrl": "https://www.mewa.gov.sa/ar/InformationCenter/DocsCenter/RulesLibrary/Documents/AgriculturalLicensingGuide.pdf",
      "note": "القيم الزراعية الرقمية نموذج اختبار للمنصة وليست توصية وزارية ثابتة.",
      "dataset": "ten-farms"
    }
  ],
  "soils": [
    {
      "id": "Sandy",
      "fc": 0.16,
      "wp": 0.06
    },
    {
      "id": "Loamy Sand",
      "fc": 0.2,
      "wp": 0.08
    },
    {
      "id": "Loam",
      "fc": 0.28,
      "wp": 0.12
    },
    {
      "id": "Sandy Loam"
    }
  ],
  "stages": [
    {
      "crop": "Date Palm",
      "stage": "Establishment",
      "mad": 0.3
    },
    {
      "crop": "Date Palm",
      "stage": "Vegetative",
      "mad": 0.4
    },
    {
      "crop": "Date Palm",
      "stage": "Mature",
      "mad": 0.5
    },
    {
      "crop": "Tomato",
      "stage": "Establishment",
      "mad": 0.3
    },
    {
      "crop": "Tomato",
      "stage": "Vegetative",
      "mad": 0.4
    },
    {
      "crop": "Tomato",
      "stage": "Flowering/Fruiting",
      "mad": 0.35
    },
    {
      "crop": "Wheat",
      "stage": "Establishment",
      "mad": 0.35
    },
    {
      "crop": "Wheat",
      "stage": "Vegetative",
      "mad": 0.5
    },
    {
      "crop": "Wheat",
      "stage": "Grain Filling",
      "mad": 0.55
    },
    {
      "crop": "Wheat",
      "stage": "Mid-season"
    },
    {
      "crop": "Barley",
      "stage": "Mid-season"
    },
    {
      "crop": "Olive",
      "stage": "Bearing trees"
    },
    {
      "crop": "Date Palm",
      "stage": "Bearing trees"
    },
    {
      "crop": "Potato",
      "stage": "Mid-season"
    },
    {
      "crop": "Maize",
      "stage": "Mid-season"
    },
    {
      "crop": "Mango",
      "stage": "Bearing trees"
    },
    {
      "crop": "Tomato",
      "stage": "Fruiting"
    },
    {
      "crop": "Onion",
      "stage": "Bulb formation"
    }
  ],
  "sources": [
    {
      "id": "S1",
      "title": "مشروع حصر – السجل الزراعي المطور",
      "supports": "وجود قواعد بيانات جيومكانية للحيازات والأنشطة الزراعية في 13 منطقة",
      "url": "https://www.mewa.gov.sa/ar/MediaCenter/News/Pages/News4132020.aspx"
    },
    {
      "id": "S2",
      "title": "المتصفح الجغرافي لمشروع حصر",
      "supports": "الأنشطة الزراعية والحيازات، الأشجار الدائمة، المزارع المحمية، الآبار وأجهزة الري المحوري",
      "url": "https://www.mewa.gov.sa/ar/MediaCenter/News/Pages/News948.aspx"
    },
    {
      "id": "S3",
      "title": "ورشة الاحتياجات المائية للمحاصيل الرئيسية",
      "supports": "الاعتماد على القياس الحقلي والرطوبة والمناخ والتربة؛ الرش للمحاصيل الحقلية والخضروات والتنقيط للنخيل والزيتون؛ ملوحة مرجعية 1300–1500 ppm",
      "url": "https://www.mewa.gov.sa/ar/MediaCenter/News/Pages/News986.aspx"
    },
    {
      "id": "S4",
      "title": "دليل التراخيص الزراعية",
      "supports": "قائمة رسمية بفئات المحاصيل ومنها الزيتون والقمح والشعير والذرة والمانجو والبصل والطماطم والبطاطس والنخيل",
      "url": "https://www.mewa.gov.sa/ar/InformationCenter/DocsCenter/RulesLibrary/Documents/AgriculturalLicensingGuide.pdf"
    },
    {
      "id": "S5",
      "title": "برنامج ري وتسميد أشجار النخيل",
      "supports": "مرجع رسمي لإدارة ري النخيل وتغير الاحتياج بحسب الظروف",
      "url": "https://www.mewa.gov.sa/ar/Ministry/Agencies/AgencyofAgriculture/Topics/SiteAssets/Pages/Agriculture%20%20newsletters/%D8%A8%D8%B1%D9%86%D8%A7%D9%85%D8%A9%20%D8%B1%D9%8A%20%D9%88%D8%AA%D8%B3%D9%85%D9%8A%D8%AF%20%D8%A7%D8%B4%D8%AC%D8%A7%D8%B1%D8%A7%D9%84%D9%86%D8%AE%D9%8A%D9%84.pdf"
    },
    {
      "id": "S6",
      "title": "دراسة النقص المسموح به لنخيل الخلاص",
      "supports": "نخيل خلاص، ري بالتنقيط، تربة رملية طميية، معاملات 40–120% من المتطلبات",
      "url": "https://www.mewa.gov.sa/ar/InformationCenter/OpenData/SiteAssets/Pages/OpenDataExamples/Perfect%20management%20in%20allowable%20deficit%20irrigation%20in%20date%20palm%20trees.pdf"
    },
    {
      "id": "S7",
      "title": "معايير جودة مياه الري",
      "supports": "تصنيف حساسية/مقاومة محاصيل للملوحة EC",
      "url": "https://www.mewa.gov.sa/ar/InformationCenter/DocsCenter/RulesLibrary/Documents/%D9%84%D8%A7%D8%A6%D8%AD%D8%A9%20%D8%A7%D9%84%D8%A7%D8%B4%D9%8A%D8%A7%D8%A8%20%D8%A7%D9%84%D8%A7%D9%87%D9%84%D9%8A%D8%A9.pdf"
    }
  ],
  "tenFarmsSource": "AeroCRNS_10_Farms_MEWA_Data.xlsx"
};
