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

const navItems = [
  { label: 'WORK', target: 'work' },
  { label: 'ZARVORA', target: 'zarvora' },
  { label: 'PRACTICE', target: 'practice' },
  { label: 'JOURNEY', target: 'journey' },
  { label: 'CONTACT', target: 'contact' },
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

      <section id="zarvora" className="border-y border-[hsl(var(--foreground)/.16)] bg-[hsl(var(--card))] px-5 py-24 sm:px-8 lg:px-12 lg:py-36" aria-labelledby="zarvora-heading">
        <div className="mx-auto grid max-w-[1500px] gap-16 lg:grid-cols-[.62fr_1fr] lg:items-center lg:gap-28">
          <div className="reveal">
            <p className="mono-label mb-8 text-[hsl(var(--primary))]">02 / A living chapter</p>
            <div className="relative border border-[hsl(var(--primary)/.35)] p-5">
              <div className="flex aspect-[1.08] flex-col justify-between bg-[hsl(var(--primary))] p-7 text-[hsl(var(--primary-foreground))] sm:p-10">
                <div className="flex items-start justify-between">
                  <span className="text-[.68rem] tracking-[.3em]">ZARVORA</span>
                  <span className="mono-label text-[hsl(var(--secondary))]">Est. / in the making</span>
                </div>
                <div>
                  <p className="display-serif text-[clamp(3.6rem,8vw,7rem)] leading-[.78] tracking-[-.06em]">Legacy<br /><span className="italic text-[hsl(var(--secondary))]">of Elegance</span></p>
                  <div className="mt-8 h-px w-full bg-[hsl(var(--secondary)/.35)]" />
                  <p className="mono-label mt-3 text-[hsl(var(--primary-foreground)/.6)]">A brand by Samay Mishra</p>
                </div>
              </div>
              <span className="absolute -bottom-3 -right-3 bg-[hsl(var(--card))] px-3 py-1 mono-label text-[hsl(var(--primary))]">Z / 01</span>
            </div>
          </div>
          <div className="reveal reveal-delay-1 max-w-[720px]">
            <p className="mono-label mb-6 text-[hsl(var(--primary))]">Zarvora / zarvora.shop</p>
            <h2 id="zarvora-heading" className="text-[clamp(2.8rem,6vw,6.8rem)] font-medium leading-[.86] tracking-[-.075em]">A first chapter,<br /><span className="display-serif font-normal italic text-[hsl(var(--primary))]">made to last.</span></h2>
            <p className="mt-10 max-w-[530px] text-[1.04rem] leading-[1.75] text-[hsl(var(--foreground)/.7)]">ZARVORA is the independent brand I’m building from the ground up — a study in elegance, identity, and the feeling that something can become part of your story.</p>
            <a href="https://zarvora.shop" target="_blank" rel="noreferrer" data-testid="link-zarvora-chapter" className="line-link mt-10 mono-label text-[hsl(var(--primary))]">Visit zarvora.shop <ArrowUpRight size={15} strokeWidth={1.4} /></a>
          </div>
        </div>
      </section>

      <section id="practice" className="mx-auto max-w-[1500px] px-5 py-24 sm:px-8 lg:px-12 lg:py-40" aria-labelledby="practice-heading">
        <div className="reveal mb-16 grid gap-7 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <p className="mono-label text-[hsl(var(--primary))]">03 / The practice</p>
          <h2 id="practice-heading" className="max-w-[920px] text-[clamp(3rem,7vw,7.5rem)] leading-[.84] tracking-[-.08em]">Taste is not<br /><span className="display-serif font-normal italic text-[hsl(var(--primary))]">decoration.</span></h2>
        </div>
        <div className="grid gap-0 border-t border-[hsl(var(--foreground)/.17)] lg:grid-cols-3">
          {[
            ['01', 'Notice', 'Start with the feeling. Pay attention to the details people move past, and the details they remember.'],
            ['02', 'Shape', 'Turn an instinct into a clear point of view — then make the system strong enough to carry it.'],
            ['03', 'Stay', 'Build for the long view. Let the work compound quietly, with patience and a standard that holds.'],
          ].map(([number, title, copy], index) => (
            <article key={number} className={`reveal reveal-delay-${index + 1} border-b border-[hsl(var(--foreground)/.17)] py-8 lg:border-b-0 lg:border-r lg:px-10 lg:py-10 ${index === 0 ? 'lg:pl-0' : ''} ${index === 2 ? 'lg:border-r-0' : ''}`}>
              <div className="mb-20 flex items-start justify-between">
                <span className="practice-index">{number}</span>
                <span className="mono-label text-[hsl(var(--muted-foreground))]">Principle</span>
              </div>
              <h3 className="display-serif text-5xl italic text-[hsl(var(--primary))]">{title}</h3>
              <p className="mt-5 max-w-[285px] text-sm leading-7 text-[hsl(var(--muted-foreground))]">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="journey" className="maroon-panel px-5 py-24 sm:px-8 lg:px-12 lg:py-36" aria-labelledby="journey-heading">
        <div className="mx-auto max-w-[1500px]">
          <div className="reveal grid gap-8 border-b border-[hsl(var(--primary-foreground)/.24)] pb-16 lg:grid-cols-[.75fr_1.25fr] lg:items-end lg:gap-20">
            <p className="mono-label text-[hsl(var(--secondary))]">04 / The journey</p>
            <h2 id="journey-heading" className="max-w-[850px] text-[clamp(3.1rem,7vw,7.5rem)] leading-[.83] tracking-[-.08em]">The path is<br /><span className="display-serif font-normal italic text-[hsl(var(--secondary))]">the point.</span></h2>
          </div>
          <div className="grid gap-12 pt-14 lg:grid-cols-[.75fr_1.25fr] lg:gap-20">
            <div className="reveal">
              <p className="max-w-[290px] text-sm leading-7 text-[hsl(var(--primary-foreground)/.64)]">There is no neat timeline here. Only a direction: to keep making, keep learning, and keep choosing the less obvious version when it feels more true.</p>
              <span className="mono-label mt-12 block text-[hsl(var(--secondary)/.72)]">Mumbai, India / Present</span>
            </div>
            <div className="reveal reveal-delay-1">
              <div className="flex gap-6 border-b border-[hsl(var(--primary-foreground)/.24)] py-5">
                <span className="mono-label w-16 pt-1 text-[hsl(var(--secondary))]">Now</span>
                <p className="max-w-[530px] text-lg leading-8 text-[hsl(var(--primary-foreground)/.86)]">Building ZARVORA and the thinking behind it. Learning what it takes to turn a distinct feeling into something people can hold.</p>
              </div>
              <div className="flex gap-6 border-b border-[hsl(var(--primary-foreground)/.24)] py-5">
                <span className="mono-label w-16 pt-1 text-[hsl(var(--secondary))]">Next</span>
                <p className="max-w-[530px] text-lg leading-8 text-[hsl(var(--primary-foreground)/.86)]">More experiments across brands, business, technology, and the spaces where they meet. The next chapter will reveal itself through the work.</p>
              </div>
            </div>
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