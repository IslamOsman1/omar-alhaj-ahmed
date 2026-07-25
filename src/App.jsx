import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  BadgeCheck,
  Briefcase,
  Clock3,
  Image as ImageIcon,
  LogOut,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Plus,
  RotateCcw,
  Save,
  ShieldCheck,
  Trash2,
  X
} from 'lucide-react'
import Icon from './components/Icon'
import { footerLinkKeys, getMappedContent, messages, navItems } from './i18n'
import { fetchRemoteData, getData, resetRemoteData, saveRemoteData } from './store'
import './styles.css'

const envCloudinaryCloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || ''
const envCloudinaryUploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || ''
const envAdminUsername = import.meta.env.VITE_ADMIN_USERNAME || 'admin'
const envAdminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'Omar@2026'

const heroSlides = [
  'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1600&q=80'
]

const adminTabs = [
  ['overview', 'نظرة عامة', 'LayoutDashboard'],
  ['home', 'الرئيسية', 'House'],
  ['about', 'نبذة عنا', 'Info'],
  ['services', 'خدماتنا', 'Boxes'],
  ['technology', 'التقنية', 'MonitorCog'],
  ['clients', 'عملاؤنا', 'Users'],
  ['gallery', 'المعرض', 'Image'],
  ['careers', 'وظائف', 'Briefcase'],
  ['contact', 'اتصل بنا', 'Phone'],
  ['messages', 'الرسائل', 'Inbox']
]

const adminTitles = {
  overview: 'نظرة عامة',
  home: 'إدارة صفحة الرئيسية',
  about: 'إدارة صفحة نبذة عنا',
  services: 'إدارة صفحة الخدمات',
  technology: 'إدارة صفحة التقنية',
  clients: 'إدارة صفحة العملاء',
  gallery: 'إدارة صفحة المعرض',
  careers: 'إدارة صفحة الوظائف',
  contact: 'إدارة صفحة اتصل بنا',
  messages: 'رسائل العملاء'
}

const labels = {
  name: 'الاسم بالإنجليزية',
  arabicName: 'الاسم بالعربية',
  tagline: 'الوصف المختصر',
  heroTitle: 'عنوان الواجهة',
  heroText: 'نص الواجهة',
  phone: 'رقم الهاتف',
  whatsapp: 'واتساب',
  email: 'البريد الإلكتروني',
  address: 'العنوان',
  years: 'سنوات الخبرة',
  shipments: 'عدد الشحنات',
  clients: 'عدد العملاء',
  countries: 'عدد الدول',
  workHours: 'ساعات المكتب',
  supportHours: 'ساعات الدعم',
  mapQuery: 'استعلام الخريطة',
  mapUrl: 'رابط الخريطة',
  aboutHeadingAr: 'عنوان نبذة عنا بالعربية',
  aboutHeadingEn: 'عنوان نبذة عنا بالإنجليزية',
  aboutP1Ar: 'الفقرة الأولى بالعربية',
  aboutP1En: 'الفقرة الأولى بالإنجليزية',
  aboutP2Ar: 'الفقرة الثانية بالعربية',
  aboutP2En: 'الفقرة الثانية بالإنجليزية',
  cloudinaryCloudName: 'Cloudinary Cloud Name',
  cloudinaryUploadPreset: 'Cloudinary Upload Preset'
}

const fieldLabels = {
  title: 'العنوان',
  name: 'الاسم',
  icon: 'اسم الأيقونة',
  image: 'رابط الصورة',
  logo: 'رابط اللوجو',
  text: 'الوصف',
  category: 'التصنيف',
  status: 'الحالة',
  detail: 'التفاصيل',
  type: 'النوع',
  location: 'الموقع'
}

async function uploadToCloudinary(file, company) {
  const cloudName = company.cloudinaryCloudName || envCloudinaryCloudName
  const uploadPreset = company.cloudinaryUploadPreset || envCloudinaryUploadPreset

  if (!cloudName || !uploadPreset) {
    throw new Error('أضف Cloud Name و Upload Preset من env أو من لوحة التحكم أولاً.')
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', uploadPreset)
  formData.append('folder', 'omar-logistics')

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData
  })

  const result = await response.json()
  if (!response.ok || !result.secure_url) {
    throw new Error(result.error?.message || 'فشل رفع الصورة إلى Cloudinary.')
  }

  return result.secure_url
}

const formatDate = (lang) => new Date().toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US')

const localeText = (lang, arabicValue, englishValue) => (lang === 'ar' ? arabicValue : englishValue || arabicValue)

const localizedService = (service, lang) => {
  const mapped = getMappedContent('services', service.id, lang, {})
  return {
    ...service,
    title: localeText(lang, service.title, mapped.enTitle),
    text: localeText(lang, service.text, mapped.enText)
  }
}

