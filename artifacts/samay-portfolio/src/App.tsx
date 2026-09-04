import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties, FormEvent } from 'react';
import { ArrowDown, ArrowUpRight, BadgeCheck, MapPin, Menu, X } from 'lucide-react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa6';
import { journeyPlaces, type JourneyPlace } from './data/journey-places';
import portraitImage from '../../../attached_assets/IMG-20260901-WA0010_1788299838276.jpg';
import profileCutoutImage from './assets/file_0000000060908211b1c1e59e5a2a2989_1788329162605.png';
import zayanaImage from '../../attached_assets/IMG-20260902-WA0003_1788299389599.jpg';
import zarvoraLogo from './assets/file_000000001bdc82118bc573833a191e6c_1788299389616.png';
import backgroundMusic from './assets/AUD-20260902-WA0053_1788346229611.mp3';

const DeferredJourneyMap = lazy(() => import('./components/journey-map'));
const CONTACT_FORM_ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT as string | undefined;
const SEO_TITLE = 'Samay Mishra — Founder of ZARVORA | Legacy of Elegance';
const SEO_DESCRIPTION =
  'Samay Mishra, known to many as Biraj, is an independent founder and the owner of ZARVORA, building premium fashion, commerce and brand experiences from Mumbai.';
const ZARVORA_INSTAGRAM = 'https://www.instagram.com/zarvora.shop?igsi=MW1rbHB6dWtueG5udQ==';
const ZARVORA_FACEBOOK = 'https://www.facebook.com/zarvora.shop';

const DOB = new Date(2005, 5, 21);

function getAge() {
  const today = new Date();
  let age = today.getFullYear() - DOB.getFullYear();
  const birthdayPassed =
    today.getMonth() > DOB.getMonth() ||
    (today.getMonth() === DOB.getMonth() && today.getDate() >= DOB.getDate());
  if (!birthdayPassed) age -= 1;
  return age;
}

function useReveals() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}

