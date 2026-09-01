import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, Mail, MapPin, Menu, X } from 'lucide-react';

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
  const age = getAge();
  useReveals();
  useJourneyProgress();

  useEffect(() => {
    document.title = 'Samay Mishra — Independent Founder';
    const description =
      'Samay Mishra, known to many as Biraj, is an independent founder in Mumbai building brands, businesses and experiences where taste meets technology.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
    const social = [
      ['og:title', 'Samay Mishra — Independent Founder'],
      ['og:description', description],
      ['og:type', 'website'],
      ['og:locale', 'en_IN'],
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
  }, []);

  useEffect(() => {
    const target = window.location.hash.slice(1);
    if (!target) return;
    const timer = window.setTimeout(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
    return () => window.clearTimeout(timer);
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
            <div className="portrait-frame">
              <div className="absolute inset-3 border border-[hsl(var(--secondary)/.35)]" />
              <span className="portrait-mark" aria-hidden="true">S.</span>
              <span className="portrait-caption mono-label">Portrait / to come</span>
            </div>
            <div className="mt-4 flex items-start justify-between gap-3">
              <span className="mono-label text-[hsl(var(--muted-foreground))]">Samay Mishra<br />Known as Biraj</span>
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
                <p className="zarvora-wordmark-text" data-testid="text-zarvora-brand">ZARVORA</p>
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

      <footer id="contact" className="mx-auto max-w-[1500px] px-5 pb-8 pt-24 sm:px-8 lg:px-12 lg:pb-10 lg:pt-36" aria-labelledby="contact-heading">
        <div className="reveal grid gap-14 lg:grid-cols-[1fr_.8fr] lg:items-end">
          <div>
            <p className="mono-label mb-8 text-[hsl(var(--primary))]">05 / Contact</p>
            <h2 id="contact-heading" className="max-w-[950px] text-[clamp(3.5rem,9vw,10rem)] font-medium leading-[.78] tracking-[-.09em]">Let’s make<br /><span className="display-serif font-normal italic text-[hsl(var(--primary))]">something matter.</span></h2>
          </div>
          <div className="lg:pb-2">
            <p className="max-w-[350px] text-base leading-7 text-[hsl(var(--muted-foreground))]">For a thoughtful conversation about an idea, a brand, or what might come next.</p>
            <a href="mailto:hello@samaymishra.com" data-testid="link-contact-email" className="line-link mt-8 mono-label text-[hsl(var(--primary))]"><Mail size={15} strokeWidth={1.4} /> Start a conversation</a>
          </div>
        </div>
        <div className="section-rule mt-24" />
        <div className="flex flex-col justify-between gap-5 pt-6 text-[hsl(var(--muted-foreground))] sm:flex-row">
          <div className="flex items-center gap-4">
            <span className="grid h-8 w-8 place-items-center border border-[hsl(var(--foreground)/.35)] font-serif italic text-lg text-[hsl(var(--foreground))]">S.</span>
            <span className="mono-label">© {new Date().getFullYear()} Samay Mishra</span>
          </div>
          <div className="flex items-center gap-2 mono-label"><MapPin size={13} strokeWidth={1.3} /> Mumbai, India</div>
          <button type="button" onClick={() => scrollTo('top')} data-testid="button-back-to-top" className="line-link self-start border-0 bg-transparent p-0 mono-label text-[hsl(var(--foreground))] sm:self-auto">Back to top <ArrowUpRight size={14} strokeWidth={1.4} /></button>
        </div>
      </footer>
    </main>
  );
}

export default App;