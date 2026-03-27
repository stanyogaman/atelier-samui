const translations = {
  en: {
    name: 'English',
    title: 'Atelier Samui',
    subtitle: 'Custom furniture and interiors crafted with care.',
    languageLabel: 'Choose your language',
    welcomeHeading: 'Welcome',
    welcomeBody:
      'We automatically pick a language based on your browser settings and location clues.',
  },
  fr: {
    name: 'Français',
    title: 'Atelier Samui',
    subtitle: 'Mobilier et intérieurs sur mesure fabriqués avec soin.',
    languageLabel: 'Choisissez votre langue',
    welcomeHeading: 'Bienvenue',
    welcomeBody:
      'Nous choisissons automatiquement la langue selon votre navigateur et votre localisation.',
  },
  de: {
    name: 'Deutsch',
    title: 'Atelier Samui',
    subtitle: 'Maßgefertigte Möbel und Innenräume mit Sorgfalt gefertigt.',
    languageLabel: 'Wählen Sie Ihre Sprache',
    welcomeHeading: 'Willkommen',
    welcomeBody:
      'Wir wählen die Sprache automatisch anhand Ihres Browsers und Standort-Hinweisen aus.',
  },
  ru: {
    name: 'Русский',
    title: 'Atelier Samui',
    subtitle: 'Индивидуальная мебель и интерьеры, созданные с заботой.',
    languageLabel: 'Выберите язык',
    welcomeHeading: 'Добро пожаловать',
    welcomeBody:
      'Мы автоматически выбираем язык по настройкам браузера и признакам местоположения.',
  },
  th: {
    name: 'ไทย',
    title: 'Atelier Samui',
    subtitle: 'เฟอร์นิเจอร์และงานตกแต่งภายในสั่งทำพิเศษด้วยความใส่ใจ',
    languageLabel: 'เลือกภาษา',
    welcomeHeading: 'ยินดีต้อนรับ',
    welcomeBody: 'เราจะเลือกภาษาให้อัตโนมัติตามเบราว์เซอร์และข้อมูลตำแหน่งของคุณ',
  },
  ar: {
    name: 'العربية',
    title: 'Atelier Samui',
    subtitle: 'أثاث وتصميمات داخلية مخصصة مصنوعة بعناية.',
    languageLabel: 'اختر لغتك',
    welcomeHeading: 'مرحبًا',
    welcomeBody: 'نختار اللغة تلقائيًا بناءً على إعدادات المتصفح ومؤشرات الموقع.',
  },
};

const rtlLanguages = new Set(['ar']);
const supportedLanguages = Object.keys(translations);

const locationFallbackMap = {
  'Europe/Paris': 'fr',
  'Europe/Brussels': 'fr',
  'Europe/Berlin': 'de',
  'Europe/Vienna': 'de',
  'Europe/Zurich': 'de',
  'Europe/Moscow': 'ru',
  'Europe/Volgograd': 'ru',
  'Asia/Bangkok': 'th',
  'Asia/Dubai': 'ar',
  'Asia/Riyadh': 'ar',
  'Africa/Cairo': 'ar',
};

const userLanguagePreference =
  navigator.languages?.map((lang) => lang.toLowerCase()) ?? [navigator.language.toLowerCase()];

function normalizeLanguageCode(languageCode) {
  if (!languageCode) return null;

  const shortCode = languageCode.toLowerCase().split('-')[0];
  return supportedLanguages.includes(shortCode) ? shortCode : null;
}

function detectLanguage() {
  for (const languageCode of userLanguagePreference) {
    const normalizedCode = normalizeLanguageCode(languageCode);
    if (normalizedCode) {
      return normalizedCode;
    }
  }

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (userTimeZone && locationFallbackMap[userTimeZone]) {
    return locationFallbackMap[userTimeZone];
  }

  return 'en';
}

function setLanguage(languageCode) {
  const code = supportedLanguages.includes(languageCode) ? languageCode : 'en';
  const dictionary = translations[code];

  document.documentElement.lang = code;
  document.documentElement.dir = rtlLanguages.has(code) ? 'rtl' : 'ltr';
  document.getElementById('title').textContent = dictionary.title;
  document.getElementById('subtitle').textContent = dictionary.subtitle;
  document.getElementById('languageLabel').textContent = dictionary.languageLabel;
  document.getElementById('welcomeHeading').textContent = dictionary.welcomeHeading;
  document.getElementById('welcomeBody').textContent = dictionary.welcomeBody;

  const selector = document.getElementById('languageSelect');
  selector.value = code;

  localStorage.setItem('preferredLanguage', code);
}

function initializeLanguageSelector() {
  const selector = document.getElementById('languageSelect');

  supportedLanguages.forEach((code) => {
    const option = document.createElement('option');
    option.value = code;
    option.textContent = translations[code].name;
    selector.appendChild(option);
  });

  selector.addEventListener('change', (event) => {
    setLanguage(event.target.value);
  });

  const savedLanguage = normalizeLanguageCode(localStorage.getItem('preferredLanguage'));
  const initialLanguage = savedLanguage ?? detectLanguage();
  setLanguage(initialLanguage);
}

initializeLanguageSelector();