const localizedTechnology = (item, lang) => {
  const mapped = getMappedContent('technology', item.id, lang, {})
  return {
    ...item,
    title: localeText(lang, item.title, mapped.enTitle),
    text: localeText(lang, item.text, mapped.enText)
  }
}

const localizedGallery = (item, lang) => {
  const mapped = getMappedContent('gallery', item.id, lang, {})
  return {
    ...item,
    title: localeText(lang, item.title, mapped.enTitle),
    type: localeText(lang, item.type, mapped.enType)
  }
}

const localizedJob = (job, lang) => {
  const mapped = getMappedContent('jobs', job.id, lang, {})
  return {
    ...job,
    title: localeText(lang, job.title, mapped.enTitle),
    location: localeText(lang, job.location, mapped.enLocation),
    type: localeText(lang, job.type, mapped.enType),
    text: localeText(lang, job.text, mapped.enText)
  }
}

const localizedTestimonial = (item, lang) => {
  const mapped = getMappedContent('testimonials', item.id, lang, {})
  return {
    ...item,
    name: localeText(lang, item.name, mapped.enName),
    role: localeText(lang, item.role, mapped.enRole),
    text: localeText(lang, item.text, mapped.enText)
  }
}

export default function App() {
  const [page, setPage] = useState(location.hash.replace('#/', '') || 'home')
  const [data, setData] = useState(getData())
  const [menu, setMenu] = useState(false)
  const [logged, setLogged] = useState(sessionStorage.getItem('admin-auth') === '1')
  const [lang, setLang] = useState(localStorage.getItem('site-lang') || 'ar')
  const t = messages[lang]

  useEffect(() => {
    const onHashChange = () => setPage(location.hash.replace('#/', '') || 'home')
    addEventListener('hashchange', onHashChange)
    return () => removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    let active = true
    fetchRemoteData().then((remoteData) => {
      if (active) setData(remoteData)
    })
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    localStorage.setItem('site-lang', lang)
  }, [lang])

  const go = (nextPage) => {
    location.hash = `#/${nextPage}`
    setMenu(false)
    scrollTo(0, 0)
  }

  const update = (next) => {
    setData(next)
    saveRemoteData(next)
  }

  return (
    <div className={`app ${lang === 'en' ? 'en' : 'ar'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {page !== 'admin' && (
        <>
          <TopStrip data={data} lang={lang} t={t} />
          <header className="header">
            <div className="container nav-wrap">
              <button className="brand" onClick={() => go('home')}>
                <img src="/logo.jpeg" alt={t.brandAlt} />
                <span>
                  <b>{data.company.name}</b>
                  <small>{t.customsClearance}</small>
                </span>
              </button>

              <nav className="desktop-nav">
                {navItems.map((item) => (
                  <button
                    className={page === item.key ? 'active' : ''}
                    onClick={() => go(item.key)}
                    key={item.key}
                  >
                    {lang === 'ar' ? item.ar : item.en}
                  </button>
                ))}
              </nav>

              <div className="nav-actions">
                <button className="lang-switch" onClick={() => setLang((current) => (current === 'ar' ? 'en' : 'ar'))}>
                  {t.altLang}
                </button>
                <button className="menu-btn" onClick={() => setMenu(!menu)}>
                  {menu ? <X /> : <Menu />}
                </button>
              </div>
            </div>

            {menu && (
              <div className="mobile-nav">
                {navItems.map((item) => (
                  <button onClick={() => go(item.key)} key={item.key}>
                    {lang === 'ar' ? item.ar : item.en}
                  </button>
                ))}
                <button onClick={() => setLang((current) => (current === 'ar' ? 'en' : 'ar'))}>{t.altLang}</button>
              </div>
            )}
          </header>

          <main>
            {page === 'home' && <Home data={data} go={go} lang={lang} t={t} />}
            {page === 'about' && <About data={data} lang={lang} t={t} />}
            {page === 'services' && <Services data={data} lang={lang} t={t} />}
            {page === 'technology' && <Technology data={data} lang={lang} t={t} />}
            {page === 'clients' && <Clients data={data} lang={lang} t={t} />}
            {page === 'gallery' && <Gallery data={data} lang={lang} t={t} />}
            {page === 'careers' && <Careers data={data} update={update} lang={lang} t={t} />}
            {page === 'contact' && <Contact data={data} update={update} lang={lang} t={t} />}
          </main>

          <Footer data={data} go={go} lang={lang} t={t} />
          <a className="whatsapp" href={`https://wa.me/${data.company.whatsapp.replace(/\D/g, '')}`} target="_blank">
            <MessageCircle />
          </a>
        </>
      )}

      {page === 'admin' && <Admin data={data} update={update} logged={logged} setLogged={setLogged} go={go} />}
    </div>
  )
}

