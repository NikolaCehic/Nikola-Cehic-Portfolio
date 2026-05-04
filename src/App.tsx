import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { DATA } from './data';
import type { Experience, Highlight, Project } from './types';

const RESUME_URL = '/Nikola-Cehic-CV.pdf';
const GITHUB_URL = DATA.github.startsWith('http') ? DATA.github : `https://${DATA.github}`;

type WorkDiagramKind = 'pipeline' | 'treasury' | 'dao' | 'hub' | 'indexer';

const navItems = [
  { id: 'work', num: '01', label: 'Work' },
  { id: 'profile', num: '02', label: 'Profile' },
  { id: 'experience', num: '03', label: 'Experience' },
  { id: 'ai', num: '04', label: 'AI' },
  { id: 'lab', num: '05', label: 'Lab' },
  { id: 'stack', num: '06', label: 'Stack' },
  { id: 'principles', num: '07', label: 'Principles' },
  { id: 'contact', num: '08', label: 'Contact' },
];

const principles = [
  {
    num: 'i. SYSTEMS',
    title: 'Own the system, not just the ticket.',
    body:
      'I care about architecture, delivery, edge cases, production behavior, and whether the product solves the actual user problem.',
  },
  {
    num: 'ii. CLARITY',
    title: 'Make complex systems usable.',
    body:
      'My best work turns blockchain, data, and backend complexity into interfaces that feel understandable and reliable.',
  },
  {
    num: 'iii. CRAFT',
    title: 'Polished surfaces on serious infrastructure.',
    body:
      'I move across UI, APIs, data models, indexers, and production debugging without losing user-facing detail.',
  },
  {
    num: 'iv. REMOTE',
    title: 'Operate well in async, distributed teams.',
    body:
      'I am used to working across design, product, protocol, frontend, backend, and support in remote-first environments.',
  },
];

const focusAreas = [
  {
    num: 'PF.01',
    label: 'Ownership',
    title: 'Own the product surface and the system behind it.',
    body:
      'I am strongest when a product needs one engineer to move across UX, frontend architecture, APIs, data models, and production debugging without losing the user thread.',
    tags: ['Product architecture', 'Frontend lead', 'Backend APIs', 'Production fixes'],
  },
  {
    num: 'PF.02',
    label: 'Infrastructure',
    title: 'Turn chain and data complexity into usable products.',
    body:
      'Block explorers, DAO frameworks, treasury apps, indexers, governance flows, and real-time data systems need clear interfaces, not more jargon.',
    tags: ['Explorers', 'Treasury apps', 'DAO systems', 'Indexers'],
  },
  {
    num: 'PF.03',
    label: 'Delivery',
    title: 'Ship in small loops, then harden the path.',
    body:
      'I prefer crisp scopes, observable behavior, typed contracts, integration tests, and fast feedback between design, product, protocol, and support.',
    tags: ['Typed contracts', 'E2E tests', 'Async teams', 'Incident response'],
  },
];

const aiSystems = [
  {
    num: 'AI.01',
    label: 'Agent workflows',
    title: 'Design the agent loop, not just the prompt.',
    body:
      'I frame agentic workflows around tool contracts, run artifacts, replay paths, and human review, so the product can explain what happened after the model speaks.',
    tags: ['Tool contracts', 'Run artifacts', 'Replay paths', 'Human review'],
  },
  {
    num: 'AI.02',
    label: 'Evals',
    title: 'Treat evals as release infrastructure.',
    body:
      'Crux and Archetype treat quality as release infrastructure: scenario packs, invariant checks, readiness reports, prompt versions, regression thresholds, and validation gates before traffic or downstream agents scale.',
    tags: ['Scenario packs', 'Readiness gates', 'Prompt versions', 'Failure budgets'],
  },
  {
    num: 'AI.03',
    label: 'Grounding',
    title: 'Ground every answer in source or product state.',
    body:
      'The repeatable pattern is evidence first: chunk provenance in Crux, source-backed contracts in Archetype, deterministic market facts in Parallax, and UI states that expose uncertainty.',
    tags: ['RAG patterns', 'Evidence maps', 'Structured outputs', 'Deterministic facts'],
  },
  {
    num: 'AI.04',
    label: 'Product UX',
    title: 'Ship AI UX with controls users can trust.',
    body:
      'The interface is part of the model system: visible reasoning boundaries, editable outputs, cost-aware workflows, confidence cues, and review loops all reduce production risk.',
    tags: ['Copilot UX', 'Review states', 'Cost controls', 'Trust cues'],
  },
];

