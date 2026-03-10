// i18n.js - Simple localization for Paste CouchApp

const I18n = {
  // Available languages
  languages: {
    'en': 'English',
    'es': 'Español',
    'fr': 'Français',
    'de': 'Deutsch',
    'zh': '中文'
  },
  
  // Current language (detected from browser or default)
  currentLang: 'en',
  
  // Translation strings
  strings: {
    'en': {
      'title_label': 'title:',
      'tags_label': 'tags:',
      'paste_button': 'Paste!',
      'tags_placeholder': 'comma separated list of tags',
      'main_title': 'Paste 2.0',
      'click_to_open': 'Click to open paste',
      'see_all_tagged': 'See all pastes tagged with',
      'language': 'Language'
    },
    'es': {
      'title_label': 'título:',
      'tags_label': 'etiquetas:',
      'paste_button': '¡Pegar!',
      'tags_placeholder': 'lista de etiquetas separadas por comas',
      'main_title': 'Paste 2.0',
      'click_to_open': 'Haz clic para abrir el paste',
      'see_all_tagged': 'Ver todos los pastes con etiqueta',
      'language': 'Idioma'
    },
    'fr': {
      'title_label': 'titre:',
      'tags_label': 'étiquettes:',
      'paste_button': 'Coller!',
      'tags_placeholder': 'liste d\'étiquettes séparées par des virgules',
      'main_title': 'Paste 2.0',
      'click_to_open': 'Cliquer pour ouvrir le paste',
      'see_all_tagged': 'Voir tous les pastes avec l\'étiquette',
      'language': 'Langue'
    },
    'de': {
      'title_label': 'Titel:',
      'tags_label': 'Tags:',
      'paste_button': 'Einfügen!',
      'tags_placeholder': 'Komma-getrennte Liste von Tags',
      'main_title': 'Paste 2.0',
      'click_to_open': 'Klicken um Paste zu öffnen',
      'see_all_tagged': 'Alle Pastes mit Tag ansehen',
      'language': 'Sprache'
    },
    'zh': {
      'title_label': '标题:',
      'tags_label': '标签:',
      'paste_button': '粘贴!',
      'tags_placeholder': '逗号分隔的标签列表',
      'main_title': 'Paste 2.0',
      'click_to_open': '点击打开粘贴',
      'see_all_tagged': '查看所有带此标签的粘贴',
      'language': '语言'
    }
  },
  
  // Initialize localization
  init: function() {
    // Detect browser language
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.split('-')[0];
    
    // Use browser language if available, otherwise default to English
    if (this.languages[langCode]) {
      this.currentLang = langCode;
    }
    
    // Apply translations
    this.applyTranslations();
    
    // Add language switcher if needed
    this.addLanguageSwitcher();
  },
  
  // Translate a key
  t: function(key) {
    return this.strings[this.currentLang][key] || key;
  },
  
  // Apply translations to the page
  applyTranslations: function() {
    // Update elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (this.strings[this.currentLang][key]) {
        if (element.tagName === 'INPUT' && element.getAttribute('type') === 'text') {
          element.setAttribute('placeholder', this.t(key));
        } else {
          element.textContent = this.t(key);
        }
      }
    });
    
    // Update page title
    document.title = this.t('main_title');
  },
  
  // Change language
  changeLanguage: function(langCode) {
    if (this.languages[langCode]) {
      this.currentLang = langCode;
      this.applyTranslations();
      localStorage.setItem('paste_language', langCode);
    }
  },
  
  // Add language switcher to UI
  addLanguageSwitcher: function() {
    // Check if switcher already exists
    if (document.getElementById('language-switcher')) {
      return;
    }
    
    // Create language switcher
    const switcher = document.createElement('div');
    switcher.id = 'language-switcher';
    switcher.style.position = 'fixed';
    switcher.style.bottom = '10px';
    switcher.style.right = '10px';
    switcher.style.zIndex = '1000';
    switcher.style.backgroundColor = 'white';
    switcher.style.padding = '5px';
    switcher.style.border = '1px solid #ccc';
    switcher.style.borderRadius = '3px';
    
    // Add label
    const label = document.createElement('span');
    label.textContent = this.t('language') + ': ';
    label.style.marginRight = '5px';
    switcher.appendChild(label);
    
    // Add select dropdown
    const select = document.createElement('select');
    select.onchange = (e) => this.changeLanguage(e.target.value);
    
    for (const [code, name] of Object.entries(this.languages)) {
      const option = document.createElement('option');
      option.value = code;
      option.textContent = name;
      if (code === this.currentLang) {
        option.selected = true;
      }
      select.appendChild(option);
    }
    
    switcher.appendChild(select);
    document.body.appendChild(switcher);
  }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => I18n.init());
} else {
  I18n.init();
}

// Make I18n globally available
window.I18n = I18n;