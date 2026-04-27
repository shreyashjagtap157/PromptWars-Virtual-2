export const translations: Record<string, any> = {
  'en-US': {
    // Sidebar
    'nav_dashboard': 'Dashboard',
    'nav_guide': 'My Guide',
    'nav_region': 'Region',
    'nav_multilingual': 'Multilingual',
    'label_language': 'Language',
    'label_theme': 'Theme',
    
    // Dashboard
    'dash_welcome': 'Hello',
    'dash_progress': 'Your Election Roadmap is {pct}% complete.',
    'dash_keep_going': 'Keep going!',
    'dash_steps_completed': 'You have completed {done} out of {total} exhaustive steps.',
    'dash_continue': 'Continue Roadmap',
    'dash_verified': 'Verified Status',
    'dash_eligibility': 'Eligibility Active',
    'dash_recent': 'Recent Activity',
    'dash_help': 'Quick Assistance',
    
    // Region
    'reg_header': 'Where are you\nvoting from?',
    'reg_engine': 'Location Engine Status',
    'reg_locate': 'Locate Me',
    
    // Guide
    'guide_header': 'Your Election Roadmap',
    'guide_action_needed': 'Action Needed',
    'guide_verified': 'Verified',
    'guide_completed_btn': 'I have completed this',
    'guide_step_of': 'Step {curr} of {total}',
    'guide_listen': 'Listen',
  },
  'hi-IN': {
    'nav_dashboard': 'डैशबोर्ड',
    'nav_guide': 'मेरा गाइड',
    'nav_region': 'क्षेत्र',
    'nav_multilingual': 'बहुभाषी',
    'label_language': 'भाषा',
    'label_theme': 'थीम',
    
    'dash_welcome': 'नमस्ते',
    'dash_progress': 'आपका चुनाव रोडमैप {pct}% पूरा हो गया है।',
    'dash_keep_going': 'जारी रखें!',
    'dash_steps_completed': 'आपने {total} में से {done} संपूर्ण चरण पूरे कर लिए हैं।',
    'dash_continue': 'रोडमैप जारी रखें',
    'dash_verified': 'सत्यापित स्थिति',
    'dash_eligibility': 'पात्रता सक्रिय',
    'dash_recent': 'हाल की गतिविधि',
    'dash_help': 'त्वरित सहायता',

    'reg_header': 'आप कहां से\nवोट दे रहे हैं?',
    'reg_locate': 'मुझे खोजें',

    'guide_header': 'आपका चुनावी रोडमैप',
    'guide_action_needed': 'कार्रवाई आवश्यक',
    'guide_verified': 'सत्यापित',
    'guide_completed_btn': 'मैंने इसे पूरा कर लिया है',
    'guide_step_of': 'चरण {total} में से {curr}',
    'guide_listen': 'सुनें',
  },
  'mr-IN': {
    'nav_dashboard': 'डॅशबोर्ड',
    'nav_guide': 'माझे मार्गदर्शक',
    'nav_region': 'प्रदेश',
    'nav_multilingual': 'बहुभाषिक',
    'label_language': 'भाषा',
    'label_theme': 'थीम',
    
    'dash_welcome': 'नमस्कार',
    'dash_progress': 'तुमचा निवडणूक रोडमॅप {pct}% पूर्ण झाला आहे.',
    'dash_keep_going': 'सुरू ठेवा!',
    'dash_steps_completed': 'तुम्ही {total} पैकी {done} संपूर्ण टप्पे पूर्ण केले आहेत.',
    'dash_continue': 'रोडमॅप सुरू ठेवा',
    'dash_verified': 'सत्यापित स्थिती',
    'dash_eligibility': 'पात्रता सक्रिय',
    'dash_recent': 'अलीकडील क्रियाकलाप',
    'dash_help': 'त्वरीत मदत',

    'reg_header': 'तुम्ही कुठून\nमतदान करत आहात?',
    'reg_locate': 'मला शोधा',

    'guide_header': 'तुमचा निवडणूक रोडमॅप',
    'guide_action_needed': 'कृती आवश्यक',
    'guide_verified': 'सत्यापित',
    'guide_completed_btn': 'मी हे पूर्ण केले आहे',
    'guide_step_of': 'टप्पा {total} पैकी {curr}',
    'guide_listen': 'ऐका',
  }
};

export const useTranslation = (lang: string) => {
  const dict = translations[lang] || translations['en-US'];
  
  return {
    t: (key: string, params?: Record<string, any>) => {
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