const aiProofPoints = [
  {
    label: 'Agent proof',
    value: 'Crux',
    detail: 'Replayable analysis agents, schemas, evidence maps, red-team memos, eval reports, and trace logs.',
  },
  {
    label: 'Contract proof',
    value: 'Archetype',
    detail: 'Product briefs compile into route maps, screen states, design tokens, agent contracts, and readiness reports.',
  },
  {
    label: 'Decision proof',
    value: 'Parallax',
    detail:
      'Trading theses become evidence snapshots, deterministic analytics, council review, decision gates, lifecycle triggers, and audit bundles.',
  },
];

const projectEvidence: Record<string, readonly string[]> = {
  archetype: ['Contract package', 'DSAG graph', 'Readiness gates', 'Agent handoff'],
  cruxharness: ['Agent loop', 'Eval reports', 'Trace logs', 'Schema validation'],
  parallax: ['Evidence snapshot', 'Council review', 'Decision gates', 'Audit replay'],
  tradejournal: ['Claude coach', 'Grounded digest', 'Detector engine', 'Cost-aware cache'],
  clipinsight: ['Gemini pipeline', 'Structured insights', 'Platform generators', 'Editable previews'],
};

const stackGroups = [
  {
    key: 'A',
    label: 'Web3',
    name: 'Chain and wallet tooling',
    items: DATA.skills.blockchain,
  },
  {
    key: 'B',
    label: 'Applied AI',
    name: 'LLM systems and quality loops',
    items: DATA.skills.ai,
  },
  {
    key: 'C',
    label: 'Languages',
    name: 'Primary languages',
    items: DATA.skills.languages,
  },
  {
    key: 'D',
    label: 'Frontend',
    name: 'Product frameworks',
    items: DATA.skills.frontend,
  },
  {
    key: 'E',
    label: 'Backend',
    name: 'APIs and services',
    items: DATA.skills.backend,
  },
  {
    key: 'F',
    label: 'Data',
    name: 'Database and realtime',
    items: DATA.skills.data,
  },
  {
    key: 'G',
    label: 'Quality',
    name: 'Tooling and delivery',
    items: DATA.skills.tooling,
  },
];

export function App() {
  usePageEffects();

  return (
    <>
      <BootOverlay />
      <AnimatedBackdrop />
      <a className="skip" href="#work">
        Skip to content
      </a>
      <TopNav />
      <main>
        <Hero />
        <Work />
        <Profile />
        <ExperienceLedger />
        <AIEngineering />
        <Lab />
        <Stack />
        <Principles />
        <Contact />
      </main>
    </>
  );
}

function usePageEffects() {
  useEffect(() => {
    const revealTargets = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const motionSurfaces = document.querySelectorAll<HTMLElement>(
      '.work-card, .project-card, .profile-cell, .ledger-row, .ai-card, .ai-proof, .stack-row, .principle-row, .contact-frame',
    );
    const navLinks = document.querySelectorAll<HTMLAnchorElement>('[data-nav-target]');
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'));
    const progress = document.getElementById('scroll-progress');
    const header = document.querySelector<HTMLElement>('.site-header');

    const updateScrollState = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      progress?.style.setProperty('--progress', String(ratio));
      header?.classList.toggle('is-scrolled', y > 8);

      let active = sections[0]?.id ?? '';
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= window.innerHeight * 0.38) {
          active = section.id;
        }
      }
      navLinks.forEach((link) => {
        link.classList.toggle('is-active', link.dataset.navTarget === active);
      });
    };

    const Observer = (window as Window & { IntersectionObserver?: typeof IntersectionObserver }).IntersectionObserver;

    const updateSurfacePointer = (event: PointerEvent) => {
      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      target.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      target.style.setProperty('--my', `${event.clientY - rect.top}px`);
    };

    const clearSurfacePointer = (event: PointerEvent) => {
      const target = event.currentTarget as HTMLElement;
      target.style.removeProperty('--mx');
      target.style.removeProperty('--my');
    };

    if (window.matchMedia('(pointer: fine)').matches) {
      motionSurfaces.forEach((surface) => {
        surface.addEventListener('pointermove', updateSurfacePointer);
        surface.addEventListener('pointerleave', clearSurfacePointer);
      });
    }

    if (Observer) {
      const observer = new Observer(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.02, rootMargin: '0px 0px -6% 0px' },
      );
      revealTargets.forEach((target) => observer.observe(target));
      window.addEventListener('scroll', updateScrollState, { passive: true });
      window.addEventListener('resize', updateScrollState);
      updateScrollState();
      return () => {
        observer.disconnect();
        motionSurfaces.forEach((surface) => {
          surface.removeEventListener('pointermove', updateSurfacePointer);
          surface.removeEventListener('pointerleave', clearSurfacePointer);
        });
        window.removeEventListener('scroll', updateScrollState);
        window.removeEventListener('resize', updateScrollState);
      };
    }

    revealTargets.forEach((target) => target.classList.add('in-view'));
    window.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    updateScrollState();
    return () => {
      motionSurfaces.forEach((surface) => {
        surface.removeEventListener('pointermove', updateSurfacePointer);
        surface.removeEventListener('pointerleave', clearSurfacePointer);
      });
      window.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, []);
}

