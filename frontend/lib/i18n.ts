type TranslationDictionary = Record<string, string>;
type TranslationCatalog = Record<string, TranslationDictionary>;

export const translations: TranslationCatalog = {
  'en-US': {
    // Sidebar
    'nav_dashboard': 'Dashboard',
    'nav_guide': 'My Guide',
    'nav_region': 'Region',
    'label_language': 'Language',
    'label_theme': 'Theme',

    // Dashboard
    'dash_welcome': 'Hello',
    'dash_progress': 'Your Election Roadmap is {pct}% complete.',
    'dash_keep_going': 'Keep going!',
    'dash_steps_completed': 'You have completed {done} out of {total} exhaustive steps.',
    'dash_continue': 'Continue Roadmap',
    'dash_verified': 'Verified Status',
    'dash_id_mapped': 'Your ID is mapped to local laws.',
    'dash_eligibility': 'Eligibility Active',
    'dash_recent': 'Recent Activity',
    'dash_synced': 'Synchronized with election database...',
    'dash_help': 'Quick Assistance',
    'dash_agent': 'Agent support available 24/7.',
    'act_completed': 'Completed: {step}',
    'act_undone': 'Reverted: {step}',

    // Guide
    'guide_header': 'Your Election Roadmap',
    'guide_select_region': 'Select region for exhaustive guide',
    'guide_loaded': 'Successfully loaded {total} comprehensive steps verified for your jurisdiction.',
    'guide_loading': 'Loading exhaustive election protocols...',
    'guide_strategy': 'Strategy Status',
    'guide_steps_label': 'Steps',
    'guide_action_needed': 'Action Needed',
    'guide_verified': 'Verified',
    'guide_completed_btn': 'I have completed this',
    'guide_step_of': 'Step {curr} of {total}',
    'guide_listen': 'Listen',
    'guide_undo_btn': 'Undo',

    // Region
    'reg_header': 'Where are you\nvoting from?',
    'reg_desc': 'We use your coordinates to unlock exactly 13 steps for India or 10 steps for the USA.',
    'reg_engine': 'Local Engine',
    'reg_scanning': 'Scanning GPS...',
    'reg_detected': 'Detected: {country}',
    'reg_auto': 'Automatic Matching',
    'reg_locate': 'Locate Me',
    'reg_enter_guide': 'Enter Guide',
  },
  'hi-IN': {
    'nav_dashboard': 'डैशबोर्ड',
    'nav_guide': 'मेरी गाइड',
    'nav_region': 'क्षेत्र',
    'label_language': 'भाषा',
    'label_theme': 'थीम',

    'dash_welcome': 'नमस्ते',
    'dash_progress': 'आपका चुनाव रोडमैप {pct}% पूरा हो गया है।',
    'dash_keep_going': 'जारी रखें!',
    'dash_steps_completed': 'आपने {total} में से {done} संपूर्ण चरण पूरे किए हैं।',
    'dash_continue': 'रोडमैप जारी रखें',
    'dash_verified': 'सत्यापित स्थिति',
    'dash_id_mapped': 'आपकी पहचान स्थानीय कानून से जुड़ी है।',
    'dash_eligibility': 'पात्रता सक्रिय',
    'dash_recent': 'हाल की गतिविधि',
    'dash_synced': 'चुनाव डेटाबेस से समकालित...',
    'dash_help': 'त्वरित सहायता',
    'dash_agent': 'एजेंट सहायता 24/7 उपलब्ध।',
    'act_completed': 'पूर्ण: {step}',
    'act_undone': 'पूर्ववत किया गया: {step}',

    'guide_header': 'आपका चुनावी रोडमैप',
    'guide_select_region': 'विस्तृत गाइड के लिए क्षेत्र चुनें',
    'guide_loaded': 'आपके क्षेत्र के लिए {total} विस्तृत चरण सफलतापूर्वक लोड किए गए।',
    'guide_loading': 'चुनाव प्रोटोकॉल लोड हो रहे हैं...',
    'guide_strategy': 'रणनीति स्थिति',
    'guide_steps_label': 'चरण',
    'guide_action_needed': 'कार्रवाई आवश्यक',
    'guide_verified': 'सत्यापित',
    'guide_completed_btn': 'मैंने यह पूरा कर लिया है',
    'guide_step_of': 'चरण {curr} / {total}',
    'guide_listen': 'सुनें',
    'guide_undo_btn': 'पूर्ववत करें',

    // India Guide Translations
    'in-1_title': 'voters.eci.gov.in पर नाम सत्यापित करें',
    'in-1_desc': 'आधिकारिक ECI पोर्टल पर अपना भाग संख्या, क्रमांक, और वोटर आईडी स्थिति सत्यापित करें। सुनिश्चित करें कि आपका नाम \'Deleted\' (हटाया गया) न हो।',
    'in-2_title': 'आधिकारिक वोटर सूचना पर्ची डाउनलोड करें',
    'in-2_desc': 'अपनी डिजिटल वोटर पर्ची डाउनलोड करें, जिसमें आपके मतदान केंद्र का विवरण और कमरा नंबर होता है।',
    'in-3_title': 'डिजिटल EPIC (वोटर आईडी) डाउनलोड करें',
    'in-3_desc': 'पोर्टल से अपना ई-EPIC डाउनलोड करें। कृपया ध्यान दें कि आधार कार्ड या पासपोर्ट जैसे 11 अन्य सरकारी पहचान पत्र भी प्रवेश के लिए मान्य हैं।',
    'in-4_title': 'मैप पर मतदान केंद्र खोजें',
    'in-4_desc': 'अपने मतदान केंद्र के रूप में निर्धारित स्कूल या सरकारी भवन का स्थान पहचानें। भीड़ से बचने के लिए सुबह जाने की योजना बनाएं।',
    'in-5_title': 'KYC ऐप पर उम्मीदवारों की जांच करें',
    'in-5_desc': 'अपने क्षेत्र के सभी उम्मीदवारों के आपराधिक रिकॉर्ड, संपत्ति और देनदारियों की समीक्षा करने के लिए आधिकारिक KYC ऐप इंस्टॉल करें।',
    'in-6_title': 'पंक्ति प्रबंधन और प्रारंभिक सत्यापन',
    'in-6_desc': 'पहुंचने पर निर्धारित पंक्ति में खड़े हों। प्रवेश द्वार पर प्रारंभिक सत्यापन के लिए अपना वैध आईडी और वोटर पर्ची तैयार रखें।',
    'in-7_title': 'प्रथम मतदान अधिकारी: पहचान सत्यापन',
    'in-7_desc': 'प्रथम मतदान अधिकारी मतदाता सूची की चिह्नित प्रति के साथ आपके नाम की जांच करेगा और आपकी फोटो पहचान सत्यापित करेगा।',
    'in-8_title': 'द्वितीय मतदान अधिकारी: फॉर्म 17A हस्ताक्षर',
    'in-8_desc': 'द्वितीय मतदान अधिकारी फॉर्म 17A (मतदाता रजिस्टर) में आपका विवरण दर्ज करेगा और आपके हस्ताक्षर या अंगूठे का निशान लेगा।',
    'in-9_title': 'अमिट स्याही लगाना',
    'in-9_desc': 'द्वितीय मतदान अधिकारी आपकी बाईं तर्जनी पर अमिट बैंगनी स्याही लगाएगा। इसे पोंछें नहीं, क्योंकि यह आपके वोट के कानूनी प्रमाण के रूप में काम करता है।',
    'in-10_title': 'तृतीय मतदान अधिकारी: EVM सक्रियकरण',
    'in-10_desc': 'तृतीय मतदान अधिकारी आपकी वोटर पर्ची लेगा और आपके लिए इलेक्ट्रॉनिक वोटिंग मशीन (EVM) को सक्रिय करने के लिए कंट्रोल यूनिट पर \'बैलेट\' बटन दबाएगा।',
    'in-11_title': 'अपना वोट डालें (EVM)',
    'in-11_desc': 'निजी मतदान कक्ष में प्रवेश करें। अपनी पसंद के उम्मीदवार के नाम और चुनाव चिह्न के पास बैलेट यूनिट पर नीला बटन दबाएं।',
    'in-12_title': 'VVPAT विंडो सत्यापन',
    'in-12_desc': '7 सेकंड के लिए VVPAT विंडो देखें। आपकी पसंद प्रदर्शित करने वाली एक कागज की पर्ची दिखाई देगी और फिर स्वतः सीलबंद बॉक्स में गिर जाएगी।',
    'in-13_title': 'निकास और सेल्फी पॉइंट',
    'in-13_desc': 'निकास संकेतों का पालन करें। अपना नागरिक कर्तव्य पूरा करने का जश्न मनाने के लिए आप बूथ के बाहर सेल्फी पॉइंट पर जा सकते हैं।',

    'reg_header': 'आप कहाँ से\nमतदान कर रहे हैं?',
    'reg_desc': 'हम भारत के लिए 13 चरण और अमेरिका के लिए 10 चरण अनलॉक करने के लिए आपके निर्देशांक का उपयोग करते हैं।',
    'reg_engine': 'स्थान इंजन',
    'reg_scanning': 'GPS स्कैन हो रहा है...',
    'reg_detected': 'पता चला: {country}',
    'reg_auto': 'स्वचालित मिलान',
    'reg_locate': 'मुझे खोजें',
    'reg_enter_guide': 'गाइड में प्रवेश करें',
  },
  'mr-IN': {
    'nav_dashboard': 'डॅशबोर्ड',
    'nav_guide': 'माझे मार्गदर्शक',
    'nav_region': 'प्रदेश',
    'label_language': 'भाषा',
    'label_theme': 'थीम',

    'dash_welcome': 'नमस्कार',
    'dash_progress': 'तुमचा निवडणूक रोडमॅप {pct}% पूर्ण झाला आहे.',
    'dash_keep_going': 'सुरू ठेवा!',
    'dash_steps_completed': 'तुम्ही {total} पैकी {done} संपूर्ण टप्पे पूर्ण केले आहेत.',
    'dash_continue': 'रोडमॅप सुरू ठेवा',
    'dash_verified': 'सत्यापित स्थिती',
    'dash_id_mapped': 'तुमची ओळख स्थानिक कायद्याशी जोडली आहे.',
    'dash_eligibility': 'पात्रता सक्रिय',
    'dash_recent': 'अलीकडील क्रियाकलाप',
    'dash_synced': 'निवडणूक डेटाबेसशी समक्रमित...',
    'dash_help': 'त्वरित मदत',
    'dash_agent': 'एजंट मदत 24/7 उपलब्ध.',
    'act_completed': 'पूर्ण झाले: {step}',
    'act_undone': 'पूर्ववत केले: {step}',

    'guide_header': 'तुमचा निवडणूक रोडमॅप',
    'guide_select_region': 'सविस्तर मार्गदर्शकासाठी प्रदेश निवडा',
    'guide_loaded': 'तुमच्या अधिकारक्षेत्रासाठी {total} सविस्तर टप्पे यशस्वीरित्या लोड केले.',
    'guide_loading': 'निवडणूक प्रोटोकॉल लोड होत आहेत...',
    'guide_strategy': 'रणनीती स्थिती',
    'guide_steps_label': 'टप्पे',
    'guide_action_needed': 'कृती आवश्यक',
    'guide_verified': 'सत्यापित',
    'guide_completed_btn': 'मी हे पूर्ण केले आहे',
    'guide_step_of': 'टप्पा {curr} / {total}',
    'guide_listen': 'ऐका',
    'guide_undo_btn': 'पूर्ववत करा',

    // India Guide Translations
    'in-1_title': 'voters.eci.gov.in वर नाव सत्यापित करा',
    'in-1_desc': 'अधिकृत ECI पोर्टलवर तुमचा भाग क्रमांक, अनुक्रमांक आणि मतदान ओळखपत्र स्थिती तपासा. तुमचे नाव \'Deleted\' (काढून टाकलेले) नाही याची खात्री करा.',
    'in-2_title': 'अधिकृत मतदार माहिती पावती डाउनलोड करा',
    'in-2_desc': 'तुमची डिजिटल मतदार स्लिप डाउनलोड करा, ज्यामध्ये तुमच्या मतदान केंद्राचा तपशील, खोली क्रमांक आणि स्थानिक मतदान केंद्र ओळखकर्ते आहेत.',
    'in-3_title': 'डिजिटल EPIC (मतदार ओळखपत्र) डाउनलोड करा',
    'in-3_desc': 'पोर्टलवरून तुमचे ई-EPIC डाउनलोड करा. कृपया लक्षात घ्या की आधार कार्ड किंवा पासपोर्ट यांसारखी इतर ११ सरकारी ओळखपत्रे देखील प्रवेशासाठी वैध आहेत.',
    'in-4_title': 'नकाशाद्वारे मतदान केंद्र शोधा',
    'in-4_desc': 'तुमचे मतदान केंद्र म्हणून नियुक्त केलेल्या शाळा किंवा सरकारी इमारतीचे स्थान ओळखा. गर्दी टाळण्यासाठी सकाळी जाण्याचे नियोजन करा.',
    'in-5_title': 'KYC ॲपवर उमेदवारांची माहिती तपासा',
    'in-5_desc': 'तुमच्या क्षेत्रातील सर्व उमेदवारांचे गुन्हेगारी रेकॉर्ड, मालमत्ता आणि दायित्वांचे पुनरावलोकन करण्यासाठी अधिकृत KYC ॲप डाउनलोड करा.',
    'in-6_title': 'रांगेचे व्यवस्थापन आणि प्रारंभिक पडताळणी',
    'in-6_desc': 'पोहोचल्यावर नियुक्त केलेल्या रांगेत उभे राहा. प्रवेशद्वारावरील प्रारंभिक पडताळणीसाठी तुमचे वैध ओळखपत्र आणि मतदार पावती तयार ठेवा.',
    'in-7_title': 'प्रथम मतदान अधिकारी: ओळख पडताळणी',
    'in-7_desc': 'पहिला मतदान अधिकारी मतदार यादीच्या चिन्हांकित प्रतीद्वारे तुमचे नाव तपासेल आणि तुमच्या फोटो ओळखीची पडताळणी करेल.',
    'in-8_title': 'दुसरा मतदान अधिकारी: फॉर्म 17A स्वाक्षरी',
    'in-8_desc': 'दुसरा मतदान अधिकारी फॉर्म 17A (मतदार नोंदवही) मध्ये तुमचा तपशील नोंदवेल आणि तुमची स्वाक्षरी किंवा अंगठ्याचा ठसा घेईल.',
    'in-9_title': 'अमिट शाई लावणे',
    'in-9_desc': 'दुसरा मतदान अधिकारी तुमच्या डाव्या तर्जनीवर अमिट जांभळी शाई लावेल. ती पुसून टाकू नका, कारण ती तुमच्या मताचा कायदेशीर पुरावा म्हणून काम करेल.',
    'in-10_title': 'तिसरा मतदान अधिकारी: EVM सक्रियकरण',
    'in-10_desc': 'तिसरा मतदान अधिकारी तुमची मतदार स्लिप गोळा करेल आणि तुमच्यासाठी इलेक्ट्रॉनिक मतदान यंत्र (EVM) सक्रिय करण्यासाठी नियंत्रण युनिटवरील \'बॅलेट\' बटण दाबेल.',
    'in-11_title': 'तुमचे मत नोंदवा (EVM)',
    'in-11_desc': 'खाजगी मतदान कक्षात प्रवेश करा. तुमच्या पसंतीच्या उमेदवाराचे नाव आणि चिन्हाच्या शेजारील मतदान युनिटवरील निळे बटण दाबा.',
    'in-12_title': 'VVPAT विंडो पडताळणी',
    'in-12_desc': '7 सेकंदांसाठी VVPAT खिडकीकडे पहा. तुमची पसंती दर्शवणारी कागदाची स्लिप दिसेल आणि नंतर आपोआप सीलबंद बॉक्समध्ये पडेल.',
    'in-13_title': 'बाहेर पडा आणि सेल्फी पॉइंट',
    'in-13_desc': 'बाहेर पडण्याच्या पाट्यांचे अनुसरण करा. मतदान केल्याचे साजरे करण्यासाठी तुम्ही बूथबाहेर सेल्फी पॉईंटला भेट देऊ शकता.',

    'reg_header': 'तुम्ही कुठून\nमतदान करत आहात?',
    'reg_desc': 'भारतासाठी 13 टप्पे आणि अमेरिकेसाठी 10 टप्पे अनलॉक करण्यासाठी आम्ही तुमचे निर्देशांक वापरतो.',
    'reg_engine': 'स्थान इंजन',
    'reg_scanning': 'GPS स्कॅन होत आहे...',
    'reg_detected': 'सापडले: {country}',
    'reg_auto': 'स्वयंचलित जुळवणी',
    'reg_locate': 'मला शोधा',
    'reg_enter_guide': 'मार्गदर्शकात प्रवेश करा',
  }
};

export const useTranslation = (lang: string) => {
  const dict = translations[lang] || translations['en-US'];

  return {
    t: (key: string, params?: Record<string, string | number>) => {
      let str = dict[key] || translations['en-US'][key] || key;
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          str = str.replace(`{${k}}`, v.toString());
        });
      }
      return str;
    }
  };
};
