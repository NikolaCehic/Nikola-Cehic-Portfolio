import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { App } from '../App';

describe('App', () => {
  it('renders every section heading', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /selected systems/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /how i work across systems/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /built across crypto/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /ai systems that are observable/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /building crypto, ai/i })).toBeInTheDocument();
  });

  it('renders Crux Harness in side projects', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /crux harness/i })).toBeInTheDocument();
    const cruxLink = screen
      .getAllByRole('link', { name: /source/i })
      .find((link) => link.getAttribute('href') === 'https://github.com/NikolaCehic/crux-harness');
    expect(cruxLink).toBeDefined();
  });

  it('renders the phase 1 flagship systems without removed selected-work cards', () => {
    render(<App />);

    for (const name of ['SEDA Explorer', 'SEDA Treasury', 'Enterprise DAO', 'Enterprise Hub', 'Enterprise Indexer']) {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument();
    }

    const retiredHeadings = [
      ['design', 'system', 'monorepo'].join(' '),
      ['live', 'markets', 'console'].join(' '),
    ];
    for (const heading of retiredHeadings) {
      expect(screen.queryByRole('heading', { name: new RegExp(heading, 'i') })).not.toBeInTheDocument();
    }
  });

  it('renders a GitHub archive CTA in the lab', () => {
    render(<App />);
    const githubLink = screen.getByRole('link', { name: /open github archive/i });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/NikolaCehic');
  });

  it('renders Web3 and applied AI before frontend and backend in the stack chapter', () => {
    render(<App />);
    const stackSection = document.querySelector('#stack');
    expect(stackSection).not.toBeNull();

    const text = stackSection?.textContent ?? '';
    expect(text.indexOf('Web3')).toBeLessThan(text.indexOf('Applied AI'));
    expect(text.indexOf('Web3')).toBeLessThan(text.indexOf('Frontend'));
    expect(text.indexOf('Web3')).toBeLessThan(text.indexOf('Backend'));
    expect(text.indexOf('Applied AI')).toBeLessThan(text.indexOf('Frontend'));
    expect(text.indexOf('Applied AI')).toBeLessThan(text.indexOf('Backend'));
    expect(stackSection).toHaveTextContent('Cosmos SDK');
    expect(stackSection).toHaveTextContent('CosmWasm');
    expect(stackSection).toHaveTextContent('CosmJS');
    expect(stackSection).toHaveTextContent('Web3.js');
    expect(stackSection).toHaveTextContent('Ethers.js');
    expect(stackSection).toHaveTextContent('EVM');
    expect(stackSection).toHaveTextContent('OpenAI-compatible LLMs');
    expect(stackSection).toHaveTextContent('Anthropic Claude');
    expect(stackSection).toHaveTextContent('Agent workflows');
    expect(stackSection).toHaveTextContent('Go');
    expect(stackSection).toHaveTextContent('Rust');
    expect(stackSection).toHaveTextContent('TanStack Start');
    expect(stackSection).toHaveTextContent('PostgreSQL');
    expect(stackSection).toHaveTextContent('Prisma');
  });

  it('keeps profile positioning distinct from the stack inventory', () => {
    render(<App />);
    const profileSection = document.querySelector('#profile');
    expect(profileSection).toHaveTextContent('Operating profile');
    expect(profileSection).toHaveTextContent('Product architecture');
    expect(profileSection).not.toHaveTextContent('TanStack Start');
    expect(profileSection).not.toHaveTextContent('Web3.js');
  });

  it('renders a dedicated applied AI systems chapter', () => {
    render(<App />);
    const aiSection = document.querySelector('#ai');
    expect(aiSection).toHaveTextContent('Agent workflows');
    expect(aiSection).toHaveTextContent('Evals');
    expect(aiSection).toHaveTextContent('RAG patterns');
    expect(aiSection).toHaveTextContent(/traceable runs/i);
    expect(aiSection).toHaveTextContent('Crux');
    expect(aiSection).toHaveTextContent('Journal');
    expect(aiSection).toHaveTextContent('ClipInsight');
  });

  it('surfaces AI proof points inside project cards', () => {
    render(<App />);
    expect(screen.getAllByText('AI proof').length).toBe(3);
    expect(screen.getByText('Agent loop')).toBeInTheDocument();
    expect(screen.getByText('Eval reports')).toBeInTheDocument();
    expect(screen.getByText('Gemini pipeline')).toBeInTheDocument();
    expect(screen.getByText('Claude coach')).toBeInTheDocument();
  });

  it('renders the top-bar nav with all sections', () => {
    render(<App />);
    const nav = screen.getByRole('navigation', { name: /primary/i });
    expect(nav).toHaveTextContent('Work');
    expect(nav).toHaveTextContent('Profile');
    expect(nav).toHaveTextContent('Experience');
    expect(nav).toHaveTextContent('AI');
    expect(nav).toHaveTextContent('Lab');
    expect(nav).toHaveTextContent('Stack');
    expect(nav).toHaveTextContent('Contact');
  });

  it('renders the portfolio logo in the header', () => {
    render(<App />);
    const logo = document.querySelector<HTMLImageElement>('.brand-logo');
    expect(logo).not.toBeNull();
    expect(logo).toHaveAttribute('src', '/logo.svg');
    expect(logo).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders the resume link with absolute public path', () => {
    render(<App />);
    const resumeLinks = screen
      .getAllByRole('link')
      .filter((a) => a.getAttribute('href') === '/Nikola-Cehic-CV.pdf');
    expect(resumeLinks.length).toBeGreaterThan(0);
  });
});
