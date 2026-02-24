-- Seed data for services_section table
-- Run this after creating the table with the migration

INSERT INTO public.services_section (
  service_slug, 
  tag_en, tag_ru, tag_tm,
  title_en, title_ru, title_tm,
  info_en, info_ru, info_tm,
  description_en, description_ru, description_tm,
  highlight_stat_en, highlight_stat_ru, highlight_stat_tm,
  display_order, image
)
VALUES
  -- 1. Network Infrastructure
  (
    'network-infrastructure',
    'Network', 'Сеть', 'Tor',
    'Network Infrastructure', 'Сетевая инфраструктура', 'Tor infrastrukturasy',
    'Structured cabling, LAN/WAN design, switching, and routing for reliable high-speed connectivity across your entire facility.',
    'Структурированное кабелирование, проектирование LAN/WAN, коммутация и маршрутизация для надёжного высокоскоростного соединения по всему объекту.',
    'Gurluşykly simleme, LAN/WAN taslamasy, kommutasiýa we marşrutlaşdyrma — desgaňyzda ygtybarly ýokary tizlikli baglanyşyk üçin.',
    'We design and deploy scalable network infrastructure using Cisco, TP-Link, and Huawei equipment. Our scope covers site survey, structured cabling (Cat5e / Cat6 / Cat6A / fiber optic), switch rack installation, router configuration, VLAN segmentation, and full network documentation. All installations comply with ISO/IEC 11801 and TIA-568 standards.',
    'Мы проектируем и внедряем масштабируемую сетевую инфраструктуру с использованием оборудования Cisco, TP-Link и Huawei. Наши работы включают обследование объекта, структурированное кабелирование (Cat5e / Cat6 / Cat6A / оптоволокно), монтаж коммутационных шкафов, настройку маршрутизаторов, сегментацию VLAN и полную сетевую документацию. Все монтажные работы соответствуют стандартам ISO/IEC 11801 и TIA-568.',
    'Biz Cisco, TP-Link we Huawei enjamlary ulanyp giňeldilip bilinýän tor infrastrukturasyny taslaýarys we gurnaýarys. Biziň işimiziň çäkine: desgany gözden geçirmek, gurluşykly simleme (Cat5e / Cat6 / Cat6A / süýümli optika), kommutasiýa şkafyny gurnamak, marşrutlaşdyryjy sazlamak, VLAN segmentasiýasy we doly tor resminamasy girýär.',
    '10 Gbps backbone networks deployed',
    'Развёрнуты магистральные сети 10 Гбит/с',
    '10 Gbps esasy torlar gurnaýarys',
    1,
    '/images/services/network.jpg'
  ),

  -- 2. Telephone Systems
  (
    'telephone-systems',
    'Telephony', 'Телефония', 'Telefoniýa',
    'Telephone & IP-PBX Systems', 'Телефония и IP-АТС', 'Telefon we IP-PBX ulgamlary',
    'Modern VoIP and IP-PBX solutions replacing legacy analog lines with scalable, feature-rich communication platforms.',
    'Современные VoIP и IP-АТС решения, заменяющие устаревшие аналоговые линии на масштабируемые, многофункциональные коммуникационные платформы.',
    'Köne analog liniýalary giňeldilip bilinýän, funksiýa baý aragatnaşyk platformalary bilen çalyşýan döwrebap VoIP we IP-PBX çözgütleri.',
    'We install IP-PBX systems (Panasonic, Grandstream, Yealink) with SIP trunking, auto-attendant, call recording, and extension management. We migrate existing analog infrastructure to VoIP and provide end-user training. Services include cabling, hardware provisioning, dial-plan configuration, and 12-month post-installation support.',
    'Мы устанавливаем IP-АТС системы (Panasonic, Grandstream, Yealink) с SIP-транкингом, автосекретарём, записью звонков и управлением добавочными номерами. Мы переводим существующую аналоговую инфраструктуру на VoIP и проводим обучение пользователей. Услуги включают прокладку кабеля, поставку оборудования, настройку плана набора и 12-месячную постинсталляционную поддержку.',
    'Biz SIP tranklaýyş, awto-kömekçi, jaň ýazgy we giňeltme dolandyryşy bilen IP-PBX ulgamlaryny (Panasonic, Grandstream, Yealink) gurnaýarys. Biz bar bolan analok infrastrukturasyny VoIP-e geçirýäris we ulanyjy okuwyny geçirýäris.',
    'Up to 500 extensions on a single system',
    'До 500 внутренних номеров на одной системе',
    'Bir ulgamda 500-e çenli giňeltme',
    2, '/images/services/telephone.jpg'
  ),

  -- 3. Computer & IT Equipment
  (
    'computer-it-equipment',
    'IT Equipment', 'IT-оборудование', 'IT enjamlary',
    'Computer & IT Equipment Supply', 'Поставка компьютеров и IT-оборудования', 'Kompýuter we IT enjamlaryny üpjün etmek',
    'Procurement, configuration, and deployment of workstations, servers, and peripherals — all sourced from certified distributors.',
    'Закупка, настройка и развёртывание рабочих станций, серверов и периферийных устройств — всё от сертифицированных дистрибьюторов.',
    'Sertifisirlenen distribýutorlardan iş stansiýalary, serwerleri we periferik enjamlary satyn almak, sazlamak we gurnamak.',
    'We supply and deploy desktops, laptops, servers, NAS storage, UPS units, and printers from brands including HP, Dell, Lenovo, Samsung, and APC. Each deployment includes OS installation, domain/AD join, antivirus setup, and user account configuration. We also offer asset management and annual hardware maintenance contracts.',
    'Мы поставляем и развёртываем настольные компьютеры, ноутбуки, серверы, NAS-хранилища, ИБП и принтеры брендов HP, Dell, Lenovo, Samsung и APC. Каждое развёртывание включает установку ОС, ввод в домен/AD, настройку антивируса и конфигурацию учётных записей пользователей. Мы также предлагаем управление активами и годовые контракты на техническое обслуживание оборудования.',
    'Biz HP, Dell, Lenovo, Samsung we APC ýaly brendleriň stolüstü kompýuterlerini, noutbuklary, serwerleri, NAS saklaýyş, UPS birliklerini we çap enjamlaryny üpjün edýäris we gurnaýarys. Her gurnamada OS gurnamak, domene/AD goşmak, antiwirus sazlamak we ulanyjy hasaby sazlamak bar.',
    'Official distributor for HP, Dell & Lenovo',
    'Официальный дистрибьютор HP, Dell и Lenovo',
    'HP, Dell we Lenovo resmi distribýutory',
    3, '/images/services/it-equipment.jpg'
  ),

  -- 4. Fire Detection Systems
  (
    'fire-detection-systems',
    'Fire Safety', 'Пожарная безопасность', 'Ýangyn howpsuzlygy',
    'Fire Detection & Alarm Systems', 'Системы пожарной сигнализации и обнаружения', 'Ýangyn anyklaýyş we duýduryş ulgamlary',
    'Life-safety grade fire detection with smoke detectors, heat sensors, and automatic alarm panels compliant with international fire codes.',
    'Системы обнаружения пожара класса жизненной безопасности с детекторами дыма, тепловыми датчиками и автоматическими панелями сигнализации, соответствующие международным нормам пожарной безопасности.',
    'Tüsse detektorlary, ýyly duýgurlar we halkara ýangyn kodlaryna laýyk gelýän awtomatik duýduryş panelleri bilen durmuş howpsuzlyk derejeli ýangyn anyklaýyş.',
    'We design and install addressable and conventional fire alarm systems using Bosch, Honeywell, and Notifier panels. Our scope includes risk assessment, detector placement design, panel installation, zone mapping, integration with BMS (Building Management Systems), commissioning, and staff training. All systems meet NFPA 72 and EN 54 standards.',
    'Мы проектируем и устанавливаем адресные и обычные системы пожарной сигнализации на базе панелей Bosch, Honeywell и Notifier. Наши работы включают оценку рисков, проектирование расстановки детекторов, монтаж панелей, разметку зон, интеграцию с BMS (системой управления зданием), пусконаладку и обучение персонала. Все системы соответствуют стандартам NFPA 72 и EN 54.',
    'Biz Bosch, Honeywell we Notifier panelleri ulanyp salgylanýan we adaty ýangyn duýduryş ulgamlaryny taslaýarys we gurnaýarys. Iş çäklerimize töwekgelçiligi bahalandyrmak, detektor ýerleşişini taýýarlamak, panel gurnamak, zona kartalaşdyrmak, BMS bilen integrasiýa we işgär okuwlary girýär.',
    'NFPA 72 & EN 54 certified installations',
    'Монтаж сертифицирован по NFPA 72 и EN 54',
    'NFPA 72 we EN 54 sertifisirlenen gurnawlar',
    4, '/images/services/fire-detection.jpg'
  ),

  -- 5. CCTV & Security Cameras
  (
    'cctv-security-cameras',
    'CCTV & Security', 'Видеонаблюдение', 'Wideo gözegçiligi',
    'CCTV & Security Camera Systems', 'Системы видеонаблюдения и видеозаписи', 'Wideo gözegçilik we howpsuzlyk kamera ulgamlary',
    'HD and 4K surveillance camera networks with NVR/DVR storage, remote monitoring, and AI-powered analytics for complete facility visibility.',
    'Сети видеонаблюдения HD и 4K с хранилищами NVR/DVR, удалённым мониторингом и аналитикой на базе ИИ для полного контроля объекта.',
    'Doly desgany görmek üçin NVR/DVR saklanyşy, uzakdan gözegçilik we AI analitikasy bilen HD we 4K gözegçilik kamera torlar.',
    'We install IP-based CCTV systems using Hikvision, Dahua, and Bosch cameras — covering indoor, outdoor, PTZ, fisheye, and license plate recognition variants. Our deployments include NVR/DVR configuration, storage dimensioning, remote viewing setup (mobile & web), and optional AI features: face recognition, crowd detection, and perimeter alerts. Installations from 4 to 300+ cameras.',
    'Мы устанавливаем IP-системы видеонаблюдения с использованием камер Hikvision, Dahua и Bosch — охватывая внутренние, наружные, PTZ, «рыбий глаз» и варианты распознавания номерных знаков. Наши проекты включают настройку NVR/DVR, подбор объёма хранилища, настройку удалённого просмотра (мобильный и веб), а также опциональные функции ИИ: распознавание лиц, обнаружение скопления людей и оповещения о периметре. Монтаж от 4 до 300+ камер.',
    'Biz Hikvision, Dahua we Bosch kameralaryny ulanyp IP esasly CCTV ulgamlaryny gurnaýarys — içerde, daşarda, PTZ, balyk gözi we plaka tanaýyş görnüşlerini öz içine alýar. Gurnamalar NVR/DVR sazlamasyny, saklanyş ölçegini, uzakdan tomaşa etmek sazlamasyny we islege bagly AI aýratynlyklaryny öz içine alýar.',
    '300+ cameras installed at Ashgabat National Airport',
    '300+ камер установлено в Ашхабадском международном аэропорту',
    'Aşgabat Halkara Howa Menzilinde 300+ kamera guruldy',
    5, '/images/services/cctv.jpg'
  ),

  -- 6. Doorbell & Intercom Systems
  (
    'doorbell-intercom-systems',
    'Intercom', 'Домофон', 'Domofon',
    'Doorbell & Intercom Systems', 'Системы домофонии и переговорной связи', 'Gapyzil we interkom ulgamlary',
    'Video and audio intercom systems for residential complexes and commercial buildings — enabling secure visitor identification before granting entry.',
    'Видео- и аудиодомофонные системы для жилых комплексов и коммерческих зданий — обеспечивающие надёжную идентификацию посетителей до предоставления доступа.',
    'Ýaşaýyş toplumlary we täjirçilik binalary üçin wideo we audio interkom ulgamlary — girişe rugsat bermezden ozal myhman tanamaga mümkinçilik berýär.',
    'We deploy wired and IP-based video door entry systems (Commax, Panasonic, Hikvision DS-KH) for apartments, offices, and gated compounds. Features include video recording, remote unlock via smartphone, integration with access control, and multi-tenant management panels. Systems scale from single-door to multi-building complexes.',
    'Мы развёртываем проводные и IP-видеодомофонные системы (Commax, Panasonic, Hikvision DS-KH) для квартир, офисов и закрытых комплексов. Возможности включают видеозапись, удалённое открытие через смартфон, интеграцию с системой контроля доступа и многоабонентские панели управления. Системы масштабируются от одной двери до многоэтажных комплексов.',
    'Biz kwartiralar, edaralar we ýapyk toplumlar üçin simli we IP esasly wideo giriş ulgamlaryny (Commax, Panasonic, Hikvision DS-KH) gurnaýarys. Wideo ýazgy, smartfon arkaly uzakdan açmak, giriş gözegçiligi bilen integrasiýa we köp abonentli dolandyryş panelleri aýratynlyklaryny öz içine alýar.',
    'Smartphone remote access included',
    'Удалённый доступ через смартфон включён',
    'Smartfon arkaly uzakdan giriş goşulan',
    6, '/images/services/intercom.jpg'
  ),

  -- 7. Video Wall & Control Rooms
  (
    'video-wall-control-rooms',
    'Video Control', 'Видеоконтроль', 'Wideo gözegçilik',
    'Video Wall & Control Room Solutions', 'Видеостены и решения для диспетчерских центров', 'Wideo diwar we dolandyryş otagy çözgütleri',
    'Command-center-grade video wall displays and operator console setups for security, traffic, and operations monitoring.',
    'Видеостены командного центра и рабочие места операторов для мониторинга безопасности, трафика и операций.',
    'Howpsuzlyk, trafik we operasiýa gözegçiligi üçin dolandyryş merkezi derejeli wideo diwary ekranlary we operator konsol gurnamalary.',
    'We design and build centralized monitoring rooms featuring LED/LCD video wall arrays (Samsung, Philips, Hikvision), multi-seat operator desks, video matrix controllers, and PSIM integration. Our turnkey scope covers structural design, display calibration, KVM switching, cable management, and operator workflow setup. Ideal for airports, municipalities, and large commercial campuses.',
    'Мы проектируем и строим централизованные диспетчерские с LED/LCD видеостенами (Samsung, Philips, Hikvision), многоместными операторскими столами, матричными видеоконтроллерами и интеграцией PSIM. Наш комплексный объём работ включает конструктивное проектирование, калибровку дисплеев, коммутацию KVM, управление кабелями и настройку рабочего процесса операторов. Идеально подходит для аэропортов, муниципалитетов и крупных коммерческих кампусов.',
    'Biz LED/LCD wideo diwar massiwleri (Samsung, Philips, Hikvision), köp orunly operator stollary, wideo matris gözegçileri we PSIM integrasiýasy bilen merkezi gözegçilik otaglaryny taslaýarys we gurýarys. Howa menzilleri, şäher dolandyryşy we uly täjirçilik kampuslary üçin amatly.',
    'Turnkey control rooms from design to handover',
    'Диспетчерские «под ключ» от проекта до сдачи',
    'Taslamadan tabşyrylýança doly dolandyryş otaglary',
    7, '/images/services/video-wall.jpg'
  ),

  -- 8. Access Control
  (
    'access-control',
    'Access Control', 'Контроль доступа', 'Giriş gözegçiligi',
    'Access Control Systems', 'Системы контроля и управления доступом (СКУД)', 'Giriş gözegçilik ulgamlary',
    'Electronic access management using smart cards, biometrics, and mobile credentials — controlling who enters every door, gate, and turnstile.',
    'Электронное управление доступом с использованием смарт-карт, биометрии и мобильных учётных данных — контроль за тем, кто входит в каждую дверь, ворота и турникет.',
    'Smart kartalar, biometrika we mobil ynanç hatlaryny ulanyp elektron giriş dolandyryşy — her gapyya, derwezeä we dönüme kimiň girýändigini gözegçilik etmek.',
    'We install standalone and networked access control systems (Hikvision, ZKTeco, HID) supporting RFID, fingerprint, facial recognition, and PIN-based authentication. Our deployments cover door controllers, electric locks, turnstiles, barriers, and parking gate integration. The management software provides real-time logs, shift reporting, and HR integration. Supports from 1 door to enterprise-wide 500+ reader networks.',
    'Мы устанавливаем автономные и сетевые системы контроля доступа (Hikvision, ZKTeco, HID), поддерживающие RFID, отпечаток пальца, распознавание лиц и аутентификацию по PIN-коду. Наши проекты охватывают дверные контроллеры, электрозамки, турникеты, шлагбаумы и интеграцию с парковочными воротами. ПО управления обеспечивает журналы в реальном времени, отчёты по сменам и интеграцию с HR. Поддерживает от 1 двери до корпоративных сетей с 500+ считывателями.',
    'Biz RFID, barmakyzyzy, ýüz tanamagy we PIN esasly tassyklamany goldaýan özbaşdak we torlanan giriş gözegçilik ulgamlaryny (Hikvision, ZKTeco, HID) gurnaýarys. Giriş gözegçilik dolandyryş programma üpjünçiligi hakyky wagtda žurnallary, çalşyk hasabatlaryny we HR integrasiýasyny üpjün edýär.',
    'Biometric & RFID systems for 1 to 500+ doors',
    'Биометрические и RFID-системы от 1 до 500+ дверей',
    '1-den 500+ gapa çenli Biometrik we RFID ulgamlary',
    8, '/images/services/access-control.jpg'
  )
ON CONFLICT (service_slug) DO UPDATE SET
  tag_en = EXCLUDED.tag_en,
  tag_ru = EXCLUDED.tag_ru,
  tag_tm = EXCLUDED.tag_tm,
  title_en = EXCLUDED.title_en,
  title_ru = EXCLUDED.title_ru,
  title_tm = EXCLUDED.title_tm,
  info_en = EXCLUDED.info_en,
  info_ru = EXCLUDED.info_ru,
  info_tm = EXCLUDED.info_tm,
  description_en = EXCLUDED.description_en,
  description_ru = EXCLUDED.description_ru,
  description_tm = EXCLUDED.description_tm,
  highlight_stat_en = EXCLUDED.highlight_stat_en,
  highlight_stat_ru = EXCLUDED.highlight_stat_ru,
  highlight_stat_tm = EXCLUDED.highlight_stat_tm,
  display_order = EXCLUDED.display_order,
  image = EXCLUDED.image,
  updated_at = NOW();

-- Verify the data was inserted
SELECT service_slug, title_en, display_order 
FROM public.services_section 
ORDER BY display_order;