function AnimatedBackdrop() {
  const glyphs = ['blk', 'tx', 'rpc', 'sig', 'api', 'idx', 'dao', 'pg', 'go', 'ui', 'evt', 'ai'];

  return (
    <div className="system-backdrop" aria-hidden="true">
      <div className="scan-band band-a" />
      <div className="scan-band band-b" />
      <div className="scan-band band-c" />
      <svg className="backdrop-routes" viewBox="0 0 1600 1000" preserveAspectRatio="none">
        <path id="global-route-a" d="M-120 690 C 220 530, 430 820, 760 560 S 1210 280, 1720 420" />
        <path id="global-route-b" d="M-80 230 C 280 340, 420 120, 700 250 S 1180 650, 1680 210" />
        <path id="global-route-c" d="M140 1120 C 420 780, 620 910, 880 690 S 1260 510, 1530 -80" />
        <circle r="3" className="route-packet packet-a">
          <animateMotion dur="18s" repeatCount="indefinite" rotate="auto">
            <mpath href="#global-route-a" />
          </animateMotion>
        </circle>
        <circle r="2.5" className="route-packet packet-b">
          <animateMotion dur="23s" begin="-9s" repeatCount="indefinite" rotate="auto">
            <mpath href="#global-route-b" />
          </animateMotion>
        </circle>
        <circle r="3.5" className="route-packet packet-c">
          <animateMotion dur="27s" begin="-13s" repeatCount="indefinite" rotate="auto">
            <mpath href="#global-route-c" />
          </animateMotion>
        </circle>
      </svg>
      <div className="glyph-field">
        {glyphs.map((glyph, index) => (
          <span key={`${glyph}-${index}`} style={{ '--i': index } as CSSProperties}>
            {glyph}
          </span>
        ))}
      </div>
    </div>
  );
}

function BootOverlay() {
  return (
    <div className="boot" aria-hidden="true">
      <div className="boot-line" />
      <div className="boot-mark">
        <span className="status-dot" />
        <span>Signal lock</span>
      </div>
    </div>
  );
}

function TopNav() {
  return (
    <header className="site-header" id="top">
      <div className="header-inner">
        <a className="brand" href="#top" aria-label={`${DATA.name} home`}>
          <img className="brand-logo" src="/logo.svg" alt="" width="24" height="24" aria-hidden="true" />
          <span className="brand-name">{DATA.name}</span>
          <span className="brand-meta">SR. FULLSTACK</span>
        </a>
        <nav className="site-nav" aria-label="Primary">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} data-nav-target={item.id}>
              <span>{item.num}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
        <a className="btn btn-primary btn-sm" href="#contact">
          <span>Book intro</span>
          <span aria-hidden="true">-&gt;</span>
        </a>
      </div>
      <div className="scroll-progress" id="scroll-progress" />
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title" data-screen-label="00 Hero">
      <div className="hero-bg" aria-hidden="true">
        <div className="signal-field" />
        <HeroMap />
        <div className="coord-labels">
          {['indexer', 'agent', 'evals', 'api', 'rag', 'real-time'].map((label, index) => (
            <span key={label} style={{ '--i': index } as CSSProperties}>
              N: {label}
            </span>
          ))}
        </div>
      </div>

      <div className="hero-inner">
        <div className="hero-main" data-reveal>
          <div className="hero-meta">
            <span className="status-dot" aria-hidden="true" />
            <span>Available Q3 / remote / Europe</span>
          </div>
          <h1 id="hero-title">
            Senior Fullstack Engineer for <em>crypto infrastructure</em> and AI systems.
          </h1>
          <p className="hero-copy">
            {DATA.years}+ years building production software across Web3, fintech, and infrastructure-heavy
            platforms: React frontends and design systems on top of Go indexers, PostgreSQL data models, Cosmos SDK
            applications, AI-agent harnesses, eval loops, and public API surfaces.
          </p>
          <div className="hero-actions" aria-label="Primary actions">
            <a className="btn btn-primary btn-lg" href="#contact">
              <span>Book an intro call</span>
              <span aria-hidden="true">-&gt;</span>
            </a>
            <a className="btn btn-ghost btn-lg" href="#work">
              <span>View selected work</span>
            </a>
            <a className="btn btn-link" href={RESUME_URL} target="_blank" rel="noopener">
              <span>CV.pdf</span>
            </a>
          </div>
        </div>

        <aside className="hero-status" aria-label="Portfolio status" data-reveal>
          <div className="status-head">
            <span>Status</span>
            <strong>Signal lock</strong>
          </div>
          <StatusRow label="Domain" value="Crypto / AI / real-time" />
          <StatusRow label="Stack" value="Go / TS / React / LLMs" />
          <StatusRow label="Mode" value="Remote / async" />
          <StatusRow label="Tenure" value={`${DATA.years}+ yrs production`} meter="88%" />
          <StatusRow label="Focus" value="Agents / infra / UX" meter="76%" />
        </aside>

        <ul className="cred-strip" aria-label="Credibility" data-reveal>
          <li>
            <strong>{DATA.years}+</strong>
            years shipping production
          </li>
          <li>SEDA</li>
          <li>Terraform Labs</li>
          <li>Cosmos SDK</li>
          <li>AI evals</li>
          <li>React / TS / Go</li>
        </ul>
      </div>
    </section>
  );
}