function TopStrip({ data, lang, t }) {
  const address = lang === 'ar' ? data.company.address : data.company.mapQuery

  return (
    <div className="top-strip">
      <div className="container top-strip-wrap">
        <div className="top-strip-info">
          <span>
            <Clock3 size={15} />
            {t.office}: {data.company.workHours}
          </span>
          <span>
            <BadgeCheck size={15} />
            {t.support}: {data.company.supportHours}
          </span>
        </div>

        <div className="top-strip-info alt">
          <span>
            <Phone size={15} />
            {data.company.phone}
          </span>
          <span>
            <Mail size={15} />
            {data.company.email}
          </span>
          <span>
            <MapPin size={15} />
            {address}
          </span>
        </div>
      </div>
    </div>
  )
}

function Home({ data, go, lang, t }) {
  const heroStats = [
    [data.company.shipments + '+', t.shipmentsDone],
    [data.company.clients + '+', t.clientsCount],
    [data.company.countries + '+', t.destinations]
  ]
  const [activeSlide, setActiveSlide] = useState(0)
  const heroHeading = lang === 'ar' ? 'خبره ثلاثون عاما' : 'Thirty Years of Experience'
  const heroButtonLabel = lang === 'ar' ? 'طلب تسعير' : 'Request a Quote'

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <section className="hero">
        <div className="hero-slides">
          {heroSlides.map((slide, index) => (
            <div
              className={`hero-slide ${index === activeSlide ? 'active' : ''}`}
              key={slide}
              style={{ backgroundImage: `linear-gradient(rgba(12,31,52,.38),rgba(12,31,52,.46)), url(${slide})` }}
            />
          ))}
        </div>
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-floating-card hero-copy-card">
              <img src="/logo.jpeg" alt={t.brandAlt} />
              <div>
                <span>O&M LOGISTICS</span>
                <strong>{data.company.name}</strong>
              </div>
            </div>
            <span className="eyebrow">{lang === 'ar' ? 'خبرة تشغيلية' : 'Operational Experience'}</span>
            <h1>{heroHeading}</h1>
            <p>
              {lang === 'ar'
                ? data.company.heroText
                : 'Integrated logistics and customs clearance solutions with fast execution and clear follow-up.'}
            </p>
            <button className="btn primary hero-cta" onClick={() => go('contact')}>
              {heroButtonLabel}
            </button>
          </div>
          <div className="hero-visual hero-visual-full">
            <div className="hero-slider-nav">
              {heroSlides.map((slide, index) => (
                <button
                  className={index === activeSlide ? 'active' : ''}
                  key={slide}
                  onClick={() => setActiveSlide(index)}
                  aria-label={`slide-${index + 1}`}
                />
              ))}
            </div>
            <div className="hero-stat-strip">
              {heroStats.map(([value, label]) => (
                <div key={label}>
                  <b>{value}</b>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Stats data={data} t={t} />
      <Services data={data} compact lang={lang} t={t} />
      <Technology data={data} compact lang={lang} t={t} />
      <Clients data={data} compact lang={lang} t={t} />
      <Gallery data={data} compact lang={lang} t={t} />
      <Testimonials data={data} lang={lang} t={t} />
      <CTA go={go} lang={lang} t={t} />
    </>
  )
}

function Stats({ data, t }) {
  const items = [
    [t.yearsExperience, data.company.years + '+'],
    [t.shipmentsDone, data.company.shipments + '+'],
    [t.clientsCount, data.company.clients + '+'],
    [t.countriesCount, data.company.countries + '+']
  ]

  return (
    <section className="stats">
      <div className="container stats-grid">
        {items.map(([label, value]) => (
          <div key={label}>
            <b>{value}</b>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function PageHead({ title, sub }) {
  return (
    <section className="page-head">
      <div className="container">
        <span>O&M LOGISTICS</span>
        <div className="page-head-copy">
          <h1>{title}</h1>
          <p>{sub}</p>
        </div>
      </div>
    </section>
  )
}

function About({ data, lang, t }) {
  const aboutHeading = lang === 'ar' ? data.company.aboutHeadingAr || t.aboutHeading : data.company.aboutHeadingEn || t.aboutHeading
  const aboutP1 = lang === 'ar' ? data.company.aboutP1Ar || t.aboutP1 : data.company.aboutP1En || t.aboutP1
  const aboutP2 = lang === 'ar' ? data.company.aboutP2Ar || t.aboutP2 : data.company.aboutP2En || t.aboutP2

  return (
    <>
      <PageHead title={t.aboutPageTitle} sub={t.aboutPageSub} />
      <section className="section">
        <div className="container about-grid">
          <div>
            <span className="eyebrow dark">{t.companyLabel}</span>
            <h2>{aboutHeading}</h2>
            <p>{aboutP1}</p>
            <p>{aboutP2}</p>
            <div className="feature-list">
              <div>
                <BadgeCheck />
                {t.aboutFeature1}
              </div>
              <div>
                <Clock3 />
                {t.aboutFeature2}
              </div>
              <div>
                <ShieldCheck />
                {t.aboutFeature3}
              </div>
            </div>
          </div>
          <img className="about-img" src="/logo.jpeg" alt={data.company.name} />
        </div>
      </section>

      <section className="section band">
        <div className="container split-intro">
          <article>
            <span className="eyebrow dark">{t.vision}</span>
            <h3>{t.visionTitle}</h3>
            <p>{t.visionText}</p>
          </article>
          <article>
            <span className="eyebrow dark">{t.commitments}</span>
            <h3>{t.commitmentsTitle}</h3>
            <p>{t.commitmentsText}</p>
          </article>
        </div>
      </section>

      <Stats data={data} t={t} />
    </>
  )
}

function Services({ data, compact = false, lang, t }) {
  const items = data.services.map((service) => localizedService(service, lang))

  return (
    <>
      {!compact && <PageHead title={t.servicesPageTitle} sub={t.servicesPageSub} />}

      <section className="section">
        <div className="container">
          <div className="section-title">
            <span className="eyebrow dark">{t.servicesEyebrow}</span>
            <h2>{compact ? t.servicesCompactTitle : t.servicesFullTitle}</h2>
          </div>
          <div className="cards">
            {items.map((service) => (
              <article
                className="service-card service-card-photo"
                key={service.id}
                style={{ backgroundImage: `linear-gradient(rgba(16,39,67,.68),rgba(16,39,67,.74)), url(${service.image})` }}
              >
                <div className="icon-box">
                  <Icon name={service.icon} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <span className="card-link">
                  {t.professionalExecution}
                  <ArrowLeft size={16} className={lang === 'en' ? 'flip-icon' : ''} />
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function Technology({ data, compact = false, lang, t }) {
  const items = data.technology.map((item) => localizedTechnology(item, lang))

  return (
    <>
      {!compact && <PageHead title={t.technologyPageTitle} sub={t.technologyPageSub} />}

      <section className="section band">
        <div className="container">
          <div className="section-title">
            <span className="eyebrow dark">{t.technologyEyebrow}</span>
            <h2>{compact ? t.technologyCompactTitle : t.technologyFullTitle}</h2>
          </div>
          <div className="cards tech-grid">
            {items.map((item) => (
              <article
                className="service-card service-card-photo tech-card"
                key={item.id}
                style={{ backgroundImage: `linear-gradient(rgba(16,39,67,.68),rgba(16,39,67,.74)), url(${item.image})` }}
              >
                <div className="icon-box">
                  <Icon name={item.icon} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function Clients({ data, compact = false, lang, t }) {
  return (
    <>
      {!compact && <PageHead title={t.clientsPageTitle} sub={t.clientsPageSub} />}

      <section className="section">
        <div className="container">
          <div className="section-title">
            <span className="eyebrow dark">{t.clientsEyebrow}</span>
            <h2>{compact ? t.clientsCompactTitle : t.clientsFullTitle}</h2>
          </div>
          <div className="clients-strip">
            {data.clientsLogos.map((client) => (
              <div className="client-box" key={client.id}>
                <img src={client.logo} alt={client.name} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function Gallery({ data, compact = false, lang, t }) {
  const items = data.gallery.map((item) => localizedGallery(item, lang))

  return (
    <>
      {!compact && <PageHead title={t.galleryPageTitle} sub={t.galleryPageSub} />}

      <section className="section band">
        <div className="container">
          <div className="section-title">
            <span className="eyebrow dark">{t.galleryEyebrow}</span>
            <h2>{compact ? t.galleryCompactTitle : t.galleryFullTitle}</h2>
          </div>
          <div className="gallery-grid">
            {items.map((item, index) => (
              <article
                className={`gallery-card tone-${(index % 3) + 1}`}
                key={item.id}
                style={{ backgroundImage: `linear-gradient(rgba(13,31,52,.46),rgba(13,31,52,.56)), url(${item.image})` }}
              >
                <div className="gallery-icon">
                  <Icon name={item.icon} size={34} />
                </div>
                <span>{item.type}</span>
                <h3>{item.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function Careers({ data, update, lang, t }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    job: '',
    note: '',
    cvName: ''
  })
  const [done, setDone] = useState(false)
  const jobs = data.jobs.map((job) => localizedJob(job, lang))

  const submit = (event) => {
    event.preventDefault()
    const next = {
      ...data,
      careerApplications: [{ id: Date.now(), ...form, date: formatDate(lang) }, ...(data.careerApplications || [])]
    }
    update(next)
    setDone(true)
    setForm({ name: '', email: '', phone: '', job: '', note: '', cvName: '' })
  }

  return (
    <>
      <PageHead title={t.careersPageTitle} sub={t.careersPageSub} />

      <section className="section">
        <div className="container careers-grid">
          <div className="careers-copy">
            <span className="eyebrow dark">{t.careersEyebrow}</span>
            <h2>{t.careersHeading}</h2>
            <p>{t.careersText}</p>
            <div className="jobs-list">
              {jobs.map((job) => (
                <article className="job-card" key={job.id}>
                  <div className="job-head">
                    <h3>{job.title}</h3>
                    <span>{job.type}</span>
                  </div>
                  <b>{job.location}</b>
                  <p>{job.text}</p>
                </article>
              ))}
            </div>
          </div>

          <form className="contact-form career-form" onSubmit={submit}>
            <h3>{t.applicationForm}</h3>
            {done && <div className="success">{t.applicationSuccess}</div>}
            <input required placeholder={t.name} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <div className="form-row">
              <input
                type="email"
                required
                placeholder={t.email}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <input
                required
                placeholder={t.phone}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <select value={form.job} onChange={(e) => setForm({ ...form, job: e.target.value })}>
              <option value="">{t.chooseJob}</option>
              {jobs.map((job) => (
                <option key={job.id}>{job.title}</option>
              ))}
            </select>
            <label className="file-field">
              <span>{t.cvAttachment}</span>
              <input type="file" onChange={(e) => setForm({ ...form, cvName: e.target.files?.[0]?.name || '' })} />
              <small>{form.cvName || t.noFile}</small>
            </label>
            <textarea
              rows="5"
              placeholder={t.shortBio}
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
            />
            <button className="btn primary" type="submit">
              {t.sendApplication}
            </button>
          </form>
        </div>
      </section>
    </>
  )
}

function Testimonials({ data, lang, t }) {
  const items = data.testimonials.map((item) => localizedTestimonial(item, lang))

  return (
    <section className="section testimonials">
      <div className="container">
        <div className="section-title">
          <span className="eyebrow dark">{t.testimonialsEyebrow}</span>
          <h2>{t.testimonialsTitle}</h2>
        </div>
        <div className="testimonial-grid">
          {items.map((item) => (
            <blockquote key={item.id}>
              "{item.text}"
              <footer>
                <b>{item.name}</b>
                <span>{item.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA({ go, lang, t }) {
  return (
    <section className="cta">
      <div className="container">
        <div>
          <span>{t.ctaEyebrow}</span>
          <h2>{t.ctaTitle}</h2>
        </div>
        <button className="btn light-btn" onClick={() => go('contact')}>
          {t.ctaButton}
          <ArrowLeft size={18} className={lang === 'en' ? 'flip-icon' : ''} />
        </button>
      </div>
    </section>
  )
}

function Contact({ data, update, lang, t }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  })
  const [done, setDone] = useState(false)
  const services = data.services.map((service) => localizedService(service, lang))
  const address = lang === 'ar' ? data.company.address : data.company.mapQuery

  const submit = (event) => {
    event.preventDefault()
    const next = {
      ...data,
      messages: [{ id: Date.now(), ...form, date: formatDate(lang) }, ...data.messages]
    }
    update(next)
    setDone(true)
    setForm({ name: '', phone: '', email: '', service: '', message: '' })
  }

  return (
    <>
      <PageHead title={t.contactPageTitle} sub={t.contactPageSub} />

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-info">
            <h2>{t.contactInfo}</h2>
            <p>{t.contactIntro}</p>
            <a href={`tel:${data.company.phone}`}>
              <Phone />
              {data.company.phone}
            </a>
            <a href={`mailto:${data.company.email}`}>
              <Mail />
              {data.company.email}
            </a>
            <a href={`https://wa.me/${data.company.whatsapp.replace(/\D/g, '')}`} target="_blank">
              <MessageCircle />
              {data.company.whatsapp}
            </a>
            <span>
              <MapPin />
              {address}
            </span>
            {data.company.mapUrl && (
              <a href={data.company.mapUrl} target="_blank" rel="noreferrer">
                <MapPin />
                {t.openMap}
              </a>
            )}
            <div className="contact-meta">
              <div>
                <b>{t.office}</b>
                <span>{data.company.workHours}</span>
              </div>
              <div>
                <b>{t.support}</b>
                <span>{data.company.supportHours}</span>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={submit}>
            <h2>{t.sendRequest}</h2>
            {done && <div className="success">{t.requestSuccess}</div>}
            <div className="form-row">
              <input required placeholder={t.name} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input
                required
                placeholder={t.phone}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <input type="email" placeholder={t.email} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
              <option value="">{t.chooseService}</option>
              {services.map((service) => (
                <option key={service.id}>{service.title}</option>
              ))}
            </select>
            <textarea
              rows="6"
              required
              placeholder={t.requestDetails}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            <button className="btn primary" type="submit">
              {t.sendRequest}
            </button>
          </form>
        </div>
      </section>

      <section className="section map-section">
        <div className="container">
          <div className="section-title">
            <span className="eyebrow dark">{t.mapEyebrow}</span>
            <h2>{t.mapTitle}</h2>
          </div>
          <div className="map-frame">
            <iframe
              title="company-location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(data.company.mapQuery)}&output=embed`}
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  )
}

function Footer({ data, go, lang, t }) {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-map-col">
          <h4>{t.mapEyebrow}</h4>
          <div className="footer-map-frame">
            <iframe
              title="footer-company-location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(data.company.mapQuery)}&output=embed`}
              loading="lazy"
            />
          </div>
          {data.company.mapUrl && (
            <a className="footer-map-link" href={data.company.mapUrl} target="_blank" rel="noreferrer">
              {t.openMap}
            </a>
          )}
        </div>

        <div>
          <img src="/logo.jpeg" alt={t.brandAlt} />
          <h3>{data.company.name}</h3>
          <p>{data.company.tagline}</p>
        </div>

        <div>
          <h4>{t.mainMenu}</h4>
          {footerLinkKeys.map((key) => {
            const item = navItems.find((entry) => entry.key === key)
            return (
              <button key={key} onClick={() => go(key)}>
                {lang === 'ar' ? item.ar : item.en}
              </button>
            )
          })}
        </div>

        <div>
          <h4>{t.contactUs}</h4>
          <p>{lang === 'ar' ? data.company.address : data.company.mapQuery}</p>
          <p>{data.company.phone}</p>
          <p>{data.company.email}</p>
        </div>
      </div>
      <div className="copyright">
        © 2026 {data.company.name}. {t.rights}
      </div>
    </footer>
  )
}

function Admin({ data, update, logged, setLogged, go }) {
  const [tab, setTab] = useState('overview')
  const [draft, setDraft] = useState(data)
  const [cred, setCred] = useState({ u: '', p: '' })
  const [error, setError] = useState('')

  useEffect(() => setDraft(data), [data])

  if (!logged) {
    return (
      <div className="login-page">
        <div className="login-card">
          <img src="/logo.jpeg" alt="logo" />
          <h1>دخول لوحة التحكم</h1>
          <p>بيانات الدخول من متغيرات البيئة</p>
          <input placeholder="اسم المستخدم" value={cred.u} onChange={(e) => setCred({ ...cred, u: e.target.value })} />
          <input
            type="password"
            placeholder="كلمة المرور"
            value={cred.p}
            onChange={(e) => setCred({ ...cred, p: e.target.value })}
          />
          {error && <div className="error">{error}</div>}
          <button
            className="btn primary"
            onClick={() => {
              if (cred.u === envAdminUsername && cred.p === envAdminPassword) {
                sessionStorage.setItem('admin-auth', '1')
                setLogged(true)
              } else {
                setError('بيانات الدخول غير صحيحة')
              }
            }}
          >
            تسجيل الدخول
          </button>
          <button className="text-btn" onClick={() => go('home')}>
            العودة للموقع
          </button>
        </div>
      </div>
    )
  }

  const save = () => {
    update(draft)
    alert('تم حفظ التغييرات')
  }

  const overviewCards = [
    ['الخدمات', draft.services.length, 'Boxes'],
    ['الأعمال', draft.projects.length, 'FolderKanban'],
    ['الرسائل', draft.messages.length, 'Inbox'],
    ['طلبات التوظيف', (draft.careerApplications || []).length, 'Briefcase']
  ]

  return (
    <div className="admin-shell">
      <aside className="sidebar">
        <div className="side-brand">
          <img src="/logo.jpeg" alt="logo" />
          <span>
            <b>O&M</b>
            <small>Dashboard</small>
          </span>
        </div>

        {adminTabs.map(([key, label, icon]) => (
          <button className={tab === key ? 'active' : ''} onClick={() => setTab(key)} key={key}>
            <Icon name={icon} size={19} />
            {label}
          </button>
        ))}

        <button onClick={() => go('home')}>
          <Icon name="Globe" size={19} />
          عرض الموقع
        </button>
        <button
          onClick={() => {
            sessionStorage.removeItem('admin-auth')
            setLogged(false)
          }}
        >
          <LogOut size={19} />
          تسجيل الخروج
        </button>
      </aside>

      <main className="admin-main">
        <div className="admin-top">
          <div>
            <h1>{adminTitles[tab] || 'لوحة التحكم'}</h1>
            <p>إدارة المحتوى الأساسي للموقع من مكان واحد</p>
          </div>
          {tab !== 'overview' && tab !== 'messages' && (
            <button className="btn primary" onClick={save}>
              <Save size={18} />
              حفظ التغييرات
            </button>
          )}
        </div>

        {tab === 'overview' && (
          <div className="dash-grid">
            {overviewCards.map(([label, value, icon]) => (
              <div className="dash-card" key={label}>
                {icon === 'Briefcase' ? <Briefcase /> : <Icon name={icon} />}
                <span>{label}</span>
                <b>{value}</b>
              </div>
            ))}

            <div className="dash-panel">
              <h3>آخر الرسائل</h3>
              {draft.messages.slice(0, 5).map((message) => (
                <div className="mini-msg" key={message.id}>
                  <b>{message.name}</b>
                  <span>{message.phone}</span>
                  <p>{message.message}</p>
                </div>
              ))}
              {!draft.messages.length && <p>لا توجد رسائل بعد.</p>}
            </div>

            <div className="dash-panel">
              <h3>آخر طلبات التوظيف</h3>
              {(draft.careerApplications || []).slice(0, 5).map((item) => (
                <div className="mini-msg" key={item.id}>
                  <b>{item.name}</b>
                  <span>{item.job || 'بدون وظيفة محددة'}</span>
                  <p>{item.note || item.cvName || 'طلب تقديم جديد'}</p>
                </div>
              ))}
              {!(draft.careerApplications || []).length && <p>لا توجد طلبات توظيف بعد.</p>}
            </div>
          </div>
        )}

        {tab === 'home' && (
          <div className="panel form-grid">
            {['heroTitle', 'heroText', 'years', 'shipments', 'clients', 'countries'].map((key) => (
              <label key={key}>
                <span>{labels[key] || key}</span>
                {key === 'heroText' ? (
                  <textarea
                    value={draft.company[key]}
                    onChange={(e) => setDraft({ ...draft, company: { ...draft.company, [key]: e.target.value } })}
                  />
                ) : (
                  <input
                    type={typeof draft.company[key] === 'number' ? 'number' : 'text'}
                    value={draft.company[key]}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        company: {
                          ...draft.company,
                          [key]: typeof draft.company[key] === 'number' ? Number(e.target.value) : e.target.value
                        }
                      })
                    }
                  />
                )}
              </label>
            ))}
          </div>
        )}

        {tab === 'about' && (
          <div className="panel form-grid">
            {['name', 'arabicName', 'tagline', 'address', 'aboutHeadingAr', 'aboutHeadingEn', 'aboutP1Ar', 'aboutP1En', 'aboutP2Ar', 'aboutP2En'].map((key) => (
              <label key={key}>
                <span>{labels[key] || key}</span>
                {['address', 'aboutP1Ar', 'aboutP1En', 'aboutP2Ar', 'aboutP2En'].includes(key) ? (
                  <textarea
                    value={draft.company[key]}
                    onChange={(e) => setDraft({ ...draft, company: { ...draft.company, [key]: e.target.value } })}
                  />
                ) : (
                  <input
                    value={draft.company[key]}
                    onChange={(e) => setDraft({ ...draft, company: { ...draft.company, [key]: e.target.value } })}
                  />
                )}
              </label>
            ))}
          </div>
        )}

        {tab === 'services' && (
          <EditableList
            company={draft.company}
            items={draft.services}
            setItems={(items) => setDraft({ ...draft, services: items })}
            fields={['title', 'icon', 'text', 'image']}
          />
        )}

        {tab === 'technology' && (
          <EditableList
            company={draft.company}
            items={draft.technology}
            setItems={(items) => setDraft({ ...draft, technology: items })}
            fields={['title', 'icon', 'text', 'image']}
          />
        )}

        {tab === 'clients' && (
          <EditableList
            company={draft.company}
            items={draft.clientsLogos}
            setItems={(items) => setDraft({ ...draft, clientsLogos: items })}
            fields={['name', 'logo']}
          />
        )}

        {tab === 'gallery' && (
          <EditableList
            company={draft.company}
            items={draft.gallery}
            setItems={(items) => setDraft({ ...draft, gallery: items })}
            fields={['title', 'type', 'icon', 'image']}
          />
        )}

        {tab === 'careers' && (
          <EditableList items={draft.jobs} setItems={(items) => setDraft({ ...draft, jobs: items })} fields={['title', 'location', 'type', 'text']} />
        )}

        {tab === 'contact' && (
          <div className="panel form-grid">
            {[
              'phone',
              'whatsapp',
              'email',
              'address',
              'workHours',
              'supportHours',
              'mapQuery',
              'mapUrl',
              'cloudinaryCloudName',
              'cloudinaryUploadPreset'
            ].map((key) => (
              <label key={key}>
                <span>{labels[key] || key}</span>
                {['address', 'mapQuery', 'mapUrl'].includes(key) ? (
                  <textarea
                    value={draft.company[key]}
                    onChange={(e) => setDraft({ ...draft, company: { ...draft.company, [key]: e.target.value } })}
                  />
                ) : (
                  <input
                    value={draft.company[key]}
                    onChange={(e) => setDraft({ ...draft, company: { ...draft.company, [key]: e.target.value } })}
                  />
                )}
              </label>
            ))}
          </div>
        )}

        {tab === 'messages' && (
          <div className="panel">
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>الاسم</th>
                    <th>الهاتف</th>
                    <th>الخدمة</th>
                    <th>الرسالة</th>
                    <th>التاريخ</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {draft.messages.map((message) => (
                    <tr key={message.id}>
                      <td>{message.name}</td>
                      <td>{message.phone}</td>
                      <td>{message.service || '-'}</td>
                      <td>{message.message}</td>
                      <td>{message.date}</td>
                      <td>
                        <button
                          className="danger"
                          onClick={() => {
                            const nextMessages = draft.messages.filter((item) => item.id !== message.id)
                            setDraft({ ...draft, messages: nextMessages })
                            update({ ...draft, messages: nextMessages })
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {!draft.messages.length && <p>لا توجد رسائل.</p>}
          </div>
        )}

        <div className="admin-bottom">
          <button
            className="reset-btn"
            onClick={async () => {
              const next = await resetRemoteData()
              setDraft(next)
              update(next)
            }}
          >
            <RotateCcw size={16} />
            استعادة البيانات الافتراضية
          </button>
        </div>
      </main>
    </div>
  )
}

function EditableList({ items, setItems, fields, company }) {
  const add = () => {
    setItems([...items, { id: Date.now(), ...Object.fromEntries(fields.map((field) => [field, ''])) }])
  }

  return (
    <div className="panel">
      <button className="add-btn" onClick={add}>
        <Plus size={17} />
        إضافة عنصر
      </button>
      <div className="editable-list">
        {items.map((item, index) => (
          <div className="edit-card" key={item.id}>
            <div className="edit-head">
              <b>عنصر {index + 1}</b>
              <button className="danger" onClick={() => setItems(items.filter((entry) => entry.id !== item.id))}>
                <Trash2 size={16} />
              </button>
            </div>
            {fields.map((field) => (
              <label key={field}>
                <span>{fieldLabels[field] || field}</span>
                {['image', 'logo'].includes(field) ? (
                  <CloudinaryImageField
                    company={company}
                    value={item[field]}
                    onChange={(nextValue) =>
                      setItems(items.map((entry) => (entry.id === item.id ? { ...entry, [field]: nextValue } : entry)))
                    }
                  />
                ) : ['text', 'detail'].includes(field) ? (
                  <textarea
                    value={item[field]}
                    onChange={(e) =>
                      setItems(items.map((entry) => (entry.id === item.id ? { ...entry, [field]: e.target.value } : entry)))
                    }
                  />
                ) : (
                  <input
                    value={item[field]}
                    onChange={(e) =>
                      setItems(items.map((entry) => (entry.id === item.id ? { ...entry, [field]: e.target.value } : entry)))
                    }
                  />
                )}
              </label>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function CloudinaryImageField({ company, value, onChange }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const lang = localStorage.getItem('site-lang') || 'ar'
  const t = messages[lang]

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError('')

    try {
      const secureUrl = await uploadToCloudinary(file, company)
      onChange(secureUrl)
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
      event.target.value = ''
    }
  }

  return (
    <div className="image-field">
      <input value={value || ''} placeholder="https://..." onChange={(e) => onChange(e.target.value)} />
      <label className="upload-btn">
        <ImageIcon size={16} />
        {uploading ? t.uploading : t.uploadFromDevice}
        <input type="file" accept="image/*" onChange={handleFileChange} hidden />
      </label>
      {value && (
        <div className="image-preview">
          <img src={value} alt="preview" />
        </div>
      )}
      {error && <small className="field-error">{error}</small>}
    </div>
  )
}
