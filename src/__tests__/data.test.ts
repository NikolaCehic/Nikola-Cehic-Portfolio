import { describe, expect, it } from 'vitest';
import { DATA } from '../data';

describe('DATA', () => {
  it('has unique experience ids', () => {
    const ids = DATA.experience.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has unique project ids and valid project links', () => {
    const ids = DATA.projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);

    for (const project of DATA.projects) {
      expect(project.highlights.length).toBeGreaterThan(0);
      for (const link of project.links) {
        expect(() => new URL(link.href)).not.toThrow();
      }
    }
  });

  it('has at least one highlight per role', () => {
    for (const job of DATA.experience) {
      expect(job.highlights.length).toBeGreaterThan(0);
    }
  });

  it('keeps phase 1 flagship data focused on SEDA and Enterprise systems', () => {
    const highlightTitles = DATA.experience.flatMap((job) => job.highlights.map((highlight) => highlight.title));

    expect(highlightTitles).toContain('SEDA Explorer');
    expect(highlightTitles).toContain('SEDA Treasury');
    expect(highlightTitles).toContain('Enterprise DAO');
    expect(highlightTitles).toContain('Enterprise Hub');
    expect(highlightTitles).toContain('Enterprise Indexer');

    const retiredTitles = [
      ['Design', 'System', 'Monorepo'].join(' '),
      ['Back', 'Office', 'Application'].join(' '),
    ];
    for (const title of retiredTitles) {
      expect(highlightTitles).not.toContain(title);
    }
  });

  it('has non-empty skills in every category', () => {
    for (const [, items] of Object.entries(DATA.skills)) {
      expect(items.length).toBeGreaterThan(0);
    }
  });

  it('keeps the phase 2 Web3 stack focused on the requested chain tooling', () => {
    expect(DATA.skills.blockchain).toEqual(['Cosmos SDK', 'CosmWasm', 'CosmJS', 'Web3.js', 'Ethers.js', 'EVM']);
  });

  it('keeps the expanded stack concise and current', () => {
    expect(DATA.skills.languages).toEqual(['Go', 'TypeScript', 'Rust', 'JavaScript']);
    expect(DATA.skills.ai).toEqual(
      expect.arrayContaining([
        'OpenAI-compatible LLMs',
        'Anthropic Claude',
        'Gemini',
        'Agent workflows',
        'Evals',
        'Trace logs',
      ]),
    );
    expect(DATA.skills.frontend).toEqual(
      expect.arrayContaining(['Next.js', 'TanStack Start', 'React', 'Angular']),
    );
    expect(DATA.skills.data).toEqual(expect.arrayContaining(['PostgreSQL', 'Prisma']));
  });

  it('keeps canonical profile links exact', () => {
    expect(DATA.github).toBe('https://github.com/NikolaCehic');
    expect(DATA.linkedinUrl).toBe('https://www.linkedin.com/in/nikola-cehic-60a50914a/');
    expect(() => new URL(DATA.github)).not.toThrow();
    expect(() => new URL(DATA.linkedinUrl)).not.toThrow();
  });
});
