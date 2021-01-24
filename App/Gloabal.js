import i18n from './i18n';
import { Dimensions } from 'react-native';

export default {
  BASE_URL: 'https://tdemc.sa',
  windowWidth: Dimensions.get('window').width,
  windowHeight: Dimensions.get('window').height,
  /********Colors********* */
  BLACK: 'black',
  Bold: 'DIN NEXT LT Arabic Bold',
  Regular: 'DIN NEXT LT Arabic Regular',
  Meduim: 'DIN NextLT Arabic Medium',
  Gray: '#818E95',
  Light_Gray: '#C3CCD2',
  Blue: '#0091FF',
  Bold_blue: '#273A70',
  white: 'white',
  Ferany: '#6A6A6A',
  darkGrey: '#2D2E2E',
  Samawe: '#DDF4FF',
  pink: '#FFD7D7',
  Peag: '#FFEDCF',
  Move: '#F0DDFF',
  /*******ON_BOARD****** */

  ONBOARD_P1: i18n.t('سجلك الطبي أينما كنت.'),
  ONBOARD_P2: i18n.t('سجلك الطبي وتقارير الأشعة والاختبارات المعملية والوصفات الطبية معك أينما كنت.'),
  LOGIN: i18n.t('تسجيل دخول'),
  SIGNUP: i18n.t('انشاء مستخدم جديد'),
  QUESTION_CODE: i18n.t('هل لديك كود مريض؟'),

  /********LOGIN********* */
  ACCOUNT: i18n.t('ليس لديك حساب؟'),
  ENTER_USERNAME_PASSWORD: i18n.t('ادخل اسم المستخدم وكلمة المرور الخاصة بك'),
  USERNAME: i18n.t('اسم المستخدم'),
  PASSWORD: i18n.t('كلمة المرور'),
  FORGET_PASSWORD: i18n.t('نسيت كلمة المرور؟'),
  NO_ACCOUNT: i18n.t('نسيت كلمة المرور؟'),
  CHANGE_PASSWORD: 'تغيير كلمة المرور',
  QUESTION_FORGET: 'هل نسيت كلمة المرور؟',
  FORGET_PASSWORD_P1: 'ادخل البريد الإلكتروني الذي قمت بالتسجيل به لاستعادة كلمة المرور الخاصة بك',
  EMAIL: 'البريد الإلكتروني',
  ENTER_EMAIL: 'أدخل البريد الإلكتروني الخاص بك',
  SEND: 'ارسال',
  CREATE_PASS: 'انشاء كلمة المرور جديدة',
  PLEASE: 'من فضلك قم بإنشاء كلمة مرور جديدة لحسابك',
  CONFIRM_PASS: 'تأكيد كلمة المرور',
  CONFIRM: 'تأكيد',

  /********Verification********* */
  SEND_CODE: i18n.t('تم ارسال رمز التحقق'),
  ENTER_CODE_VERIFICATION: i18n.t('من فضلك أدخل الرمز المكون من 5 أرقام الذي\n أرسلناه إلى بريدك الإلكتروني \nsaad@gmail.com'),
  NOT_SEND: i18n.t('لم تتلق الرمز؟'),
  TRY_SEND: i18n.t('أعد الإرسال!'),
  /*************PatientCode****** */
  ENTER_CODE_PATIENT: i18n.t('ادخل كود المريض الذي حصلت عليه من طبيبك الخاص'),
  PATIENT_CODE: i18n.t('كود المريض'),

  /*************sign Up */

  USER_DATA: i18n.t('بيانات المستخدم'),
  MEDICAL_DATA: i18n.t('بيانات طبية'),

  FULL_NAME: i18n.t('الاسم بالكامل'),
  DATE: i18n.t('تاريخ الميلاد'),
  JOP: i18n.t('الوظيفة'),
  SEX: i18n.t('النوع'),
  MOBILE: i18n.t('رقم الموبايل'),
  INSIDE: i18n.t('المجال الطبي'),
  OUTSIDE: i18n.t('خارج المجال الطبي'),
  COUNTRY: i18n.t('محافظة'),
  REGION: i18n.t('منطقة'),
  ADDRESS: i18n.t('تفاصيل العنوان'),
  NEXT: i18n.t('التالي'),
  MALE: i18n.t('ذكر'),
  FAMLE: i18n.t('انثى'),

  /********medical DAtat */

  WEIGHT: i18n.t('الوزن'),
  HEIGHT: i18n.t('الطول'),
  DISEASE: i18n.t('الأمراض المزمنة'),
  DISEASE_SELECTED: i18n.t('قم بتحديد الأمراض المزمنة'),
  U_SMOKING: i18n.t('هل انت مدخن ...'),
  U_MARRIED: i18n.t('هل انت متزوج ...'),
  YES: i18n.t('نعم'),
  NO: i18n.t('لا'),
  CREATE_NEW_PASS: i18n.t('انشاء كلمة المرور'),
  COMPLETE_PROFILE: i18n.t('استكمال الملف الشخصي'),
  THANKU: i18n.t('شكرا لك'),
  ADD_DONE: i18n.t('تم إضافة المستخدم بنجاح وانشاء كود للمريض'),
  GO_TO_HOME: i18n.t('العودة للرئيسية'),
  SELECT_MORE: i18n.t('اختر واحدا او أكثر من الامراض التالية'),

  /*****Deal Screen */
  offer: i18n.t('عروض'),
  CITY: i18n.t('المحافظة'),
  IREA: i18n.t('المنطقة التابع لها'),
  SERVISE: i18n.t('خدمات'),
  REQUEST: i18n.t('طلباتي'),
  SEARCH: i18n.t('بحث'),
  VISIT: i18n.t('زيارات طبية'),
  BRANCH: i18n.t('عرض الفروع'),
  HOWGETOFFER: i18n.t('ازاي احصل علي العرض'),


  /***Visit Screen */
  OFFER_BTN: i18n.t('عرض'),
  MEDICAL_STATUS: i18n.t('الحالة الطبية'),
  MEDICALLOG: i18n.t('السجل الطبي'),
  Disclosures: i18n.t('كشوفات'),
  REPORTES: i18n.t('تقارير'),
  CONTINUE: i18n.t('استمرار'),
  HIDE_DATA: i18n.t('اخفاء البيانات الصحية'),
  DESC_HIDE: i18n.t('في حالة اخفاء البيانات الشخصية، لن يتمكن الطبيب من رؤية التاريخ الصحي الخاص بك وبالتالي سيؤثر علي التشخيص السليم لحالتك'),
  HIDE_MY_DATA: i18n.t('اخفاء جميع البيانات الخاصة بي'),
  HIDE_DONE: i18n.t('تم اخفاء البيانات'),
  BACK: i18n.t('رجوع'),

  COLOR_NO: '#03599B',
  Date1: '#A5EBFF',
  Date2: '#FFC9A5',
  Date3: '#F9BDF2',
  Date4: '#A5FFC7',

  /*********Reports**** */
  REQUESTDOCTOR: i18n.t('بطلب من الطبيب'),
  WITHOUTDOCTOR: i18n.t('بدون طلب من الطبيب'),

  DETAILS_OF_REPORT: i18n.t('تفاصيل التقارير'),
  ORDER_DATE: i18n.t('تاريخ الطلب'),
  Physician: i18n.t('الطبيب المعالج'),
  Required_analysis: i18n.t('التحليل المطلوب'),
  RESULTS: i18n.t('النتائج'),
  /**treatments */

  Detection_Date: i18n.t('تاريخ الكشف'),
  PATIENT_COMPLAIN: i18n.t('شكوي المريض'),
  DIAGNOSIS: i18n.t('التشخيص'),
  PRESCRIPTION: i18n.t('روشتة العلاج'),
  PRESCRIPTION_EXCHANGE: i18n.t('صرف الروشتة اونلاين'),
  DETECTION_DETAILS: i18n.t('تفاصيل الكشف'),


  /**medical Status */
  Vaccinations: i18n.t('التطعيمات'),
  BORN: i18n.t('عند الميلاد'),
  BORN_TWO_MONTHS: i18n.t('من الميلاد حتي شهرين'),
  TWO_MONTHS: i18n.t('شهرين'),
  FOUR_MONTHS: i18n.t('٤ شهور'),
  SIX_MONTHS: i18n.t('٦ شهور'),
  NINE_MONTHS: i18n.t('٩ شهور'),
  GROWTH_RATE: i18n.t('معدل النمو'),
  AGE: i18n.t('العمر'),
  HEAD: i18n.t('محيط الرأس'),

  /**********Seach Screen */
  WHAT_SEARCH: i18n.t('عن ماذا تبحث …'),
  DOCTOR_NAME: i18n.t('اسم الطبيب'),
  SPECIAL: i18n.t('التخصص'),
  Lab_NAME: i18n.t('اسم المعمل'),
  RAD_NAME: i18n.t('اسم المركز'),
  PHRMA_NAME: i18n.t('اسم الصيدلية'),
  RAD_IREA: i18n.t(' المنطقة التابع لها المركز'),
  PHARMA_IREA: i18n.t('المنطقة التابع لها الصيدلية'),
  LAB_IREA: i18n.t('المنطقة التابع لها المعمل'),

  DOCTOR_TITLE: i18n.t('أطباء'),
  LAB_TITLE: i18n.t('معمل تحاليل'),
  RAD_TITLE: i18n.t('مركز أشعة'),
  PHARMA_TITLE: i18n.t('صيدلية'),
  MAKE_REQUEST: i18n.t('انشاء طلب'),
  NAME_TYPE: i18n.t('الصنف المطلوب'),
  NOTES: i18n.t('ملاحظات'),
  WRITE_HERE: i18n.t('اكتب هنا …'),
  ADD: i18n.t('+ أضف صنفاً اخر'),
  PHARMA_TITLE: i18n.t('صيدلية'),

  QUANTITY: i18n.t('الكمية'),
  CREATE_REQUEST: i18n.t('انشاء الطلب'),
  CHECK_BOX_TEXT: i18n.t('الإتصال بي في حال عدم توفر بعض الأدوية'),
  SEND_REQUEST: i18n.t('إرسال الطلب'),

  SEARCH_PHARM: i18n.t('البحث عن صيدلية'),
  



};