function useJourneyProgress() {
  useEffect(() => {
    const section = document.getElementById('journey');
    if (!section || !('IntersectionObserver' in window)) {
      section?.classList.add('is-active');
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => section.classList.toggle('is-active', entry.isIntersecting),
      { threshold: 0.14 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);
}

function LazyJourneyMap({
  selected,
  onSelect,
}: {
  selected: JourneyPlace | null;
  onSelect: (place: JourneyPlace) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !('IntersectionObserver' in window)) {
      setIsNearViewport(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: '500px 0px' },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="travel-map-deferred">
      {isNearViewport ? (
        <Suspense fallback={<div className="travel-map-loading" role="status">Preparing the map…</div>}>
          <DeferredJourneyMap selected={selected} onSelect={onSelect} />
        </Suspense>
      ) : (
        <div className="travel-map-loading" aria-hidden="true">Map / loading on approach</div>
      )}
    </div>
  );
}

const navItems = [
  { label: 'WORK', target: 'work' },
  { label: 'ZARVORA', target: 'zarvora' },
  { label: 'PRACTICE', target: 'practice' },
  { label: 'JOURNEY', target: 'journey' },
  { label: 'CONTACT', target: 'contact' },
];

const zarvoraPhilosophy = [
  ['01', 'POINT OF VIEW', 'Clear before loud.'],
  ['02', 'PRODUCT', 'Worth keeping.'],
  ['03', 'EXPERIENCE', 'Every detail counts.'],
  ['04', 'ORIGIN', 'Built from Mumbai.'],
];

const zarvoraCollections = [
  ['RAJVAIBHAV COLLECTION', 'Rajasthani Poshaks'],
  ['TIMELESS DRAPES COLLECTION', 'Sarees'],
  ['ROYAL SILHOUETTES COLLECTION', 'Kurta Sets / Farshi Sets / Anarkalis'],
  ['IMPERIAL HEIRLOOM COLLECTION', 'Lehengas'],
  ['ETERNAL RADIANCE COLLECTION', 'Fashion Jewellery'],
  ['SACRED GRACE COLLECTION', 'Mangalsutras'],
];

const capabilities = [
  ['01', 'COMMERCE', 'OPERATOR', 'Building businesses with attention to product, customers, systems and execution.'],
  ['02', 'BRAND SYSTEMS', 'BUILDER', 'Turning an idea into a coherent identity, experience and commercial system.'],
  ['03', 'CREATIVE DIRECTION', 'DIRECTOR', 'Shaping visual language, presentation, detail and overall taste.'],
  ['04', 'TECHNOLOGY', 'TECHNOLOGIST', 'Using technology to build useful systems, digital experiences and scalable foundations.'],
  ['05', 'COMMUNICATION', 'COMMUNICATOR', 'Public speaking, presenting ideas and making complex thoughts understandable.'],
  ['06', 'OBSERVATION', 'OBSERVER', 'A strong eye for human behaviour, social dynamics, patterns and the details people often overlook.'],
];

const journeyMilestones = [
  {
    number: '01',
    period: 'Childhood',
    title: 'Learning independence',
    copy: (
      <>
        <p>I spent much of my childhood in hostel.</p>
        <p>Those years changed the way I looked at the world. Being independent at a young age taught me survival, respect, social awareness, self-dependence and how to navigate different kinds of people and situations.</p>
      </>
    ),
  },
  {
    number: '02',
    period: 'Early interest',
    title: 'Before the brands',
    copy: (
      <>
        <p>I was interested in business and technology from an early age.</p>
        <p>I always found myself curious about how things work, why people make certain decisions, and how an idea can become something real.</p>
      </>
    ),
  },
  {
    number: '03',
    period: 'Kolkata',
    title: 'Full-stack developer / designer',
    copy: (
      <>
        <p>After school and my education, the expectation around me was familiar: continue into the family hotel business and my father’s government contracting work.</p>
        <p>I chose differently.</p>
        <p>I wanted to become self-dependent and build something I could genuinely call my own.</p>
        <p>I found an opportunity in Kolkata and spent more than a year working as a full-stack developer and designer.</p>
      </>
    ),
  },
  {
    number: '04',
    period: '2024–2025',
    title: 'ZAYANA / First brand',
    copy: (
      <>
        <p>During that period, I launched my first brand — ZAYANA.</p>
        <figure className="journey-brand-visual">
          <img src={zayanaImage} alt="ZAYANA wordmark with an infinity symbol and diamond" />
          <figcaption className="mono-label">ZAYANA / First brand</figcaption>
        </figure>
        <p>A premium, royal, female-focused concept designed to test whether my ideas around branding, commerce and customer experience could work in the real world.</p>
        <p className="journey-revenue">more than ₹1.38 crore <span>in one year</span></p>
        <p>It taught me far more than revenue ever could — branding, customers, operations, decision-making, systems, resilience and what happens when an idea meets reality.</p>
      </>
    ),
  },
  {
    number: '05',
    period: '2025',
    title: 'Exit / Reset',
    copy: (
      <>
        <p>ZAYANA eventually moved on to a Gujarat-based brand.</p>
        <p>I took a few months to step back, examine what worked, what did not, and what I wanted to build next.</p>
        <p>That pause gave me clarity.</p>
      </>
    ),
  },
  {
    number: '06',
    period: 'A decision',
    title: 'The decision',
    copy: (
      <>
        <p>I eventually resigned from my job and chose to focus completely on the project I had been carrying in my head for much longer.</p>
        <p>Not because the path was guaranteed.</p>
        <p>Because it was mine.</p>
      </>
    ),
  },
  {
    number: '07',
    period: '2026 — onward',
    title: 'ZARVORA',
    copy: (
      <>
        <p>ZARVORA is the long-term project.</p>
        <p>A premium fashion and commerce house built around Indian heritage, contemporary design, thoughtful presentation and a much longer view.</p>
        <p>The goal is not simply to sell products.</p>
        <p>The goal is to build a house brand people recognize for how it makes them feel.</p>
      </>
    ),
  },
];

function Header({ menuOpen, onToggle }: { menuOpen: boolean; onToggle: () => void }) {
  const navigate = (target: string) => {
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
    if (menuOpen) onToggle();
  };

  return (
    <header className="relative z-30 mx-auto flex w-full max-w-[1500px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12 lg:py-7">
      <button
        type="button"
        onClick={() => navigate('top')}
        aria-label="Return to the top of Samay Mishra's portfolio"
        data-testid="button-home"
        className="group flex items-center gap-3 border-0 bg-transparent p-0 text-left text-[hsl(var(--foreground))]"
      >
        <span className="grid h-9 w-9 place-items-center border border-[hsl(var(--foreground)/.45)] font-serif text-xl italic transition-colors group-hover:border-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary))]">
          S.
        </span>
        <span className="hidden sm:block">
          <span className="block text-[.69rem] font-semibold tracking-[.23em]">SAMAY</span>
          <span className="mono-label mt-1 block text-[hsl(var(--muted-foreground))]">FOUNDER / MUMBAI</span>
        </span>
      </button>

      <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
        {navItems.map((item) => (
          <button
            key={item.target}
            type="button"
            onClick={() => navigate(item.target)}
            data-testid={`link-nav-${item.target}`}
            className="nav-link border-0 bg-transparent p-0 mono-label"
          >
            {item.label}
          </button>
        ))}
      </nav>

      <button
        type="button"
        onClick={onToggle}
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        data-testid="button-mobile-menu"
        className="grid h-10 w-10 place-items-center border border-[hsl(var(--foreground)/.22)] bg-transparent text-[hsl(var(--foreground))] transition-colors hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))] md:hidden"
      >
        {menuOpen ? <X size={17} strokeWidth={1.5} /> : <Menu size={17} strokeWidth={1.5} />}
      </button>

      {menuOpen && (
        <div className="absolute left-5 right-5 top-[calc(100%-1px)] border border-[hsl(var(--foreground)/.2)] bg-[hsl(var(--background)/.98)] p-5 shadow-[0_18px_50px_hsl(var(--primary)/.1)] md:hidden">
          <p className="mono-label mb-5 text-[hsl(var(--muted-foreground))]">Navigate / 00—05</p>
          <div className="grid gap-4">
            {navItems.map((item, index) => (
              <button
                key={item.target}
                type="button"
                onClick={() => navigate(item.target)}
                data-testid={`link-mobile-nav-${item.target}`}
                className="flex items-center justify-between border-0 border-b border-[hsl(var(--foreground)/.13)] bg-transparent pb-3 text-left font-serif text-2xl italic text-[hsl(var(--foreground))]"
              >
                <span>{item.label}</span>
                <span className="mono-label text-[hsl(var(--muted-foreground))]">0{index + 1}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function Ornament() {
  return (
    <div className="hero-orbit" aria-hidden="true">
      <span className="orbit-particle one" />
      <span className="orbit-particle two" />
      <span className="orbit-particle three" />
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<JourneyPlace | null>(journeyPlaces[0]);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'unconfigured' | 'error'>('idle');
  const [formError, setFormError] = useState('');
  const musicRef = useRef<HTMLAudioElement>(null);
  const age = getAge();
  useReveals();
  useJourneyProgress();

  const playBackgroundMusic = () => {
    const audio = musicRef.current;
    if (audio && audio.paused) {
      void audio.play().catch(() => {
        // Browsers may still deny playback if the gesture is interrupted.
      });
    }
  };

  useEffect(() => {
    const audio = musicRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.32;

    const startMusic = playBackgroundMusic;
    const interactionEvents = ['pointerdown', 'keydown', 'touchstart'] as const;

    audio.load();
    startMusic();
    audio.addEventListener('canplay', startMusic);
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        audio.pause();
      } else {
        startMusic();
      }
    };
    const handlePageHide = () => audio.pause();
    const handlePageShow = () => startMusic();

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', handlePageHide);
    window.addEventListener('pageshow', handlePageShow);
    interactionEvents.forEach((eventName) => {
      window.addEventListener(eventName, startMusic, { once: true, passive: true });
    });

    return () => {
      audio.removeEventListener('canplay', startMusic);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('pageshow', handlePageShow);
      interactionEvents.forEach((eventName) => window.removeEventListener(eventName, startMusic));
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setFormError('');

    if (!CONTACT_FORM_ENDPOINT) {
      setFormStatus('unconfigured');
      return;
    }

    try {
      const response = await fetch(CONTACT_FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
      });
      if (!response.ok) throw new Error('The message service returned an error.');
      form.reset();
      setFormStatus('success');
    } catch (error) {
      setFormStatus('error');
      setFormError(error instanceof Error ? error.message : 'The message could not be sent. Please use email instead.');
    }
  };

  useEffect(() => {
    document.title = SEO_TITLE;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', SEO_DESCRIPTION);
    const social = [
      ['og:title', SEO_TITLE],
      ['og:description', SEO_DESCRIPTION],
      ['og:type', 'website'],
      ['og:locale', 'en_IN'],
      ['og:url', window.location.href.split('#')[0]],
      ['og:image', new URL(portraitImage, window.location.href).href],
      ['og:image:alt', 'Portrait of Samay Mishra, known to many as Biraj'],
      ['twitter:card', 'summary_large_image'],
      ['twitter:title', SEO_TITLE],
      ['twitter:description', SEO_DESCRIPTION],
      ['twitter:image', new URL(portraitImage, window.location.href).href],
    ];
    social.forEach(([property, content]) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.href = `${window.location.origin}${window.location.pathname}`;

    let themeColor = document.querySelector('meta[name="theme-color"]');
    if (!themeColor) {
      themeColor = document.createElement('meta');
      themeColor.setAttribute('name', 'theme-color');
      document.head.appendChild(themeColor);
    }
    themeColor.setAttribute('content', '#f4eee7');

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': `${window.location.origin}/#samay-mishra`,
          name: 'Samay Mishra',
          alternateName: 'Biraj',
          jobTitle: 'Founder',
          worksFor: { '@id': 'https://zarvora.shop/#organization' },
        },
        {
          '@type': 'Organization',
          '@id': 'https://zarvora.shop/#organization',
          name: 'ZARVORA',
          url: 'https://zarvora.shop',
          slogan: 'Legacy of Elegance',
          founder: { '@id': `${window.location.origin}/#samay-mishra` },
          sameAs: [ZARVORA_INSTAGRAM, ZARVORA_FACEBOOK],
        },
        {
          '@type': 'Brand',
          '@id': 'https://zarvora.shop/#brand',
          name: 'ZARVORA',
          slogan: 'Legacy of Elegance',
          url: 'https://zarvora.shop',
        },
        {
          '@type': 'WebSite',
          '@id': `${window.location.origin}/#website`,
          name: SEO_TITLE,
          url: `${window.location.origin}${window.location.pathname}`,
          description: SEO_DESCRIPTION,
        },
      ],
    };
    let schema = document.getElementById('founder-structured-data');
    if (!schema) {
      schema = document.createElement('script');
      schema.id = 'founder-structured-data';
      schema.setAttribute('type', 'application/ld+json');
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify(structuredData);
  }, []);

  useLayoutEffect(() => {
    const target = window.location.hash.slice(1);
    if (!target) return;
    const section = document.getElementById(target);
    if (!section) return;
    section.querySelectorAll<HTMLElement>('.reveal').forEach((item) => item.classList.add('is-visible'));
    section.scrollIntoView({ behavior: 'auto' });
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menuOpen) setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const scrollTo = (target: string) => {
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main id="top" className="portfolio-shell min-h-[100dvh] bg-[hsl(var(--background))]">
      <audio ref={musicRef} className="background-music" src={backgroundMusic} autoPlay loop preload="auto" aria-hidden="true" />
      <Header menuOpen={menuOpen} onToggle={() => setMenuOpen((open) => !open)} />

      <section className="relative mx-auto flex min-h-[calc(100dvh-82px)] w-full max-w-[1500px] items-center px-5 pb-20 pt-10 sm:px-8 lg:min-h-[calc(100dvh-104px)] lg:px-12 lg:pb-28 lg:pt-16" aria-labelledby="hero-heading">
        <Ornament />
        <div className="relative z-10 grid w-full gap-14 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end lg:gap-20 xl:grid-cols-[minmax(0,1fr)_390px]">
          <div className="max-w-[910px]">
            <p className="reveal mono-label mb-9 text-[hsl(var(--primary))]" data-testid="text-hero-eyebrow">
              INDEPENDENT FOUNDER <span className="mx-2 text-[hsl(var(--muted-foreground))]">/</span> {age}{' '}
              <span className="mx-2 text-[hsl(var(--muted-foreground))]">/</span> MUMBAI, INDIA
            </p>
            <h1 id="hero-heading" className="reveal reveal-delay-1 max-w-[850px] text-[clamp(4.3rem,12.5vw,11.5rem)] font-semibold uppercase leading-[.78] tracking-[-.085em] text-[hsl(var(--foreground))]" data-testid="text-hero-headline">
              BUILD
              <span className="display-serif ml-[.04em] font-normal italic tracking-[-.08em] text-[hsl(var(--primary))]"> BEAUTIFULLY.</span>
            </h1>
            <div className="reveal reveal-delay-2 mt-12 grid max-w-[680px] gap-9 sm:ml-[17%] sm:grid-cols-[1fr_auto] sm:items-end">
              <p className="max-w-[570px] text-[1.02rem] leading-[1.65] text-[hsl(var(--foreground)/.73)]" data-testid="text-hero-description">
                I’m Samay Mishra — known to many as Biraj. I build brands, businesses and experiences where taste meets technology and ambition becomes something tangible.
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <a href="https://zarvora.shop" target="_blank" rel="noreferrer" data-testid="link-explore-zarvora" className="line-link mono-label text-[hsl(var(--primary))]">
                  EXPLORE ZARVORA <span aria-hidden="true">→</span>
                </a>
                <button type="button" onClick={() => scrollTo('journey')} data-testid="button-my-story" className="line-link mono-label border-0 bg-transparent p-0 text-[hsl(var(--foreground)/.7)]">
                  MY STORY <ArrowDown size={14} strokeWidth={1.4} />
                </button>
              </div>
            </div>
          </div>

          <div className="reveal reveal-delay-3 relative mx-auto w-full max-w-[255px] lg:mx-0 lg:mb-2 lg:ml-auto lg:max-w-[300px]">
            <button type="button" className="portrait-frame portrait-frame-button" onClick={playBackgroundMusic} aria-label="Play portfolio music">
              <div className="portrait-frame-inner absolute inset-3 border border-[hsl(var(--secondary)/.35)]" />
              <span className="portrait-frame-orbit portrait-frame-orbit-one" aria-hidden="true" />
              <span className="portrait-frame-orbit portrait-frame-orbit-two" aria-hidden="true" />
              <span className="portrait-frame-index mono-label" aria-hidden="true">PROFILE / 01</span>
              <img src={profileCutoutImage} alt="Portrait of Samay Mishra, known to many as Biraj" className="portrait-image" />
              <span className="portrait-caption mono-label">Samay Mishra / Mumbai</span>
            </button>
            <div className="mt-4 flex items-start justify-between gap-3">
              <span className="mono-label text-[hsl(var(--muted-foreground))]">Samay Mishra <span className="verified-badge" title="Verified profile mark"><BadgeCheck size={13} strokeWidth={2} aria-hidden="true" /><span className="sr-only">Verified profile mark</span></span><br />Known as Biraj</span>
              <span className="display-serif text-xl italic text-[hsl(var(--primary))]">01</span>
            </div>
          </div>
        </div>
        <button type="button" onClick={() => scrollTo('manifesto')} aria-label="Scroll to continue" data-testid="button-scroll-down" className="absolute bottom-7 left-5 flex items-center gap-3 border-0 bg-transparent p-0 text-[hsl(var(--muted-foreground))] sm:left-8 lg:left-12">
          <span className="grid h-8 w-8 place-items-center border border-[hsl(var(--foreground)/.2)]"><ArrowDown size={13} strokeWidth={1.4} /></span>
          <span className="mono-label hidden sm:block">Scroll to continue</span>
        </button>
      </section>

      <section id="manifesto" className="maroon-panel relative px-5 py-24 sm:px-8 lg:px-12 lg:py-36" aria-labelledby="manifesto-heading">
        <div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-[1fr_1.6fr] lg:gap-24">
          <div className="reveal">
            <div className="gold-rule mb-7" />
            <p className="mono-label text-[hsl(var(--secondary))]">A working philosophy</p>
          </div>
          <div className="reveal reveal-delay-1">
            <h2 id="manifesto-heading" className="display-serif max-w-[850px] text-[clamp(3rem,7vw,7.4rem)] leading-[.9] tracking-[-.045em]">
              I didn’t follow<br /><span className="text-[hsl(var(--secondary))]">a predefined path.</span>
            </h2>
            <p className="mt-12 max-w-[530px] text-[1rem] leading-[1.75] text-[hsl(var(--primary-foreground)/.68)]">
              I built my own. The work is still taking shape — through curiosity, conviction, and a belief that the details are never just details.
            </p>
          </div>
        </div>
      </section>

      <section id="work" className="mx-auto max-w-[1500px] px-5 py-24 sm:px-8 lg:px-12 lg:py-40" aria-labelledby="work-heading">
        <div className="reveal mb-14 flex items-end justify-between gap-8 border-b border-[hsl(var(--foreground)/.17)] pb-5">
          <div>
            <p className="mono-label mb-4 text-[hsl(var(--primary))]">01 / The work</p>
            <h2 id="work-heading" className="text-[clamp(2.5rem,5vw,5.5rem)] font-medium leading-[.9] tracking-[-.065em]">Building with<br /><span className="display-serif font-normal italic text-[hsl(var(--primary))]">a point of view.</span></h2>
          </div>
          <span className="mono-label hidden pb-1 text-right text-[hsl(var(--muted-foreground))] sm:block">Brands / Businesses<br />Experiences / Technology</span>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1.18fr_.82fr] lg:gap-16">
          <div className="reveal group relative min-h-[440px] overflow-hidden bg-[hsl(var(--secondary))] p-7 sm:p-10 lg:min-h-[590px]">
            <div className="absolute -right-20 top-16 h-[420px] w-[420px] rounded-full border border-[hsl(var(--primary)/.3)] transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute right-[17%] top-[22%] h-[260px] w-[260px] rounded-full border border-[hsl(var(--primary)/.18)]" />
            <div className="absolute bottom-0 left-0 h-1/2 w-1/2 bg-[hsl(var(--primary)/.08)]" />
            <div className="relative flex h-full min-h-[390px] flex-col justify-between">
              <div className="flex items-start justify-between">
                <span className="mono-label text-[hsl(var(--primary))]">An ongoing study</span>
                <span className="display-serif text-3xl italic text-[hsl(var(--primary))]">A</span>
              </div>
              <div className="max-w-[560px]">
                <p className="mono-label mb-5 text-[hsl(var(--primary)/.65)]">Work in progress / 001</p>
                <h3 className="display-serif text-[clamp(3.6rem,8vw,8rem)] leading-[.78] tracking-[-.055em] text-[hsl(var(--primary))]">The work<br /><span className="italic">is becoming.</span></h3>
                <p className="mt-8 max-w-[370px] text-sm leading-7 text-[hsl(var(--primary)/.73)]">A portfolio in motion, shaped by ideas worth staying with. More to share as it earns its place.</p>
              </div>
            </div>
          </div>
          <div className="reveal reveal-delay-1 flex flex-col justify-end lg:pb-3">
            <p className="mono-label mb-6 text-[hsl(var(--primary))]">What I make space for</p>
            <div className="section-rule mb-0" />
            {['Brand worlds with a reason to exist', 'Businesses that respect the long view', 'Technology that feels human in the hand'].map((item, index) => (
              <div key={item} className="flex items-start justify-between gap-6 border-b border-[hsl(var(--foreground)/.17)] py-6">
                <span className="display-serif text-[clamp(1.8rem,3vw,3rem)] leading-none text-[hsl(var(--foreground))]">{item}</span>
                <span className="mono-label pt-1 text-[hsl(var(--muted-foreground))]">0{index + 1}</span>
              </div>
            ))}
            <p className="mt-8 max-w-[380px] text-sm leading-7 text-[hsl(var(--muted-foreground))]">Not a list of deliverables. A practice of noticing, refining, and making the invisible feel inevitable.</p>
          </div>
        </div>
      </section>

      <section id="zarvora" className="zarvora-chapter relative overflow-hidden border-y border-[hsl(var(--zarvora-gold)/.35)] px-5 py-24 sm:px-8 lg:px-12 lg:py-36" aria-labelledby="zarvora-heading">
        <span className="zarvora-particle zarvora-particle-one" aria-hidden="true" />
        <span className="zarvora-particle zarvora-particle-two" aria-hidden="true" />
        <span className="zarvora-particle zarvora-particle-three" aria-hidden="true" />
        <div className="zarvora-inner relative z-10 mx-auto max-w-[1500px]">
          <div className="reveal zarvora-opening grid gap-14 border-b border-[hsl(var(--zarvora-ivory)/.22)] pb-20 lg:grid-cols-[.7fr_1.3fr] lg:items-end lg:gap-20">
            <div>
              <p className="mono-label mb-8 text-[hsl(var(--zarvora-gold))]" data-testid="text-zarvora-chapter-label">02 / A living chapter</p>
              <div className="zarvora-wordmark-wrap">
                <img src={zarvoraLogo} alt="ZARVORA — Legacy of Elegance" className="zarvora-logo-art" data-testid="image-zarvora-logo" />
                <p className="zarvora-tagline" data-testid="text-zarvora-tagline">Legacy of Elegance</p>
              </div>
              <div className="zarvora-drawn-rule mt-8" aria-hidden="true" />
              <p className="mono-label mt-4 text-[hsl(var(--zarvora-ivory)/.63)]" data-testid="text-zarvora-ownership">OWNED / OPERATED BY SAMAY MISHRA</p>
            </div>
            <div className="max-w-[780px] lg:pb-1">
              <p className="mono-label mb-6 text-[hsl(var(--zarvora-gold))]">Flagship creation / Mumbai</p>
              <h2 id="zarvora-heading" className="display-serif max-w-[800px] text-[clamp(3rem,6.8vw,7.5rem)] leading-[.86] tracking-[-.06em] text-[hsl(var(--zarvora-ivory))]">Legacy of<br /><span className="italic text-[hsl(var(--zarvora-gold))]">Elegance.</span></h2>
            </div>
          </div>

          <div className="grid gap-16 py-20 lg:grid-cols-[.72fr_1.28fr] lg:gap-24 lg:py-28">
            <div className="reveal">
              <p className="mono-label mb-7 text-[hsl(var(--zarvora-gold))]">A house in the making</p>
              <p className="max-w-[520px] text-[clamp(1.45rem,2.5vw,2.45rem)] leading-[1.12] tracking-[-.035em] text-[hsl(var(--zarvora-ivory))]" data-testid="text-zarvora-main-statement">ZARVORA is the living proof of the philosophy: make the product worthy, then make every touchpoint agree.</p>
            </div>
            <div className="reveal reveal-delay-1 max-w-[720px] lg:ml-auto">
              <p className="text-[1rem] leading-[1.8] text-[hsl(var(--zarvora-ivory)/.72)]" data-testid="text-zarvora-description">ZARVORA is a premium fashion and commerce house being built from Mumbai with a global eye — combining Indian heritage, contemporary design, thoughtful presentation and an experience that respects the person on the other side of the screen.</p>
              <p className="mt-7 text-[1rem] leading-[1.8] text-[hsl(var(--zarvora-ivory)/.72)]" data-testid="text-zarvora-long-term">It is my long-term project — built with more clarity, more patience and more intention than my first venture.</p>
              <div className="mt-12 flex flex-wrap items-center gap-8">
                <a href="https://zarvora.shop" target="_blank" rel="noreferrer" data-testid="link-visit-zarvora" className="zarvora-cta zarvora-cta-primary mono-label">VISIT ZARVORA <ArrowUpRight size={15} strokeWidth={1.4} /></a>
                <button type="button" onClick={() => scrollTo('contact')} data-testid="button-ask-about-zarvora" className="zarvora-cta zarvora-cta-secondary mono-label">ASK ABOUT ZARVORA <ArrowDown size={14} strokeWidth={1.4} /></button>
              </div>
            </div>
          </div>

          <div className="reveal border-t border-[hsl(var(--zarvora-ivory)/.22)] pt-8" aria-labelledby="zarvora-philosophy-heading">
            <div className="mb-10 flex items-end justify-between gap-8">
              <div>
                <p className="mono-label mb-4 text-[hsl(var(--zarvora-gold))]">The house / 01</p>
                <h3 id="zarvora-philosophy-heading" className="display-serif text-[clamp(3.2rem,6vw,6.6rem)] leading-[.84] tracking-[-.055em] text-[hsl(var(--zarvora-ivory))]">LEGACY OF<br /><span className="italic text-[hsl(var(--zarvora-gold))]">ELEGANCE.</span></h3>
              </div>
              <span className="mono-label hidden pb-1 text-right text-[hsl(var(--zarvora-ivory)/.5)] sm:block">A point of view<br />held in four parts</span>
            </div>
            <div className="zarvora-philosophy-list">
              {zarvoraPhilosophy.map(([number, label, copy], index) => (
                <div key={number} className={`zarvora-philosophy-row reveal reveal-delay-${Math.min(index + 1, 3)}`} data-testid={`row-zarvora-philosophy-${number}`}>
                  <span className="zarvora-row-number" aria-hidden="true">{number}</span>
                  <span className="mono-label zarvora-row-label">{label}</span>
                  <span className="zarvora-row-copy">{copy}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal mt-24 border-t border-[hsl(var(--zarvora-ivory)/.22)] pt-8 lg:mt-36" aria-labelledby="zarvora-archive-heading">
            <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="mono-label mb-4 text-[hsl(var(--zarvora-gold))]">The archive / 02</p>
                <h3 id="zarvora-archive-heading" className="display-serif text-[clamp(2.8rem,5vw,5.7rem)] leading-[.85] tracking-[-.05em] text-[hsl(var(--zarvora-ivory))]">An archive of <span className="italic text-[hsl(var(--zarvora-gold))]">possibility.</span></h3>
              </div>
              <span className="mono-label text-[hsl(var(--zarvora-ivory)/.5)]">Six expressions / one house</span>
            </div>
            <div className="zarvora-archive-list">
              {zarvoraCollections.map(([collection, categories], index) => (
                <div key={collection} className={`zarvora-archive-row reveal reveal-delay-${Math.min(index + 1, 3)}`} data-testid={`row-zarvora-collection-${index + 1}`}>
                  <span className="mono-label zarvora-archive-index">0{index + 1}</span>
                  <span className="zarvora-archive-name">{collection}</span>
                  <span className="zarvora-archive-categories">{categories}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal zarvora-sacred-feature mt-24 border-y border-[hsl(var(--zarvora-gold)/.45)] py-16 lg:mt-36 lg:grid lg:grid-cols-[.72fr_1.28fr] lg:gap-20 lg:py-24">
            <div>
              <p className="mono-label mb-5 text-[hsl(var(--zarvora-gold))]">A closer look / Sacred Grace</p>
              <h3 className="display-serif text-[clamp(3rem,5.6vw,6rem)] leading-[.82] tracking-[-.06em] text-[hsl(var(--zarvora-ivory))]">SACRED<br /><span className="italic text-[hsl(var(--zarvora-gold))]">GRACE.</span></h3>
            </div>
            <div className="mt-10 max-w-[670px] lg:mt-0 lg:ml-auto">
              <p className="text-[clamp(1.25rem,2vw,1.8rem)] leading-[1.25] text-[hsl(var(--zarvora-ivory))]" data-testid="text-sacred-grace-tribute">A tribute to love, commitment and timeless tradition reimagined for the modern woman.</p>
              <p className="mt-6 text-base leading-7 text-[hsl(var(--zarvora-ivory)/.68)]" data-testid="text-sacred-grace-description">Mangalsutras blending heritage with contemporary sophistication.</p>
              <p className="zarvora-signature mt-14" data-testid="text-sacred-grace-signature">ZARVORA — Legacy of Elegance.</p>
            </div>
          </div>

          <div className="reveal grid gap-10 border-b border-[hsl(var(--zarvora-ivory)/.22)] py-20 lg:grid-cols-[.72fr_1.28fr] lg:gap-20 lg:py-28" aria-labelledby="founders-note-heading">
            <div>
              <p className="mono-label mb-5 text-[hsl(var(--zarvora-gold))]">Founder’s Note / 03</p>
              <h3 id="founders-note-heading" className="display-serif text-[clamp(3.6rem,7vw,7.8rem)] leading-[.78] tracking-[-.065em] text-[hsl(var(--zarvora-ivory))]">MAKE IT<br /><span className="italic text-[hsl(var(--zarvora-gold))]">WORTHY.</span></h3>
            </div>
            <div className="max-w-[650px] lg:ml-auto">
              <p className="text-[1.12rem] leading-[1.75] text-[hsl(var(--zarvora-ivory)/.82)]" data-testid="text-founders-note-primary">I’m not interested in building something simply because it can be built. I care about why it should exist, how it should feel, and whether it deserves to stay.</p>
              <p className="mt-7 display-serif text-[clamp(1.8rem,3vw,3rem)] leading-[1.05] text-[hsl(var(--zarvora-gold))]" data-testid="text-founders-note-secondary">Good businesses solve problems. Great brands make people care.</p>
              <div className="mt-12 border-t border-[hsl(var(--zarvora-ivory)/.22)] pt-5">
                <p className="zarvora-signoff" data-testid="text-founders-note-signoff">SAMAY MISHRA <span>/ FOUNDER / </span><em>Known to many as Biraj.</em></p>
              </div>
            </div>
          </div>

          <div className="zarvora-exit-transition" aria-hidden="true">
            <span className="mono-label">From the house / back to the practice</span>
          </div>
        </div>
      </section>

      <section id="practice" className="practice-section mx-auto max-w-[1500px] px-5 py-24 sm:px-8 lg:px-12 lg:py-40" aria-labelledby="practice-heading">
        <div className="reveal mb-16 grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
          <div>
            <p className="mono-label text-[hsl(var(--primary))]">03 / The practice</p>
            <p className="mt-8 max-w-[250px] text-sm leading-7 text-[hsl(var(--muted-foreground))]">Business, branding, technology, creative direction and communication — seeing the whole system to build something meaningful.</p>
          </div>
          <h2 id="practice-heading" className="max-w-[920px] text-[clamp(3.4rem,8vw,8.5rem)] leading-[.78] tracking-[-.085em]">MANY HATS.<br /><span className="display-serif font-normal italic text-[hsl(var(--primary))]">ONE STANDARD.</span></h2>
        </div>
        <div className="practice-list border-t border-[hsl(var(--foreground)/.17)]" aria-label="Founder capabilities">
          {capabilities.map(([number, capability, category, description], index) => (
            <article key={number} className={`practice-row reveal reveal-delay-${Math.min(index + 1, 3)}`} data-testid={`row-capability-${number}`}>
              <span className="practice-row-number" aria-hidden="true">{number}</span>
              <div className="practice-row-heading">
                <h3>{capability}</h3>
                <span className="mono-label">{category}</span>
              </div>
              <p className="practice-row-description">{description}</p>
              <span className="practice-row-action" aria-hidden="true"><ArrowUpRight size={18} strokeWidth={1.2} /></span>
            </article>
          ))}
        </div>
      </section>

      <section id="journey" className="journey-section px-5 py-24 sm:px-8 lg:px-12 lg:py-40" aria-labelledby="journey-heading">
        <div className="mx-auto max-w-[1500px]">
          <div className="journey-intro grid gap-8 border-b border-[hsl(var(--foreground)/.17)] pb-16 lg:grid-cols-[.72fr_1.28fr] lg:items-end lg:gap-20">
            <div>
              <p className="mono-label text-[hsl(var(--primary))]">04 / The journey</p>
              <p className="mt-8 max-w-[250px] text-sm leading-7 text-[hsl(var(--muted-foreground))]">A biography in chapters — not a neat timeline, but a direction shaped by curiosity, self-dependence and the decision to keep building.</p>
            </div>
            <h2 id="journey-heading" className="max-w-[920px] text-[clamp(3.4rem,8vw,8.5rem)] leading-[.78] tracking-[-.085em]">LEARN FIRST.<br /><span className="display-serif font-normal italic text-[hsl(var(--primary))]">BUILD FORWARD.</span></h2>
          </div>
          <div className="journey-timeline">
            <span className="journey-timeline-track" aria-hidden="true" />
            <div className="journey-milestones">
              {journeyMilestones.map((milestone, index) => (
                <article key={milestone.number} className={`journey-milestone reveal reveal-delay-${Math.min(index + 1, 3)}`} data-testid={`milestone-journey-${milestone.number}`}>
                  <div className="journey-marker" aria-hidden="true"><span>{milestone.number}</span></div>
                  <div className="journey-milestone-period mono-label">{milestone.period}</div>
                  <div className="journey-milestone-content">
                    <h3>{milestone.title}</h3>
                    <div className="journey-milestone-copy">{milestone.copy}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="journey-closing reveal">
            <p className="display-serif journey-closing-quote">“I didn’t follow a predefined path.<br /><span>I built my own.”</span></p>
            <p className="mono-label journey-closing-signoff">SAMAY MISHRA <span>/ FOUNDER</span></p>
          </div>
        </div>
      </section>

      <section id="travel" className="travel-section px-5 py-24 sm:px-8 lg:px-12 lg:py-40" aria-labelledby="travel-heading">
        <div className="mx-auto max-w-[1500px]">
          <div className="travel-intro reveal grid gap-8 border-b border-[hsl(var(--foreground)/.17)] pb-16 lg:grid-cols-[.72fr_1.28fr] lg:items-end lg:gap-20">
            <div>
              <p className="mono-label text-[hsl(var(--primary))]">05 / Across the map</p>
              <p className="mt-8 max-w-[275px] text-sm leading-7 text-[hsl(var(--muted-foreground))]">Selected locations from my journey — not live tracking.</p>
            </div>
            <div>
              <h2 id="travel-heading" className="max-w-[1000px] text-[clamp(3.2rem,7.6vw,8rem)] leading-[.79] tracking-[-.085em]">ROOTED IN MUMBAI.<br /><span className="display-serif font-normal italic text-[hsl(var(--primary))]">PRESENT IN KOLKATA.</span></h2>
              <p className="mt-10 max-w-[650px] text-[clamp(1.15rem,2vw,1.65rem)] leading-[1.25] tracking-[-.025em] text-[hsl(var(--muted-foreground))]">My hometown is Mumbai.<br /><br />Today, I am present in Kolkata — and the road between them has taken me across India and beyond.</p>
            </div>
          </div>

          <div className="travel-map-heading reveal">
            <div>
              <p className="mono-label text-[hsl(var(--primary))]">The atlas / 01</p>
              <h3 className="display-serif mt-4 text-[clamp(2.7rem,5.5vw,5.8rem)] italic leading-[.84] tracking-[-.055em]">Places that shaped<br />the journey.</h3>
            </div>
            <p className="travel-map-disclaimer mono-label">Selected places that have shaped the journey.<br /><span>Representative coordinates / illustrative route</span></p>
          </div>

          <div className="travel-map-layout reveal reveal-delay-1">
            <div className="travel-map-column">
              <LazyJourneyMap selected={selectedPlace} onSelect={setSelectedPlace} />
              <p className="travel-map-attribution-note mono-label">OpenStreetMap data / pan, zoom and explore</p>
            </div>
            <aside className="travel-location-panel" aria-label="Selected location and travel index">
              <div className="travel-selected-card" aria-live="polite">
                <p className="mono-label text-[hsl(var(--primary))]">Selected location</p>
                <p className="travel-selected-name">{selectedPlace?.name ?? 'Choose a place'}</p>
                <p className="mono-label travel-selected-role">
                  {selectedPlace?.role === 'hometown' ? 'Hometown' : selectedPlace?.role === 'current' ? 'Current base' : 'Travel marker'}
                </p>
              </div>
              <div className="travel-legend" aria-label="Map legend">
                <span><i className="travel-legend-dot hometown" /> Mumbai / hometown</span>
                <span><i className="travel-legend-dot current" /> Kolkata / present</span>
                <span><i className="travel-legend-dot travel" /> Selected destinations</span>
              </div>
              <div className="travel-location-index">
                {journeyPlaces.map((place) => (
                  <button
                    key={place.name}
                    type="button"
                    className={`travel-location-button ${selectedPlace?.name === place.name ? 'is-selected' : ''}`}
                    onClick={() => setSelectedPlace(place)}
                    aria-pressed={selectedPlace?.name === place.name}
                  >
                    <span>{place.name}</span>
                    <ArrowUpRight size={13} strokeWidth={1.2} aria-hidden="true" />
                  </button>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section id="vision" className="vision-section relative overflow-hidden px-5 py-24 sm:px-8 lg:px-12 lg:py-40" aria-labelledby="vision-heading">
        <span className="vision-orb vision-orb-one" aria-hidden="true" />
        <span className="vision-orb vision-orb-two" aria-hidden="true" />
        <span className="vision-grain" aria-hidden="true" />
        <div className="vision-inner relative z-10 mx-auto max-w-[1500px]">
          <div className="vision-opening reveal grid gap-14 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="mono-label text-[hsl(var(--vision-gold))]">06 / Future vision</p>
              <p className="mt-8 max-w-[245px] text-sm leading-7 text-[hsl(var(--vision-muted))]">A long-term view on Indian design, global commerce and the quiet work between the two.</p>
            </div>
            <h2 id="vision-heading" className="max-w-[1060px] text-[clamp(3.1rem,7.4vw,8rem)] leading-[.79] tracking-[-.085em] text-[hsl(var(--vision-ivory))]">THE FUTURE BELONGS TO PEOPLE WHO CAN SEE CLEARLY —<br /><span className="display-serif font-normal italic text-[hsl(var(--vision-gold))]">AND THEN STAY FOR THE HARD PART.</span></h2>
          </div>
          <div className="vision-body reveal reveal-delay-1">
            <p className="mono-label text-[hsl(var(--vision-gold)/.72)]">SAMAY / 2026 — ONWARD</p>
            <div className="vision-steps" aria-label="Working principles">
              {['LEARN.', 'BUILD.', 'REFINE.', 'REPEAT.'].map((step, index) => (
                <span key={step} style={{ '--step-delay': `${index * 120}ms` } as CSSProperties}>{step}</span>
              ))}
            </div>
          </div>
          <div className="vision-closing reveal reveal-delay-2">
            <p className="display-serif vision-closing-statement">“I want to build things that are worth remembering.”</p>
            <p className="mono-label text-[hsl(var(--vision-muted))]">INDEPENDENT FOUNDER<br />MUMBAI / INDIA</p>
          </div>
        </div>
      </section>

      <footer id="contact" className="contact-footer mx-auto max-w-[1500px] px-5 pb-8 pt-24 sm:px-8 lg:px-12 lg:pb-10 lg:pt-36" aria-labelledby="contact-heading">
        <div className="contact-intro reveal grid gap-14 lg:grid-cols-[1fr_.8fr] lg:items-end">
          <div>
            <p className="mono-label mb-8 text-[hsl(var(--primary))]">07 / Contact</p>
            <h2 id="contact-heading" className="max-w-[950px] text-[clamp(3.5rem,9vw,10rem)] font-medium leading-[.78] tracking-[-.09em]">LET’S MAKE<br /><span className="display-serif font-normal italic text-[hsl(var(--primary))]">SOMETHING REAL.</span></h2>
          </div>
          <p className="max-w-[390px] text-base leading-7 text-[hsl(var(--muted-foreground))]">Thoughtful conversations around ZARVORA, building brands, commerce, technology and creative direction are always welcome.</p>
        </div>

        <div className="contact-workspace reveal reveal-delay-1">
          <div className="contact-details">
            <div className="contact-detail">
              <span className="mono-label text-[hsl(var(--primary))]">Business</span>
              <a href="mailto:hello@zarvora.shop" className="contact-email">hello@zarvora.shop <ArrowUpRight size={16} strokeWidth={1.3} aria-hidden="true" /></a>
            </div>
            <div className="contact-detail">
              <span className="mono-label text-[hsl(var(--primary))]">Personal</span>
              <a href="mailto:hi@samaymishra.online" className="contact-email">hi@samaymishra.online <ArrowUpRight size={16} strokeWidth={1.3} aria-hidden="true" /></a>
            </div>
          </div>

          <div className="contact-form-shell">
            <div className="contact-form-heading">
              <span className="mono-label text-[hsl(var(--primary))]">Start a conversation / 01</span>
              <p className="mt-5 max-w-[290px] text-sm leading-6 text-[hsl(var(--muted-foreground))]">Leave your email and I’ll get back to you personally.</p>
            </div>
            <form className="contact-form" onSubmit={handleContactSubmit} noValidate>
              <label className="contact-field">
                <span className="mono-label">Email</span>
                <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
              </label>
              <button type="submit" className="contact-submit mono-label">START THE CONVERSATION <ArrowUpRight size={15} strokeWidth={1.3} /></button>
              <div className={`contact-form-status ${formStatus}`} role="status" aria-live="polite">
                {formStatus === 'success' && <><strong>MESSAGE RECEIVED</strong><span>Thanks for reaching out.</span></>}
                {formStatus === 'unconfigured' && <><strong>FORM READY FOR CONNECTION</strong><span>This form is not connected to a message service yet. Please use either email above for now.</span></>}
                {formStatus === 'error' && <><strong>MESSAGE NOT SENT</strong><span>{formError} Please use either email above.</span></>}
              </div>
            </form>
          </div>
        </div>

        <div className="footer-main">
          <div className="footer-identity">
            <span className="footer-monogram">S.</span>
            <div>
              <p className="footer-name">SAMAY MISHRA</p>
              <p className="mono-label text-[hsl(var(--muted-foreground))]">Known to many as Biraj.</p>
              <p className="mono-label mt-5 text-[hsl(var(--primary))]">Independent founder / Mumbai, India</p>
              <p className="display-serif footer-ethos">“Building with taste.<br />Built for the long view.”</p>
            </div>
          </div>
          <div className="footer-zarvora">
            <img src={zarvoraLogo} alt="ZARVORA — Legacy of Elegance" className="footer-zarvora-logo" />
            <span className="mono-label">Legacy of Elegance</span>
          </div>
          <div className="footer-nav">
            <span className="mono-label text-[hsl(var(--primary))]">Navigate</span>
            {navItems.map((item) => <button key={item.target} type="button" onClick={() => scrollTo(item.target)}>{item.label}</button>)}
          </div>
          <div className="footer-business">
            <span className="mono-label text-[hsl(var(--primary))]">Business</span>
            <a href="mailto:hello@zarvora.shop">hello@zarvora.shop</a>
            <span className="mono-label mt-5 text-[hsl(var(--primary))]">ZARVORA / Social</span>
            <div className="footer-socials">
              <a href={ZARVORA_INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label="ZARVORA on Instagram"><FaInstagram size={16} aria-hidden="true" /><span>Instagram</span></a>
              <a href={ZARVORA_FACEBOOK} target="_blank" rel="noopener noreferrer" aria-label="ZARVORA on Facebook"><FaFacebookF size={14} aria-hidden="true" /><span>Facebook</span></a>
            </div>
          </div>
        </div>

        <div className="footer-final">
          <p className="display-serif footer-final-quote">“I didn’t follow a predefined path.<br /><span>I built my own.”</span></p>
          <div className="footer-final-mark">
            <p className="mono-label">SAMAY MISHRA<br />KNOWN TO MANY AS BIRAJ</p>
            <p className="mono-label mt-6 text-[hsl(var(--primary))]">ZARVORA<br /><span className="text-[hsl(var(--muted-foreground))]">LEGACY OF ELEGANCE</span></p>
          </div>
        </div>

        <div className="section-rule mt-16" />
        <div className="flex flex-col justify-between gap-5 pt-6 text-[hsl(var(--muted-foreground))] sm:flex-row">
          <span className="mono-label">© {new Date().getFullYear()} Samay Mishra</span>
          <div className="flex items-center gap-2 mono-label"><MapPin size={13} strokeWidth={1.3} /> Mumbai, India</div>
          <button type="button" onClick={() => scrollTo('top')} data-testid="button-back-to-top" className="line-link self-start border-0 bg-transparent p-0 mono-label text-[hsl(var(--foreground))] sm:self-auto">Back to top <ArrowUpRight size={14} strokeWidth={1.4} /></button>
        </div>
      </footer>
    </main>
  );
}

export default App;