function HeroMap() {
  return (
    <svg className="hero-map" viewBox="0 0 1600 900" preserveAspectRatio="none">
      <g className="map-lines" fill="none">
        <path id="hero-route-a" d="M120 460 L320 360 L520 420 L720 300 L900 400 L1140 260 L1340 340 L1500 260" />
        <path id="hero-route-b" d="M180 640 L380 560 L520 620 L720 540 L900 620 L1100 520 L1300 580" />
        <path id="hero-route-c" d="M320 360 L380 560 M720 300 L720 540 M1140 260 L1100 520 M520 420 L520 620" />
      </g>
      <g className="map-nodes">
        {[120, 320, 520, 720, 900, 1140, 1340, 1500].map((x, index) => (
          <circle key={x} cx={x} cy={[460, 360, 420, 300, 400, 260, 340, 260][index]} r={index === 3 ? 4 : 3} />
        ))}
        <circle cx="380" cy="560" r="3" />
        <circle cx="720" cy="540" r="3" />
        <circle cx="1100" cy="520" r="3" />
      </g>
      <g className="crosshair" transform="translate(720 300)" fill="none">
        <line x1="-16" y1="0" x2="16" y2="0" />
        <line x1="0" y1="-16" x2="0" y2="16" />
        <circle cx="0" cy="0" r="22" />
      </g>
      <g className="hero-packets">
        <circle r="4">
          <animateMotion dur="7s" begin="1.4s" repeatCount="indefinite" rotate="auto">
            <mpath href="#hero-route-a" />
          </animateMotion>
        </circle>
        <circle r="3">
          <animateMotion dur="9s" begin="2.2s" repeatCount="indefinite" rotate="auto">
            <mpath href="#hero-route-b" />
          </animateMotion>
        </circle>
      </g>
      <text x="56" y="842">
        SYSTEM_MAP / NODES=11 / LINKS=14 / STATUS=OK
      </text>
    </svg>
  );
}

function StatusRow({ label, value, meter }: { label: string; value: string; meter?: string }) {
  return (
    <div className="status-row">
      <span>{label}</span>
      <strong>{value}</strong>
      {meter ? <i style={{ '--meter': meter } as CSSProperties} /> : <span />}
    </div>
  );
}

