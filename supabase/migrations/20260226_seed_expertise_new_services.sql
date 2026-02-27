-- Seed data: 4 new expertise entries (display_order 9–12)
-- Table was renamed from services_section → expertise
-- Run manually: paste into Supabase SQL editor or psql

INSERT INTO public.expertise (
  service_slug,
  tag_en,    tag_ru,    tag_tm,
  title_en,  title_ru,  title_tm,
  info_en,   info_ru,   info_tm,
  description_en, description_ru, description_tm,
  highlight_stat_en, highlight_stat_ru, highlight_stat_tm,
  display_order, image
)
VALUES

  -- 9. Professional Lighting & AV Systems
  (
    'professional-av-systems',
    'Lighting & AV',
    'Освещение и AV',
    'Yşyklandyryş we AV',

    'Professional Lighting & Audio/Visual Systems',
    'Профессиональные системы освещения и AV',
    'Hünärmen yşyklandyryş we ses/wideo ulgamlary',

    'End-to-end audio, visual, and lighting design for conference rooms, theaters, and banquet halls — delivering immersive experiences for every event.',
    'Комплексное проектирование аудио-, видео- и световых систем для конференц-залов, театров и банкетных зал — создаёт незабываемые впечатления на каждом мероприятии.',
    'Maslahat zallary, teatrlar we toý dürli meýdançalary üçin el bilen taýýarlanan ses, wideo we yşyklandyryş ulgamlary — her çärä özüne çekiji tejribe döredýär.',

    'We supply and install professional AV equipment (Bose, JBL, Harman, Barco, Epson) for conference rooms, auditoriums, theaters, restaurants, and wedding venues. Our scope includes acoustic design, multi-channel surround sound systems, DMX-controlled LED stage and ambient lighting, high-brightness projection and LED video walls, HDMI/SDI signal distribution, and unified control systems (AMX, Crestron). All installations are commissioned with on-site acoustic calibration, lighting scene programming, and full handover documentation.',
    'Мы поставляем и монтируем профессиональное AV-оборудование (Bose, JBL, Harman, Barco, Epson) для конференц-залов, аудиторий, театров, ресторанов и свадебных площадок. Наши работы включают акустическое проектирование, многоканальные системы объёмного звука, DMX-управляемое светодиодное сценическое и декоративное освещение, проекцию высокой яркости и LED-видеостены, распределение сигналов HDMI/SDI и единые системы управления (AMX, Crestron). Все объекты сдаются с акустической калибровкой на месте, программированием световых сцен и полным пакетом документации.',
    'Biz maslahat zallary, auditorýalar, teatrlar, restoranlar we toý meýdançalary üçin hünärmen AV enjamlary (Bose, JBL, Harman, Barco, Epson) üpjün edýäris we gurnaýarys. Iş çäklerimize: akustik taslamalary, köp kanally gurşaw ses ulgamlary, DMX dolandyrylýan LED sahna we bezeg yşyklandyryşy, ýokary aýdyňlykly proýektsiýa we LED wideo diwarlary, HDMI/SDI signal paýlanyşy we birleşdirilen dolandyryş ulgamlary (AMX, Crestron) girýär.',

    '50+ conference halls and event venues equipped',
    'Оснащено 50+ конференц-залов и event-площадок',
    '50+ maslahat zaly we çäre meýdançasy enjamlaşdyryldy',

    9,
    '/images/services/professional-av.jpg'
  ),

  -- 10. Interactive Displays & Smart Education Solutions
  (
    'smart-education-solutions',
    'EdTech',
    'Образование',
    'Bilim tehnologiýasy',

    'Interactive Displays & Smart Education Solutions',
    'Интерактивные панели и умные решения для образования',
    'Interaktiw ekranlar we akylly bilim çözgütleri',

    'Interactive whiteboards, classroom projectors, and smart gadgets tailored for schools, kindergartens, universities, and training centers.',
    'Интерактивные доски, проекторы и умные гаджеты, созданные для школ, детских садов, университетов и учебных центров.',
    'Mekdepler, çagalar baglary, uniwersitetler we okuw merkezleri üçin niýetlenen interaktiw tagtalar, synp proektorlary we akylly enjamlar.',

    'We design and install smart learning environments using interactive flat panels and whiteboards (BenQ, ViewSonic, SMART Board), short-throw and ultra-short-throw projectors (Epson, NEC, BenQ), digital corridor signage, school-wide PA and bell systems, document cameras, and student response devices. Our turnkey packages cover delivery, secure wall mounting, OS and software setup, school network integration, and full teacher training sessions. Solutions are designed to meet modern pedagogical standards and classroom ergonomic guidelines, and are suitable for classrooms, lecture halls, kindergarten activity rooms, and university seminar spaces.',
    'Мы проектируем и оснащаем «умные» учебные пространства с использованием интерактивных панелей и досок (BenQ, ViewSonic, SMART Board), проекторов с коротким и ультракоротким фокусом (Epson, NEC, BenQ), цифровой навигационной рекламы для коридоров, школьных систем оповещения и звонков, документ-камер и устройств для опроса студентов. Наши комплексные пакеты включают поставку, надёжный настенный монтаж, установку ОС и ПО, интеграцию со школьной сетью и полноценное обучение педагогов. Решения соответствуют современным педагогическим стандартам и эргономическим требованиям к классам.',
    'Biz BenQ, ViewSonic we SMART Board interaktiw panelleri we tagtalar, gysga fokuslama we gaty gysga fokuslama proýektorlar (Epson, NEC, BenQ), koridor sanly maglumat ekranlary, mekdep boýunça habar beriş we jaň ulgamlary, resminama kameralary we talyplar üçin ses beriş enjamlaryny ulanyp akylly okuw gurşawlaryny taslaýarys we gurnaýarys. Toplumlaýyn paketlerimiziň içinde: eltip bermek, ygtybarly diwara gurnamak, OS we programma üpjünçiligini sazlamak, mekdep tory bilen integrasiýa we mugallymlar üçin okuw sapaklary bar.',

    '120+ classrooms equipped with smart technology',
    '120+ классов оснащены умными технологиями',
    '120+ synp otaglary akylly tehnologiýa bilen enjamlaşdyryldy',

    10,
    '/images/services/smart-education.jpg'
  ),

  -- 11. Smart Home & Automation Systems
  (
    'smart-home-automation',
    'Smart Home',
    'Умный дом',
    'Akylly öý',

    'Smart Home & Automation Systems',
    'Системы умного дома и автоматизации',
    'Akylly öý we awtomatizasiýa ulgamlary',

    'Integrated smart home solutions covering lighting, climate, security, and entertainment — all controlled from a single app or voice command.',
    'Комплексные решения умного дома, охватывающие освещение, климат, безопасность и развлечения — всё управляется из одного приложения или голосовой командой.',
    'Yşyklandyryş, klimat, howpsuzlyk we güýmenjäni öz içine alýan toplumlaýyn akylly öý çözgütleri — ählisi bir programma ýa-da ses buýrugyndan dolandyrylýar.',

    'We design and commission smart home and light commercial automation systems based on KNX, Z-Wave, Zigbee, and cloud platforms (Tuya, Loxone, Xiaomi). Our scope covers intelligent lighting scenes (Philips Hue, Legrand), motorized blinds and curtains, multi-zone climate and underfloor heating control, smart locks and video doorbells, multi-room audio, home security integration (CCTV + alarm), and voice assistant support (Alexa, Google Home, Yandex). We handle all cabling, hub and gateway installation, app configuration, automation scene programming, and resident handover training. Both new-build and retrofit installations are available for apartments, private houses, and boutique offices.',
    'Мы проектируем и внедряем системы умного дома и лёгкой коммерческой автоматизации на базе KNX, Z-Wave, Zigbee и облачных платформ (Tuya, Loxone, Xiaomi). Наши работы охватывают умные световые сцены (Philips Hue, Legrand), моторизованные жалюзи и шторы, многозонный климат-контроль и управление тёплыми полами, умные замки и видеодомофоны, многокомнатный звук, интеграцию систем безопасности (CCTV + охранная сигнализация), а также поддержку голосовых помощников (Alexa, Google Home, Яндекс). Мы обеспечиваем прокладку кабелей, монтаж хабов и шлюзов, настройку приложений, программирование сценариев автоматизации и обучение жильцов.',
    'Biz KNX, Z-Wave, Zigbee we bulut platformalary (Tuya, Loxone, Xiaomi) esasly akylly öý we ýeňil täjirçilik awtomatizasiýa ulgamlaryny taslaýarys we ulanmaga berýäris. Iş çäklerimize: akylly yşyklandyryş sahnalary (Philips Hue, Legrand), motor perdeler we toýunlar, köp zonaly klimat dolandyryşy we ýer gyzdyryş dolandyryşy, akylly gulplar we wideo gapylar, köp otag ses ulgamy, howpsuzlyk integrasiýasy (CCTV + signal) we ses kömekçi goldawy (Alexa, Google Home, Ýandeks) girýär.',

    '200+ smart apartments and villas commissioned',
    'Сдано 200+ умных квартир и вилл',
    '200+ akylly kwartira we willa tabşyryldy',

    11,
    '/images/services/smart-home.jpg'
  ),

  -- 12. Public Address & Announcement Systems
  (
    'announcement-pa-systems',
    'Announcement & PA Systems',
    'Системы оповещения (PA)',
    'Habar beriş ulgamlary',

    'Public Address & Announcement Systems',
    'Системы публичного оповещения и трансляции',
    'Köpçülige habar beriş we anonslama ulgamlary',

    'Centralized audio announcement solutions for commercial, industrial, and public spaces — delivering clear voice and alarm broadcasts across all zones.',
    'Централизованные аудиосистемы оповещения для коммерческих, промышленных и общественных объектов — обеспечивают чёткую голосовую и аварийную трансляцию по всем зонам.',
    'Täjirçilik, senagat we jemgyýetçilik meýdançalary üçin merkezleşdirilen ses habar beriş çözgütleri — ähli zolaklarda aýdyň ses we duýduryş geçirişini üpjün edýär.',

    'We design and install IP-based and analog PA systems (Bosch, TOA, Honeywell) covering background music, live and pre-recorded announcements, emergency evacuation alerts, and zone-based paging. Systems integrate with fire alarm panels, BMS, and access control for automated emergency broadcasts. Suitable for offices, malls, factories, hospitals, airports, and educational campuses. Scalable from single-zone to 500+ zone enterprise networks with remote management.',
    'Мы проектируем и монтируем IP и аналоговые системы оповещения (Bosch, TOA, Honeywell), охватывающие фоновую музыку, живые и записанные объявления, сигналы аварийной эвакуации и зональный вызов. Системы интегрируются с пожарными панелями, BMS и контролем доступа для автоматических экстренных трансляций. Подходит для офисов, торговых центров, заводов, больниц, аэропортов и учебных кампусов. Масштабируется от однозонной до корпоративной сети 500+ зон с удалённым управлением.',
    'Biz IP we analog esasly PA ulgamlaryny (Bosch, TOA, Honeywell) taslamalaýarys we gurnaýarys: fon sazy, göni we öňünden ýazylan anonslar, adatdan daşary taşlanma signallary we zolaklaryň arasynda çagyryş. Ulgamlar ýangyn panellerine, BMS we giriş gözegçiligine integrirlenen bolup, awtomatik adatdan daşary habar beriş üpjün edýär. Ofisler, söwda merkezleri, zawodlar, hassahanalar, howa menzilleri we okuw meýdançalary üçin amatlydyr. Bir zolaklylykdan 500+ zolaklyk kärhanalar ulgamyna çenli giňeldilip bilner.',

    'Scalable from 1 to 500+ broadcast zones',
    'Масштабируется от 1 до 500+ зон трансляции',
    '1-den 500+ gepleşik zolagyna çenli giňeldilip bilner',

    12,
    '/images/services/announcement-pa.jpg'
  )

ON CONFLICT (service_slug) DO UPDATE SET
  tag_en             = EXCLUDED.tag_en,
  tag_ru             = EXCLUDED.tag_ru,
  tag_tm             = EXCLUDED.tag_tm,
  title_en           = EXCLUDED.title_en,
  title_ru           = EXCLUDED.title_ru,
  title_tm           = EXCLUDED.title_tm,
  info_en            = EXCLUDED.info_en,
  info_ru            = EXCLUDED.info_ru,
  info_tm            = EXCLUDED.info_tm,
  description_en     = EXCLUDED.description_en,
  description_ru     = EXCLUDED.description_ru,
  description_tm     = EXCLUDED.description_tm,
  highlight_stat_en  = EXCLUDED.highlight_stat_en,
  highlight_stat_ru  = EXCLUDED.highlight_stat_ru,
  highlight_stat_tm  = EXCLUDED.highlight_stat_tm,
  display_order      = EXCLUDED.display_order,
  image              = EXCLUDED.image,
  updated_at         = NOW();

-- Verify
SELECT service_slug, title_en, display_order
FROM public.expertise
ORDER BY display_order;
