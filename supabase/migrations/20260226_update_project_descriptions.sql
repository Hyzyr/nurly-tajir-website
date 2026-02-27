-- Update project descriptions (EN / RU / TM)
-- Run in Supabase SQL editor

UPDATE public.projects SET
  description_en = 'Designed and deployed an integrated safety, security, and communications infrastructure for Baherden Fayans, bringing together fire detection, access control, video surveillance, network systems, and public announcement capabilities within a unified operational framework.
The implementation was engineered to support continuous industrial activity with higher protection standards, stronger situational awareness, and dependable coordination across critical facility systems, ensuring secure and efficient day-to-day operations.',
  description_ru = 'Для Baherden Fayans была спроектирована и внедрена интегрированная инфраструктура безопасности, охраны и связи, объединившая пожарную сигнализацию, контроль доступа, видеонаблюдение, сетевые системы и систему оповещения в единую операционную среду.
Решение было реализовано с учетом требований непрерывного промышленного цикла, обеспечив более высокий уровень защиты, расширенный контроль над объектом и надежное взаимодействие между ключевыми системами для стабильной и безопасной ежедневной эксплуатации.',
  description_tm = 'Baherden Faýans üçin ýangyn duýduryş, giriş gözegçiligi, wideogözegçilik, tor ulgamlary we sesli habarlandyryş çözgütlerini birleşdirýän bitewi howpsuzlyk, gorag we aragatnaşyk infrastrukturasyny taslap hem-de ornaşdyrdyk.
Bu çözgüt önümçilik desgasynyň üznüksiz işine laýyklykda işlenip taýýarlanyp, has ýokary gorag derejesini, desga boýunça giňeldilen gözegçiligi we möhüm ulgamlaryň arasynda ygtybarly utgaşykly işi üpjün edip, gündelik amallaryň howpsuz hem netijeli alnyp barylmagyna şert döretdi.',
  updated_at = NOW()
WHERE id = 'f8946c13-d737-4f14-8c66-75ce84a0835e';

UPDATE public.projects SET
  description_en = 'Delivered a comprehensive enterprise technology environment for Altyn Halka, integrating structured networking, IP telephony, surveillance, computing infrastructure, access control, and a centralized video wall into a single coordinated platform.
The project established a scalable and high-performance operational ecosystem that enhances internal communication, strengthens security governance, improves real-time visibility, and supports faster, better-informed management decisions across the facility.',
  description_ru = 'Для Altyn Halka была реализована комплексная корпоративная технологическая среда, объединившая структурированную сеть, IP-телефонию, видеонаблюдение, компьютерную инфраструктуру, контроль доступа и централизованную видеостену в единую скоординированную платформу.
Проект сформировал масштабируемую и высокопроизводительную операционную экосистему, которая усиливает внутренние коммуникации, повышает качество контроля безопасности, улучшает визуализацию процессов в реальном времени и способствует более быстрым и обоснованным управленческим решениям.',
  description_tm = 'Altyn Halka üçin gurluşykly tor çözgütlerini, IP telefoniýany, wideogözegçiligi, kompýuter infrastrukturasyny, giriş gözegçiligini we merkezi wideo diwaryny bir bitewi platformada jemleýän toplumlaýyn korporatiw tehnologik gurşaw döredildi.
Taslama içki aragatnaşygy güýçlendirýän, howpsuzlyk dolandyryşyny kämilleşdirýän, real wagt režiminde ýagdaýlara gözegçiligi ýokarlandyrýan we ýolbaşçylar üçin çalt hem esaslandyrylan karar kabul etmegi goldaýan giňeldilip bilinýän ýokary öndürijilikli ekoulgamy emele getirdi.',
  updated_at = NOW()
WHERE id = 'cfd43390-b6de-4666-8dbc-b5b57c368475';

UPDATE public.projects SET
  description_en = 'Implemented a secure and well-structured digital infrastructure for Parahat-7 Kindergarten, incorporating campus networking, intelligent video surveillance, IP telephony, and automated bell management to support a modern early education environment.
The solution was developed to provide reliable communications, consistent site-wide monitoring, and streamlined daily coordination, helping create a safer, more organized, and professionally managed space for children, educators, and administrative staff.',
  description_ru = 'Для детского сада Parahat-7 была внедрена безопасная и структурированная цифровая инфраструктура, включающая локальную сеть, интеллектуальное видеонаблюдение, IP-телефонию и автоматизированное управление звонками для поддержки современной образовательной среды раннего развития.
Решение было разработано для обеспечения надежной связи, постоянного контроля по всей территории и более четкой ежедневной координации, формируя безопасное, организованное и профессионально управляемое пространство для детей, педагогов и административного персонала.',
  description_tm = 'Parahat-7 çagalar bagy üçin häzirki zaman mekdebe çenli bilim gurşawyny goldamak maksady bilen ýerli tor, akylly wideogözegçilik, IP telefoniýa we awtomatlaşdyrylan jaň dolandyryş ulgamyny öz içine alýan ygtybarly hem tertipli sanly infrastruktura ornaşdyryldy.
Bu çözgüt ygtybarly aragatnaşygy, ähli meýdança boýunça durnukly gözegçiligi we gündelik işleriň has sazlaşykly utgaşdyrylmagyny üpjün etmek üçin işlenip düzüldi we çagalar, mugallymlar hem-de administratiw işgärler üçin has howpsuz, tertipli we hünär derejede dolandyrylýan gurşawy döretdi.',
  updated_at = NOW()
WHERE id = 'ad15f985-99d3-4be1-b4ea-ca4672a15759';