function Work() {
  const seda = findExperience('seda');
  const terraform = findExperience('terraform');

  const workCards = [
    {
      num: '01.A',
      label: 'Block explorer / indexing / fullstack',
      title: 'SEDA Explorer',
      copy: findHighlight(seda, 'SEDA Explorer')?.body ?? seda.summary,
      tags: ['Go indexers', 'PostgreSQL', 'Real-time updates', 'Public API'],
      diagram: 'pipeline' satisfies WorkDiagramKind,
      featured: true,
      facts: ['Blocks / tx / validators', 'Indexer to API to UI', 'End-to-end ownership'],
    },
    {
      num: '01.B',
      label: 'SEDA / governance / multisig',
      title: 'SEDA Treasury',
      copy: findHighlight(seda, 'SEDA Treasury')?.body ?? '',
      tags: ['Cosmos SDK', 'Group module', 'Wallet signing', 'Policy config'],
      diagram: 'treasury' satisfies WorkDiagramKind,
      featured: true,
      facts: ['Gov multisig app', 'Treasury proposals', 'Security groups'],
    },
    {
      num: '01.C',
      label: 'Terraform / DAO framework',
      title: 'Enterprise DAO',
      copy: findHighlight(terraform, 'Enterprise DAO')?.body ?? terraform.summary,
      tags: ['DAO creation', 'CosmWasm', 'Treasury'],
      diagram: 'dao' satisfies WorkDiagramKind,
      facts: ['Voting', 'Treasury', 'Execution'],
    },
    {
      num: '01.D',
      label: 'Terraform / product shell',
      title: 'Enterprise Hub',
      copy: findHighlight(terraform, 'Enterprise Hub')?.body ?? '',
      tags: ['Next.js', 'Routing', 'State management', 'Component library'],
      diagram: 'hub' satisfies WorkDiagramKind,
      facts: ['Built from scratch', 'Product architecture', 'Design partnership'],
    },
    {
      num: '01.E',
      label: 'Terraform / data pipeline',
      title: 'Enterprise Indexer',
      copy: findHighlight(terraform, 'Enterprise Indexer')?.body ?? '',
      tags: ['Apache Pulsar', 'Event schemas', 'Analytics', 'Activity feeds'],
      diagram: 'indexer' satisfies WorkDiagramKind,
      facts: ['Token events', 'Wallet analytics', 'DAO activity'],
    },
  ] as const;

  return (
    <Chapter id="work" num="01" label="Flagship systems" title="Selected systems I have shipped.">
      <p className="section-sub">
        Production work spanning SEDA Explorer, SEDA Treasury, Enterprise DAO, Enterprise Hub, and Enterprise Indexer,
        owned across data, backend, and frontend.
      </p>
      <div className="work-grid" data-reveal>
        {workCards.map((card) => (
          <article key={card.num} className={'featured' in card && card.featured ? 'work-card featured' : 'work-card'}>
            <header className="card-head">
              <span>{card.label}</span>
              <strong>{card.num}</strong>
            </header>
            <h3>{card.title}</h3>
            <p>{cleanText(card.copy)}</p>
            <WorkDiagram kind={card.diagram} />
            <ul className="fact-strip">
              {card.facts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
            <TagList items={card.tags} />
          </article>
        ))}
      </div>
    </Chapter>
  );
}

function WorkDiagram({ kind }: { kind: WorkDiagramKind }) {
  if (kind === 'pipeline') {
    return (
      <div className="diagram pipeline" aria-hidden="true">
        {['chain', 'go indexer', 'postgres', 'api/ui'].map((item, index) => (
          <span key={item}>
            {item}
            {index < 3 ? <i /> : null}
          </span>
        ))}
      </div>
    );
  }

  if (kind === 'treasury') {
    return (
      <div className="diagram treasury" aria-hidden="true">
        <span>proposal</span>
        <div>
          <i style={{ '--w': '62%' } as CSSProperties} />
          <i style={{ '--w': '19%' } as CSSProperties} />
          <i style={{ '--w': '9%' } as CSSProperties} />
        </div>
        <strong>4 / 7 signed</strong>
      </div>
    );
  }

  if (kind === 'dao') {
    return (
      <div className="diagram dao" aria-hidden="true">
        <span>
          <small>treasury</small>
          <strong>$4.2M</strong>
        </span>
        <span>
          <small>members</small>
          <strong>1,284</strong>
        </span>
        <span>
          <small>proposals</small>
          <strong>37</strong>
        </span>
        <span>
          <small>execution</small>
          <strong>auto</strong>
        </span>
      </div>
    );
  }

  if (kind === 'hub') {
    return (
      <div className="diagram hub" aria-hidden="true">
        <span>home</span>
        <span>dao</span>
        <span>treasury</span>
        <span>vote</span>
        <span>activity</span>
      </div>
    );
  }

  return (
    <div className="diagram indexer" aria-hidden="true">
      {['contract', 'pulsar', 'handler', 'analytics'].map((item, index) => (
        <span key={item}>
          {item}
          {index < 3 ? <i /> : null}
        </span>
      ))}
    </div>
  );
}

function Profile() {
  return (
    <Chapter id="profile" num="02" label="Engineering profile" title="How I work across systems.">
      <p className="section-sub">
        Operating profile: where I add leverage, how I turn complex systems into shipped product, and what I optimize
        for across protocol, backend, frontend, and users.
      </p>
      <div className="profile-grid" data-reveal>
        {focusAreas.map((area) => (
          <article key={area.num} className="profile-cell">
            <span>
              {area.num} / {area.label}
            </span>
            <h3>{area.title}</h3>
            <p>{area.body}</p>
            <TagList items={area.tags} />
          </article>
        ))}
      </div>
    </Chapter>
  );
}

function ExperienceLedger() {
  return (
    <Chapter
      id="experience"
      num="03"
      label="Track record"
      title="Built across crypto, fintech, identity, and real-time platforms."
    >
      <p className="section-sub">
        Production software across Web3 protocols, fintech platforms, identity verification, and live betting
        infrastructure.
      </p>
      <div className="ledger" data-reveal>
        {DATA.experience.map((job, index) => (
          <ExperienceRow key={job.id} job={job} index={index} />
        ))}
      </div>
    </Chapter>
  );
}

function ExperienceRow({ job, index }: { job: Experience; index: number }) {
  return (
    <article className={index === 0 ? 'ledger-row current' : 'ledger-row'}>
      <div className="ledger-when">
        <span>{index === 0 ? 'Current' : String(index + 1).padStart(2, '0')}</span>
        {job.start} to {job.end}
      </div>
      <div className="ledger-co">
        <h3>{job.company}</h3>
        <span>{job.role}</span>
      </div>
      <ul className="ledger-themes">
        {job.highlights.slice(0, 3).map((highlight) => (
          <li key={highlight.title}>{cleanText(highlight.title)}</li>
        ))}
      </ul>
      <TagList items={job.stack.slice(0, 5)} />
    </article>
  );
}

function AIEngineering() {
  return (
    <Chapter id="ai" num="04" label="Applied AI systems" title="AI systems that are observable, grounded, and useful.">
      <p className="section-sub">
        Applied AI is strongest here when it is treated as product infrastructure: agent loops with clear tool
        boundaries, retrieval and grounding, measurable evals, traceable runs, and interfaces that keep users in
        control.
      </p>
      <div className="ai-console" data-reveal>
        <div className="ai-radar" aria-hidden="true">
          <span className="ai-core">LLM</span>
          <i className="ring ring-a" />
          <i className="ring ring-b" />
          <i className="ring ring-c" />
          <b className="node node-agent">agent</b>
          <b className="node node-eval">eval</b>
          <b className="node node-rag">rag</b>
          <b className="node node-trace">trace</b>
        </div>
        <div className="ai-proof-board">
          {aiProofPoints.map((point) => (
            <article className="ai-proof" key={point.label}>
              <span>{point.label}</span>
              <strong>{point.value}</strong>
              <p>{point.detail}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="ai-grid" data-reveal>
        {aiSystems.map((system) => (
          <article className="ai-card" key={system.num}>
            <div className="ai-card-index">
              <span>{system.num}</span>
              {system.label}
            </div>
            <div>
              <h3>{system.title}</h3>
              <p>{system.body}</p>
            </div>
            <TagList items={system.tags} />
          </article>
        ))}
      </div>
    </Chapter>
  );
}

function Lab() {
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);
  const expandedSlotRef = useRef<HTMLDivElement | null>(null);
  const expandedProject = DATA.projects.find((project) => project.id === expandedProjectId);
  const closedProjects = expandedProjectId
    ? DATA.projects.filter((project) => project.id !== expandedProjectId)
    : DATA.projects;

  useEffect(() => {
    if (!expandedProjectId) {
      return undefined;
    }

    const scrollTarget = expandedSlotRef.current;
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const revealExpandedProject = () => {
      scrollTarget?.scrollIntoView?.({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
      scrollTarget?.querySelector('summary')?.focus({ preventScroll: true });
    };

    if (typeof window.requestAnimationFrame === 'function') {
      const frame = window.requestAnimationFrame(revealExpandedProject);
      return () => window.cancelAnimationFrame(frame);
    }

    revealExpandedProject();
    return undefined;
  }, [expandedProjectId]);

  return (
    <Chapter id="lab" num="05" label="Side projects" title="Side Projects">
      <p className="section-sub">
        Product builds and experiments across AI-native interfaces, analysis-agent harnesses, trading workflows, creator
        tooling, and developer ergonomics.
      </p>
      <div className="lab-index" data-reveal aria-label="Lab index">
        <span>LAB INDEX</span>
        <strong>{DATA.projects.length} featured builds plus the full GitHub archive.</strong>
        <p>Each featured project is framed by the problem, system behavior, implementation proof points, and source.</p>
      </div>
      {expandedProject ? (
        <div className="lab-expanded-slot" ref={expandedSlotRef}>
          <ProjectCard
            project={expandedProject}
            index={DATA.projects.findIndex((project) => project.id === expandedProject.id)}
            isExpanded
            onDetailsToggle={() => setExpandedProjectId(null)}
          />
        </div>
      ) : null}
      <div className="lab-grid" data-reveal>
        {closedProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={DATA.projects.findIndex((candidate) => candidate.id === project.id)}
            isExpanded={false}
            onDetailsToggle={() => setExpandedProjectId(project.id)}
          />
        ))}
        <GitHubArchiveCard />
      </div>
    </Chapter>
  );
}

function GitHubArchiveCard() {
  return (
    <article className="project-card github-card">
      <header className="card-head">
        <span>Archive / source</span>
        <strong>EXP.MORE</strong>
      </header>
      <h3>View more on GitHub</h3>
      <p className="project-tagline">The rest of the shipped experiments, protocol work, and product builds live there.</p>
      <div className="github-signal" aria-hidden="true">
        <span>repos</span>
        <i />
        <span>commits</span>
        <i />
        <span>systems</span>
      </div>
      <a className="github-card-link" href={GITHUB_URL} target="_blank" rel="noreferrer noopener">
        Open GitHub archive <span aria-hidden="true">-&gt;</span>
      </a>
    </article>
  );
}

function ProjectCard({
  project,
  index,
  isExpanded,
  onDetailsToggle,
}: {
  project: Project;
  index: number;
  isExpanded: boolean;
  onDetailsToggle: () => void;
}) {
  const evidence = projectEvidence[project.id] ?? [];

  return (
    <article className={isExpanded ? 'project-card project-card-expanded' : index === 0 ? 'project-card wide' : 'project-card'}>
      <header className="card-head">
        <span>
          {project.status} / {project.year}
        </span>
        <strong>EXP.{String(index + 1).padStart(2, '0')}</strong>
      </header>
      <h3>{project.name}</h3>
      <p className="project-tagline">{project.tagline}</p>
      <p className="project-role">{project.role}</p>
      <ProjectSignal projectId={project.id} />
      {evidence.length > 0 ? <ProjectEvidence items={evidence} /> : null}
      <details className="project-details" open={isExpanded}>
        <summary
          onClick={(event) => {
            event.preventDefault();
            onDetailsToggle();
          }}
        >
          <span>System details</span>
          <span className="detail-state detail-open" aria-hidden="true">Open</span>
          <span className="detail-state detail-close" aria-hidden="true">Close</span>
        </summary>
        <div className="project-detail-body">
          <p className="project-summary-detail">{cleanText(project.summary)}</p>
          <div className="project-problem">
            <span>Problem</span>
            <p>{cleanText(project.problem)}</p>
          </div>
          <TagList items={project.stack.slice(0, 8)} />
          <ul className="project-highlights">
            {project.highlights.slice(0, 3).map((highlight) => (
              <li key={highlight.title}>
                <strong>{cleanText(highlight.title)}</strong>
                <span>{cleanText(highlight.body)}</span>
              </li>
            ))}
          </ul>
        </div>
      </details>
      <div className="project-links">
        {project.links.map((link) => (
          <a key={link.href} href={link.href} target="_blank" rel="noreferrer noopener">
            {link.label} <span aria-hidden="true">-&gt;</span>
          </a>
        ))}
      </div>
    </article>
  );
}

function ProjectEvidence({ items }: { items: readonly string[] }) {
  return (
    <div className="project-evidence">
      <span>AI proof</span>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function ProjectSignal({ projectId }: { projectId: string }) {
  if (projectId === 'archetype') {
    return (
      <div className="project-signal archetype-signal" aria-hidden="true">
        <div className="contract-flow">
          {['brief', 'model', 'screens', 'tokens', 'contract', 'verify'].map((item, index) => (
            <span key={item} style={{ '--step': index } as CSSProperties}>
              {item}
            </span>
          ))}
        </div>
        <div className="contract-ledger">
          {['evidence', 'dsag', 'gates'].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    );
  }

  if (projectId === 'cruxharness') {
    return (
      <div className="project-signal crux-signal" aria-hidden="true">
        <div className="artifact-chain">
          {['question', 'claims', 'evidence', 'red team', 'uncertainty', 'memo'].map((item, index) => (
            <span key={item}>
              {item}
              {index < 5 ? <i /> : null}
            </span>
          ))}
        </div>
        <div className="schema-stack">
          <span>schema</span>
          <span>provenance</span>
          <span>eval</span>
        </div>
      </div>
    );
  }

  if (projectId === 'parallax') {
    return (
      <div className="project-signal parallax-signal" aria-hidden="true">
        <div className="thesis-flow">
          {['thesis', 'evidence', 'analytics', 'council', 'gate', 'audit'].map((item, index) => (
            <span key={item}>
              {item}
              {index < 5 ? <i /> : null}
            </span>
          ))}
        </div>
        <div className="decision-gates">
          {[
            ['fresh', 'evidence'],
            ['risk', 'bounded'],
            ['thesis', 'reviewed'],
            ['audit', 'ready'],
          ].map(([label, state], index) => (
            <span key={label} style={{ '--step': index } as CSSProperties}>
              <b>{label}</b>
              <em>{state}</em>
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (projectId === 'clipinsight') {
    return (
      <div className="project-signal clip-signal" aria-hidden="true">
        {['video', 'transcript', 'insights', 'thread', 'blog'].map((item, index) => (
          <span key={item} style={{ '--step': index } as CSSProperties}>
            {item}
          </span>
        ))}
      </div>
    );
  }

  if (projectId === 'tradejournal') {
    return (
      <div className="project-signal trade-signal" aria-hidden="true">
        <div className="trade-loop">
          {['entry', 'detectors', 'coach', 'review'].map((item, index) => (
            <span key={item}>
              {item}
              {index < 3 ? <i /> : null}
            </span>
          ))}
        </div>
        <div className="coach-checks">
          {[
            ['bias', 'tilt'],
            ['risk', 'guard'],
            ['digest', 'grounded'],
            ['cache', 'cost aware'],
          ].map(([label, state], index) => (
            <span key={label} style={{ '--step': index } as CSSProperties}>
              <b>{label}</b>
              <em>{state}</em>
            </span>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

function Stack() {
  return (
    <Chapter id="stack" num="06" label="Operating stack" title="The stack I use to ship.">
      <p className="section-sub">
        A concise inventory of the tools I use most: chain tooling first, applied AI second, then languages, product
        frameworks, APIs, databases, realtime systems, and delivery quality.
      </p>
      <div className="stack-board" data-reveal>
        {stackGroups.map((group) => (
          <article key={group.key} className="stack-row">
            <div className="stack-key">
              <strong>{group.key}</strong>
              {group.label}
            </div>
            <h3>{group.name}</h3>
            <TagList items={group.items} />
          </article>
        ))}
      </div>
    </Chapter>
  );
}

function Principles() {
  return (
    <Chapter id="principles" num="07" label="How I work" title="Operating principles.">
      <p className="section-sub">A short manifesto. Each one is a working commitment, not a tagline.</p>
      <div className="principles-list" data-reveal>
        {principles.map((principle) => (
          <article key={principle.num} className="principle-row">
            <span>{principle.num}</span>
            <h3>{principle.title}</h3>
            <p>{principle.body}</p>
          </article>
        ))}
      </div>
    </Chapter>
  );
}

function Contact() {
  return (
    <section className="section section-contact" id="contact" aria-labelledby="contact-title" data-screen-label="08 Contact">
      <div className="section-inner contact-inner" data-reveal>
        <div className="contact-frame">
          <div className="contact-mark">CH.08 / END FRAME</div>
          <h2 id="contact-title">Building crypto, AI, or infrastructure-heavy products?</h2>
          <p>
            I am looking for senior fullstack, frontend-heavy fullstack, Web3 product engineering, crypto infrastructure,
            applied AI, and AI-native product roles where I can own meaningful systems and ship production software.
          </p>
          <div className="contact-actions">
            <a className="btn btn-primary btn-lg" href={`mailto:${DATA.email}?subject=Intro%20call`}>
              <span>Book an intro call</span>
              <span aria-hidden="true">-&gt;</span>
            </a>
            <a className="btn btn-ghost btn-lg" href={`mailto:${DATA.email}`}>
              <span>Email Nikola</span>
            </a>
          </div>
          <ul className="contact-links">
            <li>
              <span>Email</span>
              <a href={`mailto:${DATA.email}`}>{DATA.email}</a>
            </li>
            <li>
              <span>LinkedIn</span>
              <a href={DATA.linkedinUrl} target="_blank" rel="noreferrer noopener">
                linkedin
              </a>
            </li>
            <li>
              <span>GitHub</span>
              <a href={GITHUB_URL} target="_blank" rel="noreferrer noopener">
                {DATA.github}
              </a>
            </li>
            <li>
              <span>CV</span>
              <a href={RESUME_URL} target="_blank" rel="noopener">
                download PDF
              </a>
            </li>
          </ul>
        </div>
        <footer className="site-foot">
          <span>© 2026 / {DATA.name}</span>
          <span>Good systems do not announce themselves.</span>
          <span>BLD.04.26 / V3</span>
        </footer>
      </div>
    </section>
  );
}

function Chapter({
  id,
  num,
  label,
  title,
  children,
}: {
  id: string;
  num: string;
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className={`section section-${id}`} id={id} aria-labelledby={`${id}-title`} data-screen-label={`${num} ${label}`}>
      <span className="ghost-num" aria-hidden="true">
        {num}
      </span>
      <div className="section-inner">
        <div className="chapter-mark" data-reveal>
          <span>CH.{num}</span>
          <i />
          <strong>{label}</strong>
        </div>
        <h2 id={`${id}-title`} data-reveal>
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

function TagList({ items }: { items: readonly string[] }) {
  return (
    <ul className="tags">
      {items.map((item) => (
        <li key={item}>{cleanText(item)}</li>
      ))}
    </ul>
  );
}

function findExperience(id: string): Experience {
  const job = DATA.experience.find((entry) => entry.id === id);
  if (!job) throw new Error(`Missing experience entry: ${id}`);
  return job;
}

function findHighlight(job: Experience, title: string): Highlight | undefined {
  return job.highlights.find((highlight) => highlight.title === title);
}

function cleanText(value: string): string {
  return value
    .replace(/\s+\u2014\s+/g, ', ')
    .replace(/\u2014/g, ', ')
    .replace(/0\u21921/g, '0 to 1')
    .replace(/\s+/g, ' ')
    .trim();
}
