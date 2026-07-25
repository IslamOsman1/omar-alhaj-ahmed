const makeClientLogo = (label, colorA, colorB) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="320" height="160" viewBox="0 0 320 160">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${colorA}" />
          <stop offset="100%" stop-color="${colorB}" />
        </linearGradient>
      </defs>
      <rect width="320" height="160" rx="18" fill="white"/>
      <rect x="14" y="14" width="292" height="132" rx="14" fill="url(#g)"/>
      <text x="160" y="72" font-size="26" text-anchor="middle" fill="white" font-family="Arial" font-weight="700">${label}</text>
      <text x="160" y="102" font-size="12" text-anchor="middle" fill="rgba(255,255,255,0.88)" font-family="Arial" letter-spacing="2">CLIENT BRAND</text>
    </svg>
  `)}`

export const defaultData = {
  company: {
    name: 'Omar El Haj Ahmed',
    arabicName: 'عمر الحاج أحمد',
    tagline: 'Customs Clearance & Integrated Logistics',
    heroTitle: 'خبره ثلاثون عاما',
    heroText:
      'حلول احترافية في التخليص الجمركي والشحن والنقل والخدمات اللوجستية للشركات والأفراد، بسرعة وشفافية ومتابعة مستمرة.',
    phone: '+249 000 000 000',
    whatsapp: '+249000000000',
    email: 'info@omlogistics.com',
    address: 'بورتسودان، السودان',
    years: 12,
    shipments: 2400,
    clients: 580,
    countries: 18,
    workHours: '08 صباحا - 04 مساء',
    supportHours: '24/7',
    mapQuery: 'Port Sudan, Sudan',
    mapUrl: 'https://www.google.com/maps?q=Port%20Sudan%2C%20Sudan',
    cloudinaryCloudName: '',
    cloudinaryUploadPreset: ''
  },
  services: [
    {
      id: 1,
      title: 'التخليص الجمركي',
      icon: 'FileCheck2',
      text: 'إنهاء الإجراءات والمستندات الجمركية باحترافية وتقليل زمن الإفراج عن الشحنات.',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 2,
      title: 'الشحن البحري',
      icon: 'Ship',
      text: 'تنسيق شحن الحاويات والبضائع العامة مع أفضل الخطوط والموانئ.',
      image: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 3,
      title: 'الشحن الجوي',
      icon: 'Plane',
      text: 'شحن جوي سريع وآمن للشحنات العاجلة والحساسة.',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 4,
      title: 'النقل البري',
      icon: 'Truck',
      text: 'شبكة نقل لتوصيل البضائع من الميناء إلى المستودع أو موقع العميل.',
      image: 'https://images.unsplash.com/photo-1501700493788-fa1a4fc9fe62?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 5,
      title: 'التخزين والمستودعات',
      icon: 'Warehouse',
      text: 'حلول تخزين مرنة وآمنة مع تنظيم ومتابعة للمخزون.',
      image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 6,
      title: 'الاستشارات اللوجستية',
      icon: 'ChartNoAxesCombined',
      text: 'تخطيط سلاسل الإمداد وتقليل التكاليف وتحسين زمن التسليم.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80'
    }
  ],
  technology: [
    {
      id: 1,
      title: 'أنظمة التتبع والتقارير',
      icon: 'MonitorCog',
      text: 'لوحات متابعة تشغيلية وتقارير لحظية لحالة الشحنات والإجراءات.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 2,
      title: 'إدارة المستندات',
      icon: 'Folders',
      text: 'تنظيم رقمي للمستندات والوثائق لتقليل الأخطاء وتسريع المراجعات.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 3,
      title: 'البنية التشغيلية',
      icon: 'Building2',
      text: 'تنسيق بين فرق التشغيل والمخلصين والنقل لضمان انسيابية التنفيذ.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 4,
      title: 'أنظمة المراقبة والأمان',
      icon: 'Shield',
      text: 'مراقبة وتوثيق مستمر للمخزون، الحركة، ونقاط التسليم الحرجة.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80'
    }
  ],
  projects: [
    {
      id: 1,
      title: 'شحنة معدات صناعية',
      category: 'تخليص جمركي',
      status: 'تم التسليم',
      detail: 'إنهاء الإجراءات وتسليم الشحنة خلال الوقت المحدد.'
    },
    {
      id: 2,
      title: 'حاويات مواد غذائية',
      category: 'شحن بحري',
      status: 'قيد التنفيذ',
      detail: 'متابعة الوصول والفحص والتصاريح والنقل للمخزن.'
    },
    {
      id: 3,
      title: 'شحنة قطع غيار عاجلة',
      category: 'شحن جوي',
      status: 'تم التسليم',
      detail: 'تسليم سريع مع متابعة لحظية حتى الاستلام.'
    }
  ],
  clientsLogos: [
    { id: 1, name: 'Blue Nile Trading', logo: makeClientLogo('BLUE NILE', '#1e3a5f', '#2f6fa3') },
    { id: 2, name: 'Red Sea Foods', logo: makeClientLogo('RED SEA', '#0f766e', '#22c55e') },
    { id: 3, name: 'Port Gate Industry', logo: makeClientLogo('PORT GATE', '#7c3aed', '#2563eb') },
    { id: 4, name: 'Atlas Export', logo: makeClientLogo('ATLAS', '#b45309', '#f59e0b') },
    { id: 5, name: 'Sudan Retail Group', logo: makeClientLogo('SUDAN RETAIL', '#374151', '#111827') },
    { id: 6, name: 'East Cargo', logo: makeClientLogo('EAST CARGO', '#be123c', '#fb7185') }
  ],
  gallery: [
    {
      id: 1,
      title: 'إدارة الحاويات',
      type: 'عمليات',
      icon: 'Container',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 2,
      title: 'ساحات وتجهيزات',
      type: 'بنية تشغيلية',
      icon: 'Building',
      image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 3,
      title: 'استلام وتفريغ',
      type: 'تشغيل',
      icon: 'PackageCheck',
      image: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 4,
      title: 'مخزون منظم',
      type: 'مستودعات',
      icon: 'Boxes',
      image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 5,
      title: 'فريق العمل',
      type: 'كوادر',
      icon: 'Users',
      image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 6,
      title: 'نقل بري',
      type: 'نقل',
      icon: 'Truck',
      image: 'https://images.unsplash.com/photo-1501700493788-fa1a4fc9fe62?auto=format&fit=crop&w=1200&q=80'
    }
  ],
  jobs: [
    {
      id: 1,
      title: 'منسق عمليات لوجستية',
      location: 'بورتسودان',
      type: 'دوام كامل',
      text: 'متابعة سير الشحنات والتنسيق بين الأطراف التشغيلية وتحديث العملاء.'
    },
    {
      id: 2,
      title: 'مسؤول مستندات جمركية',
      location: 'بورتسودان',
      type: 'دوام كامل',
      text: 'مراجعة المستندات والتأكد من مطابقتها والتنسيق مع فرق التخليص.'
    },
    {
      id: 3,
      title: 'مشرف نقل بري',
      location: 'بورتسودان',
      type: 'دوام مرن',
      text: 'الإشراف على حركة النقل وجدولة المركبات ومتابعة التسليم.'
    }
  ],
  testimonials: [
    {
      id: 1,
      name: 'شركة النيل للتجارة',
      role: 'عميل تجاري',
      text: 'خدمة سريعة وتواصل واضح، وتم إنهاء الإجراءات دون تأخير.'
    },
    {
      id: 2,
      name: 'مجموعة الشرق',
      role: 'استيراد وتصدير',
      text: 'فريق محترف ومتابعة ممتازة منذ وصول الشحنة وحتى التسليم.'
    }
  ],
  messages: [],
  careerApplications: []
}