UPDATE public.projects SET
  description_en = 'Executed a full-scale technology modernization for Parahat-7 Secondary School, integrating campus-wide networking, intelligent surveillance, IP telephony, and automated bell control into a cohesive educational infrastructure.
This implementation strengthened operational reliability across the school, improved communication between departments, expanded security visibility, and delivered a more connected and efficiently managed environment for students, faculty, and administration.',
  description_ru = 'Для средней школы Parahat-7 была выполнена полномасштабная технологическая модернизация, объединившая сеть по всей территории, интеллектуальное видеонаблюдение, IP-телефонию и автоматизированное управление школьными звонками в единую образовательную инфраструктуру.
Внедрение повысило надежность ежедневной эксплуатации школы, улучшило взаимодействие между подразделениями, расширило контроль безопасности и сформировало более связанную и эффективно управляемую среду для учащихся, преподавателей и администрации.',
  description_tm = 'Parahat-7 orta mekdebi üçin ähli kampusy gurşap alýan tor ulgamy, akylly wideogözegçilik, IP telefoniýa we awtomatlaşdyrylan jaň dolandyryşyny birleşdirýän giň gerimli tehnologik döwrebaplaşdyryş işi ýerine ýetirildi.
Bu çözgüt mekdebiň gündelik işiniň ygtybarlylygyny ýokarlandyrdy, bölümleriň arasyndaky aragatnaşygy gowulandyrdy, howpsuzlyk gözegçiligini giňeltdi we okuwçylar, mugallymlar hem-de administrasiýa üçin has baglanyşykly we netijeli dolandyrylýan gurşawy üpjün etdi.',
  updated_at = NOW()
WHERE id = 'a80f6c8c-cc91-4767-b214-946391614b8f';

UPDATE public.projects SET
  description_en = 'Established a resilient and high-capacity digital infrastructure for the Turkmen State Energy Institute, combining advanced network systems, centralized monitoring, and security technologies to support a large academic and administrative environment.
The project delivered a dependable technological backbone capable of serving thousands of users, improving service continuity, strengthening operational oversight, and providing the institute with a modern platform for stable, secure, and efficient institutional operations.',
  description_ru = 'Для Туркменского государственного энергетического института была создана устойчивая и высокопроизводительная цифровая инфраструктура, объединившая современные сетевые системы, централизованный мониторинг и технологии безопасности для поддержки крупной образовательной и административной среды.
Проект обеспечил надежную технологическую основу, способную обслуживать тысячи пользователей, повышая непрерывность сервисов, усиливая операционный контроль и предоставляя институту современную платформу для стабильной, безопасной и эффективной работы.',
  description_tm = 'Türkmen Döwlet Energetika Instituty üçin uly göwrümli bilim we administratiw gurşawy goldamak maksady bilen döwrebap tor ulgamlaryny, merkezleşdirilen gözegçiligi we howpsuzlyk tehnologiýalaryny birleşdirýän durnukly hem ýokary kuwwatly sanly infrastruktura döredildi.
Taslama müňlerçe ulanyja hyzmat edip bilýän ygtybarly tehnologik binýady üpjün etdi, hyzmatlaryň üznüksizligini ýokarlandyrdy, operasion gözegçiligi güýçlendirdi we instituta durnukly, howpsuz hem netijeli iş alyp barmak üçin häzirki zaman platformasyny berdi.',
  updated_at = NOW()
WHERE id = '01ce08fe-905f-4583-83a3-65967be83f53';

UPDATE public.projects SET
  description_en = 'Developed and implemented a comprehensive IT infrastructure for administrative and public service facilities in Baherden Etrap, covering network architecture, surveillance systems, and secure digital management solutions.
The project provided a reliable technological foundation for coordinated public administration, improving connectivity, reinforcing security control, and supporting more efficient delivery of everyday administrative and community services.',
  description_ru = 'Для административных и общественных объектов Бахерденского этрапа была разработана и внедрена комплексная IT-инфраструктура, охватывающая сетевую архитектуру, системы видеонаблюдения и решения для безопасного цифрового управления.
Проект сформировал надежную технологическую основу для скоординированной работы органов управления и общественных служб, улучшив связность, усилив контроль безопасности и повысив эффективность предоставления повседневных административных и общественных услуг.',
  description_tm = 'Baherden etrabynyň administratiw hem-de jemgyýetçilik desgalary üçin tor arhitekturasyny, wideogözegçilik ulgamlaryny we ygtybarly sanly dolandyryş çözgütlerini öz içine alýan toplumlaýyn IT infrastruktura işlenip düzüldi we ornaşdyryldy.
Taslama dolandyryş edaralarynyň we jemgyýetçilik hyzmatlarynyň utgaşykly işlemegi üçin ygtybarly tehnologik binýady döretdi, baglanyşygy gowulandyrdy, howpsuzlyk gözegçiligini güýçlendirdi we gündelik administratiw hem jemgyýetçilik hyzmatlarynyň has netijeli ýerine ýetirilmegini üpjün etdi.',
  updated_at = NOW()
WHERE id = 'cedf37ce-2722-4cb2-be79-de3602138ade';

-- Verify
SELECT id, title_en, LEFT(description_en, 60) AS description_preview
FROM public.projects
WHERE id IN (
  'f8946c13-d737-4f14-8c66-75ce84a0835e',
  'cfd43390-b6de-4666-8dbc-b5b57c368475',
  'ad15f985-99d3-4be1-b4ea-ca4672a15759',
  'a80f6c8c-cc91-4767-b214-946391614b8f',
  '01ce08fe-905f-4583-83a3-65967be83f53',
  'cedf37ce-2722-4cb2-be79-de3602138ade'
)
ORDER BY title_en;
